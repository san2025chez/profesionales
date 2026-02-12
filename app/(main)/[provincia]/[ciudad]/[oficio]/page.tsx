import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ProfessionalCard from "@/components/ProfessionalCard";
import {
  PROVINCIA_SLUG,
  PROVINCIA_NOMBRE,
  getCiudadBySlug,
  getOficioBySlug,
  getDescripcionOficio,
} from "@/lib/seo-data";

type ProvinciaCiudadOficioPageProps = {
  params: Promise<{
    provincia: string;
    ciudad: string;
    oficio: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProvinciaCiudadOficioPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (resolvedParams.provincia !== PROVINCIA_SLUG) {
    return { title: "Página no encontrada" };
  }
  const ciudad = getCiudadBySlug(resolvedParams.ciudad);
  const oficio = getOficioBySlug(resolvedParams.oficio);
  if (!ciudad || !oficio) {
    return { title: "Página no encontrada" };
  }
  const title = `${oficio.plural} en ${ciudad.nombre} ${PROVINCIA_NOMBRE} | Profesionales y Oficios`;
  const description = `Encuentra ${oficio.plural.toLowerCase()} verificados en ${ciudad.nombre}, ${PROVINCIA_NOMBRE}. ${getDescripcionOficio(oficio)} ${ciudad.nombre}, ${PROVINCIA_NOMBRE}, Argentina. Contacta con profesionales especializados.`;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app";
  const url = `/${PROVINCIA_SLUG}/${resolvedParams.ciudad}/${resolvedParams.oficio}`;
  return {
    title,
    description,
    keywords: [
      `${oficio.nombre.toLowerCase()} ${ciudad.nombre.toLowerCase()} jujuy`,
      `${oficio.plural.toLowerCase()} ${ciudad.nombre.toLowerCase()}`,
      `${oficio.nombre.toLowerCase()} en ${ciudad.nombre.toLowerCase()} jujuy argentina`,
      `servicios ${oficio.nombre.toLowerCase()} ${ciudad.nombre.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `${siteUrl}${url}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProvinciaCiudadOficioPage({
  params,
}: ProvinciaCiudadOficioPageProps) {
  const resolvedParams = await params;
  if (resolvedParams.provincia !== PROVINCIA_SLUG) {
    notFound();
  }
  const ciudad = getCiudadBySlug(resolvedParams.ciudad);
  const oficio = getOficioBySlug(resolvedParams.oficio);
  if (!ciudad || !oficio) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const { data: professionals } = await supabase
    .from("professionals")
    .select(
      "id, name, category, description, image_url, location, province, locality, plan, license_number, is_featured"
    )
    .ilike("category", `%${oficio.nombre}%`)
    .eq("locality", ciudad.nombre)
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true })
    .limit(50);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app";
  const pageUrl = `/${PROVINCIA_SLUG}/${resolvedParams.ciudad}/${resolvedParams.oficio}`;

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${oficio.plural} en ${ciudad.nombre}, ${PROVINCIA_NOMBRE}`,
    description: `${getDescripcionOficio(oficio)} ${ciudad.nombre}, ${PROVINCIA_NOMBRE}, Argentina`,
    url: `${siteUrl}${pageUrl}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement:
        professionals?.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "LocalBusiness",
            name: p.name,
            description: p.description,
            image: p.image_url,
            address: {
              "@type": "PostalAddress",
              addressLocality: p.locality,
              addressRegion: p.province,
              addressCountry: "AR",
            },
            areaServed: { "@type": "City", name: ciudad.nombre },
            serviceType: p.category,
            url: `${siteUrl}/professionals/${p.id}`,
          },
        })) ?? [],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageLd),
        }}
      />
      <main className="min-h-screen bg-base px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-6 flex flex-wrap gap-2 text-sm">
            <Link
              href="/"
              className="text-slate-400 transition hover:text-white"
            >
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
            <span className="text-slate-500">/</span>
            <span className="text-slate-300">{oficio.plural}</span>
          </nav>

          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">
              {oficio.plural} en {ciudad.nombre}, {PROVINCIA_NOMBRE}
            </h1>
            <p className="max-w-3xl text-lg text-slate-300">
              {getDescripcionOficio(oficio)}{" "}
              <strong>
                {ciudad.nombre}, {PROVINCIA_NOMBRE}, Argentina
              </strong>
              . Encuentra profesionales verificados y especializados en{" "}
              {oficio.nombre.toLowerCase()}. Contacta directamente con los
              mejores {oficio.plural.toLowerCase()} de {ciudad.nombre}.
            </p>
          </header>

          {professionals && professionals.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {professionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  id={professional.id}
                  name={professional.name}
                  category={professional.category}
                  description={professional.description}
                  imageUrl={professional.image_url}
                  location={professional.location}
                  plan={professional.plan}
                  licenseNumber={professional.license_number}
                  isFeatured={professional.is_featured}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 text-center">
              <p className="mb-4 text-slate-300">
                No hay {oficio.plural.toLowerCase()} registrados en{" "}
                {ciudad.nombre} aún.
              </p>
              <Link
                href="/register"
                className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Sé el primero en registrarte
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
