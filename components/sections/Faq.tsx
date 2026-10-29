"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/faq";
import { whatsappLink } from "@/content/site";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="px-[19px] py-16 sm:py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[4fr_7fr]">
        <Reveal>
          <h2 data-split className="text-[clamp(30px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-strong">Perguntas que a gente mais ouve</h2>
          <p className="mt-5 text-pretty text-muted">Não achou a sua? Fale com um especialista — a gente responde pelo WhatsApp.</p>
          <Button href={whatsappLink("Olá, tenho uma dúvida sobre o eCorban.")} external arrow className="mt-8">
            Tirar uma dúvida
          </Button>
        </Reveal>

        <div className="flex flex-col gap-3 rounded-2xl bg-page-alt p-4 ring-1 ring-line/50 sm:p-6">
          {faq.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="rounded-xl bg-surface shadow-sm">
                <h3>
                  <button
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left text-[17px] font-semibold text-strong"
                  >
                    {f.q}
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"}`}>
                      {on ? <MinusIcon className="size-4" /> : <PlusIcon className="size-4" />}
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!on} className="px-5 pb-5 text-muted">
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
