"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProfessionalCard from "./ProfessionalCard";
import SearchBar from "./SearchBar";

export type Professional = {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url?: string | null;
  location?: string | null;
};

type ProfessionalsGridProps = {
  professionals: Professional[];
  initialCategory?: string;
  initialQuery?: string;
};

export default function ProfessionalsGrid({
  professionals,
  initialCategory = "Todas",
  initialQuery = "",
}: ProfessionalsGridProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(professionals.map((professional) => professional.category))
      ).sort(),
    [professionals]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return professionals.filter((professional) => {
      const matchesCategory =
        category === "Todas" || professional.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        professional.name.toLowerCase().includes(normalizedQuery) ||
        professional.category.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [professionals, query, category]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 text-center text-sm text-slate-300">
          No hay profesionales que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              id={professional.id}
              name={professional.name}
              category={professional.category}
              description={professional.description}
              imageUrl={professional.image_url}
              location={professional.location}
            />
          ))}
        </div>
      )}
    </section>
  );
}
