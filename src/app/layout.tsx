import type { Metadata } from 'next'
import { Montserrat, Playfair_Display, Tenor_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import dynamic from 'next/dynamic'
import { generateLocalBusinessJsonLd } from '@/lib/jsonLd'

const AIChatbot = dynamic(() => import('@/components/AIChatbot'), { ssr: false })

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  variable: '--font-tenor',
  weight: '400',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bigvalleyproperties.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Big Valley Properties | Trinity & Shasta County Real Estate',
  description: 'Big Valley Properties is the leading brokerage serving Trinity and Shasta Counties, California. Browse mountain cabins, ranches, land, and homes across Northern California.',
  keywords: 'Trinity County real estate, Shasta County homes, Weaverville CA, mountain cabins, ranch property, Big Valley Properties, Retta Treanor',
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Big Valley Properties | Trinity & Shasta County Real Estate',
    description: 'Big Valley Properties is the leading brokerage serving Trinity and Shasta Counties, California.',
    url: BASE_URL,
    siteName: 'Big Valley Properties',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${playfairDisplay.variable} ${tenorSans.variable}`}>
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10401c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/images/logo-small.jpg" />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-alabaster dark:bg-gray-950 text-charcoal-ink dark:text-gray-100 transition-colors duration-300">
        {gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
          </noscript>
        )}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <Header />
          <main className="flex-1 pt-[var(--nav-height)]">
            {children}
          </main>
          <Footer />
          <AIChatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
