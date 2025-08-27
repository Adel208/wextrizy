import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Profil - EXTRiZY',
  description: 'Gérez votre profil EXTRiZY, vos licences et vos téléchargements.',
  keywords: 'profil, licences, téléchargements, EXTRiZY, compte utilisateur',
  openGraph: {
    title: 'Profil - EXTRiZY',
    description: 'Gérez votre profil EXTRiZY et vos licences',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
