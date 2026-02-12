import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { CategoryFilterProvider } from "@/components/CategoryFilterContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app"),
  title: {
    default: "Profesionales y Oficios | Directorio de Profesionales en Jujuy",
    template: "%s | Profesionales y Oficios",
  },
  description: "Encuentra profesionales verificados en Jujuy. Plomeros, electricistas, carpinteros, pintores, albañiles y más en Perico, San Salvador de Jujuy y toda la provincia.",
  keywords: ["profesionales jujuy", "oficios jujuy", "plomero perico", "electricista jujuy", "carpintero jujuy", "pintor jujuy", "albañil jujuy", "gasista jujuy", "técnicos jujuy"],
  authors: [{ name: "ADASOFT" }],
  creator: "ADASOFT",
  publisher: "ADASOFT",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Profesionales y Oficios",
    title: "Profesionales en Perico Jujuy | Oficios y Servicios",
    description: "Encuentra profesionales verificados en Jujuy. Plomeros, electricistas, carpinteros y más en Perico y toda la provincia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profesionales en Perico Jujuy | Oficios y Servicios",
    description: "Encuentra profesionales verificados en Jujuy. Plomeros, electricistas, carpinteros y más.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-800 min-h-screen`}
      >
        <CategoryFilterProvider>
          {children}
          <Footer />
        </CategoryFilterProvider>
      </body>
    </html>
  );
}
