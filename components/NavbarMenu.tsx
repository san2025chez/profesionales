"use client";

import Link from "next/link";
import { directoryCategories } from "@/lib/categories";

export default function NavbarMenu() {
  const handleClose = (e: React.MouseEvent) => {
    const details = (e.target as HTMLElement).closest("details");
    details?.removeAttribute("open");
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
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {category.label}
              </p>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item}
                    href={`/profesionales?categoria=${encodeURIComponent(item)}`}
                    onClick={handleClose}
                    className="block rounded-xl px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800/70 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}
