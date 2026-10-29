import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";

export function GetStarted() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-brand-50 to-brand-100 px-4 py-20 sm:px-8 dark:from-brand-950 dark:to-page-alt">
      <Ring size={380} thickness={72} className="-top-28 left-[58%]" />
      <Ring size={220} thickness={44} tone="soft" className="-bottom-28 left-[8%]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Foto da equipe com gradiente da marca */}
        <Reveal className="relative">
          <Ring size={200} thickness={40} tone="soft" className="-top-12 -left-12" />
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(39,81,197,.45)] ring-8 ring-white/70 dark:ring-white/5">
            <Image src="/images/equipe.jpg" alt="Equipe de uma promotora de crédito conversando em volta de um notebook" fill sizes="(min-width:1024px) 540px, 92vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-brand-900/70 via-brand-700/15 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white sm:bottom-6 sm:left-6">
              Toda a equipe na mesma esteira,
              <br className="hidden sm:block" /> do primeiro dia.
            </div>
          </div>
          <div data-float-ring className="absolute -right-3 -top-5 flex items-center gap-2 rounded-full bg-surface py-2 pr-4 pl-2 text-sm font-semibold text-strong shadow-[0_14px_32px_rgba(17,24,39,.18)] sm:-right-6">
            <CheckBadgeIcon className="size-7 text-pipe-averbado" />
            7 dias grátis
          </div>
        </Reveal>

        <div>
          <h2 data-split className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-strong">
            Comece hoje com o eCorban
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted">
            7 dias de acesso completo a todos os módulos. Sem compromisso — e com modelos de planilha para trazer a sua base.
          </p>
          <LeadForm className="mt-8" />
        </div>
      </div>
    </section>
  );
}
