import { ArrowDownTrayIcon, BanknotesIcon, CheckIcon, ChevronDownIcon, DocumentCheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { AreaChart, Donut } from "@/components/mockups/Charts";
import { Counter } from "@/components/ui/Counter";
import { LeadForm } from "@/components/ui/LeadForm";
import { Ring } from "@/components/ui/Ring";
import { hero } from "@/content/hero";

function MonthPill() {
  return (
    <span className="mt-2 inline-flex items-center gap-1 rounded border border-line px-2 py-0.5 text-[11px] text-muted">
      Out 2026 <ChevronDownIcon className="size-3" />
    </span>
  );
}

const panel = "rounded-2xl bg-surface p-5 shadow-[0_20px_50px_-12px_rgba(39,81,197,.18)] ring-1 ring-line/60";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-linear-to-b from-brand-50 via-brand-50/60 to-page px-4 pt-16 pb-20 sm:px-8 sm:pt-20 dark:from-brand-950 dark:via-page">
      {/* Círculos decorativos de fundo */}
      <div aria-hidden="true" data-speed="-0.25" className="pointer-events-none absolute top-24 left-[calc(50%-450px)] size-[900px] rounded-full bg-white/50 dark:bg-white/[.02]" />
      <div aria-hidden="true" data-speed="0.4" className="pointer-events-none absolute top-[-200px] right-[-200px] size-[520px] rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-900/30" />
      <Ring size={620} thickness={96} className="top-[38%] -left-72" />
      <Ring size={420} thickness={70} tone="soft" className="-top-24 -right-28" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div data-hero-badge className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-2 text-sm font-semibold text-strong shadow-sm">
            <span className="grid size-5 place-items-center rounded-full bg-pipe-averbado">
              <CheckIcon className="size-3 text-white" strokeWidth={3.5} />
            </span>
            {hero.badge}
          </div>

          <h1 aria-label={`${hero.titleStart} ${hero.titleHighlight}`} className="mt-6 text-[clamp(36px,5.4vw,60px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance text-strong [perspective:600px]">
            {hero.titleStart.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true">
                <span data-hero-word className="inline-block">
                  {w}
                </span>{" "}
              </span>
            ))}
            <span aria-hidden="true" data-hero-word className="relative inline-block whitespace-nowrap text-brand-600 dark:text-brand-300">
              {hero.titleHighlight}
              <svg viewBox="0 0 400 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full">
                <path data-hero-underline pathLength={1} d="M3 9 C60 2, 110 12, 170 6 S300 3, 397 8" fill="none" stroke="#fb923c" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p data-hero-sub className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
            {hero.subtitle}
          </p>

          <div data-hero-form className="mt-8 flex w-full justify-center">
            <LeadForm />
          </div>
        </div>

        {/* Cards de números flutuando nas laterais (desktop). O invólucro recebe o GSAP; o interno, a flutuação CSS. */}
        <div data-hero-float data-speed="0.6" className="absolute top-[46%] left-0 hidden xl:block">
          <div aria-hidden="true" className={`${panel} animate-floaty`}>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-brand-50 dark:bg-brand-950">
                <DocumentCheckIcon className="size-6 text-brand-600" />
              </span>
              <div>
                <div className="text-2xl font-bold text-strong">
                  <Counter value={1284} />
                </div>
                <div className="text-sm font-medium text-brand-600 dark:text-brand-300">Propostas pagas</div>
              </div>
            </div>
            <MonthPill />
          </div>
        </div>
        <div data-hero-float data-speed="1" className="absolute top-[40%] right-0 hidden xl:block">
          <div aria-hidden="true" className={`${panel} animate-floaty-slow`}>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-green-50 dark:bg-green-950">
                <BanknotesIcon className="size-6 text-success" />
              </span>
              <div>
                <div className="text-2xl font-bold text-strong">R$ 2,4 mi</div>
                <div className="text-sm font-medium text-success">Comissões repassadas</div>
              </div>
            </div>
            <MonthPill />
          </div>
        </div>

        {/* Painéis do dashboard */}
        <div aria-hidden="true" className="mt-14 grid gap-5 [perspective:1200px] md:grid-cols-12 md:items-end">
          <div data-hero-panel className={`${panel} md:col-span-5 md:translate-y-8`}>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold text-strong">Visão do mês</span>
              <div className="hidden items-center gap-3 text-xs text-muted sm:flex">
                <span className="flex items-center gap-1">
                  <span className="size-3 rounded-sm border border-line" /> Meta
                </span>
                <span className="flex items-center gap-1">
                  <span className="grid size-3 place-items-center rounded-sm bg-brand-600">
                    <CheckIcon className="size-2 text-white" strokeWidth={4} />
                  </span>
                  Mostrar valores
                </span>
                <EllipsisVerticalIcon className="size-4" />
              </div>
            </div>
            <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
              <Donut value={87} color="#2751c5" label="Meta do mês" />
              <Donut value={62} color="#22c55e" label="Averbadas" />
              <Donut value={34} color="#f59e0b" label="Em análise" />
            </div>
          </div>

          <div data-hero-panel className={`${panel} md:col-span-7`}>
            <div className="mb-12 flex items-start justify-between gap-4">
              <div>
                <div className="font-bold text-strong">Propostas digitadas</div>
                <div className="text-xs text-muted">Últimos 7 dias · todas as lojas</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-300">
                <ArrowDownTrayIcon className="size-3.5" /> Exportar
              </span>
            </div>
            <AreaChart />
          </div>
        </div>
      </div>
    </section>
  );
}
