import { BanknotesIcon, CheckIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";
import { site, whatsappLink } from "@/content/site";

const bullets = ["7 dias de acesso completo a todos os módulos", "Migração da base por planilha, com modelos prontos", "Todos os módulos incluídos em qualquer plano"];

// Fecha a página: junta o convite "Comece hoje" com o CTA final, em fundo escuro com anéis clarinhos flutuando
// nas quatro margens e cartões do sistema (mesmo elenco dos mockups) em volta da foto da equipe.
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#25314a] px-[19px] py-16 sm:px-8 sm:py-24">
      {/* Anéis bem clarinhos nas margens: esquerda, direita, superior e inferior */}
      <Ring size={460} thickness={72} tone="faint" className="top-1/4 -left-56" />
      <Ring size={520} thickness={84} tone="faint" className="top-1/3 -right-64" />
      <Ring size={360} thickness={56} tone="faint" className="-top-44 left-[38%]" />
      <Ring size={420} thickness={64} tone="faint" className="-bottom-52 left-[12%]" />
      <Ring size={300} thickness={48} tone="faint" className="-right-24 -bottom-40 max-lg:hidden" />
      <Ring size={240} thickness={40} tone="faint" className="-top-24 -left-20 max-lg:hidden" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15">
            <span className="size-1.5 rounded-full bg-pipe-averbado" />
            Teste grátis por 7 dias
          </span>
          <h2 data-split className="mt-5 text-[clamp(30px,4.4vw,46px)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-white">
            Pronto para organizar a sua operação?
          </h2>
          <p className="mt-5 max-w-xl text-lg text-pretty text-neutral-300">
            Converse com quem entende de Corban. A gente mostra o sistema com a sua realidade e ajuda a trazer a sua base de clientes e propostas por planilha.
          </p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] font-medium text-white">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600">
                  <CheckIcon className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsappLink()} external arrow size="lg">
              Falar com especialista
            </Button>
            <Button href={site.trialUrl} external variant="ghost-dark" size="lg">
              Começar teste grátis
            </Button>
          </div>
        </Reveal>

        {/* Foto da equipe com cartões do sistema flutuando */}
        <Reveal className="relative mx-auto w-full max-w-[520px] pb-8 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,.55)] ring-1 ring-white/15">
            <Image src="/images/equipe.jpg" alt="Equipe de uma promotora de crédito conversando em volta de um notebook" fill sizes="(min-width:1024px) 520px, 92vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-brand-900/55 via-transparent to-transparent" />
          </div>

          <div className="animate-floaty absolute -top-4 right-2 flex items-center gap-2.5 rounded-xl bg-white py-2 pr-4 pl-2 shadow-[0_14px_32px_rgba(0,0,0,.3)] sm:-right-5">
            <Image src="/pessoas/marina.jpg" alt="" width={30} height={30} className="size-[30px] shrink-0 rounded-full object-cover ring-2 ring-[#ec4899]" />
            <span className="text-xs leading-tight">
              <b className="flex items-center gap-1 text-[#111827]">
                <FlagIcon className="size-3.5 text-brand-600" /> Marina bateu a meta
              </b>
              <span className="text-[#6b7280]">112% · Outubro</span>
            </span>
          </div>

          <div className="animate-floaty-slow absolute bottom-0 left-2 flex items-center gap-2.5 rounded-xl bg-white py-2 pr-4 pl-2 shadow-[0_14px_32px_rgba(0,0,0,.3)] sm:-left-6">
            <span className="grid size-[30px] place-items-center rounded-full bg-[#dcfce7] text-[#16a34a]">
              <BanknotesIcon className="size-4" />
            </span>
            <span className="text-xs leading-tight">
              <b className="block text-[#111827]">Repasse gerado</b>
              <span className="text-[#6b7280]">R$ 4.820,00 · Marina Souza</span>
            </span>
          </div>

          <div className="absolute right-3 -bottom-1 rounded-lg bg-[#f97316] px-3.5 py-2 text-xs font-bold text-white shadow-[0_14px_32px_rgba(0,0,0,.3)] sm:-right-3">Equipe ao Vivo · 3 ativos</div>
        </Reveal>
      </div>
    </section>
  );
}
