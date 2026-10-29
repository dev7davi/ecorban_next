"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AppWindow, StatusPill } from "@/components/mockups/AppWindow";
import { Bars } from "@/components/mockups/Charts";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/Check";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { modules } from "@/content/modules";
import { whatsappLink } from "@/content/site";

export function Modules() {
  const [active, setActive] = useState(0);
  const m = modules[active];

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
          <AnimatePresence mode="wait">
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14"
            >
              <div>
                <h3 className="text-[clamp(24px,3vw,32px)] leading-tight font-semibold tracking-[-0.02em] text-strong">{m.title}</h3>
                <p className="mt-4 text-pretty text-muted">{m.text}</p>
                <CheckList items={m.bullets} className="mt-6" />
                <Button href={whatsappLink(`Olá, quero ver o módulo ${m.title} do eCorban na minha operação.`)} external arrow className="mt-8">
                  Quero ver na minha operação
                </Button>
              </div>

              <div className="relative pb-10 lg:pb-0">
                <AppWindow title={m.title}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{m.title}</span>
                    <span className="h-5 w-24 rounded bg-white dark:bg-neutral-900" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-5 lg:grid-cols-1 xl:grid-cols-5">
                    <div className="flex flex-col gap-2 sm:col-span-3 lg:col-span-1 xl:col-span-3">
                      {m.rows.map(([label, status, color]) => (
                        <div key={label} className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5 shadow-sm dark:bg-neutral-900">
                          <span className="truncate text-xs font-semibold text-neutral-800 dark:text-neutral-100">{label}</span>
                          <StatusPill label={status} color={color} />
                        </div>
                      ))}
                    </div>
                    <div className="hidden rounded-lg bg-white p-3 shadow-sm sm:col-span-2 sm:flex sm:flex-col lg:hidden xl:flex dark:bg-neutral-900">
                      <span className="text-[10px] text-neutral-500">Últimas semanas</span>
                      <Bars values={[30, 52, 45, 68, 58, 80, 72, 95]} className="mt-auto h-24" />
                    </div>
                  </div>
                </AppWindow>
                <div className="absolute bottom-0 -left-2 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[0_16px_40px_rgba(17,24,39,.15)] ring-1 ring-line/50 sm:-left-6 lg:-bottom-6">
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
