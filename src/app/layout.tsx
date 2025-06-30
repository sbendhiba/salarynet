import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calcul Salaire Net Maroc 2025 – Simulateur Brut en Net',
  description: 'Calculateur de salaire net au Maroc 2025. Simulateur gratuit pour convertir votre salaire brut en net avec les derniers barèmes fiscaux marocains.',
  keywords: 'calcul salaire net maroc, simulateur salaire maroc, brut net maroc, ir maroc, cnss maroc, amo maroc',
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
