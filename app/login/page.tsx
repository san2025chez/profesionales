"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-base px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-md space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Bienvenido de vuelta
          </p>
          <h1 className="text-3xl font-semibold">Inicia sesión</h1>
          <p className="text-sm text-slate-300">
            Accede a tu panel para gestionar tu perfil profesional.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-slate-700/60 bg-card/80 p-8 shadow-xl shadow-slate-950/30"
        >
          <div className="space-y-2">
            <label className="text-sm text-slate-200">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-200">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-primary/70 focus:outline-none"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-300">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold text-accent transition hover:text-accent/90"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
