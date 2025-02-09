import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Britt's World",
  description: "Where every call is actually wrong and your opinion doesn't matter",
  metadataBase: new URL('https://brittworld.vercel.app'),
  openGraph: {
    title: "Britt's World",
    description: "Where every call is actually wrong and your opinion doesn't matter",
    url: "https://brittworld.vercel.app",
    siteName: "Britt's World",
    images: [
      {
        url: 'https://brittworld.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: "Britt's World - Sports Commentary",
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Britt's World",
    description: "Where every call is actually wrong and your opinion doesn't matter",
    creator: "@buypatswife",
    images: ['https://brittworld.vercel.app/og.png'],
    site: "@buypatswife",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification-code", // Add your verification code if you have one
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
        <Script 
          src="https://platform.twitter.com/widgets.js" 
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
