import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shahi Pickle - Premium Organic Pickles from Malda',
  description: 'Discover authentic, handmade organic pickles crafted with traditional recipes from Malda, West Bengal. Premium quality pickles delivered worldwide.',
  keywords: 'organic pickles, handmade pickles, Indian pickles, Malda pickles, traditional recipes, authentic pickles',
  authors: [{ name: 'Shahi Pickle' }],
  creator: 'Shahi Pickle',
  publisher: 'Shahi Pickle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shahipickle.com'),
  openGraph: {
    title: 'Shahi Pickle - Premium Organic Pickles',
    description: 'Authentic handmade organic pickles from Malda, West Bengal. Traditional recipes, premium quality.',
    url: 'https://shahipickle.com',
    siteName: 'Shahi Pickle',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shahi Pickle - Premium Organic Pickles',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahi Pickle - Premium Organic Pickles',
    description: 'Authentic handmade organic pickles from Malda, West Bengal',
    images: ['/og-image.jpg'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}