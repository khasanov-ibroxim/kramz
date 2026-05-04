import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],

});

export const metadata: Metadata = {
  metadataBase: new URL('https://gurlanglobalteks.uz'),
  title: {
    default: "Gurlan Global Teks - Текстильное производство полного цикла",
    template: "%s | Gurlan Global Teks"
  },
  description: "Современный текстильный кластер от хлопка до готовой одежды. Производство 6 млн изделий в год. Сертификаты OEKO-TEX, SEDEX, ISO.",
  keywords: ['текстиль', 'производство одежды', 'хлопок', 'пряжа', 'ткани', 'Узбекистан', 'экспорт', 'OEKO-TEX', 'SEDEX', 'ISO'],
  authors: [{ name: 'Gurlan Global Teks' }],
  creator: 'Gurlan Global Teks',
  publisher: 'Gurlan Global Teks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://gurlanglobalteks.uz',
    siteName: 'Gurlan Global Teks',
    title: 'Gurlan Global Teks - Текстильное производство полного цикла',
    description: 'Современный текстильный кластер от хлопка до готовой одежды',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gurlan Global Teks',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gurlan Global Teks - Текстильное производство полного цикла',
    description: 'Современный текстильный кластер от хлопка до готовой одежды',
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
