import { ArrowDownRightIcon, ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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

// Pílula fina e translúcida: a foto redonda e a pílula têm a mesma folga de 4px, então ficam concêntricas.
function Chip({ p }: { p: Pessoa }) {
  return (
    <span className="flex h-11 shrink-0 items-center gap-2.5 rounded-full bg-white/75 p-1 pr-4 text-strong shadow-[0_6px_16px_-10px_rgba(39,81,197,.45)] ring-1 ring-line/80 backdrop-blur-[6px]">
      <Image src={`/pessoas/${p.foto}.webp`} alt="" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover ring-1 ring-white" />
      <span className="leading-[1.15] whitespace-nowrap">
        <b className="block text-[12.5px] font-semibold">{p.nome}</b>
        <span className="block text-[10.5px] text-muted">{p.txt}</span>
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

// Fotos do mosaico: para trocar, basta apontar cada `src` para a nova foto (ideal: quadrada ou retrato, com o rosto no centro)
// e ajustar ou zerar o `cls`, que só enquadra o recorte atual.
const fotos = {
  a: { src: "/images/equipe-call.webp", alt: "Atendente de headset sorrindo em frente ao computador", cls: "scale-[1.1] origin-[40%_30%] object-[40%_30%]" },
  b: { src: "/images/equipe-notebook.webp", alt: "Equipe reunida em volta de um notebook", cls: "scale-[1.2] origin-[72%_40%] object-[72%_40%]" },
  c: { src: "/images/equipe-atendimento.webp", alt: "", cls: "object-[64%_36%]" },
};

const recorte = "radial-gradient(circle 40px at 100% 0, transparent 39px, #000 40px)";

function Tile({ foto, className, style }: { foto: (typeof fotos)[keyof typeof fotos]; className: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute overflow-hidden rounded-[28px] bg-brand-100 shadow-[0_24px_50px_-28px_rgba(39,81,197,.55)] ${className}`} style={style}>
      <Image src={foto.src} alt={foto.alt} fill quality={85} sizes="(min-width: 1024px) 28vw, 60vw" className={`object-cover ${foto.cls}`} />
    </div>
  );
}

function Estrela({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`absolute text-brand-400 ${className}`}>
      <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

// Mosaico de três quadros arredondados com detalhes soltos (estrelas, bolinhas, selo da seta e pílula da logo).
function Mosaico() {
  return (
    <div className="relative mx-auto aspect-[1/0.98] w-full max-w-[580px]">
      {/* Quadro A: canto superior direito recortado, com o selo da seta encaixado */}
      <div className="absolute top-[3%] left-[2%] h-[56%] w-[50%]">
        <Tile foto={fotos.a} className="inset-0" style={{ maskImage: recorte, WebkitMaskImage: recorte }} />
        <span className="absolute -top-[26px] -right-[26px] grid size-[52px] place-items-center rounded-full bg-brand-100 text-brand-700 shadow-[0_8px_20px_-10px_rgba(39,81,197,.6)] ring-1 ring-white/70">
          <ArrowDownRightIcon className="size-5" />
        </span>
      </div>

      {/* Quadro B: direita, mais baixo */}
      <Tile foto={fotos.b} className="top-[14%] right-0 h-[40%] w-[34%]" />

      {/* Quadro C: embaixo, mais largo */}
      <Tile foto={fotos.c} className="bottom-0 left-0 h-[38%] w-[66%]" />

      {/* Pílula com a logo do nome eCorban */}
      <span className="absolute top-[58%] right-[2%] grid h-[13%] w-[44%] place-items-center rounded-full bg-brand-200 shadow-[0_14px_30px_-16px_rgba(39,81,197,.6)] ring-1 ring-white/60">
        <Image src="/logo/logo-azul.svg" alt="eCorban" width={160} height={24} className="h-auto w-[62%]" />
      </span>

      <Estrela className="top-[34%] -left-[2%] size-6" />
      <Estrela className="right-[16%] bottom-[8%] size-5" />
      <span aria-hidden="true" className="absolute top-[1%] right-[12%] size-3 rounded-full bg-brand-300" />
      <span aria-hidden="true" className="absolute right-[1%] bottom-[2%] size-5 rounded-full bg-brand-400" />
    </div>
  );
}

/**
 * Seção humanizada (depois de Soluções). Desktop: texto, botão e a faixa de pessoas à esquerda, e à direita um mosaico de
 * três quadros arredondados com a foto. Celular/tablet: tudo em uma coluna, com o mosaico por último.
 */
export function Humanized() {
  return (
    <section className="relative pt-10 pb-12 [--faixa-mask:linear-gradient(to_right,transparent_0,#000_5%,#000_95%,transparent_100%)] sm:pb-20 lg:pt-4">
      {/* Anéis flutuantes. O fundo vem do contêiner compartilhado com a próxima seção (page.tsx), e os anéis podem atravessar a divisa: a cor e os círculos continuam de uma seção para a outra, sem emenda. */}
      <Ring size={540} thickness={90} className="-bottom-52 -left-44" />
      <Ring size={440} thickness={72} tone="soft" className="-bottom-44 right-[10%]" />
      <Ring size={300} thickness={56} className="top-1/3 -right-24" />
      <Reveal className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-[19px] sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10">
        <div className="min-w-0">
          <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-white py-1 pr-2.5 pl-1 text-xs font-medium text-body shadow-sm ring-1 ring-line/70">
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">eCorban</span>
            Feito para quem vende crédito
            <ChevronRightIcon className="size-3.5" />
          </span>

          <h2 data-split className="text-[clamp(28px,3.4vw,46px)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-strong">
            Gente de verdade, vendendo mais todo dia
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-pretty text-muted">
            Quando cada vendedor sabe o próximo passo, o gerente acompanha ao vivo e o financeiro paga certo, sobra tempo para o que importa: atender bem o
            cliente.
          </p>

          <a
            href={whatsappLink("Olá, quero conhecer o eCorban na prática.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(39,81,197,.7)] transition-colors hover:bg-brand-700"
          >
            Conhecer na prática <ArrowUpRightIcon className="size-4" />
          </a>

          {/* Faixas de pessoas: ficam dentro da coluna do texto */}
          <div
            aria-hidden="true"
            className="mt-8 flex flex-col gap-3 overflow-hidden"
            style={{ maskImage: "var(--faixa-mask)", WebkitMaskImage: "var(--faixa-mask)" }}
          >
            <Faixa pessoas={linhas[0]} />
            <Faixa pessoas={linhas[1]} reverso />
          </div>
        </div>

        <Mosaico />
      </Reveal>
    </section>
  );
}
