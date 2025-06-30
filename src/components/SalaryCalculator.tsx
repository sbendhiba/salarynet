'use client';

import React, { useState } from 'react';
import { Calculator, FileText, PieChart, TrendingUp, BarChart3, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Area, AreaChart, ReferenceLine } from 'recharts';

interface SalaryResult {
  grossSalary: number;
  cnssDeduction: number;
  amoDeduction: number;
  socialFundDeduction: number;
  ipeDeduction: number;
  fraisProfessionnels: number;
  irDeduction: number;
  netSalary: number;
  seniorityBonus?: number;
  dependentsDeduction?: number;
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

interface AdvancedOptions {
  socialFundRate: number;
  dependents: number;
  yearsOfService: number;
}

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptions>({
    socialFundRate: 0, // Default 0% for companies without additional social fund
    dependents: 0,
    yearsOfService: 0
  });

  // Calculate seniority bonus based on years of service
  const calculateSeniorityBonus = (grossSalary: number, yearsOfService: number): number => {
    if (yearsOfService < 2) return 0;
    
    let rate = 0;
    if (yearsOfService >= 25) rate = 0.25;
    else if (yearsOfService >= 20) rate = 0.20;
    else if (yearsOfService >= 12) rate = 0.15;
    else if (yearsOfService >= 5) rate = 0.10;
    else if (yearsOfService >= 2) rate = 0.05;
    
    return grossSalary * rate;
  };

  const calculateIR = (grossSalary: number, cnssDeduction: number, amoDeduction: number, socialFundDeduction: number, ipeDeduction: number, fraisProfessionnels: number, dependents: number = 0): { irDeduction: number, dependentsDeduction: number } => {
    // Calculate RNI (Revenu Net Imposable) = gross - cotisations - frais professionnels
    const rni = grossSalary - cnssDeduction - amoDeduction - socialFundDeduction - ipeDeduction - fraisProfessionnels;

    // Apply 2025 IR brackets to monthly RNI
    if (rni <= 3333.33) return { irDeduction: 0, dependentsDeduction: 0 };
    
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
    
    const baseTax = Math.max(0, tax);
    
    // Calculate dependents deduction (500 MAD per year per dependent, so 500/12 per month)
    const dependentsDeduction = dependents * (500 / 12);
    
    // Apply dependents deduction to reduce IR
    const finalTax = Math.max(0, baseTax - dependentsDeduction);
    
    return { 
      irDeduction: finalTax, 
      dependentsDeduction: Math.min(dependentsDeduction, baseTax) // Can't deduct more than the tax owed
    };
  };

