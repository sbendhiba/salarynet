'use client';

import React, { useState } from 'react';
import { Calculator, ChevronDown, FileText } from 'lucide-react';

interface SalaryResult {
  grossSalary: number;
  cnssDeduction: number;
  amoDeduction: number;
  irDeduction: number;
  netSalary: number;
}

export default function SalaryCalculator() {
  const [contractType, setContractType] = useState<string>('CDI');
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [result, setResult] = useState<SalaryResult | null>(null);

  const calculateIR = (annualGross: number): number => {
    // New 2025 IR brackets
    if (annualGross <= 33333) return 0;
    
    let tax = 0;
    let remainingIncome = annualGross;
    
    // 37% for income above 150,000 MAD
    if (remainingIncome > 150000) {
      tax += (remainingIncome - 150000) * 0.37;
      remainingIncome = 150000;
    }
    
    // 34% for income between 83,334 and 150,000 MAD
    if (remainingIncome > 83334) {
      tax += (remainingIncome - 83334) * 0.34;
      remainingIncome = 83334;
    }
    
    // 30% for income between 66,668 and 83,333 MAD
    if (remainingIncome > 66668) {
      tax += (remainingIncome - 66668) * 0.30;
      remainingIncome = 66668;
    }
    
    // 20% for income between 50,001 and 66,667 MAD
    if (remainingIncome > 50001) {
      tax += (remainingIncome - 50001) * 0.20;
      remainingIncome = 50001;
    }
    
    // 10% for income between 33,334 and 50,000 MAD
    if (remainingIncome > 33334) {
      tax += (remainingIncome - 33334) * 0.10;
    }
    
    return tax / 12; // Monthly IR
  };

  const calculateSalary = () => {
    const gross = parseFloat(grossSalary);
    if (!gross || gross <= 0) return;

    const cnssDeduction = gross * 0.0429;
    const amoDeduction = gross * 0.0226;
    const annualGross = gross * 12;
    const irDeduction = calculateIR(annualGross);
    const netSalary = gross - cnssDeduction - amoDeduction - irDeduction;

    setResult({
      grossSalary: gross,
      cnssDeduction,
      amoDeduction,
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
                <span className="text-red-600">CNSS (4,29%)</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(result.cnssDeduction)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-red-600">AMO (2,26%)</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(result.amoDeduction)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-red-600">IR (Impôt sur le revenu)</span>
                <span className="text-red-600 font-semibold">-{formatCurrency(result.irDeduction)}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}