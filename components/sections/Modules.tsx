"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { moduleScreens } from "@/components/mock/ModuleScreens";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/Check";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { modules } from "@/content/modules";
import { whatsappLink } from "@/content/site";

export function Modules() {
  const [active, setActive] = useState(0);
  const m = modules[active];
  const Screen = moduleScreens[m.id];

  return (
    <section id="solucoes" className="px-[19px] py-16 sm:py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionTitle title="Tudo o que a sua operação de crédito precisa, em um só sistema" />
        </Reveal>

        {/* Abas dos 9 módulos */}
        <div role="tablist" aria-label="Módulos do eCorban" className="-mx-[19px] mt-10 flex snap-x gap-3 overflow-x-auto px-[19px] pb-3 [scrollbar-width:none] sm:mt-12 lg:mx-0 lg:grid lg:grid-cols-9 lg:overflow-visible lg:px-0">
          {modules.map((mod, i) => {
            const on = i === active;
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                role="tab"
                id={`tab-${mod.id}`}
                aria-selected={on}
                aria-controls="painel-modulo"
                onClick={() => setActive(i)}
                className={`flex min-w-28 shrink-0 snap-start flex-col items-center gap-3 rounded-lg border bg-surface px-3 py-5 text-sm font-semibold transition-all duration-200 lg:min-w-0 ${
                  on ? "border-brand-600 text-strong shadow-[0_10px_24px_rgba(39,81,197,.15)]" : "border-transparent text-body shadow-sm ring-1 ring-line/60 hover:text-strong"
                }`}
              >
                <span className={`grid size-12 place-items-center rounded-full transition-colors ${on ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"}`}>
                  <Icon className="size-6" />
                </span>
                {mod.tab}
              </button>
            );
          })}
        </div>

        {/* Painel do módulo ativo */}
        <div id="painel-modulo" role="tabpanel" aria-labelledby={`tab-${m.id}`} className="mt-6 overflow-hidden rounded-2xl bg-page-alt ring-1 ring-line/50">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid items-center gap-10 p-4 sm:p-10 lg:grid-cols-[5fr_7fr] lg:p-12 xl:gap-14"
            >
              <div>
                <h3 className="text-[clamp(24px,3vw,32px)] leading-tight font-semibold tracking-[-0.02em] text-strong">{m.title}</h3>
                <p className="mt-4 text-pretty text-muted">{m.text}</p>
                <CheckList items={m.bullets} className="mt-6" />
                <Button href={whatsappLink(`Olá, quero ver o módulo ${m.title} do eCorban na minha operação.`)} external arrow className="mt-8">
                  Quero ver na minha operação
                </Button>
              </div>

              <div className="relative min-w-0 pb-12 lg:pb-0">
                <Screen />
                <div className="absolute bottom-0 -left-2 z-10 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[0_16px_40px_rgba(17,24,39,.15)] ring-1 ring-line/50 sm:-left-6 lg:-bottom-8">
                  <span className="grid size-10 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                    <m.icon className="size-5" />
                  </span>
                  <div>
                    <div className="text-lg leading-tight font-bold text-strong">{m.highlight.value}</div>
                    <div className="text-xs text-muted">{m.highlight.label}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
