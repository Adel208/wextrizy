import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Catégories de Templates - EXTRiZY',
  description: 'Explorez nos catégories de templates web : E-commerce, Portfolio, Blog, Landing Page, Dashboard et plus encore.',
  keywords: 'catégories templates, e-commerce, portfolio, blog, landing page, dashboard, application',
  openGraph: {
    title: 'Catégories de Templates - EXTRiZY',
    description: 'Explorez nos catégories de templates web professionnels',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
