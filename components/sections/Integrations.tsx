import {
  ArrowUpRightIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  FlagIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  SignalIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { differentiators } from "@/content/differentiators";
import { whatsappLink } from "@/content/site";

// Posições (left%, top%) da "nuvem" no desktop, em arco ao redor do texto central (sete de cada lado).
const spots = [
  [3, 6], [15, 22], [2, 40], [24, 44], [12, 62], [34, 66], [24, 86],
  [62, 66], [72, 44], [74, 86], [85, 22], [95, 6], [86, 62], [96, 40],
];

// Cada cartão tem a cor própria no ícone, só na paleta do sistema (azul da marca, verde, âmbar, vermelho, violeta e ciano).
const tones = {
  blue: { chip: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300", ring: "hover:ring-brand-300" },
  green: { chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300", ring: "hover:ring-emerald-300" },
  amber: { chip: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300", ring: "hover:ring-amber-300" },
  rose: { chip: "bg-rose-50 text-rose-500 dark:bg-rose-500/15 dark:text-rose-300", ring: "hover:ring-rose-300" },
  violet: { chip: "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300", ring: "hover:ring-violet-300" },
  cyan: { chip: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300", ring: "hover:ring-cyan-300" },
};
type Tone = keyof typeof tones;
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Cartões extras: só o que o sistema realmente tem (esteira, Equipe ao Vivo, Modo TV, metas, repasse em lote, relatórios).
const extras: Record<string, { icon: Icon; title: string; tone: Tone }> = {
  esteira: { icon: QueueListIcon, title: "Esteira de propostas", tone: "blue" },
  aoVivo: { icon: SignalIcon, title: "Equipe ao Vivo", tone: "green" },
  tv: { icon: TvIcon, title: "Modo TV do Dashboard", tone: "violet" },
  metas: { icon: FlagIcon, title: "Metas e projeção", tone: "amber" },
  repasse: { icon: BanknotesIcon, title: "Repasse em lote", tone: "green" },
  relatorios: { icon: PresentationChartBarIcon, title: "Relatórios e rankings", tone: "cyan" },
  outros: { icon: BuildingLibraryIcon, title: "+ bancos cadastráveis", tone: "rose" },
};

const diffTone: Record<string, Tone> = {
  "Dados isolados": "violet",
  "5 integrações bancárias": "blue",
  "Comissão versionada": "amber",
  "Permissões por função": "rose",
  "Auditoria legível": "cyan",
  "Importação em massa": "green",
  "Várias abas": "blue",
};

const tile =
  "group flex flex-col items-center justify-center gap-2 rounded-2xl bg-surface shadow-[0_8px_24px_rgba(17,24,39,.08)] ring-1 ring-line/60 transition-[box-shadow] duration-200 hover:shadow-[0_14px_30px_rgba(39,81,197,.18)]";

export function Integrations() {
  const d = Object.fromEntries(differentiators.map((x) => [x.title, x]));
  const pick = (t: string) => ({ key: t, icon: d[t].icon as Icon, title: t, tone: diffTone[t] });

  // A ordem segue as posições da nuvem (esquerda de cima para baixo, depois direita de baixo para cima), alternando as cores
  // para dois vizinhos nunca terem a mesma.
  const tiles = [
    { key: "esteira", ...extras.esteira },
    pick("Dados isolados"),
    pick("Comissão versionada"),
    { key: "tv", ...extras.tv },
    pick("Permissões por função"),
    pick("5 integrações bancárias"),
    { key: "repasse", ...extras.repasse },
    { key: "relatorios", ...extras.relatorios },
    pick("Várias abas"),
    { key: "outros", ...extras.outros },
    { key: "metas", ...extras.metas },
    pick("Auditoria legível"),
    { key: "aoVivo", ...extras.aoVivo },
    pick("Importação em massa"),
  ];

  return (
    <section className="relative overflow-hidden px-[19px] py-16 sm:px-8 sm:py-24">
      {/* Brilhos suaves de cor atrás da nuvem, para o fundo não ficar vazio */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -left-32 hidden size-[420px] rounded-full bg-brand-200/40 blur-3xl xl:block" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-10 hidden size-[420px] rounded-full bg-emerald-200/30 blur-3xl xl:block" />

      <div className="relative mx-auto max-w-6xl xl:h-[620px]">
        <Reveal className="relative z-10 mx-auto max-w-xl text-center xl:pt-6">
          <h2 data-split className="text-[clamp(30px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-strong">Integrado aos bancos que a sua operação já usa</h2>
          <p className="mt-4 text-pretty text-muted">
            Simule e digite direto nos bancos integrados e mande a simulação para a esteira em um clique. Os demais bancos você cadastra no sistema.
          </p>
          <a
            href={whatsappLink("Olá, quero saber mais sobre as integrações bancárias do eCorban.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1 font-semibold text-link underline-offset-4 hover:underline"
          >
            Conhecer as integrações <ArrowUpRightIcon className="size-4" />
          </a>
        </Reveal>

        <ul data-cloud className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3 xl:mt-0 xl:block">
          {tiles.map((t, i) => (
            <li
              data-cloud-tile
              key={t.key}
              className={`${tile} ${tones[t.tone].ring} h-[92px] w-[calc((100%-20px)/3)] px-2 text-center sm:h-24 sm:w-[calc((100%-48px)/5)] sm:px-3 md:w-[calc((100%-72px)/7)] xl:absolute xl:h-[96px] xl:w-[120px] xl:-translate-x-1/2`}
              style={{ left: `calc(60px + (100% - 120px) * ${spots[i][0] / 100})`, top: `${spots[i][1]}%` }}
            >
              <span className={`grid size-9 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${tones[t.tone].chip}`}>
                <t.icon className="size-5" />
              </span>
              <span className="text-[11px] leading-tight font-medium text-body">{t.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
