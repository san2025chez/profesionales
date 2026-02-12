"use client";

import { useState, useMemo } from "react";
import {
  JUJUY_DEPARTMENTS,
  JUJUY_LOCALITIES,
  getLocalitiesByDepartment,
  getDepartmentByLocality,
} from "@/lib/locations-jujuy";

type Props = {
  defaultLocality?: string | null;
};

export default function LocalitySelect({ defaultLocality }: Props) {
  const initialLoc = defaultLocality ?? "";
  const initialDept = initialLoc ? getDepartmentByLocality(initialLoc) ?? "" : "";

  const [departamento, setDepartamento] = useState(initialDept);
  const [localidad, setLocalidad] = useState(initialLoc);

  const opciones = useMemo(() => {
    if (!departamento) return JUJUY_LOCALITIES;
    return getLocalitiesByDepartment(departamento);
  }, [departamento]);

  const handleDeptChange = (dept: string) => {
    setDepartamento(dept);
    setLocalidad("");
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <label className="text-sm text-slate-200">Departamento</label>
        <select
          value={departamento}
          onChange={(e) => handleDeptChange(e.target.value)}
          className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
        >
          <option value="">Todos (filtrar localidad)</option>
          {JUJUY_DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm text-slate-200">Ciudad / localidad / pueblo</label>
        <select
          name="locality"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
        >
          <option value="">Seleccionar localidad</option>
          {opciones.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
