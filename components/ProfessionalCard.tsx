"use client";

import Link from "next/link";

type ProfessionalCardProps = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string | null;
  location?: string | null;
  plan?: string | null;
  licenseNumber?: string | null;
  isFeatured?: boolean | null;
};

export default function ProfessionalCard({
  id,
  name,
  category,
  description,
  imageUrl,
  location,
  plan,
  licenseNumber,
  isFeatured,
}: ProfessionalCardProps) {
  const isPremium = plan === "premium" || isFeatured;
  const hasLicense = licenseNumber && licenseNumber.trim() !== "";

  return (
    <article className={`group rounded-2xl border-2 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
      isPremium
        ? "border-teal-300 bg-teal-50/50 hover:border-teal-400"
        : "border-stone-300 bg-white hover:border-teal-300"
    }`}>
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Foto de ${name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-stone-500">
              Sin foto
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-stone-800">{name}</h3>
            {isPremium && (
              <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-700">
                Premium
              </span>
            )}
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
              {category}
            </span>
          </div>
          {location ? (
            <p className="mt-1 text-xs text-stone-500">{location}</p>
          ) : null}
          {isPremium && hasLicense && (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-teal-100 px-3 py-1">
              <span className="text-xs font-semibold text-teal-700">
                🎓 Matrícula: {licenseNumber}
              </span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-stone-600">{description}</p>
      <Link
        href={`/professionals/${id}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition group-hover:text-teal-500"
      >
        Ver perfil
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
