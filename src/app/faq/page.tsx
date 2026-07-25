'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Scale, Calculator, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const faqData: FAQItem[] = [
  {
    question: "Quelle est la différence entre brut et net ?",
    answer: "Le salaire brut est le montant total avant déductions, tandis que le salaire net est ce que vous recevez réellement après déduction des cotisations sociales (CNSS, AMO) et de l'impôt sur le revenu (IR). Au Maroc, les principales déductions sont : CNSS (4,29%), AMO (2,26%) et l'IR selon un barème progressif.",
    isOpen: false
  },
  {
    question: "Le calcul est-il exact pour tous les cas ?",
    answer: "Ce simulateur fournit une estimation basée sur les taux standards et les barèmes fiscaux 2026. Les calculs réels peuvent varier selon votre situation spécifique (nombre d'enfants à charge, déductions particulières, conventions collectives, etc.). Nous recommandons de consulter votre service RH pour un calcul précis et personnalisé.",
    isOpen: false
  },
  {
    question: "Quelles sont les dernières mises à jour fiscales 2026 ?",
    answer: "Le simulateur intègre les derniers barèmes de l'impôt sur le revenu 2026 avec les nouvelles tranches : 0% jusqu'à 33 333 MAD/an, 10% de 33 334 à 50 000 MAD/an, 20% de 50 001 à 66 667 MAD/an, 30% de 66 668 à 83 333 MAD/an, 34% de 83 334 à 150 000 MAD/an, et 37% au-delà de 150 000 MAD/an. La Loi de Finances 2026 a également augmenté la réduction pour charges de famille à 600 DH par an et par personne à charge (max 3 600 DH pour 6 personnes).",
    isOpen: false
  },
  {
    question: "Comment sont calculées les cotisations CNSS et AMO ?",
    answer: "La CNSS (Caisse Nationale de Sécurité Sociale) représente 4,29% de votre salaire brut et couvre votre protection sociale (retraite, prestations familiales, accidents du travail). L'AMO (Assurance Maladie Obligatoire) représente 2,26% et assure votre couverture médicale de base.",
    isOpen: false
  },
  {
    question: "Le simulateur prend-il en compte les enfants à charge ?",
    answer: "Non, ce simulateur utilise les barèmes standards sans tenir compte des déductions pour enfants à charge ou autres situations familiales spécifiques. Pour un calcul personnalisé incluant vos déductions fiscales, consultez un professionnel ou votre service RH.",
    isOpen: false
  },
  {
    question: "Mes données sont-elles sauvegardées ?",
    answer: "Non, aucune donnée n'est collectée, stockée ou transmise. Tous les calculs sont effectués localement dans votre navigateur. Vos informations restent privées et ne quittent jamais votre appareil. Consultez notre politique de confidentialité pour plus de détails.",
    isOpen: false
  },
  {
    question: "Y a-t-il une différence entre CDI, CNE et Fonction Publique ?",
    answer: "Pour les calculs de base (CNSS, AMO, IR), les taux sont généralement identiques. Cependant, certaines spécificités peuvent s'appliquer selon le type de contrat ou le secteur. Le simulateur utilise les taux standards applicables à la majorité des salariés du secteur privé.",
    isOpen: false
  },
    {
      question: "Comment calculer mon salaire annuel net ?",
      answer: "Multipliez votre salaire mensuel net par 12 pour obtenir une estimation annuelle. N'oubliez pas d'ajouter les primes éventuelles (13ème mois, primes de performance, etc.) qui peuvent être soumises aux mêmes déductions.",
      isOpen: false
    },
    {
      question: "Le simulateur est-il à jour avec la législation 2026 ?",
      answer: "Oui, le simulateur intègre les derniers barèmes fiscaux et taux de cotisations sociales en vigueur au Maroc pour 2026. Nous mettons régulièrement à jour les calculs selon les évolutions de la législation marocaine.",
      isOpen: false
    },
    {
      question: "Puis-je utiliser ce simulateur pour négocier mon salaire ?",
      answer: "Ce simulateur peut vous donner une estimation pour préparer vos négociations, mais gardez à l'esprit qu'il s'agit d'une estimation. Pour des négociations importantes, nous recommandons de faire valider les calculs par un professionnel ou votre service RH.",
      isOpen: false
    }
];

export default function FAQ() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(faqData);

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, i) => 
      i === index ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  // JSON-LD structured data for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://salairenet.ma'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: 'https://salairenet.ma/faq/'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Questions fréquemment posées</h1>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">
              Retrouvez ici les réponses aux questions les plus courantes concernant le calcul du salaire net au Maroc. 
              Pour comprendre la méthode de calcul en détail, consultez notre{' '}
              <Link href="/guide-salaire" className="text-teal-700 font-medium hover:underline">guide de calcul du salaire net</Link>{' '}
              ou utilisez directement notre{' '}
              <Link href="/" className="text-teal-700 font-medium hover:underline">calculateur interactif</Link>.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                >
                  <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                  {item.isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {item.isOpen && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-teal-800 mb-2">💡 Besoin d&apos;aide supplémentaire ?</h3>
            <p className="text-teal-700 text-sm mb-3">
              Si vous avez d&apos;autres questions ou besoin d&apos;un calcul personnalisé, nous vous recommandons de 
              consulter votre service des ressources humaines ou un expert-comptable spécialisé en droit social marocain.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-1.5 bg-teal-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors font-medium">
                <Calculator className="w-4 h-4" />
                Utiliser le calculateur
              </Link>
              <Link href="/guide-salaire" className="inline-flex items-center gap-1.5 bg-white text-teal-700 border border-teal-300 text-sm px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors font-medium">
                <BookOpen className="w-4 h-4" />
                Lire le guide de calcul
              </Link>
              <Link href="/code-du-travail" className="inline-flex items-center gap-1.5 bg-white text-teal-700 border border-teal-300 text-sm px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors font-medium">
                <Scale className="w-4 h-4" />
                Code du Travail
              </Link>
            </div>
          </div>

          {/* Cross-site contextual links */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">🔗 Outils complémentaires</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  <a href="https://indemnitelicenciement.ma/" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
                    Calculateur d&apos;indemnités de licenciement
                  </a>
                  {' '}— Estimez vos indemnités selon le Code du Travail marocain.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  <a href="https://erh.ma/" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                    e-RH Pro
                  </a>
                  {' '}— Calculateurs CNSS, heures supplémentaires, solde de tout compte et guides RH.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
