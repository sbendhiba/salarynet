import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://salairenet.ma'),
  title: {
    default: 'Calculateur Salaire Net Maroc 2025 – Simulateur Brut en Net',
    template: '%s | Salaire Net Maroc'
  },
  description: 'Calculateur de salaire au Maroc. Convertissez votre salaire brut en net avec calcul détaillé des cotisations CNSS, IPE et IR.. | Code de tavail 2025',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://salairenet.ma',
    title: 'Calculateur Salaire Net Maroc 2025',
    description: 'Calculateur gratuit de salaire net au Maroc. Convertissez votre salaire brut en net selon les barèmes 2025.',
    siteName: 'Salaire Net Maroc',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculateur Salaire Net Maroc 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur Salaire Net Maroc 2025',
    description: 'Calculateur gratuit de salaire net au Maroc. Convertissez votre salaire brut en net selon les barèmes 2025.',
    images: ['/twitter-image.jpg'],
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
      <body>{children}</body>
    </html>
  )
}
