import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/70 bg-base/90 px-6 py-8 text-sm text-slate-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-center">
        <p>
          Todos los derechos reservados. Creado por{" "}
          <Link
            href="https://adasoft.com.ar/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent transition hover:text-accent/90"
          >
            ADASOFT
          </Link>
          .
        </p>
        <p className="text-xs text-slate-500">Perico, Jujuy, Argentina</p>
      </div>
    </footer>
  );
}
