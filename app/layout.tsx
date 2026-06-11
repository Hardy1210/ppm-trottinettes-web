import ConditionalHeader from '@/components/layout/ConditionalHeader';
import Footer from '@/components/layout/footer/Footer';
import { ValidationOverlay } from '@/components/ValidationOverlay';
import { IntroProvider } from '@/context/IntroContext';
import type { Metadata, Viewport } from 'next';
import { Michroma, Questrial } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from './providers/SmoothScrollProvider';

const michroma = Michroma({
  subsets: ['latin'],
  variable: '--font-michroma',
  weight: '400',
  display: 'swap',
});

const questrial = Questrial({
  subsets: ['latin'],
  variable: '--font-questrial',
  weight: '400',
  display: 'swap',
});

const BASE_URL = 'https://pilespowermobilite.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Piles Power Mobilité | Réparation Trottinette Électrique Dijon',
    template: '%s | Piles Power Mobilité - Dijon',
  },

  description:
    "Piles Power Mobilité (PPM) — Réparation, entretien et vente de trottinettes électriques à Dijon. Pièces détachées, trottinettes neuves et d'occasion. Conseils personnalisés.",

  keywords: [
    'Piles Power Mobilité',
    'PPM',
    'réparation trottinette électrique Dijon',
    'trottinette électrique Dijon',
    'entretien trottinette Dijon',
    'pièces détachées trottinette électrique',
    'vente trottinette électrique Dijon',
    'trottinette occasion Dijon',
    'réparation trottinette 21000',
  ],

  authors: [{ name: 'Piles Power Mobilité', url: BASE_URL }],
  creator: 'Piles Power Mobilité',
  publisher: 'Piles Power Mobilité',

  alternates: {
    canonical: BASE_URL,
    languages: {
      'fr-FR': BASE_URL,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Piles Power Mobilité',
    title: 'Piles Power Mobilité | Réparation Trottinette Électrique Dijon',
    description:
      "Réparation, entretien et vente de trottinettes électriques à Dijon. Pièces détachées, trottinettes neuves et d'occasion — PPM Dijon.",
    images: [
      {
        url: '/images/bannierr.jpg', // 1200x630px à créer
        width: 1200,
        height: 630,
        alt: 'Piles Power Mobilité - Réparation trottinette électrique Dijon',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Piles Power Mobilité | Réparation Trottinette Électrique Dijon',
    description:
      'Réparation, entretien et vente de trottinettes électriques à Dijon. Pièces détachées, neuves et occasion — PPM.',
    images: ['/images/bannierr.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'Mobilité électrique',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
};
export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1E2126',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${michroma.variable} ${questrial.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Aller au contenu principal
        </a>
        {/* Schema LocalBusiness */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Piles Power Mobilité',
              alternateName: 'PPM',
              image:
                'https://pilespowermobilite.fr/images/reparation-trottinette.jpg',
              '@id': 'https://pilespowermobilite.fr',
              url: 'https://pilespowermobilite.fr',
              telephone: '+33676326473',
              address: {
                '@type': 'PostalAddress',
                streetAddress: "40 rue d'Alembert",
                addressLocality: 'Dijon',
                postalCode: '21000',
                addressCountry: 'FR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 47.3301046,
                longitude: 5.0630524,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                opens: '09:00',
                closes: '20:00',
              },
              areaServed: [
                { '@type': 'Place', name: 'Dijon' },
                { '@type': 'Place', name: "Côte-d'Or" },
                { '@type': 'Place', name: 'Bourgogne' },
              ],
              description:
                "Piles Power Mobilité (PPM) — Réparation, entretien et vente de trottinettes électriques à Dijon. Pièces détachées, trottinettes neuves et d'occasion.",
              priceRange: '€€',
              sameAs: [
                'https://www.facebook.com/profile.php?id=61581404125924',
                'https://www.instagram.com/pile_power_mobilite/',
              ],
            }),
          }}
        />

        {/* Schema WebSite */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Piles Power Mobilité',
              alternateName: 'PPM',
              url: 'https://pilespowermobilite.fr/',
            }),
          }}
        />

        <IntroProvider>
          <ConditionalHeader />
          <SmoothScrollProvider>
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </IntroProvider>
        <div id="modal-root" />
        
      </body>
    </html>
  );
}
