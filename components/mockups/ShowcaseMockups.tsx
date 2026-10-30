import { ArrowLeftIcon, ClockIcon, ComputerDesktopIcon, ExclamationTriangleIcon, InformationCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import {
  Avatar,
  BankLogo,
  CAST,
  type CastId,
  Cap,
  Card,
  FilterBar,
  MetaBar,
  PROPOSTAS,
  ProposalCard,
  SearchChip,
  SelectChip,
  STATUS,
  StatusPill,
  type StatusId,
  SystemFrame,
  sys,
  val,
  VBars,
} from "@/components/mock/system";

// Os 3 mockups grandes de "Do primeiro contato ao repasse pago", em modo claro, como as abas de Soluções.
const d = sys.light;

/* ── Bloco A: lista de propostas + Histórico da proposta + dropdown do sino ───────────────────────────── */

const historico: { quando: string; quem: string; status?: StatusId; alterou?: [string, string, string] }[] = [
  { quando: "28/10 · 16:55:27", quem: "Paula Rocha", status: "averbado" },
  { quando: "28/10 · 16:55:24", quem: "Paula Rocha", alterou: ["Averbação", "—", "28/10/2026"] },
  { quando: "28/10 · 11:51:52", quem: "Diego Lima", status: "pendencia" },
  { quando: "27/10 · 16:07:10", quem: "Marina Souza", status: "digitada" },
];

function Historico({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-white p-2.5 shadow-[0_24px_50px_-12px_rgba(17,24,39,.35)] ring-1 ring-[#e5e7eb] ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] font-semibold text-[#111827]">Status da Proposta · #5085 Carla Menezes</span>
        <span className="text-[11px] text-[#6b7280]">×</span>
      </div>
      <Cap mode="light" className="mt-2 flex items-center gap-1">
        <ClockIcon className="size-3" /> Histórico da proposta
      </Cap>
      <ol className="relative mt-1.5 flex flex-col gap-1 pl-4 before:absolute before:top-1 before:bottom-1 before:left-[5px] before:w-px before:bg-[#d1d5db]">
        {historico.map((h) => (
          <li key={h.quando} className="relative">
            <span
              className="absolute top-1.5 -left-4 grid size-[11px] place-items-center rounded-full ring-2 ring-white"
              style={{ background: h.status ? STATUS[h.status].cor : "#4b5563" }}
            >
              {h.alterou && <PencilIcon className="size-[7px] text-white" strokeWidth={3} />}
            </span>
            {/* Compacto: no tablet/desktop cada evento ocupa uma linha (data · status · usuário), para o modal caber na altura da lista */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-md bg-[#f3f4f6] px-2 py-0.5 text-[9.5px] text-[#4b5563] ring-1 ring-[#e5e7eb]/60">
              <span className="text-[8.5px] text-[#6b7280] tabular-nums">{h.quando}</span>
              {h.status ? (
                <span className="flex min-w-0 items-center gap-1">
                  Status: <StatusPill s={h.status} className="max-w-[130px] px-2! text-[9px]!" />
                </span>
              ) : (
                <span className="min-w-0">
                  <b className="font-semibold text-[#111827]">Alterada</b>
                  <span className="text-[#6b7280]">
                    {" · "}
                    {h.alterou![0]}: {h.alterou![1]} <span className="text-[#2751c5]">→</span> <b className="text-[#111827]">{h.alterou![2]}</b>
                  </span>
                </span>
              )}
              <span className="ml-auto text-[8.5px] whitespace-nowrap text-[#6b7280]">{h.quem}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SinoDropdown() {
  return (
    <div className="absolute top-[34px] right-2 z-20 hidden w-[232px] rounded-lg bg-white p-2 shadow-[0_18px_40px_-10px_rgba(17,24,39,.35)] ring-1 ring-[#e5e7eb] sm:block">
      <span className="absolute -top-1 right-[34px] size-2 rotate-45 bg-white ring-1 ring-[#e5e7eb] [clip-path:polygon(0_0,100%_0,0_100%)]" />
      <div className="flex items-center gap-1 text-[9.5px] font-semibold text-[#b45309]">
        <ExclamationTriangleIcon className="size-3" /> Propostas em alerta dos últimos 60 dias
      </div>
      <div className="mt-1.5 flex items-center gap-2 rounded-md bg-[#f3f4f6] px-2 py-1.5">
        <Avatar i="DL" size={20} />
        <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold text-[#111827]">DIEGO LIMA</span>
        <span className="text-[9.5px] text-[#4b5563] tabular-nums">R$ 8.900,00</span>
        <span className="grid size-3.5 place-items-center rounded-full bg-[#ef4444] text-[8px] font-bold text-white">1</span>
      </div>
    </div>
  );
}

export function PipelineMockup() {
  return (
    <SystemFrame
      mode="light"
      tela="Propostas"
      abas={["Home", "Dashboard"]}
      link="Propostas"
      label="Tela de Propostas do eCorban no modo escuro: lista de propostas com status, o histórico de uma proposta com cada mudança e o alerta de pendência no sino."
      overlay={<SinoDropdown />}
    >
      <FilterBar mode="light" left={<SearchChip mode="light" className="w-28">Pesquisar…</SearchChip>} filtro="Filtros · Últimos 7 dias" primary="Nova Proposta" />
      {/* O modal fica sobreposto à lista e acompanha a altura dela (sem folga cinza embaixo) */}
      <div className="relative">
        <div className="flex flex-col gap-2">
          <ProposalCard mode="light" p={PROPOSTAS.carla} campos={false} destaque />
          <ProposalCard mode="light" p={PROPOSTAS.roberto} campos={false} />
          <ProposalCard mode="light" p={PROPOSTAS.joel} campos={false} />
        </div>
        {/* Modal do status: no celular desce para baixo da lista; do tablet em diante fica sobreposto à direita */}
        <Historico className="mt-2.5 sm:absolute sm:inset-y-1.5 sm:right-1 sm:mt-0 sm:w-[64%] sm:overflow-hidden lg:w-[78%] xl:w-[62%]" />
      </div>
    </SystemFrame>
  );
}

/* ── Bloco B: Equipe ao Vivo (contadores, cards por pessoa, feed HOJE) + Dashboard no Modo TV ─────────── */

const estados = {
  ativo: { nome: "Ativo", cor: "#22c55e" },
  atendendo: { nome: "Atendendo", cor: "#3b82f6" },
  pausa: { nome: "Em pausa · Café", cor: "#f97316" },
  parado: { nome: "Parado", cor: "#ef4444" },
} as const;

const equipe: { i: CastId; estado: keyof typeof estados; chegou: string; propostas: number; atend: number; ultima: string }[] = [
  { i: "MS", estado: "ativo", chegou: "08:02", propostas: 14, atend: 9, ultima: "16:41" },
  { i: "DL", estado: "atendendo", chegou: "08:15", propostas: 9, atend: 12, ultima: "16:38" },
  { i: "PR", estado: "pausa", chegou: "07:58", propostas: 11, atend: 7, ultima: "16:30" },
  { i: "RN", estado: "ativo", chegou: "08:30", propostas: 7, atend: 10, ultima: "16:35" },
];

function Pessoa({ p, className = "" }: { p: (typeof equipe)[number]; className?: string }) {
  const e = estados[p.estado];
  return (
    <div className={`rounded-lg p-2 ${d.card} ${className}`}>
      <div className="flex items-center gap-2">
        <Avatar i={p.i} size={26} />
        <span className="min-w-0">
          <span className="block truncate text-[10.5px] font-semibold text-[#111827]">{CAST[p.i].nome}</span>
          <span className="block truncate text-[8.5px] text-[#6b7280]">{CAST[p.i].loja}</span>
        </span>
      </div>
      <span className="mt-1.5 inline-block rounded-full px-2 py-px text-[9px] font-semibold text-white" style={{ background: e.cor }}>
        {e.nome}
      </span>
      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {[
          ["Chegou", p.chegou],
          ["Propostas", p.propostas],
          ["Atendim.", p.atend],
        ].map(([k, v]) => (
          <span key={k} className="min-w-0 rounded bg-[#f3f4f6] px-1 py-1 text-center">
            <span className="block truncate text-[7.5px] text-[#6b7280]">{k}</span>
            <span className="block text-[10.5px] font-bold text-[#111827] tabular-nums">{v}</span>
          </span>
        ))}
      </div>
      <div className="mt-1 text-[8px] text-[#6b7280]">Última ação às {p.ultima}</div>
    </div>
  );
}

function ModoTv() {
  return (
    <div className="rounded-lg bg-white p-2.5 ring-1 ring-[#e5e7eb]">
      <div className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-[#6b7280] uppercase">
        <ComputerDesktopIcon className="size-3" /> Dashboard · Modo TV
      </div>
      <div className="mt-1.5 flex items-end justify-between">
        <span>
          <span className="block text-[8px] text-[#6b7280] uppercase">Meta da empresa</span>
          <span className="block text-[9.5px] text-[#4b5563] tabular-nums">R$ 522 mil de R$ 600 mil</span>
        </span>
        <span className="text-[20px] leading-none font-bold text-[#2751c5] tabular-nums" aria-label="87% da meta">
          87%
        </span>
      </div>
      <div className="mt-1.5">
        <MetaBar pct={87} ritmo={81} track="bg-[#e5e7eb]" h="h-1.5" />
      </div>
      <div className="mt-2.5">
        <VBars
          mode="light"
          h={34}
          items={[
            { nome: "Marina", v: 56, rotulo: "56 mil" },
            { nome: "Rafael", v: 49, rotulo: "49 mil" },
            { nome: "Diego", v: 43, rotulo: "43 mil" },
          ]}
        />
      </div>
    </div>
  );
}

export function LiveTeamMockup() {
  const contadores: [number, string, string][] = [
    [3, "Ativos", "#22c55e"],
    [2, "Atendendo", "#3b82f6"],
    [1, "Em pausa", "#f97316"],
    [0, "Parados", "#ef4444"],
    [22, "Não entraram", "#9ca3af"],
    [0, "Encerraram", "#9ca3af"],
  ];
  const feed = [
    ["16:41", "Marina cadastrou a proposta #5091"],
    ["16:38", "Diego iniciou um atendimento"],
    ["16:30", "Paula entrou em pausa · Café"],
  ];
  return (
    <SystemFrame mode="light" tela="Equipe ao Vivo" abas={["Home", "Dashboard"]} label="Tela Equipe ao Vivo do eCorban: quem está ativo, atendendo ou em pausa, com a chegada, as propostas e os atendimentos de cada vendedor, o feed do dia e o Dashboard no Modo TV.">
      {/* Barra de contadores */}
      <div className={`mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-2.5 py-1.5 ${d.card}`}>
        {contadores.map(([n, l, c], i) => (
          <span key={l} className={`flex items-center gap-1 text-[9.5px] text-[#4b5563] ${i > 3 ? "max-sm:hidden" : ""}`}>
            <b className="text-[11px] tabular-nums" style={{ color: c }}>
              {n}
            </b>
            {l}
          </span>
        ))}
        <InformationCircleIcon className="size-3 text-[#6b7280]" />
        <SelectChip mode="light" className="ml-auto max-sm:hidden">
          Todas as lojas
        </SelectChip>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-[1fr_1fr_0.95fr]">
        <div className="grid grid-cols-2 gap-2 sm:col-span-2">
          {equipe.map((p, i) => (
            <Pessoa key={p.i} p={p} className={i > 1 ? "max-sm:hidden" : ""} />
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <div className={`rounded-lg p-2 ${d.card}`}>
            <Cap mode="light">Hoje</Cap>
            <ul className="mt-1 flex flex-col gap-1">
              {feed.map(([h, txt]) => (
                <li key={h} className="flex gap-1.5 text-[9px] leading-snug text-[#4b5563]">
                  <span className="shrink-0 text-[#6b7280] tabular-nums">{h}</span>
                  {txt}
                </li>
              ))}
            </ul>
          </div>
          <ModoTv />
        </div>
      </div>
    </SystemFrame>
  );
}

/* ── Bloco C: tiles + Gerar Repasses (detalhe do vendedor) + recorte da Tabela de Convênio ────────────── */

function Check() {
  return (
    <span className="grid size-3 shrink-0 place-items-center rounded-[3px] bg-[#2751c5] text-[8px] leading-none font-bold text-white" aria-hidden="true">
      ✓
    </span>
  );
}

function Campo({ k, v, className = "" }: { k: string; v: ReactNode; className?: string }) {
  return (
    <span className={`min-w-0 ${className}`}>
      <span className="block truncate text-[8px] text-[#6b7280]">{k}</span>
      <span className="block truncate text-[9.5px] font-medium text-[#111827] tabular-nums">{v}</span>
    </span>
  );
}

export function CommissionMockup() {
  const repasses = [
    { p: PROPOSTAS.ana, base: "R$ 12.400,00", prev: "R$ 620,00", rep: "R$ 248,00" },
    { p: PROPOSTAS.carla, base: "R$ 15.200,00", prev: "R$ 760,00", rep: "R$ 304,00" },
    { p: PROPOSTAS.maria, base: "R$ 9.800,00", prev: "R$ 490,00", rep: "R$ 196,00" },
  ];
  return (
    <SystemFrame mode="light" tela="Gerar Repasses" abas={["Home", "Extrato de Pagamentos"]} label="Tela Gerar Repasses do eCorban no modo escuro: as propostas de uma vendedora selecionadas para repasse em lote, com o valor de cada repasse, e a tabela de convênio com vigência.">
      <div className="mb-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {[
          ["A repassar", "R$ 7.935,00", val.ambar],
          ["Total Repasse no mês", "R$ 11.295,00", val.verde],
          ["Convênios com vigência", "24", "#6184e5"],
        ].map(([l, v, c], i) => (
          <div key={l} className={`min-w-0 rounded-lg p-2 ${d.card} ${i === 2 ? "max-sm:hidden" : ""}`}>
            <Cap mode="light" className="truncate">
              {l}
            </Cap>
            <div className="truncate text-[12px] font-bold tabular-nums sm:text-[13px]" style={{ color: c }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      <Card mode="light">
        {/* Topo do detalhe */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-b border-[#e5e7eb] px-2.5 py-2">
          <span className="flex items-center gap-0.5 text-[9.5px] text-[#6b7280]">
            <ArrowLeftIcon className="size-3" /> Voltar
          </span>
          <Avatar i="MS" size={18} />
          <span className="text-[10.5px] font-semibold text-[#111827]">Marina Souza</span>
          <SelectChip mode="light" className="max-xl:hidden">
            BCO DO BRASIL · Ag 0002 / Conta 99999-9
          </SelectChip>
          <span className="ml-auto text-[9.5px] text-[#6b7280]">
            Total selecionado (3) <b className="text-[11px] text-[#22c55e] tabular-nums">R$ 748,00</b>
          </span>
          <span className="rounded-md bg-[#2751c5] px-2 py-1 text-[9.5px] font-semibold text-white">Gerar Repasses</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 pt-2 text-[9.5px] text-[#4b5563]">
          <Check /> Selecionar todas (3) <span className="text-[#6b7280]">· 3 selecionada(s)</span>
        </div>
        <div className="flex flex-col gap-1.5 p-2.5 pt-1.5">
          {repasses.map(({ p, base, prev, rep }, i) => (
            <div key={p.id} className={`rounded-md bg-[#f3f4f6] px-2 py-1.5 ring-1 ring-[#e5e7eb]/60 ${i > 1 ? "max-sm:hidden" : ""}`}>
              <div className="flex items-center gap-1.5">
                <Check />
                <span className="min-w-0 truncate text-[10px] font-semibold text-[#111827]">{p.nome}</span>
                <span className="hidden text-[9px] text-[#6b7280] tabular-nums sm:inline">{p.cpf}</span>
                <BankLogo b={p.banco} size={14} />
                <StatusPill s={p.status} className="ml-auto max-w-[96px] px-2! text-[8.5px]!" />
                <span className="text-[9px] text-[#6b7280] tabular-nums">{p.prazo}</span>
              </div>
              <div className="mt-1 grid grid-cols-3 items-end gap-x-2 sm:grid-cols-[1fr_1fr_1fr_1.2fr_auto]">
                <Campo k="Valor Base" v={base} />
                <Campo k="Prev. Comissão" v={prev} className="max-sm:hidden" />
                <Campo k="Multiplicador" v="100,00%" className="max-sm:hidden" />
                <Campo k="Grupo de Repasse" v={<span className="inline-flex items-center rounded bg-white px-1 ring-1 ring-[#e5e7eb]">Vendedores ˅</span>} />
                <span className="text-right">
                  <span className="block text-[8px] text-[#6b7280]">2,00 % =</span>
                  <span className="inline-block rounded bg-[#22c55e]/15 px-1.5 text-[10px] font-bold text-[#15803d] tabular-nums">{rep}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recorte da Tabela de Convênio, com vigência */}
      <div className={`mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-2.5 py-1.5 text-[9.5px] text-[#4b5563] ${d.card}`}>
        <Cap mode="light" className="w-full sm:w-auto">
          Tabela de Convênio
        </Cap>
        <b className="text-[#111827]">68640 - Novo Smart 1</b>
        <BankLogo b="Facta" size={14} />
        <span>INSS · Novo</span>
        <span className="text-[#6b7280]">
          Vigência <b className="text-[#111827]">22/08/2026 → indefinido</b>
        </span>
        <span className="text-[#6b7280] max-sm:hidden">
          Multiplicador <b className="text-[#111827]">100,00%</b>
        </span>
      </div>
    </SystemFrame>
  );
}
