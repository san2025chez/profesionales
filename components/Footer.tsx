import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-amber-50/70 px-6 py-8 text-sm text-stone-600">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-center">
        <p>
          Todos los derechos reservados. Creado por{" "}
          <Link
            href="https://adasoft.com.ar/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-teal-600 transition hover:text-teal-500"
          >
            ADASOFT
          </Link>
          .
        </p>
        <p className="text-xs text-stone-500">Perico, Jujuy, Argentina</p>
      </div>
    </footer>
  );
}
