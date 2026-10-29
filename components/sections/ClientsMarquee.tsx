import Image from "next/image";
import { clients } from "@/content/clients";
import { features } from "@/content/site";

// Cada "set" tem as 8 logos. São 4 sets em 2 grupos: a faixa anda -50% (um grupo inteiro) e recomeça sem emenda.
// Dois sets por grupo garantem que a faixa preencha telas largas (até ~3.700 px).
const SETS = 4;

function Set({ hidden }: { hidden: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6"}`}>
      {clients.map((c) => (
        <li key={c.name} className="shrink-0 pr-5 sm:pr-7">
          <Image src={c.logo} alt={hidden ? "" : `Logo da ${c.name}`} width={67} height={67} className="size-[58px] rounded-[10px] saturate-0 sm:size-[67px]" />
        </li>
      ))}
    </ul>
  );
}

export function ClientsMarquee() {
  if (!features.logosDeClientes) return null;

  return (
    <section aria-label="Empresas que usam o eCorban" className="bg-page py-8 sm:py-10">
      {/* Largura total da tela, com as pontas dissolvendo */}
      <div
        className="group overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {Array.from({ length: SETS }, (_, i) => (
            <Set key={i} hidden={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
