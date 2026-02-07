import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { directoryCategories } from "@/lib/categories";
import { JUJUY_LOCALITIES, JUJUY_PROVINCE } from "@/lib/locations-jujuy";
import ImageUploader from "@/components/ImageUploader";
import PlanFields from "@/components/PlanFields";
import { createSubscription, upsertProfessional } from "./actions";
import SignOutButton from "@/components/SignOutButton";

type DashboardPageProps = {
  searchParams?: Promise<{ saved?: string; error?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: professional } = await supabase
    .from("professionals")
    .select(
      "name, category, description, image_url, location, contact, subscription_status, subscription_end, is_featured, country, province, locality, plan, link_whatsapp, redes_sociales, gallery_images, license_number"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const isSaved = resolvedSearchParams?.saved === "1";
  const hasError = resolvedSearchParams?.error;

  return (
    <main className="min-h-screen bg-base px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">
                Dashboard
              </p>
              <h1 className="text-3xl font-semibold">Tu perfil profesional</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-slate-600/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary/60"
              >
                Volver al listado
              </Link>
              <SignOutButton />
            </div>
          </div>
          <p className="text-sm text-slate-300">
            Completa tu perfil para que más personas puedan encontrarte.
          </p>
        </header>

        {isSaved ? (
          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
            Perfil actualizado correctamente.
          </div>
        ) : null}
        {hasError ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            Ocurrió un problema al guardar. Revisa los campos requeridos.
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <form action={createSubscription}>
            <button
              type="submit"
              className="rounded-2xl bg-accent px-6 py-3 text-xs font-semibold text-slate-900 transition hover:bg-accent/90"
            >
              Activar plan premium
            </button>
          </form>
          {professional?.subscription_status ? (
            <span className="text-xs text-slate-400">
              Estado actual: {professional.subscription_status}
            </span>
          ) : null}
        </div>

        <form
          action={upsertProfessional}
          className="grid gap-6 rounded-3xl border border-slate-700/60 bg-card/80 p-8 shadow-xl shadow-slate-950/30"
        >
          <PlanFields
            defaultPlan={professional?.plan ?? "free"}
            defaultWhatsapp={professional?.link_whatsapp ?? null}
            defaultSocialLinks={professional?.redes_sociales ?? null}
            defaultGallery={professional?.gallery_images ?? null}
            defaultLicense={professional?.license_number ?? null}
          />
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">Nombre *</label>
            <input
              name="name"
              required
              defaultValue={professional?.name ?? ""}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">Categoría *</label>
            <select
              name="category"
              required
              defaultValue={professional?.category ?? ""}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            >
              <option value="">Seleccionar categoría</option>
              {directoryCategories.flatMap((group) =>
                group.items.map((item) => (
                  <option key={`${group.label}-${item}`} value={item}>
                    {item}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">Descripción *</label>
            <textarea
              name="description"
              required
              rows={5}
              defaultValue={professional?.description ?? ""}
              placeholder="Cuenta tu experiencia, especialidad y servicios."
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">Imagen</label>
            <ImageUploader
              userId={user.id}
              initialUrl={professional?.image_url ?? null}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">País</label>
            <input
              name="country"
              defaultValue={professional?.country ?? "Argentina"}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">Provincia</label>
            <select
              name="province"
              defaultValue={professional?.province ?? JUJUY_PROVINCE}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            >
              <option value={JUJUY_PROVINCE}>{JUJUY_PROVINCE}</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">Localidad</label>
            <select
              name="locality"
              defaultValue={professional?.locality ?? ""}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            >
              <option value="">Seleccionar localidad</option>
              {JUJUY_LOCALITIES.map((locality) => (
                <option key={locality} value={locality}>
                  {locality}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-200">
              Contacto (teléfono o WhatsApp)
            </label>
            <input
              name="contact"
              defaultValue={professional?.contact ?? ""}
              placeholder="+34 600 123 456"
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Guardar perfil
          </button>
        </form>
      </div>
    </main>
  );
}
