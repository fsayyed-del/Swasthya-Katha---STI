import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#123A3C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Swasthya Katha | STI & Syphilis Handbook',
  description:
    'Practical STI & Syphilis Clinical Ready Reckoner for Prison & Closed-Setting Project Coordinators and Field Teams. Syndromic Case Management and NACO Guidelines.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Swasthya Katha',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Service Worker Registration for 100% Offline PWA Reading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) { console.log('Swasthya Katha PWA ServiceWorker registered: ', reg.scope); },
                    function(err) { console.log('ServiceWorker registration failed: ', err); }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-paper text-ink selection:bg-mint selection:text-teal-dark">
        {children}
      </body>
    </html>
  );
}
