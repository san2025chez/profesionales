"use client";

import { MailIcon, MapPinIcon, MessageCircleIcon } from "@/components/icons";

export default function ContactoSection() {
  return (
    <section
      id="contacto"
      className="scroll-mt-20 bg-stone-50 px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-stone-800">
          Contacto
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-stone-600">
          Si tenés sugerencias, consultas o necesitás ayuda, escribinos.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          <a
            href="mailto:softadait@gmail.com"
            className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm transition hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">
              <MailIcon className="h-7 w-7 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-800">Email</h3>
              <p className="mt-1 text-sm text-stone-600">
                softadait@gmail.com
              </p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">
              <MapPinIcon className="h-7 w-7 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-800">Ubicación</h3>
              <p className="mt-1 text-sm text-stone-600">
                Perico, Jujuy, Argentina
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5493881234567"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm transition hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">
              <MessageCircleIcon className="h-7 w-7 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-800">WhatsApp</h3>
              <p className="mt-1 text-sm text-stone-600">
                Enviar mensaje
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