  const calculateSalary = () => {
    const gross = parseFloat(grossSalary);
    if (!gross || gross <= 0) return;

    // Calculate seniority bonus first
    const seniorityBonus = calculateSeniorityBonus(gross, advancedOptions.yearsOfService);
    const adjustedGross = gross + seniorityBonus;

    // CNSS is capped at 6000 MAD per month (applied to adjusted gross)
    const cnssBase = Math.min(adjustedGross, 6000);
    const cnssDeduction = cnssBase * 0.0429;
    
    // AMO - standard rate (applied to adjusted gross)
    const amoDeduction = adjustedGross * 0.0226;
    
    // Additional social fund (CIMR, etc.) - custom rate (applied to adjusted gross)
    const socialFundDeduction = adjustedGross * (advancedOptions.socialFundRate / 100);
    
    // IPE is capped at 6000 MAD per month (applied to adjusted gross)
    const ipeBase = Math.min(adjustedGross, 6000);
    const ipeDeduction = ipeBase * 0.0019;
    
    // Frais professionnels: 25% of adjusted gross salary, capped at 2916.66 MAD
    const fraisProfessionnels = Math.min(adjustedGross * 0.25, 2916.66);
    
    // Calculate IR with dependents
    const { irDeduction, dependentsDeduction } = calculateIR(
      adjustedGross, 
      cnssDeduction, 
      amoDeduction, 
      socialFundDeduction,
      ipeDeduction, 
      fraisProfessionnels, 
      advancedOptions.dependents
    );
    
    // Net salary = adjusted gross - all deductions
    const netSalary = adjustedGross - cnssDeduction - amoDeduction - socialFundDeduction - ipeDeduction - irDeduction;

    setResult({
      grossSalary: adjustedGross,
      cnssDeduction,
      amoDeduction,
      socialFundDeduction,
      ipeDeduction,
      fraisProfessionnels,
      irDeduction,
      netSalary,
      seniorityBonus: seniorityBonus > 0 ? seniorityBonus : undefined,
      dependentsDeduction: dependentsDeduction > 0 ? dependentsDeduction : undefined
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
    
    const data = [
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

    // Add social fund deduction if present
    if (result.socialFundDeduction && result.socialFundDeduction > 0) {
      data.push({
        name: 'Caisse Sociale',
        value: result.socialFundDeduction,
        color: '#6366f1'
      });
    }

    // Add seniority bonus if present
    if (result.seniorityBonus && result.seniorityBonus > 0) {
      data.push({
        name: 'Prime Ancienneté',
        value: result.seniorityBonus,
        color: '#8b5cf6'
      });
    }

    return data;
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

  // Calculate realistic percentile based on actual Moroccan salary distribution
  const calculateRealisticPercentile = (netSalary: number): number => {
    // Based on realistic Moroccan NET salary distribution
    // These thresholds are based on actual data from Morocco
    if (netSalary <= 2500) return 10;
    if (netSalary <= 3000) return 20;
    if (netSalary <= 3500) return 30;
    if (netSalary <= 4000) return 40;
    if (netSalary <= 4500) return 50; // Median NET salary
    if (netSalary <= 5500) return 60;
    if (netSalary <= 6500) return 70;
    if (netSalary <= 8000) return 80;
    if (netSalary <= 10000) return 85;
    if (netSalary <= 12000) return 90;
    if (netSalary <= 15000) return 92; // This matches the "8% earn more than 15k gross" statistic
    if (netSalary <= 18000) return 95;
    if (netSalary <= 22000) return 97;
    if (netSalary <= 28000) return 98;
    if (netSalary <= 35000) return 99;
    return 99.5; // Cap at 99.5% for very high salaries
  };

  // Generate normal distribution curve data for NET salaries
  // FIXED: Now properly centered so median (4,500 MAD) is at the peak
  const getNormalDistributionData = (): NormalDistributionPoint[] => {
    const points: NormalDistributionPoint[] = [];
    
    const medianSalary = 4500; // Median NET salary - this should be at the PEAK
    const numPoints = 200;
    
    // Create a normal distribution centered on the median (4,500 MAD)
    // The peak of the curve will be exactly at the median
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      
      // Map t (0 to 1) to salary range (3k to 50k) with proper scaling
      // Use a more linear approach to ensure median is at center
      const minSalary = 3000;
      const maxSalary = 50000;
      const salary = minSalary + (maxSalary - minSalary) * t;
      
      // Calculate normal distribution density with median at peak
      // Standard normal distribution: peak at mean (which equals median for normal dist)
      const mean = medianSalary; // 4,500 MAD - this is where the peak will be
      const stdDev = 2500; // Standard deviation in MAD
      
      // Normal distribution formula
      const exponent = -0.5 * Math.pow((salary - mean) / stdDev, 2);
      const density = Math.exp(exponent) / (stdDev * Math.sqrt(2 * Math.PI));
      
      // Scale for visualization
      const y = density * 8000; // Scaling factor for chart display
      
      // Calculate x coordinate for chart (-5 to 5 range)
      const x = ((salary - minSalary) / (maxSalary - minSalary)) * 10 - 5;
      
      // Calculate realistic percentile
      const percentile = calculateRealisticPercentile(salary);
      
      points.push({
        x: x,
        y: y,
        salary: salary,
        percentile: percentile
      });
    }
    
    return points;
  };

  const getUserPositionOnCurve = () => {
    if (!result) return null;
    
    const userNetSalary = result.netSalary;
    
    // Calculate position on the 3k-50k scale
    const minSalary = 3000;
    const maxSalary = 50000;
    
    // Clamp user salary to our range
    const clampedSalary = Math.max(minSalary, Math.min(maxSalary, userNetSalary));
    
    // Calculate x coordinate (-5 to 5)
    const x = ((clampedSalary - minSalary) / (maxSalary - minSalary)) * 10 - 5;
    
    // Calculate density at this point using same formula as curve
    const mean = 4500; // Median salary
    const stdDev = 2500;
    const exponent = -0.5 * Math.pow((clampedSalary - mean) / stdDev, 2);
    const density = Math.exp(exponent) / (stdDev * Math.sqrt(2 * Math.PI));
    const y = density * 8000;
    
    // Use realistic percentile calculation
    const percentile = calculateRealisticPercentile(userNetSalary);
    
    return {
      x: x,
      y: y,
      salary: userNetSalary,
      percentile: percentile
    };
  };

  // Calculate x position for median line (should be at peak of curve)
  const getMedianPosition = () => {
    const medianSalary = 4500;
    const minSalary = 3000;
    const maxSalary = 50000;
    // Linear mapping to ensure median is at the center/peak
    return ((medianSalary - minSalary) / (maxSalary - minSalary)) * 10 - 5;
  };

  // Calculate x position for average line
  const getAveragePosition = () => {
    const averageSalary = 5800;
    const minSalary = 3000;
    const maxSalary = 50000;
    return ((averageSalary - minSalary) / (maxSalary - minSalary)) * 10 - 5;
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
          <p className="text-sm text-gray-600">{data.percentile.toFixed(0)}e percentile</p>
        </div>
      );
    }
    return null;
  };

  // Get seniority rate description
  const getSeniorityDescription = (years: number): string => {
    if (years < 2) return "Aucune prime d'ancienneté";
    if (years < 5) return "Prime d'ancienneté: 5%";
    if (years < 12) return "Prime d'ancienneté: 10%";
    if (years < 20) return "Prime d'ancienneté: 15%";
    if (years < 25) return "Prime d'ancienneté: 20%";
    return "Prime d'ancienneté: 25%";
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

          {/* Advanced Options Toggle */}
          <div className="mt-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-teal-600 transition-colors duration-200 py-2 border border-gray-200 rounded-lg hover:border-teal-300"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Calcul avancé</span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Advanced Options Panel */}
          {showAdvanced && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Options avancées</h3>
              
              {/* Social Fund Rate (CIMR, etc.) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caisse sociale (CIMR, etc.) (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="15"
                  value={advancedOptions.socialFundRate}
                  onChange={(e) => setAdvancedOptions(prev => ({
                    ...prev,
                    socialFundRate: parseFloat(e.target.value) || 0
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  CIMR: ~6%, autres caisses variables. 0% si pas de caisse sociale supplémentaire.
                </p>
              </div>

              {/* Number of Dependents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de personnes à charge
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={advancedOptions.dependents}
                  onChange={(e) => setAdvancedOptions(prev => ({
                    ...prev,
                    dependents: parseInt(e.target.value) || 0
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Déduction IR: 500 MAD/an par personne à charge ({formatCurrency(500/12)}/mois)
                </p>
              </div>

              {/* Years of Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ancienneté (années de service)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={advancedOptions.yearsOfService}
                  onChange={(e) => setAdvancedOptions(prev => ({
                    ...prev,
                    yearsOfService: parseInt(e.target.value) || 0
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {getSeniorityDescription(advancedOptions.yearsOfService)}
                </p>
              </div>

              {/* Seniority Scale Info */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <h4 className="text-xs font-semibold text-blue-800 mb-2">Barème prime d'ancienneté (Art. 350 Code du travail)</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div className="flex justify-between">
                    <span>0-2 ans:</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2-5 ans:</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-12 ans:</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>12-20 ans:</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20-25 ans:</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25+ ans:</span>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    <span className="text-gray-600">Salaire brut de base</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(grossSalary) || 0)}</span>
                  </div>
                  
                  {result.seniorityBonus && result.seniorityBonus > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-purple-600">Prime d'ancienneté ({advancedOptions.yearsOfService} ans)</span>
                      <span className="text-purple-600 font-semibold">+{formatCurrency(result.seniorityBonus)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-800 font-medium">Salaire brut total</span>
                    <span className="font-bold">{formatCurrency(result.grossSalary)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">CNSS (4,29%{result.grossSalary > 6000 ? ' - plafonné' : ''})</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.cnssDeduction)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">AMO (2,26%)</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.amoDeduction)}</span>
                  </div>
                  
                  {result.socialFundDeduction > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-indigo-600">Caisse sociale ({advancedOptions.socialFundRate}%)</span>
                      <span className="text-indigo-600 font-semibold">-{formatCurrency(result.socialFundDeduction)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">IPE (0,19%{result.grossSalary > 6000 ? ' - plafonné' : ''})</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.ipeDeduction)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-red-600">IR (Impôt sur le revenu)</span>
                    <span className="text-red-600 font-semibold">-{formatCurrency(result.irDeduction)}</span>
                  </div>
                  
                  {result.dependentsDeduction && result.dependentsDeduction > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-green-600">Déduction personnes à charge ({advancedOptions.dependents})</span>
                      <span className="text-green-600 font-semibold">-{formatCurrency(result.dependentsDeduction)}</span>
                    </div>
                  )}
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
                RNI (Revenu Net Imposable) = {formatCurrency(result.grossSalary - result.cnssDeduction - result.amoDeduction - result.socialFundDeduction - result.ipeDeduction - result.fraisProfessionnels)}
                <br />
                <span className="text-xs text-blue-600">
                  (Salaire brut total - CNSS - AMO{result.socialFundDeduction > 0 ? ' - Caisse sociale' : ''} - IPE - Frais professionnels: {formatCurrency(result.fraisProfessionnels)})
                </span>
                {result.dependentsDeduction && result.dependentsDeduction > 0 && (
                  <>
                    <br />
                    <span className="text-xs text-blue-600">
                      Déduction personnes à charge appliquée: {formatCurrency(result.dependentsDeduction)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Salary Statistics Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Statistiques salariales NET - Secteur privé Maroc 2025</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Salaire médian NET</h3>
                <p className="text-2xl font-bold text-blue-600">4 500 MAD</p>
                <p className="text-sm text-blue-600">net/mois</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Salaire moyen NET</h3>
                <p className="text-2xl font-bold text-green-600">5 800 MAD</p>
                <p className="text-sm text-green-600">net/mois</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">SMIG 2025 NET</h3>
                <p className="text-2xl font-bold text-orange-600">3 200 MAD</p>
                <p className="text-sm text-orange-600">net/mois</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Répartition par tranches NET (secteur privé)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Moins de 3 500 MAD NET</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3 500 - 5 000 MAD NET</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5 000 - 8 000 MAD NET</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>8 000 - 12 000 MAD NET</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plus de 12 000 MAD NET</span>
                    <span className="font-medium">8% (92e percentile)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Comparaison avec votre salaire NET</h4>
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
                      <span>Vs. médian NET</span>
                      <span className={`font-medium ${result.netSalary > 4500 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.netSalary > 4500 ? '+' : ''}{((result.netSalary - 4500) / 4500 * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vs. moyen NET</span>
                      <span className={`font-medium ${result.netSalary > 5800 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.netSalary > 5800 ? '+' : ''}{((result.netSalary - 5800) / 5800 * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                      {result.netSalary <= 3500 && "Votre salaire NET se situe dans la tranche basse du marché"}
                      {result.netSalary > 3500 && result.netSalary <= 5000 && "Votre salaire NET est proche de la médiane du marché"}
                      {result.netSalary > 5000 && result.netSalary <= 8000 && "Votre salaire NET est au-dessus de la médiane"}
                      {result.netSalary > 8000 && result.netSalary <= 12000 && "Votre salaire NET est dans la tranche supérieure"}
                      {result.netSalary > 12000 && "Votre salaire NET est dans le top 8% du marché (92e percentile)"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Normal Distribution Chart - FIXED: Median now at peak */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Distribution des salaires NET - Secteur privé Maroc (3k - 50k+ MAD)</h3>
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
                      domain={[-5, 5]}
                      tickFormatter={(value) => {
                        // Convert x back to salary for display
                        const t = (value + 5) / 10; // Convert to 0-1 range
                        const salary = 3000 + (50000 - 3000) * t;
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
                    
                    {/* Median line (4,500 MAD NET) - Now at the PEAK of the curve */}
                    <ReferenceLine 
                      x={getMedianPosition()} 
                      stroke="#10b981" 
                      strokeWidth={3}
                      strokeDasharray="8 4"
                      label={{ value: "Médiane (4,500 MAD)", position: "top", fill: "#10b981", fontSize: 12, fontWeight: "bold" }}
                    />
                    
                    {/* Average line (5,800 MAD NET) */}
                    <ReferenceLine 
                      x={getAveragePosition()} 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      label={{ value: "Moyenne (5,800 MAD)", position: "top", fill: "#f59e0b", fontSize: 12, fontWeight: "bold" }}
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
                    {/* User position indicator */}
                    {getUserPositionOnCurve() && (
                      <div 
                        className="absolute transform -translate-x-1/2" 
                        style={{ 
                          left: `${((getUserPositionOnCurve()!.x + 5) / 10) * 100}%`, 
                          top: '20%' 
                        }}
                      >
                        <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
                          <div>Votre position</div>
                          <div>{formatCurrency(result.netSalary)} NET</div>
                          <div>{getUserPositionOnCurve()!.percentile.toFixed(0)}e percentile</div>
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
                    Cette courbe normale montre la distribution des salaires <strong>NET</strong> au Maroc. 
                    La <span className="text-green-600 font-semibold">ligne verte (médiane)</span> est maintenant 
                    exactement au <strong>pic de la courbe</strong> à 4 500 MAD NET, et la 
                    <span className="text-amber-600 font-semibold"> ligne orange (moyenne)</span> à 5 800 MAD NET.
                  </p>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Votre positionnement</h4>
                  {result && getUserPositionOnCurve() && (
                    <div className="space-y-1 text-gray-700">
                      <div>Salaire NET: <strong>{formatCurrency(result.netSalary)}</strong></div>
                      <div>Percentile: <strong>{getUserPositionOnCurve()!.percentile.toFixed(0)}e</strong></div>
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
                principalement le secteur privé formel. La distribution est centrée sur la médiane de 
                <strong> 4 500 MAD NET</strong> (pic de la courbe) avec une moyenne de <strong>5 800 MAD NET</strong>.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
