import { BanknotesIcon, CheckIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";
import { site, whatsappLink } from "@/content/site";

const bullets = ["7 dias de acesso completo a todos os módulos", "Migração da base por planilha, com modelos prontos", "Todos os módulos incluídos em qualquer plano"];

// Os cartões flutuantes do sistema (mockups) ficam RESERVADOS aqui, desligados por enquanto: mude para true para
// mostrá-los de novo. Eles aparecem nas laterais do bloco central, a partir do desktop (xl).
const SHOW_FLOATING_CARDS = false;

function FloatingCards() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 bottom-0 mx-auto hidden max-w-6xl xl:block">
      <div className="animate-floaty absolute top-[18%] right-0 flex items-center gap-2.5 rounded-xl bg-white py-2 pr-4 pl-2 shadow-[0_14px_32px_rgba(0,0,0,.3)]">
        <Image src="/pessoas/marina.webp" alt="" width={30} height={30} className="size-[30px] shrink-0 rounded-full object-cover ring-2 ring-[#ec4899]" />
        <span className="text-xs leading-tight">
          <b className="flex items-center gap-1 text-[#111827]">
            <FlagIcon className="size-3.5 text-brand-600" /> Marina bateu a meta
          </b>
          <span className="text-[#6b7280]">112% · Outubro</span>
        </span>
      </div>

      <div className="animate-floaty-slow absolute bottom-[20%] left-0 flex items-center gap-2.5 rounded-xl bg-white py-2 pr-4 pl-2 shadow-[0_14px_32px_rgba(0,0,0,.3)]">
        <span className="grid size-[30px] place-items-center rounded-full bg-[#dcfce7] text-[#16a34a]">
          <BanknotesIcon className="size-4" />
        </span>
        <span className="text-xs leading-tight">
          <b className="block text-[#111827]">Repasse gerado</b>
          <span className="text-[#6b7280]">R$ 4.820,00 · Marina Souza</span>
        </span>
      </div>

      <div className="absolute right-[6%] bottom-[12%] rounded-lg bg-[#f97316] px-3.5 py-2 text-xs font-bold text-white shadow-[0_14px_32px_rgba(0,0,0,.3)]">Equipe ao Vivo · 3 ativos</div>
    </div>
  );
}

// Fecha a página. A foto da equipe é o fundo da seção inteira, com um véu azul-escuro por cima para o texto ler bem,
// os anéis flutuantes por cima do véu e todo o conteúdo centralizado.
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden px-[19px] py-20 sm:px-8 sm:py-28 lg:py-36">
      {/* Fundo: foto inteira em cover (sem esticar), com o foco no centro dela */}
      <Image
        src="/images/equipe-notebook.webp"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="-z-20 object-cover object-[55%_40%]"
      />
      {/* Véu: azul-escuro da marca, mais carregado no centro, onde fica o texto */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#16233f]/72" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,26,48,.55),transparent_70%)]" />

      {/* Anéis claros flutuando por cima do fundo, nas quatro margens */}
      <Ring size={460} thickness={72} tone="onphoto" className="top-1/4 -left-56" />
      <Ring size={520} thickness={84} tone="onphoto" className="top-1/3 -right-64" />
      <Ring size={360} thickness={56} tone="onphoto" className="-top-44 left-[38%]" />
      <Ring size={420} thickness={64} tone="onphoto" className="-bottom-52 left-[12%]" />
      <Ring size={300} thickness={48} tone="onphoto" className="-right-24 -bottom-40 max-lg:hidden" />
      <Ring size={240} thickness={40} tone="onphoto" className="-top-24 -left-20 max-lg:hidden" />

      {SHOW_FLOATING_CARDS && <FloatingCards />}

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
          <span className="size-1.5 rounded-full bg-pipe-averbado" />
          Teste grátis por 7 dias
        </span>
        <h2 data-split className="mt-5 text-[clamp(32px,4.8vw,54px)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-white">
          Pronto para organizar a sua operação?
        </h2>
        <p className="mt-5 max-w-xl text-lg text-pretty text-neutral-200">
          Converse com quem entende de Corban. A gente mostra o sistema com a sua realidade e ajuda a trazer a sua base de clientes e propostas por planilha.
        </p>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex w-full items-center justify-center gap-2.5 text-[15px] font-medium text-white sm:w-auto">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-600">
                <CheckIcon className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="max-sm:max-w-[16rem] max-sm:text-left">{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink()} external arrow size="lg">
            Falar com especialista
          </Button>
          <Button href={site.trialUrl} external variant="ghost-dark" size="lg">
            Começar teste grátis
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
