import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ComoFuncionaSection from "@/components/ComoFuncionaSection";
import ContactoSection from "@/components/ContactoSection";
import { OFICIOS_SEO, CIUDADES_SEO } from "@/lib/seo-data";

const CATEGORIAS_LISTA = OFICIOS_SEO.map((o) => o.nombre).join(", ");
const KEYWORDS_BASE = [
  ...OFICIOS_SEO.flatMap((o) => [
    `${o.nombre.toLowerCase()} jujuy`,
    `${o.plural.toLowerCase()} jujuy argentina`,
  ]),
  ...CIUDADES_SEO.slice(0, 10).flatMap((c) => [
    `profesionales ${c.nombre.toLowerCase()} jujuy`,
    `oficios ${c.nombre.toLowerCase()}`,
  ]),
  "profesionales jujuy",
  "oficios jujuy argentina",
  "directorio profesionales jujuy",
];

export const metadata: Metadata = {
  title: "Profesionales en Perico Jujuy | Oficios y Servicios",
  description: `Encuentra profesionales verificados en Jujuy. ${CATEGORIAS_LISTA}. Directorio de oficios y servicios en Perico, San Salvador de Jujuy, Palpalá y toda la provincia. Argentina.`,
  keywords: KEYWORDS_BASE,
  openGraph: {
    title: "Profesionales en Perico Jujuy | Oficios y Servicios",
    description: `Encuentra profesionales verificados en Jujuy. ${CATEGORIAS_LISTA}. Directorio completo en Perico y toda la provincia.`,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profesionales en Perico Jujuy | Oficios y Servicios",
    description: "Encuentra profesionales verificados en Jujuy, Argentina.",
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Profesionales y Oficios",
    description: "Directorio de profesionales y oficios en Jujuy, Argentina",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/profesionales?especialidad={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen text-white">
        <HeroSection />
        <ComoFuncionaSection />
        <ContactoSection />
      </main>
    </>
  );
}
