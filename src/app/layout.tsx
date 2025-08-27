import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/auth/SessionProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'EXTRiZY - Templates Web Premium',
  description: 'Découvrez notre collection exclusive de templates web modernes et professionnels. E-commerce, Portfolio, Blog, Landing Page et plus encore.',
  keywords: 'templates web, sites web, e-commerce, portfolio, blog, landing page, développement web, design moderne',
  authors: [{ name: 'EXTRiZY Team' }],
  creator: 'EXTRiZY',
  publisher: 'EXTRiZY',
  robots: 'index, follow',
  openGraph: {
    title: 'EXTRiZY - Templates Web Premium',
    description: 'Collection exclusive de templates web modernes et professionnels',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'EXTRiZY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EXTRiZY - Templates Web Premium',
    description: 'Collection exclusive de templates web modernes et professionnels',
    creator: '@extrizy',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable}`}>
      <body className={`${geist.className} antialiased bg-slate-900 text-white`}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
