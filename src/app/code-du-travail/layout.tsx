import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code du Travail Marocain - Articles clés sur le salaire et les droits',
  description: 'Consultez les articles clés du Code du Travail marocain relatifs au salaire, aux cotisations sociales, aux congés et aux droits des salariés.',
  alternates: {
    canonical: 'https://salairenet.ma/code-du-travail/',
  },
};

export default function CodeDuTravailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
