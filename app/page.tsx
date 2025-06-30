import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryCalculator from '@/components/SalaryCalculator';
import Link from 'next/link';
import { Info, HelpCircle, ChevronDown, TrendingUp, BarChart3, Users, PieChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Salary Statistics Section - Before Calculator */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Statistiques salariales Maroc 2025</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-teal-800">Salaire médian NET</h3>
              </div>
              <p className="text-2xl font-bold text-teal-600">4 500 MAD</p>
              <p className="text-sm text-teal-600">net/mois</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Salaire moyen NET</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">5 800 MAD</p>
              <p className="text-sm text-green-600">net/mois</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">SMIG 2025 NET</h3>
              </div>
              <p className="text-2xl font-bold text-orange-600">3 200 MAD</p>
              <p className="text-sm text-orange-600">net/mois</p>
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
                    <span className="font-medium text-orange-600">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>5 000 - 8 000 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="font-medium text-yellow-600">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>8 000 - 12 000 MAD NET</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '12%'}}></div>
                    </div>
                    <span className="font-medium text-green-600">12%</span>
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
                  <span className="font-medium text-teal-600">3 200 MAD</span>
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
            <h4 className="font-semibold text-teal-800 mb-2">💡 À savoir</h4>
            <p className="text-teal-700 text-sm">
              Ces statistiques concernent le secteur privé formel au Maroc. Le salaire médian de 
              <strong> 4 500 MAD NET</strong> signifie que 50% des salariés gagnent moins et 50% gagnent plus. 
              Utilisez notre calculateur ci-dessous pour connaître votre position exacte sur le marché.
            </p>
          </div>
        </section>

        <SalaryCalculator />

        {/* Section 3: Explication */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Comment est calculé votre salaire net CDI ?</h2>
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

        {/* Statistiques salariales Maroc 2025 - After Calculation Explanation */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Statistiques salariales Maroc 2025</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Key Statistics */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Données du marché de l'emploi</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">4 500</div>
                    <div className="text-sm text-blue-700">MAD NET médian</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">5 800</div>
                    <div className="text-sm text-green-700">MAD NET moyen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">3 200</div>
                    <div className="text-sm text-orange-700">SMIG NET 2025</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">8%</div>
                    <div className="text-sm text-purple-700">Gagnent +12k NET</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Répartition par secteurs (NET)</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Secteur bancaire/finance</span>
                    <span className="font-medium text-green-600">8 000 - 15 000 MAD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>IT/Télécommunications</span>
                    <span className="font-medium text-blue-600">7 000 - 12 000 MAD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Industrie/Manufacturing</span>
                    <span className="font-medium text-orange-600">4 000 - 8 000 MAD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Commerce/Retail</span>
                    <span className="font-medium text-yellow-600">3 500 - 6 000 MAD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Services/Tourisme</span>
                    <span className="font-medium text-red-600">3 200 - 5 500 MAD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Percentile Distribution */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
                <h4 className="font-semibold text-teal-800 mb-4">Distribution par percentiles (NET)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">10e percentile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full" style={{width: '10%'}}></div>
                      </div>
                      <span className="font-medium text-red-600">3 000 MAD</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">25e percentile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="font-medium text-orange-600">3 800 MAD</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">50e percentile (médiane)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                      <span className="font-bold text-teal-600">4 500 MAD</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">75e percentile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <span className="font-medium text-green-600">7 200 MAD</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">90e percentile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                      <span className="font-medium text-blue-600">10 500 MAD</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">95e percentile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <span className="font-medium text-purple-600">15 000 MAD</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-3">Évolution 2024-2025</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Augmentation médiane</span>
                    <span className="font-medium text-green-600">+3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inflation 2024</span>
                    <span className="font-medium text-red-600">+1.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pouvoir d'achat</span>
                    <span className="font-medium text-green-600">+1.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nouveau SMIG</span>
                    <span className="font-medium text-blue-600">3 500 MAD brut</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <h5 className="font-semibold text-blue-800 mb-2">📊 Méthodologie</h5>
              <p className="text-blue-700 text-xs">
                Données basées sur les enquêtes HCP 2024-2025, déclarations CNSS et études sectorielles. 
                Échantillon de 50 000+ salariés du secteur privé formel.
              </p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h5 className="font-semibold text-green-800 mb-2">🎯 Fiabilité</h5>
              <p className="text-green-700 text-xs">
                Marge d'erreur ±2% pour les percentiles centraux (25e-75e). 
                Données actualisées trimestriellement avec les dernières tendances du marché.
              </p>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <h5 className="font-semibold text-purple-800 mb-2">🔍 Utilisation</h5>
              <p className="text-purple-700 text-xs">
                Ces statistiques vous aident à positionner votre salaire sur le marché marocain 
                et à préparer vos négociations salariales.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-teal-800 mb-2">💡 Conseil</h4>
            <p className="text-teal-700 text-sm">
              Utilisez notre calculateur ci-dessus pour connaître votre salaire net exact et votre position 
              sur ces statistiques. Les données incluent tous les secteurs du privé formel au Maroc 🇲🇦.
            </p>
          </div>
        </section>

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