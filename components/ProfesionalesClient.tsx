"use client";

import { useMemo } from "react";
import Link from "next/link";
import ProfessionalCard from "./ProfessionalCard";
import ProfesionalesSearchBar from "./ProfesionalesSearchBar";
import CategoryListSidebar from "./CategoryListSidebar";
import type { Professional } from "./ProfessionalsGrid";

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

type Props = {
  professionals: Professional[];
  error: boolean;
  initialEspecialidad: string;
  initialLocalidad: string;
  initialCategoria: string;
};

export default function ProfesionalesClient({
  professionals,
  error,
  initialEspecialidad,
  initialLocalidad,
  initialCategoria,
}: Props) {
  const filtered = useMemo(() => {
    const q = normalizeText(initialEspecialidad.trim());
    const loc = initialLocalidad.trim();
    const cat = initialCategoria;

    return professionals.filter((p) => {
      const matchesEspecialidad =
        !q ||
        normalizeText(p.name).includes(q) ||
        normalizeText(p.category).includes(q) ||
        normalizeText(p.description ?? "").includes(q);
      const matchesLocalidad = !loc || p.locality === loc;
      const matchesCategoria =
        cat === "Todas" ||
        normalizeText(p.category) === normalizeText(cat) ||
        normalizeText(p.category).includes(normalizeText(cat));
      return matchesEspecialidad && matchesLocalidad && matchesCategoria;
    }).sort((a, b) => {
      const aPremium = a.plan === "premium" || a.is_featured;
      const bPremium = b.plan === "premium" || b.is_featured;
      if (aPremium && !bPremium) return -1;
      if (!aPremium && bPremium) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [
    professionals,
    initialEspecialidad,
    initialLocalidad,
    initialCategoria,
  ]);

  return (
    <main className="min-h-screen bg-base px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-teal-400"
          >
            ← Volver al inicio
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Profesionales
          </h1>
          <p className="text-slate-400">
            Encontrá a los mejores especialistas en tu zona.
          </p>
        </header>

        <div className="mb-8">
          <ProfesionalesSearchBar />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-200">
            Hubo un error cargando los profesionales. Intentá nuevamente.
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-64">
              <CategoryListSidebar selectedCategory={initialCategoria} />
            </div>

            <div className="min-w-0 flex-1">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-12 text-center text-slate-300">
                  No hay profesionales que coincidan con tu búsqueda.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {filtered.map((p) => (
                    <ProfessionalCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      category={p.category}
                      description={p.description}
                      imageUrl={p.image_url}
                      location={p.locality ?? p.location}
                      plan={p.plan}
                      licenseNumber={p.license_number}
                      isFeatured={p.is_featured}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
