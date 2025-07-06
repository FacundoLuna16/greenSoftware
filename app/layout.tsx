import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GreenSoftware | Desarrollo Sostenible',
  description: 'Descubre cómo el desarrollo de software sostenible puede reducir el impacto ambiental mientras mejora la eficiencia. Herramientas, metodologías y calculadora de huella de carbono.',
  keywords: ['green software', 'desarrollo sostenible', 'software verde', 'huella de carbono', 'eficiencia energética', 'tecnología sostenible'],
  authors: [{ name: 'GreenSoftware Team' }],
  creator: 'GreenSoftware',
  generator: 'Next.js',
  applicationName: 'GreenSoftware',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10B981' },
    { media: '(prefers-color-scheme: dark)', color: '#065F46' }
  ],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'GreenSoftware',
    title: 'GreenSoftware | Desarrollo Sostenible',
    description: 'Plataforma educativa sobre desarrollo de software sostenible y eficiencia energética en tecnología.',
    url: 'https://greensoftware.dev',
    images: [
      {
        url: '/Green-Software.webp',
        width: 1200,
        height: 630,
        alt: 'GreenSoftware - Desarrollo Sostenible',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreenSoftware | Desarrollo Sostenible',
    description: 'Descubre cómo crear software más eficiente y sostenible para un futuro verde.',
    images: ['/Green-Software.webp'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
