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
    <article className={`group rounded-2xl border p-5 shadow-lg transition hover:-translate-y-1 ${
      isPremium
        ? "border-accent/60 bg-emerald-500/5 shadow-emerald-950/20 hover:border-accent/80"
        : "border-slate-700/60 bg-card/90 shadow-slate-950/20 hover:border-primary/60"
    }`}>
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Foto de ${name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              Sin foto
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            {isPremium && (
              <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-semibold text-accent">
                Premium
              </span>
            )}
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
              {category}
            </span>
          </div>
          {location ? (
            <p className="mt-1 text-xs text-slate-400">{location}</p>
          ) : null}
          {isPremium && hasLicense && (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1">
              <span className="text-xs font-semibold text-accent">
                🎓 Matrícula: {licenseNumber}
              </span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300">{description}</p>
      <Link
        href={`/professionals/${id}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:text-accent/90"
      >
        Ver perfil
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
