import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Effects } from '@/components/effects'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const SITE_URL = 'https://mohith-dodapaneni-balaraju.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Mohith Dodapaneni Balaraju | Data Science & Machine Learning',
  description:
    "Mohith Dodapaneni Balaraju is an Engineering Data Science master's student at the University of Houston exploring data science, machine learning, AI, LLMs, and data engineering.",
  generator: 'v0.app',
  keywords: [
    'Mohith Dodapaneni Balaraju',
    'Data Scientist',
    'Machine Learning Engineer',
    'Engineering Data Science',
    'University of Houston',
    'LLMs',
    'RAG',
    'Data Engineering',
  ],
  authors: [{ name: 'Mohith Dodapaneni Balaraju' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Mohith Dodapaneni Balaraju | Data Science & Machine Learning',
    description:
      "Engineering Data Science master's student at the University of Houston exploring data science, machine learning, AI, LLMs, and data engineering.",
    siteName: 'Mohith Dodapaneni Balaraju',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohith Dodapaneni Balaraju | Data Science & Machine Learning',
    description:
      "Engineering Data Science master's student at the University of Houston exploring data science, machine learning, AI, LLMs, and data engineering.",
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Effects>{children}</Effects>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
