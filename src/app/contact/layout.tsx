import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Contact - EXTRiZY',
  description: 'Contactez l\'équipe EXTRiZY pour discuter de votre projet web. Notre équipe d\'experts est là pour vous accompagner.',
  keywords: 'contact, support, projet web, templates, développement, EXTRiZY',
  openGraph: {
    title: 'Contact - EXTRiZY',
    description: 'Contactez l\'équipe EXTRiZY pour discuter de votre projet web',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
