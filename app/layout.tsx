import "./globals.css";
import { Bebas_Neue, Space_Mono, Outfit } from "next/font/google";

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

export const metadata = {
  title: "Hamza Shaikh — Software Engineer",
  description: "Portfolio website for Hamza Shaikh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${spaceMono.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}