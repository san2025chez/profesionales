import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { directoryCategories } from "@/lib/categories";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-base/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-lg font-semibold text-white">
            Profesionales
          </Link>
          <p className="text-xs text-slate-400">
            Encuentra especialistas por categoría o actividad.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <details className="group relative rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
            <summary className="cursor-pointer list-none font-semibold">
              Categorías
            </summary>
            <div className="absolute left-0 mt-3 w-[min(760px,90vw)] rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-xl shadow-slate-950/40">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {directoryCategories.map((category) => (
                  <div key={category.label} className="space-y-2">
                    <Link
                      href={`/?category=${encodeURIComponent(category.label)}`}
                      className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
                    >
                      {category.label}
                    </Link>
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <Link
                          key={item}
                          href={`/?q=${encodeURIComponent(item)}`}
                          className="block rounded-xl px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800/70 hover:text-white"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>

          <div className="flex items-center gap-2 text-sm text-slate-200">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
                >
                  Mi panel
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-600/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary/60"
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
        </div>
      </div>
    </nav>
  );
}
