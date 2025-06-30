import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryCalculator from '@/components/SalaryCalculator';
import Link from 'next/link';
import { Info, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <SalaryCalculator />

        {/* Section 3: Explication */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Comment est calculé votre salaire net ?</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Au Maroc, le passage du salaire brut au salaire net implique plusieurs déductions obligatoires. 
              La <strong>CNSS (Caisse Nationale de Sécurité Sociale)</strong> représente 4,29% de votre salaire brut 
              et couvre votre protection sociale. L'<strong>AMO (Assurance Maladie Obligatoire)</strong> de 2,26% 
              assure votre couverture médicale. Enfin, l'<strong>IR (Impôt sur le Revenu)</strong> est calculé 
              selon un barème progressif 2025 appliqué au salaire annuel avec les tranches suivantes :
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">Barème IR 2025 :</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• 0% : jusqu'à 33 333 MAD/an</li>
                <li>• 10% : de 33 334 à 50 000 MAD/an</li>
                <li>• 20% : de 50 001 à 66 667 MAD/an</li>
                <li>• 30% : de 66 668 à 83 333 MAD/an</li>
                <li>• 34% : de 83 334 à 150 000 MAD/an</li>
                <li>• 37% : au-delà de 150 000 MAD/an</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Exemple pratique :</h4>
              <p className="text-amber-700 text-sm">
                Pour un salaire brut de 10 000 MAD, le salarié en CDI paie environ 429 MAD pour la CNSS, 
                226 MAD pour l'AMO, et un IR d'environ 1 667 MAD selon les nouvelles tranches 2025, 
                soit un net d'environ 7 678 MAD.
              </p>
            </div>
          </div>
        </section>

        {/* AdSense Placeholder */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm">Espace publicitaire AdSense</p>
        </div>

        {/* Quick FAQ Preview */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Questions fréquentes</h2>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Quelle est la différence entre brut et net ?</h3>
              <p className="text-gray-700 text-sm">
                Le salaire brut est le montant total avant déductions, tandis que le salaire net est ce que vous recevez réellement après déduction des cotisations sociales.
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                href="/faq" 
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
              >
                Voir toutes les questions fréquentes
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}