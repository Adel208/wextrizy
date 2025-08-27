import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'À propos - EXTRiZY',
  description: 'Découvrez l\'histoire d\'EXTRiZY, notre équipe d\'experts et notre mission de démocratiser l\'accès aux templates web premium.',
  keywords: 'à propos, équipe, mission, vision, valeurs, histoire, EXTRiZY, templates web',
  openGraph: {
    title: 'À propos - EXTRiZY',
    description: 'Découvrez l\'histoire d\'EXTRiZY et notre équipe d\'experts',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
