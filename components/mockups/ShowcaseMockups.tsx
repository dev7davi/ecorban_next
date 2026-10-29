import Image from "next/image";
import { Bars } from "@/components/mockups/Charts";
import { AppWindow, StatusPill } from "@/components/mockups/AppWindow";
import { Counter } from "@/components/ui/Counter";

const card = "rounded-lg bg-white p-2.5 shadow-sm dark:bg-neutral-900";

const columns = [
  { name: "Digitada", color: "#f97316", items: [["Joel Batista", "Crefaz · R$ 6.300"], ["Neide Souza", "PAN · R$ 9.800"]] },
  { name: "Em Análise", color: "#ea580c", items: [["Ana Lúcia", "PAN · R$ 12.400"], ["Bia Rocha", "C6 · R$ 4.150"]] },
  { name: "Pendência", color: "#ef4444", items: [["Roberto Almeida", "C6 · R$ 8.900"]] },
  { name: "Averbado", color: "#22c55e", items: [["Carla Menezes", "Facta · R$ 15.200"], ["Diego Lima", "PAN · R$ 7.700"]] },
];

export function PipelineMockup() {
  return (
    <AppWindow title="Esteira de propostas">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Esteira · Outubro</div>
        <span className="rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">+ Nova proposta</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => (
          <div key={col.name} className="flex flex-col gap-2 rounded-lg bg-neutral-200/70 p-2 dark:bg-neutral-700/50">
            <div className="flex items-center justify-between">
              <StatusPill label={col.name} color={col.color} />
              <span className="text-[10px] font-semibold text-neutral-500">{col.items.length}</span>
            </div>
            {col.items.map(([nome, info]) => (
              <div key={nome} className={card}>
                <div className="truncate text-[11px] font-semibold text-neutral-900 dark:text-neutral-100">{nome}</div>
                <div className="truncate text-[10px] text-neutral-500">{info}</div>
                <div className="mt-1.5 h-1 rounded-full" style={{ background: col.color, opacity: 0.35 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

const team = [
  ["marina", "Marina", "Vendendo agora", "#22c55e", 14],
  ["diego", "Diego", "Em atendimento", "#3c67dd", 9],
  ["paula", "Paula", "Em pausa · café", "#f97316", 11],
  ["rafael", "Rafael", "Vendendo agora", "#22c55e", 7],
] as const;

export function LiveTeamMockup() {
  return (
    <AppWindow title="Equipe ao Vivo">
      <div className="grid gap-3 md:grid-cols-5">
        <div className="flex flex-col gap-2 md:col-span-3">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pipe-averbado opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-pipe-averbado" />
            </span>
            Equipe ao Vivo
          </div>
          {team.map(([img, nome, status, color, n]) => (
            <div key={nome} className={`${card} flex items-center gap-2.5`}>
              <Image src={`/pessoas/${img}.jpg`} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-2 ring-white dark:ring-neutral-800" />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-neutral-900 dark:text-neutral-100">{nome}</div>
                <StatusPill label={status} color={color} />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-neutral-900 tabular-nums dark:text-neutral-100">{n}</div>
                <div className="text-[9px] text-neutral-500">propostas</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between rounded-lg bg-chrome p-3 text-white md:col-span-2">
          <div className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Modo TV</div>
          <div>
            <div className="text-3xl font-bold">
              <Counter value={87} suffix="%" />
            </div>
            <div className="text-[11px] text-neutral-400">da meta do mês</div>
          </div>
          <Bars values={[40, 55, 48, 70, 62, 85, 92]} className="mt-3 h-16" />
        </div>
      </div>
    </AppWindow>
  );
}

const lotes = [
  ["Lote #484", "Marina · Loja Centro", "R$ 4.820", "Em conferência", "#3c67dd"],
  ["Lote #483", "Diego · Loja Norte", "R$ 3.115", "Gerado", "#f97316"],
  ["Lote #482", "Paula · Loja Centro", "R$ 5.940", "Pago", "#16a34a"],
  ["Lote #481", "Gerência regional", "R$ 2.260", "Pago", "#16a34a"],
] as const;

export function CommissionMockup() {
  return (
    <AppWindow title="Comissões · Repasses">
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          ["A repassar", "R$ 7.935", "text-pipe-digitada"],
          ["Pago no mês", "R$ 8.200", "text-pipe-pago"],
          ["Convênios ativos", "24", "text-brand-600"],
        ].map(([l, v, c]) => (
          <div key={l} className={card}>
            <div className="text-[10px] text-neutral-500">{l}</div>
            <div className={`text-sm font-bold sm:text-base ${c}`}>{v}</div>
          </div>
        ))}
      </div>
      <div className={`${card} p-0`}>
        {lotes.map(([lote, quem, valor, status, color], i) => (
          <div key={lote} className={`flex items-center gap-2 px-3 py-2 ${i ? "border-t border-neutral-100 dark:border-neutral-800" : ""}`}>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold text-neutral-900 dark:text-neutral-100">{lote}</div>
              <div className="truncate text-[10px] text-neutral-500">{quem}</div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-2">
              <div className="text-[11px] font-semibold text-neutral-900 tabular-nums dark:text-neutral-100">{valor}</div>
              <StatusPill label={status} color={color} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-neutral-500">Tabela vigente em 23/10 · convênio INSS</div>
    </AppWindow>
  );
}
