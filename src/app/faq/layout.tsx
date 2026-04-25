import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes sur le salaire net au Maroc 2026',
  description: 'Réponses aux questions les plus fréquentes sur le calcul du salaire net au Maroc : CNSS, AMO, IR, barèmes 2026 et cas particuliers.',
  alternates: {
    canonical: 'https://salairenet.ma/faq/',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
