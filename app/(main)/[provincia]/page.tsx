import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROVINCIA_SLUG, PROVINCIA_NOMBRE, CIUDADES_SEO } from "@/lib/seo-data";

type ProvinciaPageProps = {
  params: Promise<{ provincia: string }>;
};

export async function generateMetadata({
  params,
}: ProvinciaPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (resolvedParams.provincia !== PROVINCIA_SLUG) {
    return { title: "Página no encontrada" };
  }
  const title = `Profesionales y Oficios en ${PROVINCIA_NOMBRE} | Directorio`;
  const description = `Encuentra profesionales verificados en ${PROVINCIA_NOMBRE}, Argentina. Plomeros, electricistas, carpinteros y más en Perico, San Salvador de Jujuy, Palpalá y todas las localidades.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/${PROVINCIA_SLUG}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProvinciaPage({ params }: ProvinciaPageProps) {
  const resolvedParams = await params;
  if (resolvedParams.provincia !== PROVINCIA_SLUG) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-slate-400 transition hover:text-white">
            Inicio
          </Link>
          <span className="mx-2 text-slate-500">/</span>
          <span className="text-slate-300">{PROVINCIA_NOMBRE}</span>
        </nav>
        <h1 className="mb-4 text-4xl font-bold">
          Profesionales y Oficios en {PROVINCIA_NOMBRE}
        </h1>
        <p className="mb-8 text-lg text-slate-300">
          Selecciona tu localidad para encontrar profesionales verificados en{" "}
          {PROVINCIA_NOMBRE}, Argentina.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {CIUDADES_SEO.map((ciudad) => (
            <Link
              key={ciudad.slug}
              href={`/${PROVINCIA_SLUG}/${ciudad.slug}`}
              className="rounded-2xl border border-slate-700/60 bg-card/80 p-4 text-white transition hover:border-primary/60"
            >
              <span className="font-semibold">{ciudad.nombre}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
