'use client';

import { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Scale, BookOpen, FileText, AlertCircle, Clock, DollarSign, Users, Shield, Search, X } from 'lucide-react';

interface Article {
  number: string;
  title: string;
  content: string;
  reference: string;
  note?: string;
}

interface LawCategory {
  category: string;
  icon: any;
  color: string;
  articles: Article[];
}

export default function CodeDuTravail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const lawArticles: LawCategory[] = [
    {
      category: "Salaire et Rémunération",
      icon: DollarSign,
      color: "teal",
      articles: [
        {
          number: "Article 345",
          title: "Définition du salaire",
          content: "Le salaire est constitué du salaire de base et des accessoires du salaire. Le salaire de base est la contrepartie du travail, compte non tenu des primes, indemnités, gratifications et avantages en nature. Les accessoires du salaire sont constitués notamment des primes liées à la productivité, à l'assiduité, aux résultats individuels ou collectifs, à la technicité, à la pénibilité ou aux risques du travail effectué, des gratifications, des pourboires, des avantages en nature et de toute autre prime ayant le caractère de salaire.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 346",
          title: "Salaire minimum légal (SMIG)",
          content: "Il est institué un salaire minimum légal applicable aux activités agricoles et non agricoles. Le salaire minimum légal est fixé par voie réglementaire sur proposition de la commission nationale chargée de l'étude des questions relatives au salaire minimum, après consultation des organisations professionnelles des employeurs et des organisations syndicales des salariés les plus représentatives ou, à défaut, après avis de la chambre professionnelle concernée.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003",
          note: "SMIG 2026: 3 422,72 MAD/mois (secteur non agricole), 2 539 MAD/mois (secteur agricole) — Décret n° 2-25-983 du 29 décembre 2025"
        },
        {
          number: "Article 347",
          title: "Modalités de paiement du salaire",
          content: "Le salaire doit être payé en monnaie ayant cours légal. Toutefois, tout ou partie du salaire peut être payé en nature dans les professions ou pour les catégories de salariés déterminés par l'autorité gouvernementale chargée du travail. Le paiement du salaire en nature ne peut excéder 30% du salaire global du salarié.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 348",
          title: "Périodicité du paiement",
          content: "Le salaire doit être payé au moins une fois par mois pour les employés et au moins deux fois par mois, à seize jours au plus d'intervalle, pour les ouvriers. Le paiement du salaire doit avoir lieu un jour ouvrable. Lorsque le jour de paie coïncide avec un jour férié ou de repos hebdomadaire, le paiement a lieu la veille.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        }
      ]
    },
    {
      category: "Prime d'Ancienneté",
      icon: Clock,
      color: "purple",
      articles: [
        {
          number: "Article 350",
          title: "Prime d'ancienneté obligatoire",
          content: "Tout salarié doit bénéficier d'une prime d'ancienneté dont le montant est fixé à :\n• 5% du salaire après deux années de service accompli\n• 10% du salaire après cinq années de service accompli\n• 15% du salaire après douze années de service accompli\n• 20% du salaire après vingt années de service accompli\n• 25% du salaire après vingt-cinq années de service accompli\n\nCette prime est calculée sur la base du salaire perçu par le salarié au moment de l'attribution de la prime.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003",
          note: "La prime d'ancienneté est un droit acquis et fait partie intégrante du salaire"
        }
      ]
    },
    {
      category: "Congés et Repos",
      icon: Users,
      color: "green",
      articles: [
        {
          number: "Article 231",
          title: "Droit au congé annuel payé",
          content: "Sauf dispositions plus favorables du contrat de travail, de la convention collective de travail ou du règlement intérieur, tout salarié a droit, après six mois de service continu dans la même entreprise ou chez le même employeur, à un congé annuel payé dont la durée est fixée comme suit :\n• Un jour et demi de travail effectif par mois de service pour les salariés âgés de moins de dix-huit ans\n• Un jour de travail effectif par mois de service pour les autres salariés",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 235",
          title: "Indemnité de congé",
          content: "Le salarié a droit, à l'occasion de son congé annuel, à une indemnité équivalente au salaire qu'il aurait perçu s'il était resté à son poste de travail. Cette indemnité doit être versée avant le départ en congé du salarié.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        }
      ]
    },
    {
      category: "Indemnités de Licenciement",
      icon: Shield,
      color: "red",
      articles: [
        {
          number: "Article 52",
          title: "Indemnité de licenciement",
          content: "Le salarié licencié qui justifie d'au moins une année de service continu dans la même entreprise a droit à une indemnité de licenciement dont le montant est fixé comme suit :\n• 96 heures de salaire pour les cinq premières années d'ancienneté\n• 144 heures de salaire pour la période d'ancienneté allant de 6 à 10 ans\n• 192 heures de salaire pour la période d'ancienneté allant de 11 à 15 ans\n• 240 heures de salaire pour la période d'ancienneté dépassant 15 ans",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003",
          note: "Cette indemnité est calculée sur la base du salaire moyen des 52 dernières semaines"
        },
        {
          number: "Article 53",
          title: "Préavis de licenciement",
          content: "Sauf en cas de faute grave, la rupture du contrat de travail à durée indéterminée nécessite un préavis dont la durée est fixée comme suit :\n• 8 jours pour les salariés payés à l'heure ou à la journée et ayant moins d'un an d'ancienneté\n• 1 mois pour les salariés ayant entre un et cinq ans d'ancienneté\n• 2 mois pour les salariés ayant plus de cinq ans d'ancienneté",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 54",
          title: "Indemnité compensatrice de préavis",
          content: "En cas d'inobservation du délai de préavis par l'employeur, celui-ci doit verser au salarié une indemnité compensatrice égale au salaire et aux avantages dont il aurait bénéficié durant la période de préavis qui n'a pas été respectée.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        }
      ]
    },
    {
      category: "Heures Supplémentaires",
      icon: Clock,
      color: "orange",
      articles: [
        {
          number: "Article 196",
          title: "Majoration des heures supplémentaires",
          content: "Les heures supplémentaires effectuées au-delà de la durée normale de travail sont payées avec les majorations suivantes :\n• 25% pour les heures supplémentaires effectuées entre 6h et 21h\n• 50% pour les heures supplémentaires effectuées entre 21h et 6h\n• 50% pour les heures supplémentaires effectuées le jour du repos hebdomadaire du salarié, même si elles sont accomplies entre 6h et 21h",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 197",
          title: "Contingent annuel d'heures supplémentaires",
          content: "Le contingent annuel d'heures supplémentaires ne peut dépasser 120 heures par salarié et par an, sauf dérogation accordée par l'inspecteur du travail dans des cas exceptionnels.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        }
      ]
    },
    {
      category: "Protection du Salaire",
      icon: Shield,
      color: "blue",
      articles: [
        {
          number: "Article 351",
          title: "Insaisissabilité partielle du salaire",
          content: "Le salaire est insaisissable dans les proportions et conditions fixées par la législation en vigueur. Toutefois, le salaire peut être saisi ou cédé pour le paiement de dettes alimentaires dans les conditions prévues par le code de procédure civile.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 352",
          title: "Privilège du salaire",
          content: "Les salaires dus aux salariés sont privilégiés sur tous les biens mobiliers et immobiliers du débiteur. Ce privilège s'étend aux indemnités dues en cas de rupture du contrat de travail.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        },
        {
          number: "Article 353",
          title: "Prescription des créances salariales",
          content: "Toute action concernant le paiement des salaires se prescrit par deux ans à compter du jour où les salaires sont devenus exigibles. Toutefois, cette prescription est interrompue par toute réclamation écrite du salarié.",
          reference: "Dahir n° 1-03-194 du 11 septembre 2003"
        }
      ]
    }
  ];

  // Get all categories for filter dropdown
  const categories = ['all', ...lawArticles.map(cat => cat.category)];

  // Filter articles based on search term and selected category
  const filteredArticles = useMemo(() => {
    let filtered = lawArticles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(cat => cat.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.map(category => ({
        ...category,
        articles: category.articles.filter(article =>
          article.number.toLowerCase().includes(searchLower) ||
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower) ||
          (article.note && article.note.toLowerCase().includes(searchLower))
        )
      })).filter(category => category.articles.length > 0);
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Count total articles found
  const totalArticlesFound = filteredArticles.reduce((total, cat) => total + cat.articles.length, 0);
  const totalArticles = lawArticles.reduce((total, cat) => total + cat.articles.length, 0);

  const getIconColor = (color: string) => {
    const colors = {
      teal: "text-teal-600 bg-teal-100",
      purple: "text-purple-600 bg-purple-100",
      green: "text-green-600 bg-green-100",
      red: "text-red-600 bg-red-100",
      orange: "text-orange-600 bg-orange-100",
      blue: "text-blue-600 bg-blue-100"
    };
    return colors[color as keyof typeof colors] || "text-gray-600 bg-gray-100";
  };

  const getBorderColor = (color: string) => {
    const colors = {
      teal: "border-teal-400",
      purple: "border-purple-400",
      green: "border-green-400",
      red: "border-red-400",
      orange: "border-orange-400",
      blue: "border-blue-400"
    };
    return colors[color as keyof typeof colors] || "border-gray-400";
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Code du Travail Marocain</h1>
              <p className="text-gray-600 mt-1">Articles relatifs aux salaires et rémunérations</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Code du Travail - Dahir n° 1-03-194</h2>
                <p className="text-blue-800 leading-relaxed">
                  Cette page présente les articles essentiels du Code du travail marocain (Dahir n° 1-03-194 du 11 septembre 2003) 
                  concernant les salaires, primes, indemnités et droits des salariés. Ces textes constituent la base légale 
                  de la réglementation du travail au Maroc 🇲🇦.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Rechercher dans les articles</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <input
                  type="text"
                  placeholder="Rechercher par numéro d'article, titre ou contenu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="all">Toutes les catégories</option>
                  {lawArticles.map((category) => (
                    <option key={category.category} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Results Summary */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {searchTerm || selectedCategory !== 'all' ? (
                  <span>
                    <strong>{totalArticlesFound}</strong> article{totalArticlesFound !== 1 ? 's' : ''} trouvé{totalArticlesFound !== 1 ? 's' : ''} 
                    sur <strong>{totalArticles}</strong> au total
                  </span>
                ) : (
                  <span><strong>{totalArticles}</strong> articles disponibles</span>
                )}
              </div>
              
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Effacer les filtres
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-teal-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-teal-600">{totalArticles}+</div>
              <div className="text-sm text-teal-700">Articles sur les salaires</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">2003</div>
              <div className="text-sm text-purple-700">Année de promulgation</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">2026</div>
              <div className="text-sm text-green-700">Dernière mise à jour</div>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredArticles.length === 0 && (searchTerm || selectedCategory !== 'all') && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 mb-4">
              Aucun article ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              Effacer les filtres
            </button>
          </div>
        )}

        {/* Law Articles Sections */}
        <div className="space-y-8">
          {filteredArticles.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <section key={categoryIndex} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg ${getIconColor(category.color)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.articles.length} article{category.articles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {category.articles.map((article, articleIndex) => (
                    <article key={articleIndex} className={`border-l-4 ${getBorderColor(category.color)} bg-gray-50 p-6 rounded-r-lg`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getIconColor(category.color)}`}>
                            {article.number}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                          
                          <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                              {article.content}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="w-4 h-4" />
                              <span className="font-medium">Référence:</span>
                              <span>{article.reference}</span>
                            </div>
                            
                            {article.note && (
                              <div className="flex items-start gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-amber-700 font-medium">{article.note}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Informations importantes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Application des textes</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Ces articles s'appliquent à tous les salariés du secteur privé au Maroc. 
                Les conventions collectives peuvent prévoir des dispositions plus favorables 
                mais jamais moins favorables que le Code du travail.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h3 className="font-semibold text-green-800 mb-2">⚖️ Recours juridiques</h3>
              <p className="text-green-700 text-sm leading-relaxed">
                En cas de non-respect de ces dispositions, les salariés peuvent saisir 
                l'inspection du travail ou les tribunaux compétents pour faire valoir leurs droits.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🔄 Mises à jour</h3>
              <p className="text-purple-700 text-sm leading-relaxed">
                Le Code du travail peut être modifié par de nouvelles lois. 
                Consultez régulièrement les textes officiels ou un juriste spécialisé 
                pour les dernières évolutions.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Conseil juridique</h3>
              <p className="text-red-700 text-sm leading-relaxed">
                Cette page est fournie à titre informatif. Pour des conseils juridiques 
                personnalisés, consultez un avocat spécialisé en droit du travail ou 
                contactez l'inspection du travail.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 md:p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Liens utiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="https://www.emploi.gov.ma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="bg-teal-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Ministère de l'Emploi</div>
                <div className="text-sm text-gray-600">Site officiel</div>
              </div>
            </a>

            <a 
              href="https://www.cnss.ma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="bg-blue-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">CNSS</div>
                <div className="text-sm text-gray-600">Sécurité sociale</div>
              </div>
            </a>

            <a 
              href="/" 
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="bg-purple-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Calculateur Salaire</div>
                <div className="text-sm text-gray-600">Retour à l'accueil</div>
              </div>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mt-8">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Avertissement légal :</strong> Les informations présentées sur cette page sont extraites du Code du travail marocain 
            et sont fournies à titre informatif uniquement. Elles ne constituent pas un conseil juridique. 
            Pour toute question spécifique ou situation particulière, consultez un professionnel du droit ou 
            les services compétents du Ministère de l'Emploi et de la Formation professionnelle du Royaume du Maroc. 
            Dernière mise à jour : Janvier 2026.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}