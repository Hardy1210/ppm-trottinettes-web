import ConditionalHeader from '@/components/layout/ConditionalHeader';
import Footer from '@/components/layout/footer/Footer';
import { IntroProvider } from '@/context/IntroContext';
import type { Metadata } from 'next';
import { Michroma, Questrial } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from './providers/SmoothScrollProvider';

const michroma = Michroma({
  subsets: ['latin'],
  variable: '--font-michroma',
  weight: '400',
});

const questrial = Questrial({
  subsets: ['latin'],
  variable: '--font-questrial',
  weight: '400',
});

export const metadata: Metadata = {
  title:
    'Pile Power Mobilité | Réparation et entretien de trottinettes électriques à Dijon',
  description:
    'Réparation, entretien et accompagnement pour trottinettes électriques à Dijon. Service sérieux, conseils personnalisés et solutions adaptées à votre mobilité.',
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
        <IntroProvider>
          <ConditionalHeader />
          <SmoothScrollProvider>
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </IntroProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
