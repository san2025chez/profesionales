"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import {
  JUJUY_DEPARTMENTS,
  JUJUY_LOCALITIES,
  getLocalitiesByDepartment,
} from "@/lib/locations-jujuy";
import { OFICIOS_SEO } from "@/lib/seo-data";

export default function ProfesionalesSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [especialidad, setEspecialidad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [localidad, setLocalidad] = useState("");

  useEffect(() => {
    setEspecialidad(searchParams.get("especialidad") ?? "");
    setDepartamento(searchParams.get("departamento") ?? "");
    setLocalidad(searchParams.get("localidad") ?? "");
  }, [searchParams]);

  const localidadesOpciones = useMemo(() => {
    if (!departamento) return JUJUY_LOCALITIES;
    return getLocalitiesByDepartment(departamento);
  }, [departamento]);

  const handleDepartamentoChange = (dept: string) => {
    setDepartamento(dept);
    setLocalidad("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (especialidad.trim()) params.set("especialidad", especialidad.trim());
    else params.delete("especialidad");
    if (departamento.trim()) params.set("departamento", departamento.trim());
    else params.delete("departamento");
    if (localidad.trim()) params.set("localidad", localidad.trim());
    else params.delete("localidad");
    const query = params.toString();
    router.push(query ? `/profesionales?${query}` : "/profesionales");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:items-end"
    >
      <div className="lg:col-span-2">
        <label className="mb-1.5 block text-sm font-medium text-stone-700">
          Especialidad / rubro
        </label>
        <input
          type="text"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          placeholder="Ej: plomero, electricista"
          list="profesionales-rubros"
          className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-stone-800 shadow-sm placeholder:text-stone-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        />
        <datalist id="profesionales-rubros">
          {OFICIOS_SEO.map((o) => (
            <option key={o.slug} value={o.nombre} />
          ))}
        </datalist>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-stone-700">
          Departamento
        </label>
        <select
          value={departamento}
          onChange={(e) => handleDepartamentoChange(e.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-stone-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        >
          <option value="">Todos</option>
          {JUJUY_DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-stone-700">
          Ciudad / localidad / pueblo
        </label>
        <select
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-stone-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
        >
          <option value="">
            {departamento ? "Todas del departamento" : "Todas"}
          </option>
          {localidadesOpciones.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3 font-semibold text-white transition hover:bg-teal-500 sm:col-span-2 lg:col-span-1"
      >
        <SearchIcon className="h-5 w-5" />
        Buscar
      </button>
    </form>
  );
}
