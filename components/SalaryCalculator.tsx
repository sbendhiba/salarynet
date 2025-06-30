'use client';

import React, { useState } from 'react';
import { Calculator, ChevronDown, FileText } from 'lucide-react';

interface SalaryResult {
  grossSalary: number;
  cnssDeduction: number;
  amoDeduction: number;
  ipeDeduction: number;
  fraisProfessionnels: number;
  irDeduction: number;
  netSalary: number;
}

export default function SalaryCalculator() {
  const [contractType, setContractType] = useState<string>('CDI');
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Section 1: Formulaire */}
      <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-teal-100 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Formulaire de simulation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de contrat
            </label>
            <div className="relative">
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 appearance-none bg-white"
              >
                <option value="CDI">CDI - Contrat à Durée Indéterminée</option>
                <option value="CNE">CNE - Contrat Nouvelle Embauche</option>
                <option value="Fonction Publique">Fonction Publique</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salaire mensuel brut (en MAD)
            </label>
            <input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              placeholder="Ex: 10000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            />
          </div>
        </div>

        <button
          onClick={calculateSalary}
          disabled={!grossSalary || parseFloat(grossSalary) <= 0}
          className="mt-6 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculer mon salaire net
        </button>
      </section>

      {/* AdSense Placeholder */}
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm">Espace publicitaire AdSense</p>
      </div>

      {/* Section 2: Résultats */}
      {result && (
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-teal-600">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Résultat du calcul</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Salaire net estimé</h3>
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
                <span className="text-blue-600">Frais professionnels (25%{result.fraisProfessionnels >= 2916.66 ? ' - plafonné' : ''})</span>
                <span className="text-blue-600 font-semibold">-{formatCurrency(result.fraisProfessionnels)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-red-600">IR (Impôt sur le revenu)</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(result.irDeduction)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Détail du calcul IR :</h4>
            <p className="text-blue-700 text-sm">
              RNI (Revenu Net Imposable) = {formatCurrency(result.grossSalary - result.cnssDeduction - result.amoDeduction - result.ipeDeduction - result.fraisProfessionnels)}
              <br />
              <span className="text-xs text-blue-600">
                (Salaire brut - CNSS - AMO - IPE - Frais professionnels)
              </span>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}