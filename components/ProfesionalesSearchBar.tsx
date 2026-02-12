"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { JUJUY_LOCALITIES } from "@/lib/locations-jujuy";
import { OFICIOS_SEO } from "@/lib/seo-data";

export default function ProfesionalesSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [especialidad, setEspecialidad] = useState("");
  const [localidad, setLocalidad] = useState("");

  useEffect(() => {
    setEspecialidad(searchParams.get("especialidad") ?? "");
    setLocalidad(searchParams.get("localidad") ?? "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (especialidad.trim()) params.set("especialidad", especialidad.trim());
    else params.delete("especialidad");
    if (localidad.trim()) params.set("localidad", localidad.trim());
    else params.delete("localidad");
    const query = params.toString();
    router.push(query ? `/profesionales?${query}` : "/profesionales");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-slate-700/60 bg-slate-800/50 p-4 shadow-lg sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          Especialidad / rubro
        </label>
        <input
          type="text"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          placeholder="Ej: plomero, electricista"
          list="profesionales-rubros"
          className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        />
        <datalist id="profesionales-rubros">
          {OFICIOS_SEO.map((o) => (
            <option key={o.slug} value={o.nombre} />
          ))}
        </datalist>
      </div>
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
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
  );
}
