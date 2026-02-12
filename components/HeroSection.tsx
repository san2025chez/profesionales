"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import {
  JUJUY_DEPARTMENTS,
  JUJUY_LOCALITIES,
  getLocalitiesByDepartment,
} from "@/lib/locations-jujuy";
import { OFICIOS_SEO } from "@/lib/seo-data";

export default function HeroSection() {
  const router = useRouter();
  const [rubro, setRubro] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [localidad, setLocalidad] = useState("");

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
    const params = new URLSearchParams();
    if (rubro.trim()) params.set("especialidad", rubro.trim());
    if (departamento.trim()) params.set("departamento", departamento.trim());
    if (localidad.trim()) params.set("localidad", localidad.trim());
    const query = params.toString();
    router.push(query ? `/profesionales?${query}` : "/profesionales");
  };

  return (
    <>
      {/* Hero: imagen a casi pantalla completa en desktop */}
      <section
        id="inicio"
        className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden bg-stone-100 sm:min-h-[85vh] lg:min-h-[92vh]"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/banner.webp"
            alt="Profesionales y oficios en Jujuy"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay suave para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-36 md:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-stone-800 drop-shadow-sm sm:text-4xl md:text-5xl">
              Tu sitio de confianza para encontrar el servicio indicado
            </h1>
            <p className="text-lg text-stone-700 drop-shadow-sm sm:text-xl">
              Encontrá a los mejores profesionales en tu zona.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de búsqueda */}
      <section
        id="buscar"
        className="scroll-mt-20 bg-stone-50 px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-3 text-2xl font-bold text-stone-800 sm:text-3xl">
                Buscá por rubro y ubicación
              </h2>
              <p className="mb-8 text-stone-600">
                Conectamos a vecinos de Jujuy con profesionales y oficios verificados.
                Plomeros, electricistas, carpinteros y más en toda la provincia.
              </p>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg sm:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Rubro o profesión
                    </label>
                    <input
                      type="text"
                      value={rubro}
                      onChange={(e) => setRubro(e.target.value)}
                      placeholder="Ej: plomero, electricista"
                      list="rubros-list"
                      className="w-full rounded-xl border-2 border-stone-400 bg-white px-4 py-3.5 text-stone-800 shadow-sm placeholder:text-stone-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    />
                    <datalist id="rubros-list">
                      {OFICIOS_SEO.map((o) => (
                        <option key={o.slug} value={o.nombre} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Departamento
                    </label>
                    <select
                      value={departamento}
                      onChange={(e) => handleDepartamentoChange(e.target.value)}
                      className="w-full rounded-xl border-2 border-stone-400 bg-white px-4 py-3.5 text-stone-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      <option value="">Todos los departamentos</option>
                      {JUJUY_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">
                      Ciudad / localidad / pueblo
                    </label>
                    <select
                      value={localidad}
                      onChange={(e) => setLocalidad(e.target.value)}
                      className="w-full rounded-xl border-2 border-stone-400 bg-white px-4 py-3.5 text-stone-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                    >
                      <option value="">
                        {departamento ? "Todas del departamento" : "Todas las localidades"}
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-4 font-semibold text-white transition hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 active:scale-[0.99]"
                  >
                    <SearchIcon className="h-5 w-5" />
                    Buscar
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md sm:p-8">
                <h3 className="mb-4 text-lg font-semibold text-stone-800">
                  ¿De qué se trata?
                </h3>
                <p className="mb-4 text-stone-600 leading-relaxed">
                  Profesionales y Oficios es un directorio para encontrar y contactar
                  a plomeros, electricistas, carpinteros, pintores y otros oficios en Jujuy.
                </p>
                <p className="mb-4 text-stone-600 leading-relaxed">
                  Sin costos ni comisiones. Los profesionales se registran y podés
                  contactarlos directo por WhatsApp o teléfono.
                </p>
                <ul className="space-y-2 text-stone-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    Buscá por especialidad y localidad
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    Revisá perfiles antes de contactar
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    100% gratuito para quien busca
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
