"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "./CategoryFilter";
import ProfessionalCard from "./ProfessionalCard";
import SearchBar from "./SearchBar";
import { JUJUY_LOCALITIES, JUJUY_PROVINCE } from "@/lib/locations-jujuy";
import { useCategoryFilter } from "./CategoryFilterContext";

export type Professional = {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url?: string | null;
  location?: string | null;
  province?: string | null;
  locality?: string | null;
};

type ProfessionalsGridProps = {
  professionals: Professional[];
  initialCategory?: string;
  initialQuery?: string;
  initialProvince?: string;
  initialLocality?: string;
};

export default function ProfessionalsGrid({
  professionals,
  initialCategory = "Todas",
  initialQuery = "",
  initialProvince = "Todas",
  initialLocality = "Todas",
}: ProfessionalsGridProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [province, setProvince] = useState(initialProvince);
  const [locality, setLocality] = useState(initialLocality);
  const { selectedCategory, setSelectedCategory } = useCategoryFilter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (initialCategory !== "Todas" && selectedCategory === "Todas") {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, selectedCategory, setSelectedCategory]);

  useEffect(() => {
    if (selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory, category]);

  const updateUrl = (next: {
    q?: string;
    category?: string;
    province?: string;
    locality?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.q) params.set("q", next.q);
    else params.delete("q");
    if (next.category && next.category !== "Todas") params.set("category", next.category);
    else params.delete("category");
    if (next.province && next.province !== "Todas") params.set("province", next.province);
    else params.delete("province");
    if (next.locality && next.locality !== "Todas") params.set("locality", next.locality);
    else params.delete("locality");
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(professionals.map((professional) => professional.category))
      ).sort(),
    [professionals]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    const normalizedCategory = normalizeText(category);
    const categoryVariants = (() => {
      if (normalizedCategory === "todas") return [];
      const variants = new Set<string>([normalizedCategory]);
      if (normalizedCategory.endsWith("o")) {
        variants.add(normalizedCategory.slice(0, -1) + "a");
      }
      if (normalizedCategory.endsWith("a")) {
        variants.add(normalizedCategory.slice(0, -1) + "o");
      }
      if (normalizedCategory.endsWith("or")) {
        variants.add(normalizedCategory + "a");
      }
      if (normalizedCategory.endsWith("ora")) {
        variants.add(normalizedCategory.slice(0, -1));
      }
      return Array.from(variants);
    })();
    return professionals.filter((professional) => {
      const normalizedName = normalizeText(professional.name);
      const normalizedCategoryValue = normalizeText(professional.category);
      const normalizedDescription = normalizeText(professional.description);
      const matchesCategory =
        category === "Todas" ||
        categoryVariants.some((variant) =>
          normalizedCategoryValue.includes(variant)
        );
      const matchesProvince =
        province === "Todas" || professional.province === province;
      const matchesLocality =
        locality === "Todas" || professional.locality === locality;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalizedName.includes(normalizedQuery) ||
        normalizedCategoryValue.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery);
      return matchesCategory && matchesProvince && matchesLocality && matchesQuery;
    });
  }, [professionals, query, category, province, locality]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            if (value.trim().length > 0 && category !== "Todas") {
              setCategory("Todas");
              setSelectedCategory("Todas");
            }
            updateUrl({
              q: value.trim(),
              category: value.trim().length > 0 ? "Todas" : category,
              province,
              locality,
            });
          }}
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={province}
            onChange={(event) => {
              const value = event.target.value;
              setProvince(value);
              updateUrl({ q: query.trim(), category, province: value, locality });
            }}
            className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200 transition focus:border-primary/60 focus:outline-none"
          >
            <option value="Todas">Todas las provincias</option>
            <option value={JUJUY_PROVINCE}>{JUJUY_PROVINCE}</option>
          </select>
          <select
            value={locality}
            onChange={(event) => {
              const value = event.target.value;
              setLocality(value);
              updateUrl({ q: query.trim(), category, province, locality: value });
            }}
            className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200 transition focus:border-primary/60 focus:outline-none"
          >
            <option value="Todas">Todas las localidades</option>
            {JUJUY_LOCALITIES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={(value) => {
              setCategory(value);
              setSelectedCategory(value);
              updateUrl({ q: query.trim(), category: value, province, locality });
            }}
          />
        </div>
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
