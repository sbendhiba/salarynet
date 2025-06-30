import Link from 'next/link';
import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'FAQ', href: '/faq' },
    { name: 'À propos', href: '/a-propos' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
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
                <svg 
                  className="w-6 h-4 flex-shrink-0" 
                  viewBox="0 0 900 600" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="900" height="600" fill="#C1272D"/>
                  <rect width="900" height="200" y="200" fill="#006233"/>
                  <g transform="translate(450,300)">
                    <polygon 
                      points="0,-120 -103.9,-60 -103.9,60 0,120 103.9,60 103.9,-60" 
                      fill="#006233" 
                      stroke="#C1272D" 
                      strokeWidth="8"
                    />
                    <polygon 
                      points="0,-80 -69.3,-40 -69.3,40 0,80 69.3,40 69.3,-40" 
                      fill="#C1272D"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}