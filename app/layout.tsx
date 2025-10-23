import '../app/globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const viewport = {
  themeColor: '#F59E0B', // amber-500 to match your theme
  width: 'device-width',
  initialScale: 1
};

export const metadata = {
  title: 'Ubuhlebusanda Pty Ltd',
  description: 'Trusted electrical installations and Lorenzetti product solutions across South Africa.',
  metadataBase: new URL('https://ubuhlebusanda.co.za'),
  icons: {
    icon: [
      { url: '/Images/chatgpt-2025-09-29-08-16-40.png' },
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/Images/chatgpt-2025-09-29-08-16-40.png' },
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/Images/chatgpt-2025-09-29-08-16-40.png' },
      { url: '/Images/chatgpt-2025-09-29-08-16-40.png', sizes: '192x192', type: 'image/png' },
      { url: '/Images/chatgpt-2025-09-29-08-16-40.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'Ubuhlebusanda Pty Ltd',
    description: 'Trusted electrical installations and Lorenzetti product solutions.',
    images: [
      {
        url: '/Images/chatgpt-2025-09-29-08-16-40.png',
        width: 1200,
        height: 630,
        alt: 'Ubuhlebusanda Pty Ltd',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ubuhlebusanda Pty Ltd',
    description: 'Trusted electrical installations and Lorenzetti product solutions.',
    images: ['/Images/chatgpt-2025-09-29-08-16-40.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ubuhlebusanda',
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','600','700','800'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-white text-black antialiased" suppressHydrationWarning>
        <Navbar />
        
        <main className="min-h-screen" suppressHydrationWarning>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
