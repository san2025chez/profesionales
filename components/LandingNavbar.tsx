"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SearchIcon,
  UsersIcon,
  HelpCircleIcon,
  MailIcon,
  MenuIcon,
  XIcon,
} from "@/components/icons";
import { useState } from "react";

const LINKS = [
  { href: "/#inicio", label: "Inicio", icon: SearchIcon },
  { href: "/#como-funciona", label: "Cómo funciona", icon: HelpCircleIcon },
  { href: "/profesionales", label: "Profesionales", icon: UsersIcon },
  { href: "/#contacto", label: "Contacto", icon: MailIcon },
];

export default function LandingNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.split("#")[1];
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
    if (href === "/profesionales") setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/10 bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          Profesionales y Oficios
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800/60 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-500"
          >
            Registrarme
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          aria-label="Menú"
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/10 bg-slate-900 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="mt-4 flex gap-2 border-t border-slate-700 pt-4">
              <Link
                href="/login"
                className="flex-1 rounded-lg border border-slate-600 py-2.5 text-center text-sm font-medium text-slate-300"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="flex-1 rounded-lg bg-teal-600 py-2.5 text-center text-sm font-medium text-white"
              >
                Registrarme
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
