import { slugify, getPlural } from "./seo-utils";
import { directoryCategories } from "./categories";
import { JUJUY_LOCALITIES } from "./locations-jujuy";

export const PROVINCIA_SLUG = "jujuy";
export const PROVINCIA_NOMBRE = "Jujuy";

export type CiudadSEO = {
  slug: string;
  nombre: string;
};

export type OficioSEO = {
  slug: string;
  nombre: string;
  plural: string;
  grupo: string;
};

function getDescripcionBase(nombre: string): string {
  const base = `Servicios profesionales de ${nombre.toLowerCase()} en`;
  return base;
}

const ciudades: CiudadSEO[] = JUJUY_LOCALITIES.map((nombre) => ({
  slug: slugify(nombre),
  nombre,
}));

const oficios: OficioSEO[] = [];
const seen = new Set<string>();

for (const grupo of directoryCategories) {
  for (const item of grupo.items) {
    const slug = slugify(item);
    if (seen.has(slug)) continue;
    seen.add(slug);
    oficios.push({
      slug,
      nombre: item,
      plural: getPlural(item),
      grupo: grupo.label,
    });
  }
}

export const CIUDADES_SEO = ciudades;
export const OFICIOS_SEO = oficios;

export const SLUG_TO_CIUDAD = Object.fromEntries(
  ciudades.map((c) => [c.slug, c])
);

export const SLUG_TO_OFICIO = Object.fromEntries(
  oficios.map((o) => [o.slug, o])
);

export function getCiudadBySlug(slug: string): CiudadSEO | undefined {
  return SLUG_TO_CIUDAD[slug];
}

export function getOficioBySlug(slug: string): OficioSEO | undefined {
  return SLUG_TO_OFICIO[slug];
}

export function getDescripcionOficio(oficio: OficioSEO): string {
  return getDescripcionBase(oficio.nombre);
}
