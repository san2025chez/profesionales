"use client";

import Link from "next/link";

type Props = {
  professionalName: string;
  category?: string;
};

export default function ProfileBackBar({ professionalName, category }: Props) {
  return (
    <div className="sticky top-14 z-40 -mx-4 mb-4 flex items-center gap-3 border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mb-6 lg:rounded-xl lg:border lg:bg-stone-50/80 lg:px-5 lg:py-4">
      <Link
        href="/profesionales"
        className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-200/60 hover:text-teal-600 active:scale-[0.98]"
        aria-label="Volver al listado de profesionales"
      >
        <span aria-hidden>←</span>
        <span className="hidden sm:inline">Volver al listado</span>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-stone-800" title={professionalName}>
          {professionalName}
        </p>
        {category ? (
          <p className="truncate text-xs text-stone-500">{category}</p>
        ) : null}
      </div>
    </div>
  );
}
