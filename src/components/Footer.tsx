import Link from 'next/link';
import { Shield, FileText, HelpCircle, Mail, Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Link 
            href="/politique-confidentialite" 
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Politique de confidentialité
          </Link>
          <Link 
            href="/mentions-legales" 
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Mentions légales
          </Link>
          <Link 
            href="/faq" 
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </Link>
          <Link 
            href="/code-du-travail" 
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <Scale className="w-4 h-4" />
            Code du Travail
          </Link>
          <Link 
            href="/a-propos" 
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            À propos
          </Link>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">
            © 2026 Calculateur Salaire Maroc. Tous droits réservés.
          </p>
          <p className="text-gray-400 text-xs mb-2">
            Les calculs sont fournis à titre indicatif. Consultez un professionnel pour des calculs précis.
          </p>
          <p className="text-gray-400 text-xs mt-3">
            Voir aussi : <a href="https://indemnitelicenciement.ma/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline">Calculateur d'Indemnités de Licenciement</a>
          </p>
        </div>
      </div>
    </footer>
  );
}