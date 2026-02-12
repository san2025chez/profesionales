"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { directoryCategories } from "@/lib/categories";

type Props = {
  selectedCategory: string;
};

export default function CategoryListSidebar({ selectedCategory }: Props) {
  const searchParams = useSearchParams();

  const buildCategoryUrl = (categoria: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoria === "Todas") params.delete("categoria");
    else params.set("categoria", categoria);
    const query = params.toString();
    return query ? `/profesionales?${query}` : "/profesionales";
  };

  const allItems = directoryCategories.flatMap((g) =>
    g.items.map((item) => ({ group: g.label, item }))
  );

  return (
    <aside className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Categorías
      </h3>
      <nav className="space-y-1">
        <Link
          href={buildCategoryUrl("Todas")}
          className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            selectedCategory === "Todas"
              ? "bg-teal-600/30 text-teal-400"
              : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
          }`}
        >
          Todas
        </Link>
        {directoryCategories.map((group) => (
          <div key={group.label} className="pt-2">
            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item}
                  href={buildCategoryUrl(item)}
                  className={`block rounded-xl px-4 py-2 text-sm transition ${
                    selectedCategory === item
                      ? "bg-teal-600/30 text-teal-400"
                      : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
