import "./globals.css";
import { Bebas_Neue, Space_Mono, Outfit } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import Script from "next/script";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const outfit = Outfit({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Hamza Shaikh — Software Engineer",
  description: "Portfolio website for Hamza Shaikh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GX76T1KR44"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GX76T1KR44');
          `}
        </Script>
      </head>

      <body
        className={`${bebas.variable} ${spaceMono.variable} ${outfit.variable}`}
      >
        {children}
      </body>
    </html>
  );
}