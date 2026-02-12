import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { deleteProfessionalById } from "./actions";

type AdminPageProps = {
  searchParams?: Promise<{ deleted?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: roleRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (roleRow?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: professionals, error } = await supabase
    .from("professionals")
    .select("id, name, category, user_id")
    .order("name", { ascending: true });

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const isDeleted = resolvedSearchParams?.deleted === "1";

  return (
    <main className="min-h-screen bg-base px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Panel admin
          </p>
          <h1 className="text-3xl font-semibold">Profesionales registrados</h1>
          <p className="text-sm text-slate-300">
            Controla y elimina perfiles si es necesario.
          </p>
        </header>

        {isDeleted ? (
          <div className="rounded-2xl border border-slate-500/40 bg-slate-800/60 p-4 text-sm text-slate-200">
            Perfil eliminado correctamente.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            No se pudieron cargar los profesionales.
          </div>
        ) : (
          <div className="grid gap-4">
            {(professionals ?? []).map((professional) => (
              <div
                key={professional.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-700/60 bg-card/80 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {professional.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {professional.category} · {professional.user_id}
                  </p>
                </div>
                <form action={deleteProfessionalById}>
                  <input
                    type="hidden"
                    name="professional_id"
                    value={professional.id}
                  />
                  <button
                    type="submit"
                    className="rounded-2xl border border-red-500/60 px-4 py-2 text-xs font-semibold text-red-300 transition hover:border-red-400 hover:text-red-200"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
