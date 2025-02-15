import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../public/css/tabler.1.0.0.min.css';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'Your personal note taking and markdown editor web app.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.className} ${geistMono.variable}`}>
        {children}
        <script src="/js/tabler.1.0.0.min.js" defer></script>
      </body>
    </html>
  );
}
