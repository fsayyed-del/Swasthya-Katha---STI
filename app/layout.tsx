import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Swasthya Katha | Visual Health Magazine',
  description: 'Multilingual visual and audio health magazine platform for sexual health education, NACO syndromic care, and Suraksha Clinics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-paper text-ink selection:bg-mint selection:text-teal-dark">
        {children}
      </body>
    </html>
  );
}
