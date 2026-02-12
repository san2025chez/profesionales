"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { JUJUY_LOCALITIES } from "@/lib/locations-jujuy";
import { OFICIOS_SEO } from "@/lib/seo-data";

export default function HeroSection() {
  const router = useRouter();
  const [rubro, setRubro] = useState("");
  const [localidad, setLocalidad] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (rubro.trim()) params.set("especialidad", rubro.trim());
    if (localidad.trim()) params.set("localidad", localidad.trim());
    const query = params.toString();
    router.push(query ? `/profesionales?${query}` : "/profesionales");
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-6 pt-32 pb-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.15),transparent)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Tu sitio de confianza para encontrar el servicio indicado
        </h1>
        <p className="mb-2 text-xl text-slate-300">
          Encontrá a los mejores profesionales en tu zona.
        </p>
        <p className="mb-10 text-slate-400">
          Ingresá el rubro y la localidad para empezar.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 shadow-xl sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label className="mb-1.5 block text-left text-sm font-medium text-slate-300">
              Rubro o profesión
            </label>
            <input
              type="text"
              value={rubro}
              onChange={(e) => setRubro(e.target.value)}
              placeholder="Ej: plomero, electricista, carpintero"
              list="rubros-list"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
            <datalist id="rubros-list">
              {OFICIOS_SEO.map((o) => (
                <option key={o.slug} value={o.nombre} />
              ))}
            </datalist>
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-left text-sm font-medium text-slate-300">
              Localidad
            </label>
            <select
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            >
              <option value="">Todas las localidades</option>
              {JUJUY_LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3 font-semibold text-white transition hover:bg-teal-500"
          >
            <SearchIcon className="h-5 w-5" />
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}
