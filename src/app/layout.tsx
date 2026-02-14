import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://salairenet.ma'),
  title: {
    default: 'Calculateur Salaire Net Maroc 2025 – Simulateur Brut en Net',
    template: '%s | Salaire Net Maroc'
  },
  description: 'Calculateur de salaire net au Maroc 2025. Simulateur gratuit pour convertir votre salaire brut en net avec les derniers barèmes fiscaux marocains (IR, CNSS, AMO).',
  keywords: ['calcul salaire net maroc', 'simulateur salaire maroc', 'brut net maroc', 'ir maroc 2025', 'cnss maroc', 'amo maroc', 'calculateur salaire', 'impot sur le revenu maroc', 'salaire marocain', 'conversion brut net'],
  authors: [{ name: 'Salaire Net Maroc' }],
  creator: 'Salaire Net Maroc',
  publisher: 'Salaire Net Maroc',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://salairenet.ma',
    title: 'Calculateur Salaire Net Maroc 2025',
    description: 'Calculateur gratuit de salaire net au Maroc. Convertissez votre salaire brut en net selon les barèmes 2025.',
    siteName: 'Salaire Net Maroc',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur Salaire Net Maroc 2025',
    description: 'Calculateur gratuit de salaire net au Maroc. Convertissez votre salaire brut en net selon les barèmes 2025.',
  },
  alternates: {
    canonical: 'https://salairenet.ma',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="canonical" href="https://salairenet.ma" />
      </head>
      <body>{children}</body>
    </html>
  )
}
