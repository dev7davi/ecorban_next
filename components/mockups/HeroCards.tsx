import { BanknotesIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { AreaChart, Donut } from "@/components/mockups/Charts";
import { Counter } from "@/components/ui/Counter";

// Os 4 mockups do herói, em vidro fosco (.glass em app/globals.css). A largura vem de fora (className):
// no desktop eles têm largura fixa e ficam em volta da mulher; no celular ocupam a largura da coluna.
const card = "glass rounded-xl p-3 text-white";
const iconBubble = "grid size-9 shrink-0 max-[359px]:hidden place-items-center rounded-full bg-white/20 ring-1 ring-white/30";

export function PagasCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className={iconBubble}>
          <DocumentCheckIcon className="size-5 text-white" />
        </span>
        <div className="min-w-0">
          <div className="text-xl leading-none font-bold whitespace-nowrap md:text-[22px]">
            <Counter value={1284} />
          </div>
          <div className="mt-1 text-xs font-medium text-white/90">Propostas pagas</div>
        </div>
      </div>
    </div>
  );
}

export function ComissoesCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className={iconBubble}>
          <BanknotesIcon className="size-5 text-white" />
        </span>
        <div className="min-w-0">
          <div className="text-xl leading-none font-bold whitespace-nowrap md:text-[22px]">R$ 2,4 mi</div>
          <div className="mt-1 text-xs font-medium text-white/90">Comissões repassadas</div>
        </div>
      </div>
    </div>
  );
}

export function VisaoCard({ className = "", donutSize = 54 }: { className?: string; donutSize?: number }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="mb-2 text-[13px] font-bold">Visão do mês</div>
      <div className="grid grid-cols-3 justify-items-center gap-1">
        <Donut value={87} color="#9db8ff" label="Meta" size={donutSize} compact onDark />
        <Donut value={62} color="#4ade80" label="Averbadas" size={donutSize} compact onDark />
        <Donut value={34} color="#fbbf24" label="Análise" size={donutSize} compact onDark />
      </div>
    </div>
  );
}

export function GraficoCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[13px] font-bold">Propostas digitadas</div>
          <div className="text-[11px] text-white/85">Últimos 7 dias</div>
        </div>
        <span className="rounded-full bg-emerald-400/25 px-2 py-0.5 text-[11px] font-semibold text-emerald-100 ring-1 ring-emerald-300/40">+12%</span>
      </div>
      <div className="mt-9">
        <AreaChart compact onDark />
      </div>
    </div>
  );
}
