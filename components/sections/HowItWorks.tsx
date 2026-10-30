import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/content/howItWorks";
import { whatsappLink } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-[19px] py-16 sm:py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[4fr_7fr]">
        <Reveal>
          <h2 data-split className="text-[clamp(30px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-strong">
            Como funciona: da simulação ao repasse
          </h2>
          <p className="mt-5 text-pretty text-muted">
            Cada proposta segue o mesmo caminho, com as cores da esteira contando em que ponto ela está. Ninguém precisa perguntar — o sistema avisa.
          </p>
          <Button href={whatsappLink("Olá, quero entender como o eCorban funciona na prática.")} external arrow className="mt-8">
            Falar com especialista
          </Button>
        </Reveal>

        {/* Linha do tempo: a barra enche e os passos acendem conforme a rolagem. */}
        <div data-steps className="rounded-2xl bg-page-alt p-4 ring-1 ring-line/50 sm:p-6">
          <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-line/60" aria-hidden="true">
            <div data-steps-line className="h-full origin-left rounded-full" style={{ background: `linear-gradient(90deg, ${steps.map((s) => s.color).join(", ")})` }} />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title} data-step className="flex h-full gap-4 rounded-xl bg-surface p-5 shadow-sm">
                <span data-step-dot className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold ${step.dark ? "text-[#111827]" : "text-white"}`} style={{ background: step.color }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-strong">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
