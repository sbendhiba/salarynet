import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { BookOpen, Calculator, TrendingDown, Percent, FileText, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Guide de calcul du salaire net - Calcul Salaire Net Maroc 2025',
  description: 'Guide détaillé pour comprendre le calcul du salaire net au Maroc selon le droit du travail marocain. Méthodes de calcul des cotisations sociales et de l\'IR.',
};

export default function Guide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guide de calcul du salaire net
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprendre le calcul du salaire net selon le droit du travail marocain
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              Ce guide vous explique en détail comment est calculé votre salaire net à partir de votre salaire brut. 
              Pour des exemples pratiques, consultez la <Link href="/faq" className="text-teal-600 hover:text-teal-700 underline">FAQ</Link> ou 
              lisez les <Link href="/code-du-travail" className="text-teal-600 hover:text-teal-700 underline">articles de loi</Link> applicables.
            </p>

            {/* Guide Sections */}
            <div className="space-y-8">
              {/* Section 1: CNSS */}
              <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comment calculer la CNSS ?
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    La <strong>Caisse Nationale de Sécurité Sociale (CNSS)</strong> est une cotisation obligatoire qui finance votre protection sociale.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-blue-900 mb-2">Formule de calcul :</p>
                    <code className="text-blue-800 text-sm">CNSS = min(Salaire brut, 6 000 MAD) × 4,29%</code>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">💡 À retenir :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Taux : <strong>4,29%</strong></li>
                        <li>• Plafonné à 6 000 MAD</li>
                        <li>• Déduction maximale : 257,40 MAD</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">📋 Exemple :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>Salaire brut : 8 000 MAD</li>
                        <li>Base de calcul : 6 000 MAD</li>
                        <li>CNSS = 6 000 × 4,29% = <strong>257,40 MAD</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: AMO */}
              <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comment calculer l'AMO ?
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    L'<strong>Assurance Maladie Obligatoire (AMO)</strong> finance votre couverture santé et celle de votre famille.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-green-900 mb-2">Formule de calcul :</p>
                    <code className="text-green-800 text-sm">AMO = Salaire brut × 2,26%</code>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">💡 À retenir :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Taux : <strong>2,26%</strong></li>
                        <li>• Pas de plafond</li>
                        <li>• S'applique sur le salaire brut total</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">📋 Exemple :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>Salaire brut : 8 000 MAD</li>
                        <li>AMO = 8 000 × 2,26%</li>
                        <li>AMO = <strong>180,80 MAD</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: IPE */}
              <section className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comment calculer l'IPE ?
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    L'<strong>Indemnité Perte d'Emploi (IPE)</strong> vous protège en cas de perte involontaire d'emploi.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-purple-900 mb-2">Formule de calcul :</p>
                    <code className="text-purple-800 text-sm">IPE = min(Salaire brut, 6 000 MAD) × 0,19%</code>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">💡 À retenir :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Taux : <strong>0,19%</strong></li>
                        <li>• Plafonné à 6 000 MAD</li>
                        <li>• Déduction maximale : 11,40 MAD</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">📋 Exemple :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>Salaire brut : 8 000 MAD</li>
                        <li>Base de calcul : 6 000 MAD</li>
                        <li>IPE = 6 000 × 0,19% = <strong>11,40 MAD</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Frais Professionnels */}
              <section className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comment calculer les frais professionnels ?
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    Les <strong>frais professionnels</strong> sont une déduction forfaitaire qui réduit votre revenu imposable.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-orange-900 mb-2">Formule de calcul :</p>
                    <code className="text-orange-800 text-sm">Frais Pro = min(Salaire brut × 20%, 2 500 MAD)</code>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">💡 À retenir :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Taux : <strong>20%</strong></li>
                        <li>• Plafonné à 2 500 MAD/mois</li>
                        <li>• Réduit le revenu imposable</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">📋 Exemple :</p>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>Salaire brut : 8 000 MAD</li>
                        <li>8 000 × 20% = 1 600 MAD</li>
                        <li>Frais Pro = <strong>1 600 MAD</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: IR */}
              <section className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comment calculer l'Impôt sur le Revenu (IR) ?
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    L'<strong>Impôt sur le Revenu (IR)</strong> est calculé selon un barème progressif sur le Revenu Net Imposable (RNI).
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-red-900 mb-2">Étape 1 : Calculer le RNI</p>
                    <code className="text-red-800 text-sm block mb-2">RNI = Salaire brut - CNSS - AMO - IPE - Frais professionnels</code>
                    <p className="font-semibold text-red-900 mt-4 mb-2">Étape 2 : Appliquer le barème progressif 2025</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-red-100">
                          <th className="border border-red-200 p-2 text-left">Tranche mensuelle</th>
                          <th className="border border-red-200 p-2 text-left">Taux</th>
                          <th className="border border-red-200 p-2 text-left">Déduction</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr>
                          <td className="border border-gray-200 p-2">0 - 3 333,33 MAD</td>
                          <td className="border border-gray-200 p-2">0%</td>
                          <td className="border border-gray-200 p-2">0 MAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">3 333,34 - 5 000 MAD</td>
                          <td className="border border-gray-200 p-2">10%</td>
                          <td className="border border-gray-200 p-2">333,33 MAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">5 000,01 - 6 666,67 MAD</td>
                          <td className="border border-gray-200 p-2">20%</td>
                          <td className="border border-gray-200 p-2">833,33 MAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">6 666,68 - 8 333,33 MAD</td>
                          <td className="border border-gray-200 p-2">30%</td>
                          <td className="border border-gray-200 p-2">1 500 MAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">8 333,34 - 15 000 MAD</td>
                          <td className="border border-gray-200 p-2">34%</td>
                          <td className="border border-gray-200 p-2">1 833,33 MAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2">Plus de 15 000 MAD</td>
                          <td className="border border-gray-200 p-2">37%</td>
                          <td className="border border-gray-200 p-2">2 283,33 MAD</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">📋 Exemple complet :</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>Salaire brut : 10 000 MAD</li>
                      <li>RNI = 10 000 - 257,40 - 226 - 11,40 - 2 000 = <strong>7 505,20 MAD</strong></li>
                      <li>IR = (7 505,20 × 30%) - 1 500 = <strong>751,56 MAD</strong></li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 6: Salaire Net Final */}
              <section className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-500 p-2 rounded-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Comment calculer le salaire net final ?
                  </h2>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <p className="text-gray-700 mb-4">
                    Le <strong>salaire net</strong> est le montant que vous recevez réellement après toutes les déductions.
                  </p>
                  <div className="bg-teal-50 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-teal-900 mb-2">Formule de calcul :</p>
                    <code className="text-teal-800 text-sm">Salaire Net = Salaire brut - CNSS - AMO - IPE - IR</code>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-3">📋 Exemple récapitulatif complet :</p>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <div className="flex justify-between border-b pb-1">
                        <span>Salaire brut</span>
                        <span className="font-semibold">10 000,00 MAD</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>- CNSS (4,29%)</span>
                        <span>257,40 MAD</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>- AMO (2,26%)</span>
                        <span>226,00 MAD</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>- IPE (0,19%)</span>
                        <span>11,40 MAD</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>- IR</span>
                        <span>751,56 MAD</span>
                      </div>
                      <div className="flex justify-between border-t-2 border-teal-500 pt-2 font-bold text-teal-700 text-base">
                        <span>Salaire Net</span>
                        <span>8 753,64 MAD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Informations importantes */}
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Informations importantes</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Base légale</h3>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Les calculs sont basés sur le Code du Travail marocain et la législation fiscale en vigueur pour 2025. 
                      Les taux et plafonds peuvent varier selon les conventions collectives sectorielles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Avertissement</h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Ce calculateur fournit une estimation basée sur les dispositions générales du droit du travail marocain. 
                      Pour une analyse précise de votre situation (déductions pour personnes à charge, régimes spéciaux, etc.), 
                      consultez votre service RH ou un expert-comptable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Cas particuliers</h3>
                    <ul className="text-purple-800 text-sm space-y-1 leading-relaxed">
                      <li>• <strong>Salariés avec personnes à charge :</strong> déduction de 360 MAD par an et par personne</li>
                      <li>• <strong>Prime d'ancienneté :</strong> exonérée d'IR mais soumise aux cotisations sociales</li>
                      <li>• <strong>Heures supplémentaires :</strong> majorées selon la loi (25%, 50% ou 100%)</li>
                      <li>• <strong>Fonctionnaires :</strong> régime de retraite spécifique (CMR au lieu de CNSS)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center bg-teal-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Calculez votre salaire net maintenant
              </h3>
              <p className="text-gray-700 mb-5">
                Utilisez notre calculateur gratuit pour obtenir une estimation précise de votre salaire net.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                <Calculator className="w-5 h-5" />
                Accéder au calculateur
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
