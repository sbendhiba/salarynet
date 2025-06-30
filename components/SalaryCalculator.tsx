'use client';

import React, { useState } from 'react';
import { Calculator, FileText, PieChart, TrendingUp, BarChart3 } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Area, AreaChart, ReferenceLine } from 'recharts';

interface SalaryResult {
  grossSalary: number;
  cnssDeduction: number;
  amoDeduction: number;
  ipeDeduction: number;
  fraisProfessionnels: number;
  irDeduction: number;
  netSalary: number;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface PercentileData {
  percentile: string;
  salary: number;
  isUser?: boolean;
}

interface NormalDistributionPoint {
  x: number;
  y: number;
  salary: number;
  percentile: number;
}

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [result, setResult] = useState<SalaryResult | null>(null);

  const calculateIR = (grossSalary: number, cnssDeduction: number, amoDeduction: number, ipeDeduction: number, fraisProfessionnels: number): number => {
    // Calculate RNI (Revenu Net Imposable) = gross - cotisations - frais professionnels
    const rni = grossSalary - cnssDeduction - amoDeduction - ipeDeduction - fraisProfessionnels;

    // Apply 2025 IR brackets to monthly RNI
    if (rni <= 3333.33) return 0;
    
    let tax = 0;
    
    if (rni > 15000.01) {
      tax = rni * 0.37 - 2283.33;
    } else if (rni > 8333.34) {
      tax = rni * 0.34 - 1833.33;
    } else if (rni > 6666.68) {
      tax = rni * 0.30 - 1500.00;
    } else if (rni > 5000.01) {
      tax = rni * 0.20 - 833.33;
    } else if (rni > 3333.34) {
      tax = rni * 0.10 - 333.33;
    }
    
    return Math.max(0, tax);
  };

