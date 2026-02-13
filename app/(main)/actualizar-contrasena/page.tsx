"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function ActualizarContrasenaPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase.auth.getSession();
      setReady(!!data.session);
    };
    check();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error: err } = await supabase.auth.updateUser({ password });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
            Nueva contraseña
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-800">
            Crear contraseña
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Ingresá tu nueva contraseña. Debe tener al menos 6 caracteres.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-md"
        >
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-stone-700"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || !ready}
            className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar contraseña"}
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
