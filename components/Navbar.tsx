import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import SignOutButton from "./SignOutButton";
import NavbarMenu from "./NavbarMenu";

export default async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: roleRow } = user
    ? await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle()
    : { data: null };
  const isAdmin = roleRow?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-base/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-lg font-semibold text-white hover:text-white/90">
            Profesionales y Oficios
          </Link>
          <p className="text-xs text-slate-400">
            Encuentra especialistas por categoría o actividad.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Inicio
            </Link>
            <Link
              href="/profesionales"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Profesionales
            </Link>
            <NavbarMenu />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-200">
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
                    className="rounded-full border border-accent/60 px-4 py-2 text-xs font-semibold text-accent transition hover:border-accent/80"
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
