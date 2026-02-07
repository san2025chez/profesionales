"use client";

import { directoryCategories } from "@/lib/categories";
import { useCategoryFilter } from "./CategoryFilterContext";

export default function NavbarMenu() {
  const { setSelectedCategory } = useCategoryFilter();
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.closest("details");
    if (details) {
      details.removeAttribute("open");
    }
  };

  return (
    <details className="group relative rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
      <summary className="cursor-pointer list-none font-semibold">
        Categorías
      </summary>
      <div className="absolute left-0 mt-3 w-[min(760px,90vw)] max-h-[70vh] overflow-auto rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl shadow-slate-950/40">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {directoryCategories.map((category) => (
            <div key={category.label} className="space-y-2">
              <button
                type="button"
                onClick={(event) => {
                  setSelectedCategory(category.label);
                  handleClose(event);
                }}
                className="block w-full text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
              >
                {category.label}
              </button>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={(event) => {
                      setSelectedCategory(item);
                      handleClose(event);
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-xs text-slate-300 transition hover:bg-slate-800/70 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}
