import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Mail, Calculator, Shield, Users } from 'lucide-react';

export const metadata = {
  title: 'À propos - Calcul Salaire Net Maroc 2025',
  description: 'À propos du calculateur de salaire net au Maroc 2025. Outil gratuit et fiable pour convertir votre salaire brut en net.',
};

export default function APropos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">À propos</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Calculator className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Notre mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Le <strong>Calculateur de Salaire Net Maroc 2025</strong> est un outil gratuit et accessible 
                conçu pour aider les salariés marocains à comprendre et calculer facilement leur salaire net 
                à partir de leur salaire brut. Notre objectif est de démocratiser l'accès à l\'information 
                fiscale et sociale au Maroc 🇲🇦.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Pourquoi nous faire confiance ?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ Calculs précis</h3>
                  <p className="text-gray-700 text-sm">
                    Nos algorithmes intègrent les derniers barèmes fiscaux et taux de cotisations sociales 
                    officiels du Maroc pour 2025.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🔒 Confidentialité totale</h3>
                  <p className="text-gray-700 text-sm">
                    Aucune donnée n'est collectée ou stockée. Tous les calculs s'effectuent localement 
                    dans votre navigateur.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🆓 Entièrement gratuit</h3>
                  <p className="text-gray-700 text-sm">
                    Notre simulateur est et restera toujours gratuit, sans inscription ni limitation d'usage.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📱 Accessible partout</h3>
                  <p className="text-gray-700 text-sm">
                    Interface responsive optimisée pour tous les appareils : ordinateur, tablette et mobile.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Pour qui ?</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Notre calculateur s'adresse à tous les salariés du Maroc :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Salariés du secteur privé</strong> : CDI, CNE, CDD</li>
                <li><strong>Fonctionnaires</strong> : Fonction publique et collectivités territoriales</li>
                <li><strong>Candidats à l'emploi</strong> : Pour évaluer les offres d'emploi</li>
                <li><strong>Employeurs et RH</strong> : Pour des estimations rapides</li>
                <li><strong>Étudiants et chercheurs d'emploi</strong> : Pour planifier leur carrière</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Méthodologie de calcul</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nos calculs se basent sur la législation fiscale et sociale marocaine officielle :
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• <strong>CNSS</strong> : 4,29% du salaire brut (protection sociale)</li>
                  <li>• <strong>AMO</strong> : 2,26% du salaire brut (assurance maladie)</li>
                  <li>• <strong>IR</strong> : Barème progressif 2025 appliqué au salaire annuel</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Limites et recommandations</h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-800 leading-relaxed">
                  <strong>Important :</strong> Ce simulateur fournit des estimations basées sur les taux standards. 
                  Les montants réels peuvent varier selon votre situation personnelle (enfants à charge, 
                  déductions spécifiques, conventions collectives, etc.). Pour des calculs précis et personnalisés, 
                  consultez votre service RH ou un expert-comptable.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mises à jour</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous surveillons régulièrement les évolutions de la législation fiscale et sociale marocaine 
                pour maintenir nos calculs à jour. Les barèmes sont mis à jour dès l'entrée en vigueur des 
                nouvelles dispositions légales.
              </p>
            </section>

            <section className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-teal-900 mb-4">Contact et suggestions</h2>
              <p className="text-teal-800 leading-relaxed">
                Vous avez des questions, suggestions d'amélioration ou avez détecté une erreur ? 
                Nous sommes à l'écoute de vos retours pour améliorer continuellement notre outil.
              </p>
              <p className="text-teal-700 text-sm mt-3">
                <strong>Note :</strong> Nous ne fournissons pas de conseils fiscaux personnalisés. 
                Pour des questions spécifiques à votre situation, consultez un professionnel qualifié.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
