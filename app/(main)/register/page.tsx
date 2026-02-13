"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const supabase = createSupabaseBrowserClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      const msg = signUpError.message.toLowerCase();
      if (
        msg.includes("already registered") ||
        msg.includes("user already") ||
        msg.includes("ya está registrado") ||
        signUpError.status === 422
      ) {
        setError(
          "Este correo ya está registrado. Iniciá sesión o recuperá tu contraseña si no la recordás."
        );
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="mx-auto w-full max-w-md space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
            Crea tu cuenta
          </p>
          <h1 className="text-3xl font-semibold text-stone-800">Regístrate</h1>
          <p className="text-sm text-stone-600">
            Accede al dashboard y publica tu perfil profesional.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border-2 border-stone-200 bg-white p-8 shadow-md"
        >
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
            Ingresa tu correo y crea una contraseña para registrarte.
          </div>
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
            <label className="text-sm font-medium text-stone-700">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-medium">{error}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-teal-600 underline transition hover:text-teal-500"
                >
                  Iniciar sesión
                </Link>
                <span className="text-amber-600">·</span>
                <Link
                  href="/recuperar-contrasena"
                  className="text-xs font-semibold text-teal-600 underline transition hover:text-teal-500"
                >
                  Recuperar contraseña
                </Link>
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-teal-600 transition hover:text-teal-500"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>

      {success ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 px-6 py-10 backdrop-blur-sm">
          <div className="w-full max-w-md space-y-4 rounded-3xl border-2 border-stone-200 bg-white p-8 text-center shadow-xl">
            <h2 className="text-2xl font-semibold text-stone-800">
              Registro exitoso
            </h2>
            <p className="text-sm text-stone-600">
              Verifica tu correo para confirmar la cuenta y luego inicia sesión.
            </p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
