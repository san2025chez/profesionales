"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";
import { directoryCategories } from "@/lib/categories";

type Props = {
  selectedCategory: string;
};

export default function CategoryListSidebar({ selectedCategory }: Props) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const buildCategoryUrl = (categoria: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoria === "Todas") params.delete("categoria");
    else params.set("categoria", categoria);
    const query = params.toString();
    return query ? `/profesionales?${query}` : "/profesionales";
  };

  return (
    <aside className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      {/* En mobile: botón colapsable. En escritorio: título visible */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-t-2xl pb-2 text-left lg:cursor-default lg:pointer-events-none lg:pb-4 lg:rounded-none"
        aria-expanded={open}
        aria-controls="category-nav"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-600">
          Categorías
        </h3>
        <span className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-teal-700 lg:hidden">
          {selectedCategory}
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <nav
        id="category-nav"
        className={`space-y-1 pt-4 ${open ? "block" : "hidden"} lg:block`}
      >
        <Link
          href={buildCategoryUrl("Todas")}
          onClick={() => setOpen(false)}
          className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            selectedCategory === "Todas"
              ? "bg-teal-100 text-teal-700"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          Todas
        </Link>
        {directoryCategories.map((group) => (
          <div key={group.label} className="pt-2">
            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item}
                  href={buildCategoryUrl(item)}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-2 text-sm transition ${
                    selectedCategory === item
                      ? "bg-teal-100 text-teal-700"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
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
