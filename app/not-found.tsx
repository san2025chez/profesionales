import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-base px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-xl space-y-6 rounded-3xl border border-slate-700/60 bg-card/80 p-10 text-center">
        <h1 className="text-3xl font-semibold">Perfil no encontrado</h1>
        <p className="text-sm text-slate-300">
          El profesional que buscas no existe o fue removido.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Volver al listado
        </Link>
      </div>
    </main>
  );
}
