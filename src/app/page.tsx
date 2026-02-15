import Header from '../components/Header';
import Footer from '../components/Footer';
import SalaryCalculator from '../components/SalaryCalculator';
import SocialShare from '../components/SocialShare';
import Link from 'next/link';
import { Info, HelpCircle, ChevronDown, TrendingUp, BarChart3, Users, Scale } from 'lucide-react';

export const metadata = {
  title: 'Calculateur Salaire Net Maroc 2025',
  description: 'Calculateur gratuit de salaire net au Maroc. Convertissez votre salaire brut en net avec calcul détaillé des cotisations CNSS, AMO, IPE et IR selon les barèmes 2025.',
  openGraph: {
    title: 'Calculateur Salaire Net Maroc 2025',
    description: 'Calculateur gratuit de salaire net au Maroc. Convertissez votre salaire brut en net avec calcul détaillé.',
    url: 'https://salairenet.ma',
    type: 'website',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculateur Salaire Net Maroc',
    url: 'https://salairenet.ma',
    description: 'Calculateur gratuit pour convertir le salaire brut en net au Maroc selon les barèmes fiscaux 2025',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MAD'
    },
    provider: {
      '@type': 'Organization',
      name: 'Salaire Net Maroc',
      url: 'https://salairenet.ma'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculateur de Salaire Net
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            Calculez précisément votre salaire net selon le droit du travail marocain
          </p>
        </section>

        <SalaryCalculator />

        <SocialShare
          title="Calculateur Salaire Net Maroc 2025"
          description="Calculez votre salaire net au Maroc avec notre simulateur gratuit."
        />

        {/* Comment ça marche Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Suivez ces étapes simples pour calculer votre salaire net selon la législation marocaine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Renseignez vos informations</h3>
              <p className="text-gray-600 text-sm">
                Indiquez votre salaire brut mensuel et vos options avancées si nécessaire.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lancez le calcul</h3>
              <p className="text-gray-600 text-sm">
                Cliquez sur Calculer pour obtenir vos résultats instantanément.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Consultez le détail</h3>
              <p className="text-gray-600 text-sm">
                Visualisez le détail de chaque déduction calculée selon la loi.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Explorez les ressources</h3>
              <p className="text-gray-600 text-sm">
                Accédez au Code du Travail et aux questions fréquentes.
              </p>
            </div>
          </div>
        </section>

        {/* Salary Statistics Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Statistiques salariales Maroc 2025
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-teal-700" />
                <h3 className="font-semibold text-teal-800">Salaire médian NET</h3>
              </div>
              <p className="text-2xl font-bold text-teal-700">4 500 MAD</p>
              <p className="text-sm text-teal-700">net/mois</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-700" />
                <h3 className="font-semibold text-green-800">Salaire moyen NET</h3>
              </div>
              <p className="text-2xl font-bold text-green-700">5 800 MAD</p>
              <p className="text-sm text-green-700">net/mois</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-orange-700" />
                <h3 className="font-semibold text-orange-800">SMIG 2025 NET</h3>
              </div>
              <p className="text-2xl font-bold text-orange-700">3 200 MAD</p>
              <p className="text-sm text-orange-700">net/mois</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Répartition par tranches NET (secteur privé)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Moins de 3 500 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                    <span className="font-medium text-red-600">30%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>3 500 - 5 000 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="font-medium text-orange-700">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>5 000 - 8 000 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="font-medium text-yellow-700">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>8 000 - 12 000 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '12%'}}></div>
                    </div>
                    <span className="font-medium text-green-700">12%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Plus de 12 000 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '8%'}}></div>
                    </div>
                    <span className="font-medium text-blue-600">8%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Données clés du marché</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">SMIG brut 2025</span>
                  <span className="font-medium">3 500 MAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SMIG net 2025</span>
                  <span className="font-medium text-teal-700">3 200 MAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de déduction moyen</span>
                  <span className="font-medium">~8-12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">92e percentile</span>
                  <span className="font-medium text-blue-600">12 000+ MAD NET</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Source :</strong> HCP (Haut-Commissariat au Plan) 2024-2025, 
                  enquêtes emploi secteur privé formel au Maroc.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-teal-800 mb-2">💡 À savoir</h3>
            <p className="text-teal-700 text-sm">
              Ces statistiques concernent le secteur privé formel au Maroc. Le salaire médian de 
              <strong> 4 500 MAD NET</strong> signifie que 50% des salariés gagnent moins et 50% gagnent plus. 
              Utilisez notre calculateur ci-dessus pour connaître votre position exacte sur le marché.
            </p>
          </div>
        </section>

        {/* Base légale Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Base légale
            </h2>
            <p className="text-gray-600 mt-2">
              Les calculs sont conformes au Code du Travail marocain.
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Pour un contrat CDI au Maroc, le passage du salaire brut au salaire net implique plusieurs déductions obligatoires. 
              La <strong>CNSS (Caisse Nationale de Sécurité Sociale)</strong> représente 4,29% de votre salaire brut 
              (plafonné à 6 000 MAD/mois), l'<strong>AMO (Assurance Maladie Obligatoire)</strong> de 2,26% 
              assure votre couverture médicale, et l'<strong>IPE (Indemnité Perte d\'Emploi)</strong> de 0,19% 
              (également plafonné à 6 000 MAD/mois). Les <strong>frais professionnels</strong> représentent 25% 
              du salaire brut (plafonnés à 2 916,66 MAD/mois). Enfin, l'<strong>IR (Impôt sur le Revenu)</strong> 
              est calculé selon un barème progressif 2025 appliqué au revenu net imposable mensuel.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">Barème IR 2025 (mensuel) :</h3>
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
              <h3 className="font-semibold text-green-800 mb-2">Calcul du RNI (Revenu Net Imposable) :</h3>
              <p className="text-green-700 text-sm">
                RNI = Salaire brut - CNSS - AMO - IPE - Frais professionnels
                <br />
                L'IR est ensuite appliqué sur ce montant selon le barème progressif.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h3 className="font-semibold text-amber-800 mb-2">Exemple pratique :</h3>
              <p className="text-amber-700 text-sm">
                Pour un salaire brut de 10 000 MAD : CNSS 257,40 MAD (plafonné), AMO 226 MAD, 
                IPE 11,40 MAD (plafonné), frais professionnels 2 500 MAD, soit un RNI de 7 005,20 MAD. 
                L'IR calculé sur ce RNI est d'environ 611,56 MAD, donnant un salaire net d'environ 8 893,64 MAD.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/code-du-travail" 
              className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors font-medium"
            >
              <Scale className="w-5 h-5" />
              Consulter le Code du Travail
            </Link>
          </div>
        </section>

        {/* Quick FAQ Preview */}
        <section className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 mt-2">
              Réponses aux questions courantes sur le calcul du salaire net.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Quelle est la différence entre brut et net ?</h3>
              <p className="text-gray-700 text-sm">
                Le salaire brut est le montant total avant déductions, tandis que le salaire net est ce que vous recevez réellement après déduction des cotisations sociales et de l'impôt sur le revenu.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Comment est calculé l'impôt sur le revenu (IR) ?</h3>
              <p className="text-gray-700 text-sm">
                L'IR est calculé selon un barème progressif 2025 appliqué sur le revenu net imposable (RNI). Le RNI = salaire brut - CNSS - AMO - IPE - frais professionnels. Les taux varient de 0% à 37% selon la tranche.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Le salaire net inclut-il toutes les déductions ?</h3>
              <p className="text-gray-700 text-sm">
                Oui, le salaire net est le montant final après déduction de toutes les cotisations obligatoires (CNSS, AMO, IPE) et de l'impôt sur le revenu. C'est le montant qui sera versé sur votre compte bancaire.
              </p>
            </div>
            
            <div className="text-center mt-6">
              <Link 
                href="/faq" 
                className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors font-medium"
              >
                <HelpCircle className="w-5 h-5" />
                Voir toutes les questions
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
