import Image from "next/image";
import { clients } from "@/content/clients";
import { features } from "@/content/site";

// Cada "set" tem todas as logos. São 2 sets em 2 grupos: a faixa anda -50% (um grupo inteiro) e recomeça sem emenda.
// Com a quantidade atual de logos, um set sozinho já passa de 2.500 px; dois sets por grupo cobrem telas largas.
const SETS = 4;

// Velocidade constante (~45 px/s) mesmo se a quantidade de logos mudar: um quadrado ocupa ~120 px da faixa.
const DURACAO = Math.round(clients.length * 2 * (120 / 45));

function Set({ hidden }: { hidden: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6"}`}>
      {clients.map((c) => (
        <li key={c.name} className="shrink-0 pr-3.5 sm:pr-5">
          {/* Quadrado de lados iguais: cada logo já vem centralizada num fundo quadrado (ver public/clientes), todas do mesmo tamanho */}
          <span className="relative block size-[80px] overflow-hidden rounded-xl bg-white sm:size-[96px]">
            <Image src={c.logo} alt={hidden ? "" : `Logo da ${c.name}`} fill sizes="96px" className="object-cover" />
          </span>
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
        <div
          className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${DURACAO}s` }}
        >
          {Array.from({ length: SETS }, (_, i) => (
            <Set key={i} hidden={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
