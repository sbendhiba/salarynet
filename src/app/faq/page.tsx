'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function FAQ() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "Quelle est la différence entre brut et net ?",
      answer: "Le salaire brut est le montant total avant déductions, tandis que le salaire net est ce que vous recevez réellement après déduction des cotisations sociales (CNSS, AMO) et de l'impôt sur le revenu (IR). Au Maroc, les principales déductions sont : CNSS (4,29%), AMO (2,26%) et l'IR selon un barème progressif.",
      isOpen: false
    },
    {
      question: "Le calcul est-il exact pour tous les cas ?",
      answer: "Ce simulateur fournit une estimation basée sur les taux standards et les barèmes fiscaux 2025. Les calculs réels peuvent varier selon votre situation spécifique (nombre d'enfants à charge, déductions particulières, conventions collectives, etc.). Nous recommandons de consulter votre service RH pour un calcul précis et personnalisé.",
      isOpen: false
    },
    {
      question: "Quelles sont les dernières mises à jour fiscales 2025 ?",
      answer: "Le simulateur intègre les derniers barèmes de l'impôt sur le revenu 2025 avec les nouvelles tranches : 0% jusqu'à 33 333 MAD/an, 10% de 33 334 à 50 000 MAD/an, 20% de 50 001 à 66 667 MAD/an, 30% de 66 668 à 83 333 MAD/an, 34% de 83 334 à 150 000 MAD/an, et 37% au-delà de 150 000 MAD/an.",
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
      question: "Le simulateur est-il à jour avec la législation 2025 ?",
      answer: "Oui, le simulateur intègre les derniers barèmes fiscaux et taux de cotisations sociales en vigueur au Maroc pour 2025. Nous mettons régulièrement à jour les calculs selon les évolutions de la législation marocaine.",
      isOpen: false
    },
    {
      question: "Puis-je utiliser ce simulateur pour négocier mon salaire ?",
      answer: "Ce simulateur peut vous donner une estimation pour préparer vos négociations, mais gardez à l'esprit qu'il s'agit d'une estimation. Pour des négociations importantes, nous recommandons de faire valider les calculs par un professionnel ou votre service RH.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqItems(prev => prev.map((item, i) => 
      i === index ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
              Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
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
            <h3 className="font-semibold text-teal-800 mb-2">💡 Besoin d'aide supplémentaire ?</h3>
            <p className="text-teal-700 text-sm">
              Si vous avez d'autres questions ou besoin d'un calcul personnalisé, nous vous recommandons de 
              consulter votre service des ressources humaines ou un expert-comptable spécialisé en droit social marocain.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
