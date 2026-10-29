import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";
import { whatsappLink } from "@/content/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-chrome px-4 py-16 sm:py-24 text-center sm:px-8">
      <div aria-hidden="true" data-ring className="pointer-events-none absolute -bottom-80 left-[calc(50%-450px)] size-[900px]">
        <Ring size={900} thickness={120} tone="brand" className="inset-0" />
      </div>
      <div aria-hidden="true" data-ring className="pointer-events-none absolute -bottom-44 left-[calc(50%-280px)] size-[560px]">
        <Ring size={560} thickness={84} tone="brand" className="inset-0" />
      </div>
      <Ring size={240} thickness={48} tone="brand" className="top-10 -right-16" />
      <Reveal className="relative mx-auto max-w-3xl">
        <h2 data-split className="text-[clamp(30px,4.4vw,46px)] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-white">
          Pronto para organizar a sua operação?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-neutral-400">
          Teste grátis por 7 dias, com modelos de planilha para trazer a sua base de clientes e propostas.
        </p>
        <Button href={whatsappLink()} external arrow size="lg" className="mt-9">
          Falar com especialista
        </Button>
      </Reveal>
    </section>
  );
}
