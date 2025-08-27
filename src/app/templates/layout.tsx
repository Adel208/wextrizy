import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Templates - EXTRiZY',
  description: 'Découvrez notre collection de templates web modernes et professionnels. E-commerce, Portfolio, Blog, Landing Page et plus encore.',
  keywords: 'templates web, e-commerce, portfolio, blog, landing page, dashboard, application',
  openGraph: {
    title: 'Templates - EXTRiZY',
    description: 'Collection de templates web modernes et professionnels',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
