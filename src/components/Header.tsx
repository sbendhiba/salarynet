'use client';

import Link from 'next/link';
import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Code du Travail', href: '/code-du-travail' },
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
                {/* Correct Moroccan Flag SVG */}
                <svg 
                  className="w-6 h-4 flex-shrink-0" 
                  viewBox="0 0 900 600" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Red background */}
                  <rect width="900" height="600" fill="#C1272D"/>
                  
                  {/* Green pentagram (5-pointed star) in the center */}
                  <g transform="translate(450,300)">
                    <path 
                      d="M 0,-90 L 21.27,-27.81 L 85.32,-27.81 L 34.02,13.77 L 55.29,75.96 L 0,34.38 L -55.29,75.96 L -34.02,13.77 L -85.32,-27.81 L -21.27,-27.81 Z" 
                      fill="#006233" 
                      stroke="none"
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
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
          <nav 
            id="mobile-menu"
            className="md:hidden mt-4 pt-4 border-t border-gray-200"
          >
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