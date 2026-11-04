import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";
import { whatsappLink } from "@/content/site";

// Pessoas e acontecimentos do mesmo elenco dos mockups (ver components/mock/system.tsx), agora com rosto.
type Pessoa = { foto: string; nome: string; txt: string };

const linhas: Pessoa[][] = [
  [
    { foto: "marina", nome: "Marina Souza", txt: "Bateu 112% da meta" },
    { foto: "diego", nome: "Diego Lima", txt: "Repasse de R$ 3.115,00" },
    { foto: "paula", nome: "Paula Rocha", txt: "11 propostas no mês" },
    { foto: "rafael", nome: "Rafael Nunes", txt: "Proposta #5088 averbada" },
    { foto: "carlos", nome: "Carlos Mendes", txt: "Gerente · Loja Norte" },
  ],
  [
    { foto: "ana", nome: "Ana Lúcia Ferreira", txt: "Cliente atendida hoje" },
    { foto: "carla", nome: "Carla Menezes", txt: "Proposta averbada" },
    { foto: "joel", nome: "Joel Batista", txt: "Contrato CLT digitado" },
    { foto: "roberto", nome: "Roberto Almeida", txt: "Pendência resolvida" },
    { foto: "maria", nome: "Maria Aparecida Souza", txt: "Simulação enviada" },
  ],
];

// Pílula fina e transparente (vidro leve): a foto redonda e a pílula têm a mesma folga de 4px, então ficam concêntricas.
function Chip({ p }: { p: Pessoa }) {
  return (
    <span className="flex h-11 shrink-0 items-center gap-2.5 rounded-full bg-white/75 p-1 pr-4 text-strong shadow-[0_6px_16px_-10px_rgba(39,81,197,.45)] ring-1 ring-line/80 backdrop-blur-[6px] lg:bg-[#0f1a30]/35 lg:text-white lg:shadow-none lg:ring-white/20">
      <Image src={`/pessoas/${p.foto}.webp`} alt="" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover ring-1 ring-white lg:ring-white/30" />
      <span className="leading-[1.15] whitespace-nowrap">
        <b className="block text-[12.5px] font-semibold">{p.nome}</b>
        <span className="block text-[10.5px] text-muted lg:text-white/70">{p.txt}</span>
      </span>
    </span>
  );
}

// Faixa que desliza devagar e não para com o mouse por cima (só some o movimento com "reduzir movimento").
function Faixa({ pessoas, reverso = false }: { pessoas: Pessoa[]; reverso?: boolean }) {
  return (
    <div
      className="flex w-max animate-marquee gap-3 pr-3 motion-reduce:animate-none"
      style={{ animationDuration: "38s", animationDirection: reverso ? "reverse" : "normal" }}
    >
      {[...pessoas, ...pessoas].map((p, k) => (
        <Chip key={k} p={p} />
      ))}
    </div>
  );
}

/**
 * Seção humanizada (depois de Soluções). Desktop: a foto ocupa quase a largura toda da tela, num quadro arredondado, e
 * tudo da esquerda fica junto e centralizado na altura dela, por cima da parte desfocada: selo, título, texto, botão e a
 * faixa de pessoas. Celular/tablet: o bloco de texto, botão e faixas vem primeiro, sobre o fundo claro, e a foto depois.
 */
export function Humanized() {
  return (
    <section className="relative pb-12 [--faixa-mask:linear-gradient(to_right,transparent_0,#000_5%,#000_95%,transparent_100%)] sm:pb-20">
      {/* Anéis flutuantes. O fundo vem do contêiner compartilhado com a próxima seção (page.tsx), e os anéis podem atravessar a divisa: a cor e os círculos continuam de uma seção para a outra, sem emenda. */}
      <Ring size={540} thickness={90} className="-bottom-52 -left-44" />
      <Ring size={440} thickness={72} tone="soft" className="-bottom-44 right-[10%]" />
      <Ring size={300} thickness={56} className="top-1/3 -right-24" />
      <Reveal className="relative z-10 px-[19px] pt-10 sm:px-8 lg:px-[2vw] lg:pt-0">
        <div className="relative isolate flex flex-col lg:block lg:aspect-[2.2/1] lg:max-h-[760px] lg:min-h-[560px] lg:w-full lg:overflow-hidden lg:rounded-[28px] lg:shadow-[0_30px_70px_-30px_rgba(39,81,197,.55)]">
          {/* Foto: não é esticada, só enquadrada (cover) com o foco no rosto. No desktop é o fundo do quadro, com um véu à esquerda para o texto ler bem */}
          <div className="relative order-2 mt-8 aspect-[3/2] overflow-hidden rounded-2xl shadow-[0_28px_60px_-28px_rgba(39,81,197,.55)] ring-1 ring-white/70 lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:rounded-none lg:shadow-none lg:ring-0">
            <Image
              src="/images/equipe-atendimento.webp"
              alt="Atendente sorrindo com headset, com a equipe de atendimento ao fundo"
              fill
              quality={90}
              sizes="(min-width: 1024px) 96vw, 100vw"
              className="object-cover object-[68%_30%] lg:object-[64%_36%]"
            />
            <div aria-hidden="true" className="absolute inset-0 hidden bg-linear-to-r from-[#0f1a30]/92 via-[#0f1a30]/62 via-34% to-transparent to-62% lg:block" />
          </div>

          {/* Bloco da esquerda, todo junto e centralizado na altura da foto (desktop) */}
          <div className="relative z-10 order-1 lg:absolute lg:inset-0 lg:flex lg:items-center lg:pl-[clamp(32px,5vw,110px)]">
            <div className="lg:w-[40%] lg:max-w-[680px]">
              <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-white py-1 pr-2.5 pl-1 text-xs font-medium text-body shadow-sm ring-1 ring-line/70 lg:bg-white/10 lg:text-white lg:shadow-none lg:ring-white/25 lg:backdrop-blur">
                <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white lg:bg-white lg:text-[#1b2c4a]">eCorban</span>
                Feito para quem vende crédito
                <ChevronRightIcon className="size-3.5" />
              </span>

              <h2 data-split className="text-[clamp(28px,3.4vw,42px)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-strong lg:text-[clamp(30px,2.7vw,46px)] lg:text-pretty lg:text-white">
                Gente de verdade, vendendo mais todo dia
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted lg:text-white/80">
                Quando cada vendedor sabe o próximo passo, o gerente acompanha ao vivo e o financeiro paga certo, sobra tempo para o que importa: atender bem o
                cliente.
              </p>

              <a
                href={whatsappLink("Olá, quero conhecer o eCorban na prática.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(39,81,197,.7)] transition-colors hover:bg-brand-700 lg:bg-white lg:text-brand-700 lg:shadow-[0_8px_20px_-8px_rgba(0,0,0,.5)] lg:hover:bg-brand-50"
              >
                Conhecer na prática <ArrowUpRightIcon className="size-4" />
              </a>

              {/* Faixas de pessoas: coladas no bloco, na mesma largura dele (não passam para o rosto da atendente) */}
              <div
                aria-hidden="true"
                className="mt-8 flex flex-col gap-3 overflow-hidden"
                style={{ maskImage: "var(--faixa-mask)", WebkitMaskImage: "var(--faixa-mask)" }}
              >
                <Faixa pessoas={linhas[0]} />
                <Faixa pessoas={linhas[1]} reverso />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
