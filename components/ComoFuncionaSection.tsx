"use client";

import Image from "next/image";
import {
  SearchIcon,
  UsersIcon,
  MessageCircleIcon,
  CheckCircle2Icon,
  CheckIcon,
  ChevronRightIcon,
} from "@/components/icons";
import Link from "next/link";

const STEPS = [
  {
    icon: SearchIcon,
    title: "Buscá un servicio",
    desc: "Indicá el rubro que necesitás y tu departamento o localidad.",
  },
  {
    icon: UsersIcon,
    title: "Encontrá profesionales",
    desc: "Revisá perfiles verificados que ofrecen el servicio.",
  },
  {
    icon: MessageCircleIcon,
    title: "Contactá al profesional",
    desc: "Comunicate directo por WhatsApp, teléfono o mail.",
  },
  {
    icon: CheckCircle2Icon,
    title: "Disfrutá del servicio",
    desc: "Acordá el trabajo y recibí el servicio en tu hogar.",
  },
];

const BENEFITS = [
  "Todos los profesionales en un solo lugar",
  "Compará perfiles y habilidades",
  "Revisá opiniones de otros clientes",
  "Contactá directamente al profesional",
];

export default function ComoFuncionaSection() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-20 bg-white px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-stone-800 sm:text-4xl">
          Cómo funciona
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-stone-600">
          Cuatro pasos simples para encontrar al profesional que necesitás.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-stone-200 bg-stone-50/80 p-6 text-center shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mb-1 text-sm font-medium text-teal-600">
                Paso {i + 1}
              </p>
              <h3 className="mb-2 text-lg font-semibold text-stone-800">
                {title}
              </h3>
              <p className="text-sm text-stone-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col items-center rounded-2xl border border-stone-200 bg-stone-50/80 p-8 text-center shadow-sm">
            <h3 className="mb-4 text-2xl font-bold text-stone-800">
              ¿Buscás servicios profesionales?
            </h3>
            <p className="mb-6 text-stone-600">
              Nuestra plataforma te ayuda a encontrar el profesional adecuado
              según tus necesidades. No hay costos ni comisiones por usar la
              aplicación.
            </p>
            <ul className="space-y-3">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-center justify-center gap-3 text-stone-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <CheckIcon className="h-3.5 w-3.5 text-teal-600" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/profesionales"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-500"
            >
              Ver profesionales
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative min-h-[280px] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 aspect-square shadow-sm lg:aspect-auto lg:h-full lg:min-h-0">
            <Image
              src="/images/inicio.png"
              alt="Encontrá profesionales en tu zona"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
