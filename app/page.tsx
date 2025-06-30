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
              (plafonné à 6 000 MAD/mois), l'<strong>AMO (Assurance Maladie Obligatoire)</strong> de 2,26% 
              assure votre couverture médicale, et l'<strong>IPE (Indemnité Perte d'Emploi)</strong> de 0,19% 
              (également plafonné à 6 000 MAD/mois). Les <strong>frais professionnels</strong> représentent 25% 
              du salaire brut (plafonnés à 2 916,66 MAD/mois). Enfin, l'<strong>IR (Impôt sur le Revenu)</strong> 
              est calculé selon un barème progressif 2025 appliqué au revenu net imposable mensuel.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">Barème IR 2025 (mensuel) :</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• 0% : jusqu'à 3 333,33 MAD/mois</li>
                <li>• 10% : de 3 333,34 à 5 000 MAD/mois</li>
                <li>• 20% : de 5 000,01 à 6 666,67 MAD/mois</li>
                <li>• 30% : de 6 666,68 à 8 333,33 MAD/mois</li>
                <li>• 34% : de 8 333,34 à 15 000 MAD/mois</li>
                <li>• 37% : au-delà de 15 000 MAD/mois</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-4">
              <h4 className="font-semibold text-green-800 mb-2">Calcul du RNI (Revenu Net Imposable) :</h4>
              <p className="text-green-700 text-sm">
                RNI = Salaire brut - CNSS - AMO - IPE - Frais professionnels
                <br />
                L'IR est ensuite appliqué sur ce montant selon le barème progressif.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Exemple pratique :</h4>
              <p className="text-amber-700 text-sm">
                Pour un salaire brut de 10 000 MAD : CNSS 257,40 MAD (plafonné), AMO 226 MAD, 
                IPE 11,40 MAD (plafonné), frais professionnels 2 500 MAD, soit un RNI de 7 005,20 MAD. 
                L'IR calculé sur ce RNI est d'environ 611,56 MAD, donnant un salaire net d'environ 8 893,64 MAD.
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
                Le salaire brut est le montant total avant déductions, tandis que le salaire net est ce que vous recevez réellement après déduction des cotisations sociales et de l'impôt sur le revenu.
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