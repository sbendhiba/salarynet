import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Politique de confidentialité - Calcul Salaire Net Maroc 2026',
  description: 'Politique de confidentialité du calculateur de salaire net au Maroc. Aucune donnée personnelle n\'est stockée.',
  alternates: {
    canonical: 'https://salairenet.ma/politique-confidentialite/',
    languages: {
      'fr-MA': 'https://salairenet.ma/politique-confidentialite/',
      'x-default': 'https://salairenet.ma/politique-confidentialite/',
    },
  },
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Politique de confidentialité</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h2 className="text-lg font-semibold text-green-800 mb-2">🔒 Protection de vos données</h2>
              <p className="text-green-700">
                <strong>Aucune donnée personnelle n'est collectée, stockée ou transmise</strong> par notre calculateur de salaire. 
                Tous les calculs sont effectués localement dans votre navigateur.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Collecte des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre simulateur de salaire fonctionne entièrement côté client. Les informations que vous saisissez 
                (montant du salaire brut, type de contrat) ne sont <strong>jamais envoyées vers nos serveurs</strong> 
                et restent uniquement dans votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Utilisation des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Les données saisies sont utilisées exclusivement pour effectuer les calculs de conversion 
                salaire brut vers net selon la législation marocaine. Aucun historique n'est conservé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies et technologies similaires</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre site peut utiliser des cookies techniques nécessaires au bon fonctionnement du calculateur. 
                Aucun cookie de suivi ou de profilage n'est utilisé sans votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Publicités</h2>
              <p className="text-gray-700 leading-relaxed">
                Les espaces publicitaires présents sur le site peuvent être gérés par des partenaires tiers 
                (comme Google AdSense) qui ont leurs propres politiques de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Sécurité</h2>
              <p className="text-gray-700 leading-relaxed">
                Étant donné qu'aucune donnée n'est transmise ou stockée, les risques de sécurité sont minimisés. 
                Tous les calculs s'effectuent de manière sécurisée dans votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Vos droits</h2>
              <p className="text-gray-700 leading-relaxed">
                Puisque nous ne collectons aucune donnée personnelle, il n'y a pas de données à consulter, 
                modifier ou supprimer. Vous gardez un contrôle total sur les informations que vous saisissez.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter 
                via la page <a href="/a-propos" className="text-teal-700 hover:text-teal-800 underline">À propos</a>.
              </p>
            </section>

            <div className="bg-gray-50 p-4 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                <strong>Dernière mise à jour :</strong> Janvier 2026
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
