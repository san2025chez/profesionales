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
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="mx-auto w-full max-w-md space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
            Bienvenido de vuelta
          </p>
          <h1 className="text-3xl font-semibold text-stone-800">Inicia sesión</h1>
          <p className="text-sm text-stone-600">
            Accede a tu panel para gestionar tu perfil profesional.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-md"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-stone-700">Contraseña</label>
              <Link
                href="/recuperar-contrasena"
                className="text-xs font-medium text-teal-600 transition hover:text-teal-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal-600 transition hover:text-teal-500"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}
