import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ShareProfileButtons from "@/components/ShareProfileButtons";

type ProfessionalPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProfessionalPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createSupabaseServerClient();
  const { data: professional } = await supabase
    .from("professionals")
    .select("name, category, description, locality, province, image_url")
    .eq("id", resolvedParams.id)
    .maybeSingle();

  if (!professional) {
    return {
      title: "Profesional no encontrado",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app";
  const profileUrl = `${siteUrl}/professionals/${resolvedParams.id}`;
  const location = professional.locality && professional.province
    ? `${professional.locality}, ${professional.province}`
    : "Jujuy";

  const title = `${professional.name} - ${professional.category} en ${location} | Profesionales y Oficios`;
  const description = `${professional.description || `${professional.name} es ${professional.category} en ${location}.`} Contacta con ${professional.name} para servicios profesionales en ${location}.`;
  const ogImage =
    professional.image_url?.startsWith("http")
      ? professional.image_url
      : professional.image_url
        ? `${siteUrl}${professional.image_url.startsWith("/") ? "" : "/"}${professional.image_url}`
        : `${siteUrl}/images/inicio.png`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: profileUrl },
    keywords: [
      `${professional.name.toLowerCase()} ${location.toLowerCase()}`,
      `${professional.category.toLowerCase()} ${location.toLowerCase()}`,
      `${professional.name.toLowerCase()} ${professional.category.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "profile",
      url: profileUrl,
      siteName: "Profesionales y Oficios",
      locale: "es_AR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${professional.name} - ${professional.category}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProfessionalPage({ params }: ProfessionalPageProps) {
  const resolvedParams = await params;
  const supabase = await createSupabaseServerClient();
  const { data: professional, error } = await supabase
    .from("professionals")
    .select(
      "id, name, category, description, image_url, location, contact, province, locality, country, plan, link_whatsapp, redes_sociales, gallery_images, license_number"
    )
    .eq("id", resolvedParams.id)
    .maybeSingle();

  if (!professional || error) {
    notFound();
  }

  const rawContact = professional.contact ?? "";
  const phoneDigits = rawContact.replace(/[^\d]/g, "");
  const whatsappLink = phoneDigits ? `https://wa.me/${phoneDigits}` : null;
  const isPremium = professional.plan === "premium";
  const premiumWhatsapp = professional.link_whatsapp || whatsappLink;
  const socialLinks = (professional.redes_sociales ?? "")
    .split(",")
    .map((value: string) => value.trim())
    .filter(Boolean);
  const galleryImages = (professional.gallery_images ?? "")
    .split("\n")
    .map((value: string) => value.trim())
    .filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app";
  const locationParts = [
    professional.locality,
    professional.province,
    professional.country,
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: professional.name,
    description: professional.description || `${professional.name} - ${professional.category}`,
    image: professional.image_url || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: professional.locality || undefined,
      addressRegion: professional.province || undefined,
      addressCountry: professional.country || "AR",
    },
    areaServed: locationParts.length > 0
      ? {
          "@type": "City",
          name: locationParts.join(", "),
        }
      : undefined,
    serviceType: professional.category,
    telephone: professional.contact || undefined,
    url: `${siteUrl}/professionals/${professional.id}`,
    ...(professional.license_number && {
      identifier: {
        "@type": "PropertyValue",
        name: "Matrícula Profesional",
        value: professional.license_number,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-base px-6 py-12 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <Link
          href="/profesionales"
          className="text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          ← Volver al listado
        </Link>

        <section className="grid gap-6 rounded-3xl border border-slate-700/60 bg-card/80 p-8 shadow-xl shadow-slate-950/30 lg:grid-cols-[180px_1fr]">
          <div className="h-40 w-40 overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800">
            {professional.image_url ? (
              <img
                src={professional.image_url}
                alt={`Foto de ${professional.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                Sin foto
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                {professional.category}
              </p>
              <h1 className="text-3xl font-semibold">{professional.name}</h1>
              {isPremium ? (
                <span className="inline-flex w-fit rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                  Premium
                </span>
              ) : null}
              {professional.location ? (
                <p className="text-sm text-slate-400">
                  {professional.location}
                </p>
              ) : null}
            </div>
            <p className="text-sm text-slate-300">{professional.description}</p>
            {professional.license_number ? (
              <p className="text-xs text-slate-400">
                Matrícula: {professional.license_number}
              </p>
            ) : null}
            {(rawContact || premiumWhatsapp) ? (
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                {rawContact ? (
                  <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2">
                    {rawContact}
                  </span>
                ) : null}
                {premiumWhatsapp ? (
                  <a
                    href={premiumWhatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-accent/90"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 32"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M19.11 17.64c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.46.07-.7.35-.24.28-.92.9-.92 2.18s.94 2.52 1.07 2.7c.14.18 1.85 2.82 4.48 3.95.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.64-.67 1.87-1.32.23-.64.23-1.2.16-1.32-.06-.12-.25-.2-.53-.34M16.02 6.67c-4.9 0-8.88 3.98-8.88 8.88 0 1.57.41 3.05 1.12 4.33l-1.19 4.35 4.47-1.17a8.84 8.84 0 0 0 4.48 1.22c4.9 0 8.88-3.98 8.88-8.88 0-4.9-3.98-8.88-8.88-8.88m0 16.2a7.3 7.3 0 0 1-3.72-1.02l-.27-.16-2.65.69.7-2.59-.17-.27a7.28 7.28 0 1 1 6.11 3.35" />
                    </svg>
                    WhatsApp
                  </a>
                ) : null}
              </div>
            ) : null}
            <div className="flex flex-col gap-4">
              <ShareProfileButtons
                url={`${siteUrl}/professionals/${professional.id}`}
                title={`${professional.name} - ${professional.category} en ${locationParts.join(", ") || "Jujuy"}`}
                description={professional.description || `${professional.name} es ${professional.category}. Contactá para servicios profesionales.`}
              />
              <Link
                href="/register"
                className="inline-flex w-fit rounded-full border border-slate-600/80 px-5 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary/60 hover:text-white"
              >
                Publicar perfil
              </Link>
            </div>

            {isPremium && socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link: string) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary/60"
                  >
                    {link.replace(/^https?:\/\//, "")}
                  </a>
                ))}
              </div>
            ) : null}

            {isPremium && galleryImages.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {galleryImages.map((src: string) => (
                  <div
                    key={src}
                    className="h-40 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800"
                  >
                    <img
                      src={src}
                      alt="Galería profesional"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
