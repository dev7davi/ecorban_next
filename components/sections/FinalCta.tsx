import { CheckIcon } from "@heroicons/react/24/outline";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";
import { site, whatsappLink } from "@/content/site";

const bullets = ["7 dias de acesso completo a todos os módulos", "Migração da base por planilha, com modelos prontos", "Todos os módulos incluídos em qualquer plano"];

/**
 * Fecha a página: painel azul arredondado com o texto à esquerda e, à direita, um celular com o sistema se mexendo.
 * O painel ocupa quase a largura toda da tela. O celular mostra 2/3 dele; o 1/3 de baixo fica "dentro" do painel
 * (a coluna do celular tem overflow-hidden e o celular desce 1/3 da própria altura).
 */
export function FinalCta() {
  return (
    <section className="px-[19px] py-16 sm:px-8 sm:py-24 lg:px-[3vw]">
      <div className="relative mx-auto max-w-[1600px]">
        {/* Painel com o fundo, o círculo grande atrás do celular e os anéis */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[32px] bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 shadow-[0_40px_80px_-40px_rgba(15,28,61,.7)]">
          <div className="absolute -right-24 -bottom-40 size-[560px] rounded-full bg-white/[.07] max-lg:top-[46%] max-lg:right-1/2 max-lg:translate-x-1/2 lg:right-[2%] lg:-bottom-56" />
          <div className="absolute -right-6 -bottom-20 size-[400px] rounded-full bg-white/[.06] max-lg:hidden" />
          <Ring size={360} thickness={56} tone="onphoto" className="-top-40 -left-32" />
          <Ring size={220} thickness={36} tone="onphoto" className="-bottom-24 left-[38%] max-lg:hidden" />
        </div>

        <div className="relative grid lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="flex flex-col items-start px-6 pt-12 pb-10 sm:px-12 sm:pt-14 lg:py-20 lg:pr-4 lg:pl-[clamp(56px,6vw,120px)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
              <span className="size-1.5 rounded-full bg-pipe-averbado" />
              Teste grátis por 7 dias
            </span>
            <h2 data-split className="mt-5 text-[clamp(30px,4vw,48px)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-white">
              Pronto para organizar a sua operação?
            </h2>
            <p className="mt-5 max-w-lg text-[17px] text-pretty text-brand-100">
              Converse com quem entende de Corban. A gente mostra a nova versão com a sua realidade e ajuda a trazer a sua base de clientes e propostas por
              planilha.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] font-medium text-white">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/30">
                    <CheckIcon className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappLink()} external arrow variant="white" size="lg">
                Falar com especialista
              </Button>
              <Button href={site.trialUrl} external variant="ghost-dark" size="lg">
                Começar teste grátis
              </Button>
            </div>
          </Reveal>

          {/* Celular: 2/3 à mostra, o 1/3 de baixo escondido dentro do painel */}
          <div className="relative h-[500px] overflow-hidden max-[420px]:h-[420px] rounded-b-[32px] lg:h-auto lg:min-h-[520px] lg:rounded-br-[32px] lg:rounded-bl-none">
            <div className="absolute bottom-0 left-1/2 origin-bottom -translate-x-1/2 translate-y-1/3 max-[420px]:scale-[0.84]">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
