"use client";

import { useMemo, useState } from "react";

type PlanFieldsProps = {
  defaultPlan?: "free" | "premium";
  defaultWhatsapp?: string | null;
  defaultSocialLinks?: string | null;
  defaultGallery?: string | null;
  defaultLicense?: string | null;
};

export default function PlanFields({
  defaultPlan = "free",
  defaultWhatsapp,
  defaultSocialLinks,
  defaultGallery,
  defaultLicense,
}: PlanFieldsProps) {
  const [plan, setPlan] = useState<"free" | "premium">(defaultPlan);
  const isPremium = plan === "premium";

  const helperText = useMemo(() => {
    if (isPremium) {
      return "Incluye WhatsApp, redes sociales y galería de imágenes.";
    }
    return "Solo datos básicos. Puedes activar Premium cuando quieras.";
  }, [isPremium]);

  return (
    <section className="space-y-5 rounded-3xl border border-slate-700/60 bg-card/80 p-6 shadow-xl shadow-slate-950/30">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Plan del perfil
        </p>
        <h3 className="text-xl font-semibold">Elige tu plan</h3>
        <p className="text-sm text-slate-300">{helperText}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div
          className={`rounded-2xl border p-4 transition ${
            plan === "free"
              ? "border-primary/70 bg-slate-900/70"
              : "border-slate-700/60 bg-slate-900/40"
          }`}
        >
          <h4 className="text-sm font-semibold text-white">Free</h4>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>Perfil básico</li>
            <li>Sin destacado</li>
            <li>Botón WhatsApp disponible</li>
          </ul>
        </div>
        <div
          className={`rounded-2xl border p-4 transition ${
            plan === "premium"
              ? "border-accent/70 bg-emerald-500/10"
              : "border-slate-700/60 bg-slate-900/40"
          }`}
        >
          <h4 className="text-sm font-semibold text-white">Premium</h4>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>Perfil destacado en primeros lugares</li>
            <li>Posicionamiento prioritario en búsquedas</li>
            <li>Botón WhatsApp directo</li>
            <li>Redes sociales y galería</li>
            <li>Mostrar matrícula profesional en card</li>
          </ul>
          <p className="mt-3 text-xs text-slate-300">
            Primer mes gratis. Luego $2000 ARS por mes.
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-200">Plan *</label>
        <select
          name="plan"
          value={plan}
          onChange={(event) =>
            setPlan(event.target.value === "premium" ? "premium" : "free")
          }
          className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
        >
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm text-slate-200">Link WhatsApp</label>
          <input
            name="link_whatsapp"
            defaultValue={defaultWhatsapp ?? ""}
            placeholder="https://wa.me/549... (opcional; si no lo usás, se usa el teléfono de Contacto)"
            className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-slate-200">Redes sociales</label>
          <input
            name="redes_sociales"
            defaultValue={defaultSocialLinks ?? ""}
            disabled={!isPremium}
            placeholder="URLs separadas por coma"
            className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-200">Matrícula profesional</label>
        <input
          name="license_number"
          defaultValue={defaultLicense ?? ""}
          disabled={!isPremium}
          placeholder="Ej: MP 12345"
          className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-slate-200">Galería de imágenes</label>
        <textarea
          name="gallery_images"
          defaultValue={defaultGallery ?? ""}
          disabled={!isPremium}
          rows={3}
          placeholder="URLs separadas por salto de línea"
          className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </section>
  );
}
