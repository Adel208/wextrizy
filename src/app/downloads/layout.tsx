import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Téléchargements - EXTRiZY',
  description: 'Téléchargez vos templates EXTRiZY achetés. Accédez à vos licences et commencez votre projet web.',
  keywords: 'téléchargements, licences, templates, EXTRiZY, projets web',
  openGraph: {
    title: 'Téléchargements - EXTRiZY',
    description: 'Téléchargez vos templates EXTRiZY achetés',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
