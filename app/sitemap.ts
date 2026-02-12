import type { MetadataRoute } from "next";
import { PROVINCIA_SLUG, CIUDADES_SEO, OFICIOS_SEO } from "@/lib/seo-data";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://profesionalesoficios.vercel.app";

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/profesionales`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/${PROVINCIA_SLUG}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const ciudad of CIUDADES_SEO) {
    routes.push({
      url: `${siteUrl}/${PROVINCIA_SLUG}/${ciudad.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
    for (const oficio of OFICIOS_SEO) {
      routes.push({
        url: `${siteUrl}/${PROVINCIA_SLUG}/${ciudad.slug}/${oficio.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data: professionals } = await supabase
      .from("professionals")
      .select("id");
    if (professionals?.length) {
      for (const p of professionals) {
        routes.push({
          url: `${siteUrl}/professionals/${p.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // Ignore if DB not available at build
  }

  return routes;
}
