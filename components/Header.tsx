import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-teal-600 p-2 rounded-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Calcul Salaire Net Maroc 2025
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 text-sm md:text-base">
                Simulateur Brut en Net - Estimation précise et instantanée
              </p>
              <span className="text-lg">🇲🇦</span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}