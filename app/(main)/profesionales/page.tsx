import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ProfesionalesClient from "@/components/ProfesionalesClient";
import { OFICIOS_SEO, CIUDADES_SEO } from "@/lib/seo-data";

const CATEGORIAS_LISTA = OFICIOS_SEO.map((o) => o.nombre).join(", ");

export const metadata: Metadata = {
  title: "Profesionales | Buscar especialistas en Jujuy",
  description: `Encontrá profesionales verificados en Jujuy. ${CATEGORIAS_LISTA}. Plomeros, electricistas, carpinteros, pintores y más en Perico, San Salvador de Jujuy y toda la provincia.`,
  openGraph: {
    title: "Profesionales | Buscar especialistas en Jujuy",
    description: `Encontrá profesionales verificados. ${CATEGORIAS_LISTA}. Directorio completo en Jujuy.`,
    url: "/profesionales",
  },
};

type ProfesionalesPageProps = {
  searchParams?: Promise<{
    especialidad?: string;
    departamento?: string;
    localidad?: string;
    categoria?: string;
  }>;
};

export default async function ProfesionalesPage({
  searchParams,
}: ProfesionalesPageProps) {
  const supabase = await createSupabaseServerClient();
  const { data: professionals, error } = await supabase
    .from("professionals")
    .select(
      "id, name, category, description, image_url, location, province, locality, plan, license_number, is_featured"
    )
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  const resolvedParams = searchParams ? await searchParams : {};
  const especialidad = resolvedParams.especialidad ?? "";
  const departamento = resolvedParams.departamento ?? "";
  const localidad = resolvedParams.localidad ?? "";
  const categoria = resolvedParams.categoria ?? "Todas";

  return (
    <ProfesionalesClient
      professionals={professionals ?? []}
      error={!!error}
      initialEspecialidad={especialidad}
      initialDepartamento={departamento}
      initialLocalidad={localidad}
      initialCategoria={categoria}
    />
  );
}
