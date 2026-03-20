import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import AIChatbot from '@/components/AIChatbot'

export const metadata: Metadata = {
  title: 'Big Valley Properties | Trinity & Shasta County Real Estate',
  description: 'Big Valley Properties is the leading brokerage serving Trinity and Shasta Counties, California. Browse mountain cabins, ranches, land, and homes across Northern California.',
  keywords: 'Trinity County real estate, Shasta County homes, Weaverville CA, mountain cabins, ranch property, Big Valley Properties, Retta Treanor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-alabaster dark:bg-gray-950 text-charcoal-ink dark:text-gray-100 transition-colors duration-300">
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
