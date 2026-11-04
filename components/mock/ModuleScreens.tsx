"use client";

import {
  ArrowRightIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
  LockClosedIcon,
  PencilSquareIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import {
  Avatar,
  BankLogo,
  bancos,
  Cap,
  Card,
  Chip,
  DataTable,
  FilterBar,
  MetaBar,
  MiniKpiTile,
  PROPOSTAS,
  ProposalCard,
  RitmoPill,
  Rosca,
  SearchChip,
  SelectChip,
  SystemFrame,
  sys,
  val,
  VBars,
} from "@/components/mock/system";

/*
 * As telas das 9 abas de Soluções, em modo claro, cada uma com o visual real do seu módulo (§5.2).
 * Mesmo elenco e mesmos números em todas (§7): a "mesma empresa" em todas as telas.
 */
const t = sys.light;
const hide = "max-sm:hidden";

/* 1 · Propostas: Totalizador + cards de proposta */
function Esteira() {
  const tiles = [
    ["Válidas", "R$ 1.070.600,00", "96 propostas", val.azul],
    ["Averbadas", "R$ 702.300,00", "52 propostas", val.verde],
    ["Não averbadas", "R$ 368.300,00", "44 propostas", val.ambar],
    ["Canceladas", "R$ 214.000,00", "32 propostas", val.cinza],
  ] as const;
  return (
    <SystemFrame tela="Propostas" abas={["Home", "Dashboard"]} link="Propostas" label="Tela de Propostas do eCorban: totalizador do período e três propostas com seus status.">
      <FilterBar left={<><SelectChip className={hide}>CPF Cliente</SelectChip><SearchChip className="w-28">Pesquisar…</SearchChip></>} filtro="Filtros · Últimos 7 dias" />
      <Card className="mb-2.5 flex items-center gap-3 p-2.5">
        <Rosca slices={[{ v: 52, cor: val.verde }, { v: 44, cor: val.ambar }, { v: 32, cor: val.cinza }]} centro="128" legenda="propostas" size={58} />
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-4">
          {tiles.map(([l, v, s, c]) => (
            <div key={l} className="min-w-0">
              <Cap className="truncate">{l}</Cap>
              <div className="truncate text-[11px] font-bold tabular-nums" style={{ color: c }}>
                {v}
              </div>
              <div className={`text-[8.5px] ${t.sub}`}>{s}</div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex flex-col gap-2">
        <ProposalCard p={PROPOSTAS.ana} />
        <ProposalCard p={PROPOSTAS.roberto} />
        <div className={hide}>
          <ProposalCard p={PROPOSTAS.maria} campos={false} />
        </div>
      </div>
    </SystemFrame>
  );
}

/* 2 · Clientes: tabela com a coluna Cadastros (ícones coloridos) + "Minha agenda" sobreposta */
function Cadastros({ tel, doc, banco = true, id = true }: { tel?: number; doc?: number; banco?: boolean; id?: boolean }) {
  const n = (c: string, v?: number) => v && v > 1 && <span className="absolute -top-1 -right-1.5 grid size-2.5 place-items-center rounded-full text-[6px] font-bold text-white" style={{ background: c }}>{v}</span>;
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative"><PhoneIcon className="size-3 text-[#16a34a]" strokeWidth={2} />{n("#16a34a", tel)}</span>
      {id && <IdentificationIcon className="size-3 text-[#2563eb]" strokeWidth={2} />}
      {banco && <BuildingLibraryIcon className="size-3 text-[#d97706]" strokeWidth={2} />}
      {doc !== undefined && <span className="relative"><DocumentTextIcon className="size-3 text-[#dc2626]" strokeWidth={2} />{n("#dc2626", doc)}</span>}
    </span>
  );
}

function Clientes() {
  const rows: [string, string, string, string, string, string, string, ReactNode][] = [
    ["MA", "#ec4899", "MARIA APARECIDA SOUZA", "353.***.***-75", "08/09/1962", "64 anos", "São José do Rio Preto · SP", <Cadastros key="c" tel={2} doc={3} />],
    ["AL", "#ef4444", "ANA LÚCIA FERREIRA", "779.***.***-91", "15/09/1967", "59 anos", "Mirassol · SP", <Cadastros key="c" tel={2} doc={1} banco={false} />],
    ["RA", "#3b82f6", "ROBERTO ALMEIDA", "435.***.***-07", "22/03/1958", "68 anos", "Bady Bassitt · SP", <Cadastros key="c" tel={1} />],
    ["CM", "#10b981", "CARLA MENEZES", "256.***.***-90", "04/12/1961", "64 anos", "Mirassol · SP", <Cadastros key="c" tel={3} doc={2} />],
    ["JB", "#f59e0b", "JOEL BATISTA", "021.***.***-28", "03/05/1985", "41 anos", "—", <Cadastros key="c" tel={1} banco={false} />],
  ];
  return (
    <SystemFrame
      tela="Clientes"
      abas={["Home", "Propostas"]}
      link="Clientes"
      label="Tela de Clientes do eCorban: tabela de clientes por CPF com os ícones de cadastro e a agenda de atendimentos."
    >
      <FilterBar left={<SearchChip className="w-36 sm:w-44">Buscar por nome, CPF ou telefone</SearchChip>} />
      <Card>
        <DataTable
          cols={[{ h: "Foto" }, { h: "Nome" }, { h: "CPF", className: hide }, { h: "Nascimento", className: hide }, { h: "Cidade", className: "hidden xl:table-cell" }, { h: "Cadastros" }]}
          rows={rows.map(([ini, cor, nome, cpf, nasc, idade, cidade, cad]) => [
            <Avatar key="a" i={ini} cor={cor} size={22} />,
            <span key="n" className="block max-w-[150px] truncate font-semibold">{nome}<span className={`block font-normal sm:hidden ${t.sub}`}>{cpf}</span></span>,
            <span key="c" className="tabular-nums">{cpf}</span>,
            <span key="d" className="tabular-nums">{nasc}<span className={`block text-[8.5px] ${t.sub}`}>{idade}</span></span>,
            cidade,
            cad,
          ])}
        />
      </Card>
      {/* "Minha agenda" da tela inicial: atendimento e retorno, logo abaixo da lista */}
      <div className="mt-2.5 ml-auto hidden w-[250px] rounded-lg bg-white p-2.5 shadow-[0_18px_40px_-12px_rgba(17,24,39,.35)] ring-1 ring-[#e5e7eb] sm:block">
          <div className="mb-1.5 text-[11px] font-semibold text-[#111827]">Minha agenda</div>
          <Cap className="text-[#dc2626]!">Atrasados (2)</Cap>
          <div className="mt-1 flex items-center gap-2 rounded-md bg-[#fef2f2] p-1.5">
            <span className="min-w-0 flex-1">
              <span className="block text-[8.5px] font-semibold text-[#dc2626]">28/10 às 14:00 · Ligação</span>
              <span className="block truncate text-[9.5px] text-[#111827]">Ligar para Maria Aparecida</span>
            </span>
            <span className="rounded-md bg-[#16a34a] px-2 py-0.5 text-[9px] font-semibold text-white">Atender</span>
          </div>
          <Cap className="mt-2">Hoje</Cap>
          <div className="mt-1 flex items-center justify-between text-[9.5px] text-[#111827]">
            <span>
              <span className="font-semibold tabular-nums">10:00</span> Reunião · Sala de testes
            </span>
            <span className="text-[8.5px] text-[#16a34a]">Concluído</span>
          </div>
      </div>
    </SystemFrame>
  );
}

/* 3 · Campanhas de Telemarketing + Central de Atendimento */
function Campanhas() {
  const camp = [
    ["INSS Novo · Outubro", 6, 240, 148],
    ["Portabilidade C6", 4, 120, 42],
    ["Refin Facta", 3, 80, 72],
  ] as const;
  return (
    <SystemFrame tela="Campanhas de Telemarketing" abas={["Home", "Central de Atendimento"]} label="Tela de Campanhas de Telemarketing do eCorban com o progresso de cada campanha e a Central de Atendimento para sortear o próximo cliente.">
      <FilterBar left={<SearchChip className="w-28">Buscar campanha</SearchChip>} />
      <Card>
        <DataTable
          cols={[{ h: "Campanha" }, { h: "Usuários", className: hide }, { h: "Clientes", right: true, className: hide }, { h: "Progresso" }, { h: "Criado em", className: "hidden xl:table-cell" }, { h: "", className: hide }]}
          rows={camp.map(([nome, u, c, feitos]) => {
            const pct = Math.round((feitos / c) * 100);
            return [
              <span key="n" className="font-semibold">{nome}</span>,
              <Chip key="u">{u} usuários</Chip>,
              c,
              <span key="p" className="block min-w-20">
                <span className="flex items-center gap-1.5">
                  <span className="h-1 flex-1 rounded-full bg-[#e5e7eb]"><span className="block h-full rounded-full bg-[#2751c5]" style={{ width: `${pct}%` }} /></span>
                  <span className="text-[8.5px] tabular-nums">{feitos}/{c}</span>
                </span>
                <span className={`text-[8.5px] ${t.sub}`}>{pct}% atendidos</span>
              </span>,
              <span key="d" className="tabular-nums">01/10/2026</span>,
              <span key="a" className={`flex gap-1 ${t.sub}`}><PencilSquareIcon className="size-3" /><TrashIcon className="size-3" /></span>,
            ];
          })}
        />
      </Card>
      {/* Central de Atendimento: faixa larga logo abaixo da lista, sem sobra de espaço na tela */}
      <div className="mt-2.5 flex flex-col gap-2.5 rounded-lg bg-white p-3 shadow-[0_10px_28px_-14px_rgba(17,24,39,.4)] ring-1 ring-[#e5e7eb] sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#2751c5]/10 text-[#2751c5]">
            <PhoneIcon className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] font-bold text-[#111827]">Central de Atendimento</span>
            <span className={`block text-[9.5px] leading-snug ${t.sub}`}>Escolha a campanha e sorteie o próximo cliente para atendimento.</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <SelectChip className="min-w-0 flex-1 justify-between sm:w-[178px] sm:flex-none">INSS Novo · Outubro (92 disponíveis)</SelectChip>
          <span className="rounded-md bg-[#2751c5] px-3 py-1.5 text-[10.5px] font-semibold whitespace-nowrap text-white">Sortear cliente</span>
        </div>
      </div>
    </SystemFrame>
  );
}

/* 4 · Metas e Projeções: card Total com MetaProgress + cards por vendedor */
function Vendedor({ i, nome, feito, pct, ritmo }: { i: string; nome: string; feito: string; pct: number; ritmo: number }) {
  return (
    <Card className="p-2.5">
      <div className="flex items-center gap-2">
        <Avatar i={i} size={24} />
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-[#111827]">{nome}</span>
      </div>
      <div className="mt-1.5"><RitmoPill acima={pct >= ritmo} /></div>
      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[10px] text-[#111827]">
          <b className="tabular-nums">{feito}</b> <span className={t.sub}>de R$ 50.000,00</span>
        </span>
        <span className="text-[13px] font-bold text-[#3b82f6] tabular-nums">{pct}%</span>
      </div>
      <div className="mt-1"><MetaBar pct={pct} ritmo={ritmo} h="h-1.5" /></div>
    </Card>
  );
}

function Metas() {
  const ritmo = 81; // dia útil 17 de 21
  return (
    <SystemFrame tela="Metas e Projeções" abas={["Home", "Dashboard"]} label="Tela de Metas e Projeções do eCorban: meta total de outubro em 87%, acima do ritmo, e o progresso de cada vendedor.">
      <FilterBar left={<><SelectChip><CalendarDaysIcon className="mr-0.5 inline size-3" />Outubro de 2026</SelectChip><SelectChip className={hide}>Campanha Vendedores</SelectChip></>} filtro={null} primary="Consultar" plus={false} />
      <Card title="Total · Campanha Outubro" right="12 vendedores" className="mb-2.5">
        <div className="p-2.5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <Cap>Atingido · Valor Base</Cap>
              <div className="text-[15px] leading-tight font-bold text-[#111827] tabular-nums">R$ 522.000,00</div>
              <div className={`text-[9.5px] ${t.sub}`}>de R$ 600.000,00</div>
            </div>
            <div className="text-[22px] leading-none font-bold text-[#3b82f6] tabular-nums">87%</div>
          </div>
          <div className="mt-2"><MetaBar pct={87} ritmo={ritmo} /></div>
          <div className={`mt-1 text-[8.5px] ${t.sub}`}>Dia útil 17 de 21 · o traço mostra onde deveria estar hoje no ritmo da meta</div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            <div className="min-w-0 rounded-md bg-[#f9fafb] p-1.5 ring-1 ring-[#e5e7eb]">
              <span className={`flex items-center gap-1 text-[8.5px] ${t.sub}`}><ClockIcon className="size-3 shrink-0 text-[#3b82f6]" /><span className="truncate">Esperado até hoje · 81%</span></span>
              <b className="block truncate text-[10.5px] text-[#111827] tabular-nums">R$ 485.714,29</b>
              <span className={`block truncate text-[8px] ${hide} ${t.sub}`}>17 de 21 dias úteis · faltam 4</span>
            </div>
            <div className="min-w-0 rounded-md bg-[#f9fafb] p-1.5 ring-1 ring-[#e5e7eb]">
              <span className={`block truncate text-[8.5px] ${t.sub}`}>Falta</span>
              <b className="block truncate text-[10.5px] text-[#111827] tabular-nums">R$ 78.000,00</b>
              <span className={`block truncate text-[8px] ${hide} ${t.sub}`}>R$ 19.500,00 por dia útil restante</span>
            </div>
            <div className="min-w-0 rounded-md bg-[#f0fdf4] p-1.5 ring-1 ring-[#bbf7d0]">
              <span className={`block truncate text-[8.5px] ${t.sub}`}>Projeção fim do mês</span>
              <b className="block truncate text-[10.5px] text-[#16a34a] tabular-nums">R$ 644.823,53</b>
              <span className={`block truncate text-[8px] ${hide} ${t.sub}`}>acima da meta nesse ritmo</span>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Vendedor i="MS" nome="Marina Souza" feito="R$ 56.000,00" pct={112} ritmo={ritmo} />
        <Vendedor i="PR" nome="Paula Rocha" feito="R$ 32.000,00" pct={64} ritmo={ritmo} />
      </div>
    </SystemFrame>
  );
}

/*
 * 5 · Relatórios: três telas reais que se revezam sozinhas a cada 5,5 s (a aba ativa acompanha):
 * Rankings Diversos (ranking de bancos + detalhamento), Desempenho por Período (linhas por vendedor + produção
 * diária) e Calendário de Produção (o mês dia a dia). Com "reduzir movimento" fica parado na primeira.
 * Números do mês batem com o resto do site: R$ 522.000,00 de Valor Base, 128 propostas, R$ 36.540,00 de comissão.
 */
const RELATORIOS = ["Rankings Diversos", "Desempenho por Período", "Calendário de Produção"] as const;

const ranking = [
  { nome: "PAN", qtde: 41, base: "R$ 168.400,00", com: "R$ 11.788,00", v: 168.4, cor: "#2a78d6" },
  { nome: "C6", qtde: 33, base: "R$ 132.900,00", com: "R$ 9.303,00", v: 132.9, cor: "#22c55e" },
  { nome: "Facta", qtde: 24, base: "R$ 97.300,00", com: "R$ 6.811,00", v: 97.3, cor: "#f97316" },
  { nome: "Crefaz", qtde: 18, base: "R$ 71.600,00", com: "R$ 5.012,00", v: 71.6, cor: "#8b5cf6" },
  { nome: "QualiBanking", qtde: 12, base: "R$ 51.800,00", com: "R$ 3.626,00", v: 51.8, cor: "#14b8a6" },
];

function BarrasPizza() {
  return (
    <span className="inline-flex overflow-hidden rounded-md text-[8.5px] font-semibold ring-1 ring-[#d1d5db]">
      <span className="bg-[#2751c5] px-1.5 py-0.5 text-white">Barras</span>
      <span className="px-1.5 py-0.5">Pizza</span>
    </span>
  );
}

function RankingsDiversos() {
  return (
    <>
      <Card title="Ranking de Bancos" right={<BarrasPizza />} className="mb-2.5">
        <div className="px-2.5 pt-1.5 pb-2">
          <div className={`mb-1.5 text-[8.5px] ${t.sub}`}>01/10/2026 – 31/10/2026 · Valor Base</div>
          <VBars h={58} items={ranking.map((r) => ({ nome: r.nome, v: r.v, rotulo: `R$ ${String(r.v).replace(".", ",")} mil`, cor: r.cor }))} />
        </div>
      </Card>
      <Card title="Detalhamento do Relatório">
        <DataTable
          cols={[{ h: "#", className: hide }, { h: "Nome" }, { h: "Qtde", right: true }, { h: "Valor Base", right: true }, { h: "Comissão", right: true, className: hide }]}
          rowClassName={(i) => (i > 2 ? "max-sm:hidden" : "")}
          rows={ranking.map((r, i) => [i + 1, <b key="n">{r.nome}</b>, r.qtde, <span key="b" className="whitespace-nowrap">{r.base}</span>, <span key="c" className="whitespace-nowrap">{r.com}</span>])}
          total={["", "Total", 128, <span key="t" className="whitespace-nowrap">R$ 522.000,00</span>, <span key="c" className="whitespace-nowrap">R$ 36.540,00</span>]}
        />
      </Card>
    </>
  );
}

// Valor Base mensal por vendedor (em mil), de maio a outubro
const desempenho = [
  { nome: "Marina Souza", cor: "#ec4899", v: [38, 44, 41, 50, 47, 56] },
  { nome: "Rafael Nunes", cor: "#14b8a6", v: [35, 39, 46, 42, 45, 49] },
  { nome: "Diego Lima", cor: "#3b82f6", v: [30, 36, 33, 40, 38, 43] },
  { nome: "Paula Rocha", cor: "#f59e0b", v: [28, 25, 31, 27, 30, 32] },
];
const meses = ["05/2026", "06/2026", "07/2026", "08/2026", "09/2026", "10/2026"];
// Produção diária dos 17 dias úteis de outubro até hoje (propostas por dia; 128 no total)
const porDia = [6, 8, 7, 9, 5, 8, 7, 6, 8, 10, 7, 9, 6, 8, 7, 8, 9];
const diasUteis = [1, 2, 5, 6, 7, 8, 9, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26];

function DesempenhoPorPeriodo() {
  const W = 300, H = 104, L = 26, B = 14, max = 60;
  const x = (i: number) => L + (i * (W - L - 6)) / (meses.length - 1);
  const y = (v: number) => H - B - (v / max) * (H - B - 6);
  const maxDia = Math.max(...porDia);
  return (
    <>
      <Card title="Desempenho de Vendedores" className="mb-2.5">
        <div className="px-2.5 pt-1.5 pb-2">
          <div className={`text-[8.5px] ${t.sub}`}>
            05/2026 – 10/2026 · Valor Base · <span className="text-[#2751c5]">Comparativo</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 w-full" aria-hidden="true">
            {[0, 20, 40, 60].map((g) => (
              <g key={g}>
                <line x1={L} x2={W - 4} y1={y(g)} y2={y(g)} stroke="#e5e7eb" strokeWidth="0.6" />
                <text x={L - 3} y={y(g) + 2} textAnchor="end" fontSize="5.5" fill="#9ca3af">
                  {g ? `${g} mil` : "R$ 0"}
                </text>
              </g>
            ))}
            {meses.map((m, i) => (
              <text key={m} x={x(i)} y={H - 3} textAnchor={i === meses.length - 1 ? "end" : i === 0 ? "start" : "middle"} fontSize="5.5" fill="#9ca3af">
                {m}
              </text>
            ))}
            {desempenho.map((d) => (
              <g key={d.nome}>
                <polyline points={d.v.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke={d.cor} strokeWidth="1.4" strokeLinejoin="round" />
                {d.v.map((v, i) => (
                  <circle key={i} cx={x(i)} cy={y(v)} r="1.8" fill={d.cor} />
                ))}
              </g>
            ))}
          </svg>
          <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[8.5px] text-[#4b5563]">
            {desempenho.map((d) => (
              <span key={d.nome} className="flex items-center gap-1">
                <span className="size-1.5 rounded-full" style={{ background: d.cor }} />
                {d.nome}
              </span>
            ))}
          </div>
        </div>
      </Card>
      <Card title="Produção diária" right={<span className="max-sm:hidden">Total do período: <b className="text-[#111827]">R$ 522.000,00</b> (128 propostas)</span>}>
        <div className="flex h-[62px] items-end gap-[3px] px-2.5 pt-2 pb-1">
          {porDia.map((n, i) => (
            <span key={i} className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
              <span className="w-full rounded-t-[2px] bg-[#6184e5]" style={{ height: (n / maxDia) * 38 }} />
              <span className="text-[6.5px] text-[#9ca3af] tabular-nums">{String(diasUteis[i]).padStart(2, "0")}</span>
            </span>
          ))}
        </div>
      </Card>
    </>
  );
}

const brlCurto = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function CalendarioDeProducao() {
  // Outubro de 2026 começa numa quinta: 4 dias de setembro antes, 35 casas no total. Dia 12 é feriado; hoje é 26.
  const producao = new Map(diasUteis.map((d, i) => [d, porDia[i]]));
  const casas = Array.from({ length: 35 }, (_, i) => i - 3);
  return (
    <Card className="flex flex-1 flex-col">
      <div className="flex items-center justify-between px-2.5 pt-2">
        <span className={`grid size-5 place-items-center rounded-md ring-1 ring-[#e5e7eb] ${t.sub}`}>‹</span>
        <span className="text-center">
          <span className="block text-[10.5px] font-bold text-[#111827]">OUTUBRO DE 2026</span>
          <span className={`block text-[8px] ${t.sub}`}>Valor Base · Propostas válidas</span>
        </span>
        <span className={`grid size-5 place-items-center rounded-md ring-1 ring-[#e5e7eb] ${t.sub}`}>›</span>
      </div>
      <div className="mt-2 grid flex-1 auto-rows-fr grid-cols-7 grid-rows-[auto] border-t border-[#e5e7eb] text-center">
        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((d) => (
          <span key={d} className={`py-1 text-[7.5px] font-semibold ${t.sub}`}>
            {d}
          </span>
        ))}
        {casas.map((dia, i) => {
          const fora = dia < 1;
          const n = producao.get(dia);
          const fimDeSemana = i % 7 === 0 || i % 7 === 6;
          const hoje = dia === 26;
          return (
            <span key={i} className={`relative min-h-[34px] border-t border-l border-[#f3f4f6] px-1 pt-0.5 text-left ${fora ? "bg-[#f9fafb]" : ""} ${i % 7 === 0 ? "border-l-0" : ""}`}>
              <span
                className={`absolute top-0.5 right-1 grid size-3.5 place-items-center rounded-full text-[7.5px] tabular-nums ${hoje ? "bg-[#2751c5] font-bold text-white" : fora ? "text-[#d1d5db]" : "text-[#6b7280]"}`}
              >
                {fora ? 26 + dia + 4 : dia}
              </span>
              {n !== undefined && (
                <span className="absolute bottom-0.5 left-1 leading-tight">
                  <span className="block text-[6.5px] text-[#6b7280]">{n} prop.</span>
                  <b className="hidden text-[7px] text-[#111827] tabular-nums sm:block">{brlCurto(Math.round(n * 4078.125))}</b>
                </span>
              )}
              {dia === 12 && <span className="absolute bottom-0.5 left-1 text-[6.5px] text-[#9ca3af]">0 prop.</span>}
              {!fora && !fimDeSemana && dia > 26 && <span className="absolute bottom-1 left-1 h-1 w-4 rounded-full bg-[#f3f4f6]" />}
            </span>
          );
        })}
      </div>
    </Card>
  );
}

function Relatorios() {
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setV((x) => (x + 1) % RELATORIOS.length), 5500);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <SystemFrame
      tela={RELATORIOS[v]}
      abas={[...RELATORIOS]}
      label="Relatórios do eCorban que se revezam: Rankings Diversos com o ranking de bancos e o detalhamento por valor e comissão, Desempenho por Período com a evolução de cada vendedor e a produção diária, e o Calendário de Produção do mês."
    >
      <FilterBar left={<SelectChip>01/10/2026 – 31/10/2026</SelectChip>} filtro="Alterar filtros" />
      {/* As 3 telas ficam empilhadas na mesma célula: a altura é a da maior e nada abaixo "pula" quando trocam */}
      <div className="grid">
        {[RankingsDiversos, DesempenhoPorPeriodo, CalendarioDeProducao].map((Tela, i) => (
          <div
            key={RELATORIOS[i]}
            className={`flex flex-col transition-[opacity,translate] duration-300 [grid-area:1/1] ${i === v ? "opacity-100" : "invisible translate-y-1.5 opacity-0"}`}
          >
            <Tela />
          </div>
        ))}
      </div>
    </SystemFrame>
  );
}

/* 6 · Extrato de Pagamentos (repasses por destinatário, com linha de total) */
function Comissoes() {
  const rows = [
    ["MARINA SOUZA", 14, "R$ 4.620,00", "R$ 200,00", "R$ 4.820,00"],
    ["DIEGO LIMA", 9, "R$ 3.115,00", "—", "R$ 3.115,00"],
    ["PAULA ROCHA", 11, "R$ 3.360,00", "—", "R$ 3.360,00"],
  ] as const;
  return (
    <SystemFrame tela="Extrato de Pagamentos" abas={["Home", "Gerar Repasses"]} label="Extrato de Pagamentos do eCorban: repasses de comissão por vendedor no período, com total de R$ 11.295,00.">
      <FilterBar left={<SelectChip>01/10/2026 – 31/10/2026</SelectChip>} />
      <Card title="Extrato de Pagamentos" right="01/10/2026 – 31/10/2026">
        <DataTable
          cols={[{ h: "Destinatário" }, { h: "Tipo", className: hide }, { h: "Contratos", right: true, className: hide }, { h: "Repasses", right: true, className: "hidden xl:table-cell" }, { h: "Bônus", right: true, className: hide }, { h: "Total Repasse", right: true }]}
          rows={rows.map(([nome, n, rep, bonus, total]) => [
            <span key="n" className="font-semibold whitespace-nowrap"><span className={t.sub}>›</span> {nome}</span>,
            <Chip key="t" className="bg-[#2751c5]/10! text-[#2751c5]!">Vendedor</Chip>,
            n,
            rep,
            bonus,
            <b key="v" className="whitespace-nowrap text-[#16a34a]">{total}</b>,
          ])}
          total={["TOTAL DO PERÍODO", "", 34, "R$ 11.095,00", "R$ 200,00", <span key="t" className="whitespace-nowrap text-[#16a34a]">R$ 11.295,00</span>]}
        />
      </Card>
    </SystemFrame>
  );
}

/* 7 · Lançamentos Financeiros: tiles + lançamentos automáticos com cadeado */
function Financeiro() {
  const rows: [string, ReactNode, string, string, boolean, string][] = [
    ["27/10", <span key="d" className="flex items-center gap-1"><LockClosedIcon className="size-3 shrink-0 text-[#6b7280]" />Comissões recebidas <span className="text-[#2751c5]">38 propostas</span></span>, "Comissões de propostas", "R$ 18.400,00", true, "27/10"],
    ["27/10", <span key="d" className="flex items-center gap-1"><LockClosedIcon className="size-3 shrink-0 text-[#6b7280]" />Repasses pagos <span className="text-[#2751c5]">34 propostas</span></span>, "Repasses de propostas", "R$ 11.295,00", false, "27/10"],
    ["05/10", "Aluguel escritório", "Despesas fixas", "R$ 3.200,00", false, "05/10"],
    ["10/11", "Folha de pagamento", "Pessoal", "R$ 12.000,00", false, ""],
  ];
  return (
    <SystemFrame tela="Lançamentos Financeiros" abas={["Home", "Contas a Pagar"]} label="Lançamentos Financeiros do eCorban: dinheiro recebido, despesas e saldo, com comissões e repasses lançados automaticamente.">
      <FilterBar left={<SearchChip className="w-32">Pesquisar por descrição…</SearchChip>} />
      <div className="mb-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
        <MiniKpiTile icon={ArrowTrendingUpIcon} label="Dinheiro recebido" value="R$ 18.400,00" color="#16a34a" sub="🔒 Comissões" />
        <MiniKpiTile icon={ClockIcon} label="Total a receber" value="R$ 9.600,00" color={val.azul} className={hide} />
        <MiniKpiTile icon={ArrowTrendingDownIcon} label="Despesas pagas" value="R$ 14.495,00" color="#dc2626" sub="🔒 Repasses" />
        <MiniKpiTile icon={ExclamationCircleIcon} label="Despesas a pagar" value="R$ 12.000,00" color="#ea580c" className="max-xl:hidden" />
        <MiniKpiTile icon={CreditCardIcon} label="Saldo" value="R$ 3.905,00" color={val.azul} className="max-xl:hidden" />
      </div>
      <Card>
        <DataTable
          cols={[{ h: "Data", className: hide }, { h: "Descrição" }, { h: "Categoria", className: "hidden xl:table-cell" }, { h: "Valor", right: true }, { h: "Pagamento", className: hide }]}
          rows={rows.map(([d, desc, cat, v, entrada, pg]) => [
            <span key="d" className="tabular-nums">{d}</span>,
            desc,
            <Chip key="c">{cat}</Chip>,
            <b key="v" className="whitespace-nowrap" style={{ color: entrada ? "#16a34a" : "#dc2626" }}>{v}</b>,
            pg ? <span key="p" className="inline-flex items-center gap-0.5 whitespace-nowrap text-[#16a34a]"><CheckIcon className="size-3" strokeWidth={2.5} />{pg}</span> : <span key="p" className={t.sub}>—</span>,
          ])}
        />
      </Card>
    </SystemFrame>
  );
}

/* 8 · Simulações Bancárias (C6 Consig): lista com "Enviada (#…)" e "Enviar pra esteira" */
function Simulacoes() {
  const rows = [
    ["ROBERTO ALMEIDA", "R$ 1.500,00 · 108x", "Tx 1,83 Flex 1", 5086],
    ["JOSÉ CARLOS LIMA", "R$ 1.586,67 · 108x", "Tkt até 6k", 0],
    ["MARIA APARECIDA SOUZA", "R$ 2.300,00 · 96x", "Tx 1,80 Flex 2", 5091],
  ] as const;
  return (
    <SystemFrame tela="C6 Consig" abas={["Home", "Banco PAN"]} label="Simulações Bancárias do eCorban no C6 Consig: simulações por cliente, com as enviadas para a esteira e o atalho Enviar pra esteira.">
      <div className="mb-2 flex flex-wrap gap-1.5">
        {bancos.map((b) => (
          <span key={b} className={`inline-flex items-center gap-1 rounded-md bg-white py-0.5 pr-2 pl-0.5 text-[9.5px] font-medium ring-1 ${b === "C6" ? "text-[#111827] ring-[#2751c5]" : "text-[#6b7280] ring-[#e5e7eb]"} ${b === "QualiBanking" || b === "Facta" ? hide : ""}`}>
            <BankLogo b={b} size={15} />
            {b}
          </span>
        ))}
      </div>
      <FilterBar left={<SearchChip className="w-40">Nome ou CPF… (Enter pra buscar)</SearchChip>} filtro={null} />
      <Card>
        <DataTable
          cols={[{ h: "Cliente" }, { h: "Tipo", className: hide }, { h: "Valor / Prazo", className: hide }, { h: "Condição", className: "hidden xl:table-cell" }, { h: "Esteira", right: true }]}
          rows={rows.map(([nome, vp, cond, prop]) => [
            <span key="n" className="block max-w-[150px] truncate font-semibold">{nome}<span className={`block font-normal sm:hidden ${t.sub}`}>{vp}</span></span>,
            <Chip key="t">Margem Livre</Chip>,
            <span key="v" className="whitespace-nowrap tabular-nums">{vp}</span>,
            cond,
            prop ? (
              <span key="e" className="inline-block rounded-full bg-[#22c55e] px-2 py-px text-[9px] font-semibold whitespace-nowrap text-white">Enviada (#{prop})</span>
            ) : (
              <span key="e" className="inline-flex items-center gap-0.5 font-semibold whitespace-nowrap text-[#2751c5]">Enviar pra esteira <ArrowRightIcon className="size-3" /></span>
            ),
          ])}
        />
      </Card>
    </SystemFrame>
  );
}

/* 9 · Auditoria: quem, quando e o que mudou (antes → depois) */
function Governanca() {
  const rows: [string, string, string, string, string, ReactNode][] = [
    ["28/10/2026, 16:58", "PR", "Paula Rocha", "#5086 — Roberto A.", "Status", <><span>Digitada</span> <span className="text-[#2751c5]">→</span> <b>Pendência Documentação</b></>],
    ["28/10/2026, 16:55", "DL", "Diego Lima", "#5087 — Ana Lúcia F.", "Status", <><span>Digitada</span> <span className="text-[#2751c5]">→</span> <b>Formalização Recebida…</b></>],
    ["28/10/2026, 11:51", "MS", "Marina Souza", "#5084 — Maria A.", "Status", <><span>Averbado</span> <span className="text-[#2751c5]">→</span> <b>Pago - Produtos</b></>],
    ["28/10/2026, 11:40", "PR", "Paula Rocha", "#5085 — Carla M.", "Data de averbação", <><span>—</span> <span className="text-[#2751c5]">→</span> <b>28/10/2026</b></>],
  ];
  return (
    <SystemFrame tela="Auditoria" abas={["Home", "Usuários"]} label="Tela de Auditoria do eCorban: registro de quem alterou cada proposta, quando e o que mudou, com o valor anterior e o novo.">
      <FilterBar left={<SearchChip className="w-32">Proposta, contrato, CPF…</SearchChip>} filtro="Filtros · 23/10/2026 – 29/10/2026" />
      <Card title={<><ShieldCheckIcon className="size-3.5 text-[#2751c5]" /> Registros de auditoria</>} right="207 registros">
        <DataTable
          cols={[{ h: "Data e hora", className: hide }, { h: "Usuário" }, { h: "Ação", className: "hidden xl:table-cell" }, { h: "Registro", className: hide }, { h: "O que mudou" }]}
          rows={rows.map(([d, i, u, reg, campo, mudou]) => [
            <span key="d" className="whitespace-nowrap tabular-nums">{d}</span>,
            <span key="u" className="flex items-center gap-1.5 whitespace-nowrap"><Avatar i={i} size={16} /><span className="max-sm:hidden">{u}</span></span>,
            <span key="a" className="rounded-full bg-[#2751c5]/10 px-1.5 py-px text-[8.5px] font-semibold text-[#2751c5]">Alterou</span>,
            <span key="r" className="whitespace-nowrap"><span className={t.sub}>Proposta </span><span className="font-medium text-[#2751c5]">{reg}</span></span>,
            <span key="m" className="block text-[9.5px] leading-snug">
              <span className="font-semibold">{campo}:</span> {mudou}
            </span>,
          ])}
        />
      </Card>
    </SystemFrame>
  );
}

export const moduleScreens: Record<string, () => ReactNode> = {
  esteira: Esteira,
  clientes: Clientes,
  campanhas: Campanhas,
  metas: Metas,
  relatorios: Relatorios,
  comissoes: Comissoes,
  financeiro: Financeiro,
  simulacoes: Simulacoes,
  governanca: Governanca,
};