  const calculateSalary = () => {
    const gross = parseFloat(grossSalary);
    if (!gross || gross <= 0) return;

    // CNSS is capped at 6000 MAD per month
    const cnssBase = Math.min(gross, 6000);
    const cnssDeduction = cnssBase * 0.0429;
    
    // AMO on full gross salary
    const amoDeduction = gross * 0.0226;
    
    // IPE is capped at 6000 MAD per month
    const ipeBase = Math.min(gross, 6000);
    const ipeDeduction = ipeBase * 0.0019;
    
    // Frais professionnels: 25% of gross salary, capped at 2916.66 MAD
    const fraisProfessionnels = Math.min(gross * 0.25, 2916.66);
    
    // Calculate IR
    const irDeduction = calculateIR(gross, cnssDeduction, amoDeduction, ipeDeduction, fraisProfessionnels);
    
    // Net salary = gross - all deductions
    const netSalary = gross - cnssDeduction - amoDeduction - ipeDeduction - irDeduction;

    setResult({
      grossSalary: gross,
      cnssDeduction,
      amoDeduction,
      ipeDeduction,
      fraisProfessionnels,
      irDeduction,
      netSalary
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getChartData = (): ChartData[] => {
    if (!result) return [];
    
    return [
      {
        name: 'Salaire Net',
        value: result.netSalary,
        color: '#0d9488'
      },
      {
        name: 'CNSS',
        value: result.cnssDeduction,
        color: '#ef4444'
      },
      {
        name: 'AMO',
        value: result.amoDeduction,
        color: '#f97316'
      },
      {
        name: 'IPE',
        value: result.ipeDeduction,
        color: '#eab308'
      },
      {
        name: 'IR',
        value: result.irDeduction,
        color: '#dc2626'
      }
    ];
  };

  const getPercentileData = (): PercentileData[] => {
    const baseData = [
      { percentile: '10e', salary: 3500 },
      { percentile: '25e', salary: 4200 },
      { percentile: '50e', salary: 6500 },
      { percentile: '75e', salary: 10000 },
      { percentile: '90e', salary: 15000 },
      { percentile: '95e', salary: 22000 },
      { percentile: '99e', salary: 35000 }
    ];

    if (!result) return baseData;

    // Find where user's salary fits and add it to the data
    const userSalary = result.grossSalary;
    const dataWithUser = [...baseData];
    
    // Add user's position
    let userPercentile = '50e';
    if (userSalary <= 3500) userPercentile = '<10e';
    else if (userSalary <= 4200) userPercentile = '~15e';
    else if (userSalary <= 6500) userPercentile = '~40e';
    else if (userSalary <= 10000) userPercentile = '~70e';
    else if (userSalary <= 15000) userPercentile = '~85e';
    else if (userSalary <= 22000) userPercentile = '~97e';
    else userPercentile = '>99e';

    // Insert user data in the right position
    const userData = { percentile: `Vous (${userPercentile})`, salary: userSalary, isUser: true };
    
    // Find insertion point
    let insertIndex = baseData.findIndex(item => item.salary > userSalary);
    if (insertIndex === -1) insertIndex = baseData.length;
    
    dataWithUser.splice(insertIndex, 0, userData);
    
    return dataWithUser;
  };

  // Generate normal distribution curve data for NET salaries
  const getNormalDistributionData = (): NormalDistributionPoint[] => {
    const points: NormalDistributionPoint[] = [];
    const meanNet = 6200; // Average NET salary (adjusted from gross)
    const stdDevNet = 3200; // Standard deviation for NET salaries
    
    // Generate curve points
    for (let i = -4; i <= 4; i += 0.1) {
      const x = i;
      const salary = meanNet + (i * stdDevNet);
      const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      
      // Calculate percentile using cumulative distribution function approximation
      let percentile = 50;
      if (x >= 0) {
        percentile = 50 + (34.13 * Math.min(x, 1)) + (13.59 * Math.max(0, Math.min(x - 1, 1))) + (2.14 * Math.max(0, Math.min(x - 2, 1))) + (0.13 * Math.max(0, x - 3));
      } else {
        percentile = 50 - (34.13 * Math.min(-x, 1)) - (13.59 * Math.max(0, Math.min(-x - 1, 1))) - (2.14 * Math.max(0, Math.min(-x - 2, 1))) - (0.13 * Math.max(0, -x - 3));
      }
      
      points.push({
        x: x,
        y: y * 100, // Scale for visibility
        salary: Math.max(0, salary),
        percentile: Math.max(0, Math.min(100, percentile))
      });
    }
    
    return points;
  };

  const getUserPositionOnCurve = () => {
    if (!result) return null;
    
    const meanNet = 6200; // Average NET salary
    const stdDevNet = 3200; // Standard deviation for NET salaries
    const userNetSalary = result.netSalary;
    
    // Calculate z-score based on NET salary
    const zScore = (userNetSalary - meanNet) / stdDevNet;
    const y = Math.exp(-0.5 * zScore * zScore) / Math.sqrt(2 * Math.PI);
    
    // Calculate percentile more accurately
    let percentile = 50;
    if (zScore >= 0) {
      percentile = 50 + (34.13 * Math.min(zScore, 1)) + (13.59 * Math.max(0, Math.min(zScore - 1, 1))) + (2.14 * Math.max(0, Math.min(zScore - 2, 1))) + (0.13 * Math.max(0, zScore - 3));
    } else {
      percentile = 50 - (34.13 * Math.min(-zScore, 1)) - (13.59 * Math.max(0, Math.min(-zScore - 1, 1))) - (2.14 * Math.max(0, Math.min(-zScore - 2, 1))) - (0.13 * Math.max(0, -zScore - 3));
    }
    
    // Cap percentile at realistic values
    percentile = Math.max(1, Math.min(99, percentile));
    
    return {
      x: zScore,
      y: y * 100,
      salary: userNetSalary,
      percentile: percentile
    };
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.value)}</p>
          <p className="text-xs text-gray-500">
            {((data.value / result!.grossSalary) * 100).toFixed(1)}% du brut
          </p>
        </div>
      );
    }
    return null;
  };

  const PercentileTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label} percentile</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  const NormalDistributionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">Salaire NET: {formatCurrency(data.salary)}</p>
          <p className="text-sm text-gray-600">~{data.percentile.toFixed(0)}e percentile</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Section 1: Formulaire */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-teal-100 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Calculateur CDI - Secteur Privé</h2>
        </div>

        <div className="max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salaire mensuel brut (en MAD)
            </label>
            <input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              placeholder="Ex: 10000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-center text-lg"
            />
          </div>

          <button
            onClick={calculateSalary}
            disabled={!grossSalary || parseFloat(grossSalary) <= 0}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculer mon salaire net
          </button>
        </div>
      </section>

      {/* Section 2: Résultats */}
      {result && (
        <>
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-teal-600">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Résultat du calcul</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Detailed breakdown */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-teal-800 mb-2">Salaire net</h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {formatCurrency(result.netSalary)}
                  </p>
                  <p className="text-sm text-teal-600 mt-1">par mois</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Salaire brut</span>
                    <span className="font-semibold">{formatCurrency(result.grossSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">CNSS (4,29%{result.grossSalary > 6000 ? ' - plafonné' : ''})</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.cnssDeduction)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">AMO (2,26%)</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.amoDeduction)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">IPE (0,19%{result.grossSalary > 6000 ? ' - plafonné' : ''})</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.ipeDeduction)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">IR (Impôt sur le revenu)</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.irDeduction)}</span>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <PieChart className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Répartition du salaire</h3>
                </div>
                
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={getChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => (
                          <span style={{ color: entry.color }}>{value}</span>
                        )}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Détail du calcul IR :</h4>
              <p className="text-blue-700 text-sm">
                RNI (Revenu Net Imposable) = {formatCurrency(result.grossSalary - result.cnssDeduction - result.amoDeduction - result.ipeDeduction - result.fraisProfessionnels)}
                <br />
                <span className="text-xs text-blue-600">
                  (Salaire brut - CNSS - AMO - IPE - Frais professionnels: {formatCurrency(result.fraisProfessionnels)})
                </span>
              </p>
            </div>
          </section>

          {/* Salary Statistics Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Statistiques salariales - Secteur privé Maroc 2025</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Salaire médian</h3>
                <p className="text-2xl font-bold text-blue-600">6 500 MAD</p>
                <p className="text-sm text-blue-600">brut/mois</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Salaire moyen</h3>
                <p className="text-2xl font-bold text-green-600">8 200 MAD</p>
                <p className="text-sm text-green-600">brut/mois</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">SMIG 2025</h3>
                <p className="text-2xl font-bold text-orange-600">3 500 MAD</p>
                <p className="text-sm text-orange-600">brut/mois</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Répartition par tranches (secteur privé)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Moins de 4 000 MAD</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4 000 - 6 000 MAD</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6 000 - 10 000 MAD</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10 000 - 15 000 MAD</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plus de 15 000 MAD</span>
                    <span className="font-medium">8% (92e percentile)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Comparaison avec votre salaire</h4>
                {result && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Votre salaire brut</span>
                      <span className="font-medium">{formatCurrency(result.grossSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Votre salaire net</span>
                      <span className="font-medium text-teal-600">{formatCurrency(result.netSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vs. médian</span>
                      <span className={`font-medium ${result.grossSalary > 6500 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.grossSalary > 6500 ? '+' : ''}{((result.grossSalary - 6500) / 6500 * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vs. moyen</span>
                      <span className={`font-medium ${result.grossSalary > 8200 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.grossSalary > 8200 ? '+' : ''}{((result.grossSalary - 8200) / 8200 * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                      {result.grossSalary <= 4000 && "Votre salaire se situe dans la tranche basse du marché"}
                      {result.grossSalary > 4000 && result.grossSalary <= 6000 && "Votre salaire est proche de la médiane du marché"}
                      {result.grossSalary > 6000 && result.grossSalary <= 10000 && "Votre salaire est au-dessus de la médiane"}
                      {result.grossSalary > 10000 && result.grossSalary <= 15000 && "Votre salaire est dans la tranche supérieure"}
                      {result.grossSalary > 15000 && "Votre salaire est dans le top 8% du marché (92e percentile)"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Normal Distribution Chart for NET salaries */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Distribution des salaires NET - Secteur privé Maroc</h3>
              </div>
              
              <div className="h-96 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={getNormalDistributionData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <defs>
                      <linearGradient id="distributionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    
                    <XAxis 
                      dataKey="x"
                      type="number"
                      domain={[-4, 4]}
                      tickFormatter={(value) => {
                        const salary = 6200 + (value * 3200); // NET salary scale
                        return `${(salary / 1000).toFixed(0)}k`;
                      }}
                      fontSize={12}
                      stroke="#6b7280"
                    />
                    
                    <YAxis 
                      hide
                      domain={[0, 'dataMax']}
                    />
                    
                    <Tooltip content={<NormalDistributionTooltip />} />
                    
                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#distributionGradient)"
                    />
                    
                    {/* User position line */}
                    {getUserPositionOnCurve() && (
                      <ReferenceLine 
                        x={getUserPositionOnCurve()!.x} 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
                
                {/* Percentile labels overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="relative h-full w-full">
                    {/* 68% area (±1σ) */}
                    <div className="absolute" style={{ left: '25%', top: '60%', width: '50%' }}>
                      <div className="text-center">
                        <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-semibold inline-block">
                          ~68% des salaires NET
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {formatCurrency(6200 - 3200)} - {formatCurrency(6200 + 3200)}
                        </div>
                      </div>
                    </div>
                    
                    {/* 95% area (±2σ) */}
                    <div className="absolute" style={{ left: '12.5%', top: '75%', width: '75%' }}>
                      <div className="text-center">
                        <div className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-semibold inline-block">
                          ~95% des salaires NET
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {formatCurrency(Math.max(0, 6200 - 2*3200))} - {formatCurrency(6200 + 2*3200)}
                        </div>
                      </div>
                    </div>
                    
                    {/* User position indicator */}
                    {getUserPositionOnCurve() && (
                      <div 
                        className="absolute transform -translate-x-1/2" 
                        style={{ 
                          left: `${((getUserPositionOnCurve()!.x + 4) / 8) * 100}%`, 
                          top: '20%' 
                        }}
                      >
                        <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
                          <div>Votre position</div>
                          <div>{formatCurrency(result.netSalary)} NET</div>
                          <div>~{getUserPositionOnCurve()!.percentile.toFixed(0)}e percentile</div>
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500 mx-auto"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">📊 Lecture du graphique</h4>
                  <p className="text-gray-700">
                    Cette courbe de distribution normale montre la répartition des salaires <strong>NET</strong> au Maroc. 
                    La zone centrale (68%) contient la majorité des salaires nets, tandis que votre position 
                    est indiquée par la ligne rouge verticale.
                  </p>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Votre positionnement</h4>
                  {result && getUserPositionOnCurve() && (
                    <div className="space-y-1 text-gray-700">
                      <div>Salaire NET: <strong>{formatCurrency(result.netSalary)}</strong></div>
                      <div>Percentile: <strong>~{getUserPositionOnCurve()!.percentile.toFixed(0)}e</strong></div>
                      <div className="text-xs text-gray-600 mt-2">
                        {getUserPositionOnCurve()!.percentile > 50 
                          ? `Vous gagnez plus que ${getUserPositionOnCurve()!.percentile.toFixed(0)}% des salariés`
                          : `${(100 - getUserPositionOnCurve()!.percentile).toFixed(0)}% des salariés gagnent plus que vous`
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-amber-800 text-sm">
                <strong>Sources :</strong> Données basées sur les enquêtes HCP (Haut-Commissariat au Plan) 2024-2025, 
                études sectorielles et rapports du marché de l'emploi au Maroc. Les statistiques concernent 
                principalement le secteur privé formel. La distribution est maintenant basée sur les salaires <strong>NET</strong>.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}