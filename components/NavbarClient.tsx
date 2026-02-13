"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "@/components/icons";
import SignOutButton from "./SignOutButton";
import NavbarMenu from "./NavbarMenu";
import type { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
  isAdmin: boolean;
};

export default function NavbarClient({ user, isAdmin }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
      {/* Barra principal: compacta en mobile */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6 lg:py-4">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold text-stone-800 lg:text-lg"
        >
          Profesionales y Oficios
        </Link>

        {/* Desktop: links visibles */}
        <div className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Inicio
          </Link>
          <Link
            href="/profesionales"
            className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Profesionales
          </Link>
          <NavbarMenu />
        </div>

        {/* Desktop: auth */}
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
              >
                Mi panel
              </Link>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="rounded-full border border-teal-500 px-4 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  Admin
                </Link>
              ) : null}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-teal-500"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
              >
                Registrarme
              </Link>
            </>
          )}
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-stone-600 transition hover:bg-stone-100 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile: menú desplegable */}
      {open && (
        <div className="border-t border-stone-200 bg-white lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-stone-700 hover:bg-stone-100"
            >
              Inicio
            </Link>
            <Link
              href="/profesionales"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-stone-700 hover:bg-stone-100"
            >
              Profesionales
            </Link>
            <div className="mt-4 flex gap-2 border-t border-stone-200 pt-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-white"
                  >
                    Mi panel
                  </Link>
                  {isAdmin ? (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-lg border border-stone-300 py-3 text-center text-sm font-semibold text-stone-700"
                    >
                      Admin
                    </Link>
                  ) : null}
                  <SignOutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-stone-300 py-3 text-center text-sm font-semibold text-stone-700"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-primary py-3 text-center text-sm font-semibold text-white"
                  >
                    Registrarme
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
