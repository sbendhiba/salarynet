import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Mentions légales - Calcul Salaire Net Maroc 2026',
  description: 'Mentions légales du calculateur de salaire net au Maroc 2026.',
  alternates: {
    canonical: 'https://salairenet.ma/mentions-legales/',
  },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Mentions légales</h1>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Informations générales</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Nom du site :</strong> Calcul Salaire Net Maroc 2026<br />
                  <strong>Nature :</strong> Simulateur de calcul de salaire net<br />
                  <strong>Langue :</strong> Français<br />
                  <strong>Pays :</strong> Maroc 🇲🇦
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Objet du site</h2>
              <p className="text-gray-700 leading-relaxed">
                Ce site web propose un simulateur gratuit permettant de calculer le salaire net à partir 
                du salaire brut selon la législation fiscale et sociale marocaine en vigueur en 2026. 
                L'outil prend en compte les cotisations CNSS, AMO et l'impôt sur le revenu (IR).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Responsabilité</h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-800 leading-relaxed">
                  <strong>Important :</strong> Les calculs fournis par ce simulateur sont donnés à titre 
                  <strong> indicatif uniquement</strong>. Ils se basent sur les barèmes fiscaux et sociaux 
                  standards du Maroc. Les montants réels peuvent varier selon votre situation personnelle, 
                  les conventions collectives, ou d'autres spécificités.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                Nous recommandons fortement de consulter votre service des ressources humaines ou un 
                expert-comptable pour obtenir des calculs précis et personnalisés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                Le contenu de ce site (textes, calculs, design) est protégé par les droits d'auteur. 
                L'utilisation du simulateur est libre et gratuite pour un usage personnel. 
                Toute reproduction ou utilisation commerciale nécessite une autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Données et confidentialité</h2>
              <p className="text-gray-700 leading-relaxed">
                Conformément à notre <a href="/politique-confidentialite" className="text-teal-700 hover:text-teal-800 underline">
                politique de confidentialité</a>, aucune donnée personnelle n'est collectée ou stockée. 
                Tous les calculs sont effectués localement dans votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Mise à jour des informations</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous nous efforçons de maintenir les barèmes fiscaux et sociaux à jour selon la législation 
                marocaine. Cependant, en cas de changements réglementaires, il peut y avoir un délai de 
                mise à jour. Les utilisateurs sont invités à vérifier les informations auprès des sources officielles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation de responsabilité</h2>
              <p className="text-gray-700 leading-relaxed">
                L'utilisation de ce simulateur se fait sous votre entière responsabilité. Nous ne saurions 
                être tenus responsables des décisions prises sur la base des résultats obtenus ou de tout 
                préjudice direct ou indirect résultant de l'utilisation de cet outil.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Droit applicable</h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes mentions légales sont régies par le droit marocain. Tout litige sera soumis 
                aux tribunaux compétents du Royaume du Maroc.
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
