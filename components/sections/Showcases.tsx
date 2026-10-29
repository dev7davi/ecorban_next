import { CommissionMockup, LiveTeamMockup, PipelineMockup } from "@/components/mockups/ShowcaseMockups";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/Check";
import { Ring } from "@/components/ui/Ring";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { showcases } from "@/content/showcases";
import { whatsappLink } from "@/content/site";

const mockups = { esteira: PipelineMockup, "tempo-real": LiveTeamMockup, comissoes: CommissionMockup };

function Arcs() {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 40" className="absolute top-5 right-5 hidden h-10 w-14 text-brand-400 sm:block">
      <path d="M8 34 A26 26 0 0 1 52 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 36 A16 16 0 0 1 50 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

export function Showcases() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 to-brand-100/60 px-4 py-16 sm:py-24 sm:px-8 dark:from-page-alt dark:to-page">
      <Ring size={640} thickness={100} className="-top-40 -right-48" />
      <Ring size={760} thickness={110} className="-bottom-64 -left-56" />
      <Ring size={300} thickness={56} tone="soft" className="top-1/2 -right-24" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle title="Do primeiro contato ao repasse pago, sem planilha no meio" />
        </Reveal>

        {/* Cards empilhados: cada um gruda no topo e encolhe quando o próximo o cobre. */}
        <div data-stack className="mt-14 flex flex-col gap-8">
          {showcases.map((s, i) => {
            const Mockup = mockups[s.id];
            return (
              <div key={s.id} data-stack-card className="lg:sticky" style={{ top: `${96 + i * 24}px` }}>
                <article className="relative grid origin-top items-center gap-10 rounded-2xl bg-surface p-6 shadow-[0_20px_50px_-20px_rgba(39,81,197,.25)] sm:p-10 lg:grid-cols-[5fr_6fr] lg:p-12">
                  <Arcs />
                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-pipe-pendencia dark:bg-red-950/50">{s.pain}</div>
                    <h3 className="text-[clamp(24px,3vw,30px)] leading-tight font-semibold tracking-[-0.02em] text-strong">{s.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{s.text}</p>
                    <CheckList items={s.bullets} className="mt-6" />
                    <Button href={whatsappLink(s.cta.message)} external arrow className="mt-8">
                      {s.cta.label}
                    </Button>
                  </div>
                  <Mockup />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
