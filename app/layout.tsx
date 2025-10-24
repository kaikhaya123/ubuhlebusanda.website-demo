
import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const viewport = {
  themeColor: '#ffffff', // Set to white for neutral background
  width: 'device-width',
  initialScale: 1
};

export const metadata = {
  title: 'Ubuhlebusanda Pty Ltd',
  description: 'Trusted electrical installations and Lorenzetti product solutions across South Africa.',
  icons: {
    icon: [
  { url: '/images/chatgpt-2025-09-29-08-16-40.png' },
      { url: '/favicon/favicon.ico' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="bg-white text-black antialiased" suppressHydrationWarning>
        <Navbar />
  <main className="min-h-screen w-full px-0 sm:px-0 md:px-0 lg:px-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
