"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/actualizar-contrasena`
        : "";

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
        <div className="w-full max-w-md space-y-6 rounded-3xl border-2 border-stone-200 bg-white p-8 text-center shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
            <svg
              className="h-7 w-7 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-stone-800">
            Revisá tu correo
          </h1>
          <p className="text-sm text-stone-600">
            Te enviamos un enlace a <strong className="text-stone-800">{email}</strong> para
            recuperar tu contraseña. Revisá la carpeta de spam si no lo ves.
          </p>
          <Link
            href="/login"
            className="inline-flex w-full justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
            ¿Olvidaste tu contraseña?
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-800">
            Recuperar contraseña
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Ingresá tu correo y te enviamos un enlace para crear una nueva.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-md"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-stone-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="tu@email.com"
              autoComplete="email"
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
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600">
          <Link
            href="/login"
            className="font-semibold text-teal-600 transition hover:text-teal-500"
          >
            ← Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
