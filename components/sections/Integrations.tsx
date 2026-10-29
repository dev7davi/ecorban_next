import { ArrowUpRightIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { Reveal } from "@/components/ui/Reveal";
import { differentiators } from "@/content/differentiators";
import { integratedBanks, whatsappLink } from "@/content/site";

// Posições (left%, top%) da "nuvem" no desktop, em arco ao redor do texto central.
const spots = [
  [3, 6], [15, 22], [2, 40], [24, 44], [12, 62], [34, 66], [24, 86],
  [62, 66], [72, 44], [74, 86], [85, 22], [95, 6], [86, 62], [96, 40],
];

const tile = "flex flex-col items-center justify-center gap-1.5 rounded-xl bg-surface shadow-[0_8px_24px_rgba(17,24,39,.08)] ring-1 ring-line/60";

export function Integrations() {
  const tiles = [
    ...integratedBanks.map((b) => ({ key: b, node: <span className="text-lg font-bold tracking-tight text-brand-700 dark:text-brand-300">{b}</span>, label: "Integrado" })),
    ...differentiators.map((d) => ({ key: d.title, node: <d.icon className="size-6 text-brand-600 dark:text-brand-300" />, label: d.title })),
    { key: "outros", node: <BuildingLibraryIcon className="size-6 text-muted" />, label: "+ bancos cadastráveis" },
  ];

  return (
    <section className="px-4 py-16 sm:py-24 sm:px-8">
      <div className="relative mx-auto max-w-6xl xl:h-[620px]">
        <Reveal className="relative z-10 mx-auto max-w-xl text-center xl:pt-6">
          <h2 data-split className="text-[clamp(30px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-strong">Integrado aos bancos que a sua operação já usa</h2>
          <p className="mt-4 text-pretty text-muted">
            Simule e digite direto no PAN, C6, Crefaz, Facta e QualiBanking, com o status voltando sozinho para a esteira. Os demais bancos você cadastra no sistema.
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
            <li data-cloud-tile
              key={t.key}
              className={`${tile} h-20 w-[calc((100%-20px)/3)] px-2 text-center sm:h-24 sm:w-[calc((100%-48px)/5)] sm:px-3 md:w-[calc((100%-72px)/7)] xl:absolute xl:h-[88px] xl:w-[112px] xl:-translate-x-1/2`}
              style={{ left: `calc(56px + (100% - 112px) * ${spots[i][0] / 100})`, top: `${spots[i][1]}%` }}
            >
              {t.node}
              <span className="text-[11px] leading-tight font-medium text-muted">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
