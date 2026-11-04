import { BanknotesIcon, DocumentCheckIcon, FlagIcon } from "@heroicons/react/24/outline";
import { MetaBar, Pie } from "@/components/mock/system";
import { Counter } from "@/components/ui/Counter";

// Os 4 mockups do herói, em vidro fosco (.glass em app/globals.css). A largura vem de fora (className):
// no desktop eles têm largura fixa e ficam em volta da mulher; no celular ocupam a largura da coluna.
const card = "glass glass-lighter rounded-xl p-3 text-white";
// Bolha do ícone em cor sólida (verde = pago, âmbar = comissão), com anel claro para destacar no vidro.
const iconBubble = "grid size-9 shrink-0 max-[359px]:hidden place-items-center rounded-full shadow-[0_4px_12px_-2px_rgba(0,0,0,.35)] ring-2 ring-white/35";

export function PagasCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className={`${iconBubble} bg-[#22c55e]`}>
          <DocumentCheckIcon className="size-5 text-white" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="text-xl leading-none font-bold whitespace-nowrap md:text-[22px]">
            <Counter value={52} />
          </div>
          <div className="mt-1 text-xs font-medium text-white">Propostas pagas no mês</div>
        </div>
      </div>
    </div>
  );
}

export function ComissoesCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className={`${iconBubble} bg-[#f59e0b]`}>
          <BanknotesIcon className="size-5 text-white" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="text-xl leading-none font-bold whitespace-nowrap md:text-[22px]">R$ 36,5 mil</div>
          <div className="mt-1 text-xs font-medium text-white">Comissões do mês</div>
        </div>
      </div>
    </div>
  );
}

/** "Meta da empresa" compacto, como o card do topo da tela inicial: barra com o traço do ritmo de hoje. */
export function MetaCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="flex items-center gap-1.5 text-[13px] font-bold whitespace-nowrap">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#3b82f6]">
          <FlagIcon className="size-3 text-white" strokeWidth={2.4} />
        </span>
        Meta da empresa
        <span className="ml-auto text-[11px] font-medium">Outubro</span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="min-w-0 text-[11px] leading-tight">
          <b className="block text-[15px] whitespace-nowrap tabular-nums">R$ 522.000,00</b>
          de R$ 600.000,00
        </div>
        <span className="text-[24px] leading-none font-bold text-[#a8c1ff] tabular-nums">87%</span>
      </div>
      <div className="mt-2">
        <MetaBar pct={87} ritmo={81} track="bg-white/25" />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] whitespace-nowrap">
        <span>Projeção do mês</span>
        <b className="whitespace-nowrap text-[#86efac] tabular-nums">R$ 644.823,53</b>
      </div>
    </div>
  );
}

/** Pizza "Propostas — Situação Atual" do Dashboard, com o percentual dentro de cada fatia. */
export function SituacaoCard({ className = "" }: { className?: string }) {
  const fatias = [
    { nome: "Pago", v: 58, cor: "#22c55e", valor: "R$ 302.760,00" },
    { nome: "Em andamento", v: 30, cor: "#f59e0b", valor: "R$ 156.600,00" },
    { nome: "Pendente", v: 12, cor: "#ef4444", valor: "R$ 62.640,00" },
  ];
  return (
    <div className={`${card} ${className}`}>
      <div className="text-[13px] font-bold">Propostas — Situação Atual</div>
      <div className="text-[11px]">Valor Base · Outubro</div>
      <div className="mt-2.5 flex items-center gap-3">
        <Pie slices={fatias} size={84} />
        <ul className="flex min-w-0 flex-col gap-1.5">
          {fatias.map((f) => (
            <li key={f.nome} className="min-w-0 text-[11px] leading-tight">
              <span className="flex items-center gap-1.5">
                <span className="size-2 shrink-0 rounded-sm" style={{ background: f.cor }} />
                {f.nome}
              </span>
              <b className="block pl-3.5 whitespace-nowrap tabular-nums">{f.valor}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
