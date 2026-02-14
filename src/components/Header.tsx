'use client';

import Link from 'next/link';
import { Calculator, Menu, X, ChevronDown, Home, HelpCircle, Scale, Wrench, Info, BookOpen } from 'lucide-react';
import { useState } from 'react';

type NavigationItem = {
  name: string;
  icon: any;
  href?: string;
  hasSubmenu?: boolean;
  submenu?: { name: string; href: string; external: boolean }[];
  external?: boolean;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const navigation: NavigationItem[] = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Guide', href: '/guide', icon: BookOpen },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Code du Travail', href: '/code-du-travail', icon: Scale },
    { 
      name: 'Nos Outils', 
      icon: Wrench,
      hasSubmenu: true,
      submenu: [
        { name: 'Calculateur Licenciement', href: 'https://indemnitelicenciement.ma/', external: true }
      ]
    },
    { name: 'À propos', href: '/a-propos', icon: Info },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
              <rect width="16" height="20" x="4" y="2" rx="2"></rect>
              <line x1="8" x2="16" y1="6" y2="6"></line>
              <line x1="16" x2="16" y1="14" y2="18"></line>
              <path d="M16 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M8 18h.01"></path>
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Calculateur Salaire Net
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              item.hasSubmenu ? (
                <div 
                  key={item.name}
                  className="relative group"
                >
                  <button
                    className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 flex items-center gap-1.5"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu?.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : item.external ? (
                <a
                  key={item.name}
                  href={item.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 flex items-center gap-1.5"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href || '/'}
                  className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 flex items-center gap-1.5"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </Link>
              )
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
                item.hasSubmenu ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setIsToolsOpen(!isToolsOpen)}
                      className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 py-2 flex items-center gap-1.5 w-full"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.name}
                      <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isToolsOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.submenu?.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 py-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.external ? (
                  <a
                    key={item.name}
                    href={item.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 py-2 flex items-center gap-1.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href || '/'}
                    className="text-gray-600 hover:text-teal-600 font-medium transition-colors duration-200 py-2 flex items-center gap-1.5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}