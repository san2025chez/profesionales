import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROVINCIA_SLUG,
  PROVINCIA_NOMBRE,
  OFICIOS_SEO,
  getCiudadBySlug,
} from "@/lib/seo-data";

type ProvinciaCiudadPageProps = {
  params: Promise<{ provincia: string; ciudad: string }>;
};

export async function generateMetadata({
  params,
}: ProvinciaCiudadPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (resolvedParams.provincia !== PROVINCIA_SLUG) {
    return { title: "Página no encontrada" };
  }
  const ciudad = getCiudadBySlug(resolvedParams.ciudad);
  if (!ciudad) return { title: "Página no encontrada" };
  const title = `Profesionales en ${ciudad.nombre} ${PROVINCIA_NOMBRE} | Oficios y Servicios`;
  const description = `Encuentra profesionales verificados en ${ciudad.nombre}, ${PROVINCIA_NOMBRE}. Plomeros, electricistas, carpinteros y más. Directorio completo de oficios en ${ciudad.nombre}, Argentina.`;
  return {
    title,
    description,
    keywords: [
      `profesionales ${ciudad.nombre.toLowerCase()} jujuy`,
      `oficios ${ciudad.nombre.toLowerCase()}`,
      `servicios ${ciudad.nombre.toLowerCase()} jujuy argentina`,
    ],
  };
}

export default async function ProvinciaCiudadPage({
  params,
}: ProvinciaCiudadPageProps) {
  const resolvedParams = await params;
  if (resolvedParams.provincia !== PROVINCIA_SLUG) {
    notFound();
  }
  const ciudad = getCiudadBySlug(resolvedParams.ciudad);
  if (!ciudad) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <Link href="/" className="text-slate-400 transition hover:text-white">
            Inicio
          </Link>
          <span className="text-slate-500">/</span>
          <Link
            href={`/${PROVINCIA_SLUG}`}
            className="text-slate-400 transition hover:text-white"
          >
            {PROVINCIA_NOMBRE}
          </Link>
          <span className="text-slate-500">/</span>
          <span className="text-slate-300">{ciudad.nombre}</span>
        </nav>
        <h1 className="mb-4 text-4xl font-bold">
          Profesionales en {ciudad.nombre}, {PROVINCIA_NOMBRE}
        </h1>
        <p className="mb-8 text-lg text-slate-300">
          Busca por oficio o profesión para encontrar profesionales verificados
          en {ciudad.nombre}, {PROVINCIA_NOMBRE}, Argentina.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {OFICIOS_SEO.map((oficio) => (
            <Link
              key={oficio.slug}
              href={`/${PROVINCIA_SLUG}/${resolvedParams.ciudad}/${oficio.slug}`}
              className="rounded-2xl border border-slate-700/60 bg-card/80 p-4 text-white transition hover:border-primary/60"
            >
              <span className="font-semibold">{oficio.plural}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
