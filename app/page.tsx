import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ProfessionalsGrid from "@/components/ProfessionalsGrid";

type HomePageProps = {
  searchParams?: Promise<{ category?: string; q?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const supabase = await createSupabaseServerClient();
  const { data: professionals, error } = await supabase
    .from("professionals")
    .select("id, name, category, description, image_url, location")
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialCategory = resolvedSearchParams?.category ?? "Todas";
  const initialQuery = resolvedSearchParams?.q ?? "";

  return (
    <main className="min-h-screen bg-base px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/60 p-8 shadow-xl shadow-slate-950/30">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Directorio profesional
            </span>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Encuentra expertos validados para tu próximo proyecto
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Un marketplace moderno con perfiles completos, filtros rápidos y
              contacto directo con los profesionales que necesitas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Crear cuenta
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-slate-600/80 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary/60 hover:text-white"
            >
              Iniciar sesión
            </Link>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-200">
            Hubo un error cargando los profesionales. Intenta nuevamente.
          </div>
        ) : (
          <ProfessionalsGrid
            professionals={professionals ?? []}
            initialCategory={initialCategory}
            initialQuery={initialQuery}
          />
        )}
      </div>
    </main>
  );
}
