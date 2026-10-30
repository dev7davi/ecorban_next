import { CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ComissoesCard, MetaCard, PagasCard, SituacaoCard } from "@/components/mockups/HeroCards";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import { hero } from "@/content/hero";
import { whatsappLink } from "@/content/site";

/*
 * Três layouts:
 *  - celular (< 768px): a mulher fica no canto direito, atrás do canto do texto; os 4 mockups descem para
 *    baixo do formulário, em tamanho real (legível).
 *  - tablet (768–1279px): texto em cima; foto embaixo, com os mockups em volta da mulher.
 *  - desktop (≥ 1280px): texto à esquerda; mulher à direita, com os mockups em volta.
 * A posição dos cards em volta da mulher fica em app/globals.css (.hc[data-c]).
 */
export function Hero() {
  return (
    <section id="topo" className="hero-stage relative isolate overflow-hidden bg-[#0a2650] xl:h-(--ht)">
      {/* Foto de fundo (4K). Celular: topo da seção. Tablet: base. Desktop: a seção inteira. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-(--ht) md:top-auto md:bottom-0 xl:inset-0 xl:h-auto">
        <Image
          src="/images/hero-bg-4k.webp"
          alt=""
          fill
          preload
          quality={90}
          sizes="(min-width: 1792px) 2400px, (min-width: 1536px) 2100px, (min-width: 1280px) 1800px, (min-width: 1024px) 1860px, (min-width: 768px) 1680px, 1200px"
          className="object-cover"
          style={{ objectPosition: "var(--opx) 12%" }}
        />
        {/* Desktop: azul-marinho da marca à esquerda, para o texto ler bem */}
        <div className="absolute inset-0 hidden bg-linear-to-r from-[#061a3a]/90 via-[#061a3a]/55 via-32% to-transparent to-58% xl:block" />
        {/* Tablet: a foto nasce do fundo da seção, sem emenda */}
        <div className="absolute inset-x-0 top-0 hidden h-2/5 bg-linear-to-b from-[#0a2650] to-transparent md:block xl:hidden" />
        {/* Celular: o texto fica sobre um véu azul que some em direção à mulher; a base da foto se dissolve no fundo */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0a2650]/95 via-[#0a2650]/65 via-42% to-transparent to-72% md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#0a2650] to-transparent md:hidden" />
      </div>

      {/* Coluna do texto */}
      <div className="relative z-10 mx-auto flex max-w-[clamp(1280px,90vw,1800px)] px-[19px] pt-28 pb-10 sm:px-8 xl:h-full xl:items-center xl:pt-[70px] xl:pb-0">
        <div className="flex w-full max-w-xl flex-col items-start xl:max-w-[500px] 2xl:max-w-[520px]">
          <div data-hero-badge className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pr-3.5 pl-2 text-sm font-semibold text-white shadow-sm backdrop-blur max-md:gap-1.5 max-md:py-1 max-md:pr-2.5 max-md:pl-1.5 max-md:text-[11.2px]">
            <span className="grid size-5 place-items-center rounded-full bg-pipe-averbado max-md:size-4">
              <CheckIcon className="size-3 text-white max-md:size-2.5" strokeWidth={3.5} />
            </span>
            {hero.badge}
          </div>

          {/* No celular, título e parágrafo ficam na coluna da esquerda (70% da tela) para não cobrir a mulher */}
          <h1
            aria-label={`${hero.titleStart} ${hero.titleHighlight}`}
            className="mt-5 text-[clamp(24px,7.4vw,46px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-white [perspective:600px] max-md:max-w-[70vw] md:text-[clamp(32px,6vw,46px)] xl:text-[clamp(36px,3.2vw,43px)]"
          >
            {hero.titleStart.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true">
                <span data-hero-word className="inline-block">
                  {w}
                </span>{" "}
              </span>
            ))}
            <span aria-hidden="true" data-hero-word className="inline-block font-extrabold tracking-normal text-brand-300 uppercase md:whitespace-nowrap">
              {hero.titleHighlight}
            </span>
          </h1>

          <p data-hero-sub className="mt-6 max-w-xl text-[12.75px] leading-relaxed text-pretty text-neutral-200 max-md:max-w-[70vw] sm:text-lg">
            {hero.subtitle}
          </p>

          <div data-hero-form className="mt-7 md:w-full md:max-w-xl">
            {/* Celular: só o botão de CTA. Tablet e desktop: campo + botão em vidro fosco. */}
            <Button href={whatsappLink(hero.lead.message(""))} external arrow variant="white" size="md" className="px-4 py-2.5 text-xs md:hidden">
              {hero.lead.button}
            </Button>
            <div className="max-md:hidden">
              <LeadForm variant="glass" />
            </div>
          </div>

          {/* Celular: os 4 mockups abaixo do formulário, em tamanho real */}
          <div className="mt-[calc(1.5rem+4.5em)] grid w-full grid-cols-2 gap-3 md:hidden">
            <div data-reveal>
              <PagasCard className="h-full" />
            </div>
            <div data-reveal>
              <ComissoesCard className="h-full" />
            </div>
            <div data-reveal className="col-span-2">
              <MetaCard />
            </div>
            <div data-reveal className="col-span-2">
              <SituacaoCard />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet: espaço da foto abaixo do texto (os cards ficam nele) */}
      <div aria-hidden="true" className="hidden h-(--ht) md:block xl:hidden" />

      {/* Tablet e desktop: cards em volta da mulher. Em xl+ ocupam a seção toda; no tablet, só o palco da base. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-(--ht) md:block xl:inset-y-0 xl:h-auto">
        {/* Caixa 1 — acima, à esquerda da cabeça */}
        <div className="hc" data-c="pagas" data-hero-float>
          <div className="hc-scale">
            <div className="animate-floaty">
              <PagasCard className="w-[176px]" />
            </div>
          </div>
        </div>

        {/* Caixa 3 — à direita do cabelo */}
        <div className="hc" data-c="comissoes" data-hero-float>
          <div className="hc-scale">
            <div className="animate-floaty-slow">
              <ComissoesCard className="w-[204px]" />
            </div>
          </div>
        </div>

        {/* Caixa 2 — à esquerda do rosto, acima do notebook */}
        <div className="hc" data-c="visao" data-hero-panel>
          <div className="hc-scale">
            <MetaCard className="w-[200px]" />
          </div>
        </div>

        {/* Caixa 4 — embaixo à direita (25% mais largo que o original, deslocado 25% para a esquerda) */}
        <div className="hc" data-c="grafico" data-hero-panel>
          <div className="hc-scale">
            <SituacaoCard className="w-[260px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
