"use client";

import { MailIcon, MapPinIcon, MessageCircleIcon } from "@/components/icons";

export default function ContactoSection() {
  return (
    <section
      id="contacto"
      className="bg-slate-950 px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white">
          Contacto
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-slate-400">
          Si tenés sugerencias, consultas o necesitás ayuda, escribinos.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <a
            href="mailto:softadait@gmail.com"
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center transition hover:border-teal-500/40 hover:bg-slate-800/60"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600/20">
              <MailIcon className="h-7 w-7 text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Email</h3>
              <p className="mt-1 text-sm text-slate-400">
                softadait@gmail.com
              </p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600/20">
              <MapPinIcon className="h-7 w-7 text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Ubicación</h3>
              <p className="mt-1 text-sm text-slate-400">
                Perico, Jujuy, Argentina
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5493881234567"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8 text-center transition hover:border-teal-500/40 hover:bg-slate-800/60"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600/20">
              <MessageCircleIcon className="h-7 w-7 text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">WhatsApp</h3>
              <p className="mt-1 text-sm text-slate-400">
                Enviar mensaje
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
