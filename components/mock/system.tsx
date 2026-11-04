import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, ReactNode, SVGProps } from "react";

/*
 * Peças visuais do sistema eCorban (portal.ecorban.com) para os mockups do site.
 * Regra: simplificar, não inventar — só telas, status e conceitos que existem no sistema.
 * Tokens "sys" (a paleta gray do Tailwind que o sistema usa), separados dos tokens de marketing do site.
 */
export type Mode = "light" | "dark";

export const sys = {
  light: {
    page: "bg-[#e5e7eb]",
    card: "bg-white shadow-[0_1px_2px_rgba(0,0,0,.05)] ring-1 ring-[#e5e7eb]",
    inner: "bg-[#f9fafb]",
    border: "border-[#e5e7eb]",
    text: "text-[#111827]",
    sub: "text-[#6b7280]",
    link: "text-[#2751c5]",
    tabs: "bg-white border-b border-[#e5e7eb]",
    input: "bg-white ring-1 ring-[#d1d5db] text-[#6b7280]",
    chip: "bg-[#f3f4f6] text-[#4b5563]",
  },
  dark: {
    page: "bg-[#111827]",
    card: "bg-[#1f2937] ring-1 ring-[#374151]",
    inner: "bg-[#18212f]",
    border: "border-[#374151]",
    text: "text-[#f3f4f6]",
    sub: "text-[#9ca3af]",
    link: "text-[#6184e5]",
    tabs: "bg-[#1f2937] border-b border-[#374151]",
    input: "bg-[#111827] ring-1 ring-[#374151] text-[#9ca3af]",
    chip: "bg-[#374151] text-[#d1d5db]",
  },
} as const;

/** Cores semânticas de valor (§2.3). */
export const val = { azul: "#3b82f6", verde: "#22c55e", ambar: "#f59e0b", cinza: "#9ca3af", vermelho: "#ef4444", laranja: "#f97316" } as const;

/** Status de proposta com os nomes e cores reais da demo (§2.4). */
export const STATUS = {
  simulado: { nome: "Simulado", cor: "#fb923c" },
  digitada: { nome: "Digitada", cor: "#154ef9" },
  aguardandoFormalizacao: { nome: "Aguardando Formalização", cor: "#f5d224", escuro: true },
  pendencia: { nome: "Pendência Documentação", cor: "#ef4444" },
  averbado: { nome: "Averbado", cor: "#22c55e" },
  pago: { nome: "Pago - Produtos", cor: "#16a34a" },
  cancelado: { nome: "Cancelado", cor: "#9ca3af" },
  emAnalise: { nome: "Formalização Recebida (em Análise)", cor: "#6366f1" },
  aguardandoDigitacao: { nome: "Aguardando Digitação", cor: "#6366f1" },
} as const;
export type StatusId = keyof typeof STATUS;

/** Pílula sólida na cor do status (texto escuro quando a cor é clara). Nome longo é encurtado com "…". */
export function StatusPill({ s, className = "" }: { s: StatusId; className?: string }) {
  const st = STATUS[s];
  return (
    <span
      className={`inline-block max-w-full truncate rounded-full px-2.5 py-0.5 align-middle text-[10px] leading-4 font-semibold whitespace-nowrap ${"escuro" in st ? "text-[#111827]" : "text-white"} ${className}`}
      style={{ background: st.cor }}
    >
      {st.nome}
    </span>
  );
}

/** Pílula pequena genérica (Tipo, Categoria, Usuários…). */
export function Chip({ mode = "light", children, className = "" }: { mode?: Mode; children: ReactNode; className?: string }) {
  return <span className={`inline-block rounded-full px-2 py-px text-[9px] font-medium whitespace-nowrap ${sys[mode].chip} ${className}`}>{children}</span>;
}

/** Elenco fictício padronizado (§7). */
export const CAST = {
  MS: { nome: "Marina Souza", cor: "#ec4899", loja: "Loja Centro" },
  DL: { nome: "Diego Lima", cor: "#3b82f6", loja: "Loja Norte" },
  PR: { nome: "Paula Rocha", cor: "#f59e0b", loja: "Loja Centro" },
  RN: { nome: "Rafael Nunes", cor: "#14b8a6", loja: "Loja Norte" },
  CM: { nome: "Carlos Mendes", cor: "#8b5cf6", loja: "Gerente" },
  SE: { nome: "Suporte Ecorban", cor: "#6366f1", loja: "" },
} as const;
export type CastId = keyof typeof CAST;

/** Avatar de iniciais (o sistema não mostra foto nas telas-chave). */
export function Avatar({ i, cor, size = 28 }: { i: string; cor?: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-bold text-white"
      style={{ width: size, height: size, background: cor ?? CAST[i as CastId]?.cor ?? "#6366f1", fontSize: Math.round(size * 0.36) }}
    >
      {i}
    </span>
  );
}

/** Logo pequena e quadrada dos bancos integrados, como nos cards de proposta e nas simulações. */
const BANKS = {
  PAN: { bg: "#0b62c4", fg: "#fff", t: "pan" },
  C6: { bg: "#242424", fg: "#fff", t: "C6" },
  Crefaz: { bg: "#f97316", fg: "#fff", t: "cre\nfaz" },
  Facta: { bg: "#fff7ed", fg: "#ea580c", t: "F" },
  QualiBanking: { bg: "#0d9488", fg: "#fff", t: "Q" },
} as const;
export type Bank = keyof typeof BANKS;
export const bancos = Object.keys(BANKS) as Bank[];
export function BankLogo({ b, size = 18 }: { b: Bank; size?: number }) {
  const k = BANKS[b];
  const multi = k.t.includes("\n");
  return (
    <span
      className="inline-grid shrink-0 place-items-center rounded-[4px] text-center leading-[0.85] font-extrabold whitespace-pre ring-1 ring-black/10"
      style={{ width: size, height: size, background: k.bg, color: k.fg, fontSize: multi ? size * 0.3 : size * (k.t.length > 2 ? 0.36 : 0.5) }}
    >
      {k.t}
    </span>
  );
}

/**
 * Moldura do sistema: topbar escura (sempre escura, nos dois temas) + faixa de abas abertas. Sem sidebar — o menu do
 * sistema é um drawer (☰). No celular os links da topbar e as abas inativas somem; ficam ☰, busca, sino e avatar.
 * `label` descreve a tela para leitores de tela (o desenho em si é decorativo).
 */
export function SystemFrame({
  mode = "light",
  tela,
  abas = [],
  link,
  label,
  overlay,
  children,
  className = "",
}: {
  mode?: Mode;
  tela: string;
  abas?: string[];
  link?: "Home" | "Dashboard" | "Propostas" | "Clientes";
  label: string;
  /** Algo sobreposto à tela (dropdown do sino, modal…), posicionado em relação à moldura. */
  overlay?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const t = sys[mode];
  return (
    <div role="img" aria-label={label} className={`relative overflow-hidden rounded-xl text-left shadow-[0_24px_60px_-20px_rgba(17,24,39,.45)] ring-1 ring-black/10 select-none ${className}`}>
      {/* Topbar */}
      <div className="flex items-center gap-2 border-b border-[#1f2937] bg-[#111827] px-3 py-2">
        <span className="mr-1 hidden gap-1 sm:flex">
          <span className="size-2 rounded-full bg-[#ef4444]" />
          <span className="size-2 rounded-full bg-[#f59e0b]" />
          <span className="size-2 rounded-full bg-[#22c55e]" />
        </span>
        <Bars3Icon className="size-4 shrink-0 text-[#9ca3af]" />
        <span className="flex min-w-0 items-center gap-1 rounded-md bg-[#1f2937] px-2 py-1 text-[10px] text-[#9ca3af] ring-1 ring-[#374151]">
          <MagnifyingGlassIcon className="size-3 shrink-0" />
          <span className="truncate">Pesquisar cliente</span>
        </span>
        <span className="hidden items-center gap-3 pl-2 text-[10px] font-medium md:flex lg:hidden xl:flex">
          {(["Home", "Dashboard", "Propostas", "Clientes"] as const).map((l) => (
            <span key={l} className={l === link ? "text-white" : "text-[#9ca3af]"}>
              {l}
            </span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-2.5">
          <span className="relative">
            <BellIcon className="size-4 text-[#9ca3af]" />
            <span className="absolute -top-1 -right-1 grid size-3 place-items-center rounded-full bg-[#ef4444] text-[7px] font-bold text-white">1</span>
          </span>
          <Avatar i="SE" size={20} />
        </span>
      </div>
      {/* Faixa de abas abertas: a ativa sublinhada em azul */}
      <div className={`flex items-end gap-1 overflow-hidden px-2 pt-1 text-[10px] ${t.tabs}`}>
        {(abas.includes(tela) ? abas : [...abas, tela]).map((a) => {
          const on = a === tela;
          return (
            <span
              key={a}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-1.5 whitespace-nowrap ${on ? `border-[#2751c5] font-semibold ${t.text}` : `border-transparent max-sm:hidden ${t.sub}`}`}
            >
              {a}
              <XMarkIcon className="size-2.5 opacity-60" />
            </span>
          );
        })}
      </div>
      <div className={`p-2.5 sm:p-3 ${t.page}`}>{children}</div>
      {overlay}
    </div>
  );
}

/** Barra de filtros reduzida: período/busca + "Filtros" + botão de ação opcional (sem relógio nem "+ Nova …"). */
export function FilterBar({
  mode = "light",
  left,
  filtro = "Filtros",
  primary,
  plus = true,
}: {
  mode?: Mode;
  left?: ReactNode;
  filtro?: string | null;
  primary?: string;
  plus?: boolean;
}) {
  const t = sys[mode];
  return (
    <div className={`mb-2.5 flex items-center gap-1.5 rounded-lg p-1.5 ${t.card}`}>
      {left}
      {filtro && (
        <span className="hidden shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap text-[#4b74e6] ring-1 ring-[#2751c5]/60 sm:inline-flex">
          <Cog6ToothIcon className="size-3" /> {filtro}
        </span>
      )}
      <span className="ml-auto flex shrink-0 items-center gap-1.5">
        {primary && (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#2751c5] px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-white">
            {plus && <PlusIcon className="size-3" strokeWidth={2.5} />} {primary}
          </span>
        )}
      </span>
    </div>
  );
}

export function SelectChip({ mode = "light", children, className = "" }: { mode?: Mode; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] whitespace-nowrap ${sys[mode].input} ${className}`}>
      <span className="truncate">{children}</span>
      <ChevronDownIcon className="size-2.5 shrink-0" />
    </span>
  );
}

export function SearchChip({ mode = "light", children, className = "" }: { mode?: Mode; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] whitespace-nowrap ${sys[mode].input} ${className}`}>
      <MagnifyingGlassIcon className="size-3 shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  );
}

/** Rótulo em caixa alta do sistema. */
export function Cap({ mode = "light", children, className = "" }: { mode?: Mode; children: ReactNode; className?: string }) {
  return <div className={`text-[9px] font-medium tracking-wide uppercase ${sys[mode].sub} ${className}`}>{children}</div>;
}

/** Card de tela com título (e algo à direita, opcional). */
export function Card({ mode = "light", title, right, children, className = "" }: { mode?: Mode; title?: ReactNode; right?: ReactNode; children: ReactNode; className?: string }) {
  const t = sys[mode];
  return (
    <div className={`overflow-hidden rounded-lg ${t.card} ${className}`}>
      {title && (
        <div className={`flex items-center justify-between gap-2 border-b px-2.5 py-2 ${t.border}`}>
          <span className={`flex min-w-0 items-center gap-1.5 truncate text-[11px] font-semibold ${t.text}`}>{title}</span>
          {right && <span className={`shrink-0 text-[10px] ${t.sub}`}>{right}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

/** Card de KPI do Dashboard (§3.2), versão compacta: rótulo, valor na cor semântica e "x propostas". */
export function KpiCard({ mode = "light", label, value, sub, color }: { mode?: Mode; label: string; value: string; sub: string; color: string }) {
  const t = sys[mode];
  return (
    <div className={`min-w-0 rounded-lg p-2 ${t.card}`}>
      <Cap mode={mode} className="truncate">
        {label}
      </Cap>
      <div className="mt-0.5 truncate text-[12px] font-bold tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className={`text-[9px] ${t.sub}`}>{sub}</div>
    </div>
  );
}

/** Tile do Financeiro / Totalizador (§3.3): ícone em círculo + rótulo + valor colorido + linha auxiliar opcional. */
export function MiniKpiTile({
  mode = "light",
  icon: Icon,
  label,
  value,
  color,
  sub,
  className = "",
}: {
  mode?: Mode;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  color: string;
  sub?: string;
  className?: string;
}) {
  const t = sys[mode];
  return (
    <div className={`flex min-w-0 items-start gap-1.5 rounded-lg p-2 ${t.card} ${className}`}>
      <span className="grid size-5 shrink-0 place-items-center rounded-full" style={{ background: `${color}22`, color }}>
        <Icon className="size-3" strokeWidth={2.2} />
      </span>
      <span className="min-w-0">
        <span className={`block truncate text-[9px] ${t.sub}`}>{label}</span>
        <span className="block truncate text-[11px] font-bold tabular-nums" style={{ color }}>
          {value}
        </span>
        {sub && <span className={`block truncate text-[8.5px] ${t.sub}`}>{sub}</span>}
      </span>
    </div>
  );
}

/**
 * Barra de meta com o traço que mostra onde deveria estar hoje no ritmo (§3.4) — a assinatura visual das Metas.
 * Verde quando acima do ritmo, vermelho quando abaixo.
 */
export function MetaBar({ pct, ritmo, track = "bg-[#e5e7eb]", h = "h-2" }: { pct: number; ritmo: number; track?: string; h?: string }) {
  const acima = pct >= ritmo;
  return (
    <div className={`relative ${h} rounded-full ${track}`}>
      <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: acima ? val.verde : val.vermelho }} />
      <span className="absolute -top-0.5 -bottom-0.5 w-[2px] -translate-x-1/2 rounded bg-white shadow-[0_0_0_1px_rgba(17,24,39,.4)]" style={{ left: `${ritmo}%` }} />
    </div>
  );
}

/** Selo de ritmo do vendedor. O texto "abaixo" é o real; o "acima" ainda será confirmado (§9). */
export function RitmoPill({ acima }: { acima: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap ${acima ? "bg-[#22c55e]/15 text-[#15803d]" : "bg-[#ef4444]/15 text-[#b91c1c]"}`}
    >
      {acima ? "Acima do ritmo da meta" : "Abaixo do ritmo da meta 😓"}
    </span>
  );
}

/** Pizza simples em SVG, com o percentual escrito dentro de cada fatia. */
export function Pie({ slices, size = 84 }: { slices: { v: number; cor: string }[]; size?: number }) {
  const total = slices.reduce((s, x) => s + x.v, 0);
  // Ângulo inicial de cada fatia (acumulado), a partir do topo.
  const starts = slices.map((_, i) => -Math.PI / 2 + (slices.slice(0, i).reduce((s, x) => s + x.v, 0) / total) * Math.PI * 2);
  const r = 50;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="shrink-0" aria-hidden="true">
      {slices.map((s, i) => {
        const a0 = starts[i];
        const a1 = a0 + (s.v / total) * Math.PI * 2;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d = `M50,50 L${50 + r * Math.cos(a0)},${50 + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${50 + r * Math.cos(a1)},${50 + r * Math.sin(a1)} Z`;
        const am = (a0 + a1) / 2;
        const pct = Math.round((s.v / total) * 100);
        return (
          <g key={i}>
            <path d={d} fill={s.cor} stroke="rgba(255,255,255,.7)" strokeWidth="0.8" />
            {pct >= 9 && (
              <text x={50 + r * 0.6 * Math.cos(am)} y={50 + r * 0.6 * Math.sin(am)} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="700" fill="#fff">
                {pct}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Rosca do Totalizador, com o total no centro. */
export function Rosca({ slices, size = 64, mode = "light", centro, legenda }: { slices: { v: number; cor: string }[]; size?: number; mode?: Mode; centro: string; legenda: string }) {
  const total = slices.reduce((s, x) => s + x.v, 0);
  const c = 2 * Math.PI * 15.9;
  const offs = slices.map((_, i) => (slices.slice(0, i).reduce((s, x) => s + x.v, 0) / total) * c);
  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
        {slices.map((s, i) => {
          const len = (s.v / total) * c;
          return <circle key={i} cx="18" cy="18" r="15.9" fill="none" stroke={s.cor} strokeWidth="3.6" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offs[i]} />;
        })}
      </svg>
      <span className="text-center leading-none">
        <span className="block text-[13px] font-bold text-[#3b82f6] tabular-nums">{centro}</span>
        <span className={`block text-[6.5px] font-medium tracking-wide uppercase ${sys[mode].sub}`}>{legenda}</span>
      </span>
    </span>
  );
}

/** Barras verticais (Top Vendedores / Ranking): valor em cima, nome em caixa alta embaixo. */
export function VBars({ mode = "light", items, h = 64 }: { mode?: Mode; items: { nome: string; v: number; rotulo: string; cor?: string }[]; h?: number }) {
  const max = Math.max(...items.map((x) => x.v));
  const t = sys[mode];
  return (
    <div className="flex items-end justify-around gap-2">
      {items.map((x) => (
        <div key={x.nome} className="flex min-w-0 flex-1 flex-col items-center">
          <span className={`text-[8.5px] font-semibold whitespace-nowrap tabular-nums ${t.text}`}>{x.rotulo}</span>
          <span className="mt-0.5 w-full max-w-7 rounded-t-[3px]" style={{ height: (x.v / max) * h, background: x.cor ?? val.azul }} />
          <span className={`mt-1 w-full truncate text-center text-[7.5px] font-medium tracking-wide uppercase ${t.sub}`}>{x.nome}</span>
        </div>
      ))}
    </div>
  );
}

/** Tabela do sistema (§3.7): cabeçalho cinza sem fundo, divisores finos, valores à direita, linha Total opcional. */
export type Col = { h: string; right?: boolean; className?: string };
export function DataTable({ mode = "light", cols, rows, total, rowClassName }: { mode?: Mode; cols: Col[]; rows: ReactNode[][]; total?: ReactNode[]; rowClassName?: (i: number) => string }) {
  const t = sys[mode];
  const cell = (c: Col) => `px-2 py-1.5 align-middle ${c.right ? "text-right tabular-nums" : ""} ${c.className ?? ""}`;
  return (
    <table className="w-full table-auto border-collapse text-[10px]">
      <thead>
        <tr className={`border-b ${t.border}`}>
          {cols.map((c) => (
            <th key={c.h} className={`${cell(c)} text-left text-[9px] font-medium whitespace-nowrap ${c.right ? "text-right!" : ""} ${t.sub}`}>
              {c.h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={t.text}>
        {rows.map((r, i) => (
          <tr key={i} className={`border-b last:border-0 ${t.border} ${rowClassName?.(i) ?? ""}`}>
            {r.map((v, j) => (
              <td key={j} className={cell(cols[j])}>
                {v}
              </td>
            ))}
          </tr>
        ))}
        {total && (
          <tr className={`border-t font-bold ${t.border} ${t.inner}`}>
            {total.map((v, j) => (
              <td key={j} className={cell(cols[j])}>
                {v}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

/** Proposta do elenco (§7). */
export type Proposta = {
  id: number;
  nome: string;
  cpf: string;
  banco: Bank;
  status: StatusId;
  valor: string;
  parcela: string;
  prazo: string;
  liberado: string;
  produto: string;
  cadastro: string;
  vendedor: string;
  loja: string;
  ha: string;
};

export const PROPOSTAS = {
  ana: { id: 5087, nome: "Ana Lúcia Ferreira", cpf: "779.***.***-91", banco: "PAN", status: "emAnalise", valor: "R$ 12.400,00", parcela: "R$ 324,63", prazo: "84x", liberado: "R$ 11.950,00", produto: "INSS · Novo", cadastro: "27/10/2026, 16:07", vendedor: "Marina Souza", loja: "Loja Centro", ha: "há 1d" },
  roberto: { id: 5086, nome: "Roberto Almeida", cpf: "435.***.***-07", banco: "C6", status: "pendencia", valor: "R$ 8.900,00", parcela: "R$ 233,02", prazo: "84x", liberado: "R$ 8.610,00", produto: "INSS · Refinanciamento", cadastro: "27/10/2026, 11:42", vendedor: "Diego Lima", loja: "Loja Norte", ha: "há 2d" },
  carla: { id: 5085, nome: "Carla Menezes", cpf: "256.***.***-90", banco: "Facta", status: "averbado", valor: "R$ 15.200,00", parcela: "R$ 398,05", prazo: "84x", liberado: "R$ 14.730,00", produto: "INSS · Novo", cadastro: "27/10/2026, 16:07", vendedor: "Marina Souza", loja: "Loja Centro", ha: "há 2d" },
  joel: { id: 5088, nome: "Joel Batista", cpf: "021.***.***-28", banco: "Crefaz", status: "digitada", valor: "R$ 6.300,00", parcela: "R$ 289,40", prazo: "48x", liberado: "R$ 6.050,00", produto: "CLT · Novo", cadastro: "28/10/2026, 09:15", vendedor: "Rafael Nunes", loja: "Loja Norte", ha: "há 1d" },
  maria: { id: 5084, nome: "Maria Aparecida Souza", cpf: "353.***.***-75", banco: "QualiBanking", status: "pago", valor: "R$ 9.800,00", parcela: "R$ 256,63", prazo: "96x", liberado: "R$ 9.420,00", produto: "SIAPE · Novo", cadastro: "24/10/2026, 10:31", vendedor: "Marina Souza", loja: "Loja Centro", ha: "há 5d" },
} satisfies Record<string, Proposta>;

/**
 * Card de proposta da tela Propostas (versão reduzida do real): linha 1 com cliente, banco, status e valores;
 * linha 2 com os campos; rodapé com cadastro, vendedor e loja. No celular empilha.
 */
export function ProposalCard({ p, mode = "light", campos = true, destaque = false }: { p: Proposta; mode?: Mode; campos?: boolean; destaque?: boolean }) {
  const t = sys[mode];
  return (
    <div className={`overflow-hidden rounded-lg ${t.card} ${destaque ? "ring-2! ring-[#2751c5]!" : ""}`}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2.5 pt-2 pb-1.5">
        <PlusCircleIcon className={`size-3.5 shrink-0 ${t.sub}`} />
        <span className={`min-w-0 truncate text-[11px] font-bold ${t.text}`}>{p.nome}</span>
        <span className={`hidden text-[10px] tabular-nums sm:inline ${t.sub}`}>{p.cpf}</span>
        <BankLogo b={p.banco} size={16} />
        <span className="flex min-w-0 basis-full items-center gap-2 sm:ml-auto sm:basis-auto">
          <StatusPill s={p.status} className="max-w-[130px] sm:max-w-[150px]" />
          <span className={`ml-auto text-[11px] font-bold whitespace-nowrap tabular-nums sm:ml-0 ${t.text}`}>{p.valor}</span>
          <span className={`hidden text-[10px] tabular-nums sm:inline ${t.sub}`}>{p.parcela}</span>
          <span className={`text-[10px] font-semibold tabular-nums ${t.sub}`}>{p.prazo}</span>
          <DocumentTextIcon className="hidden size-3.5 text-[#4b74e6] sm:block" />
          <FolderIcon className="hidden size-3.5 text-[#4b74e6] sm:block" />
          <EllipsisVerticalIcon className={`size-3.5 ${t.sub}`} />
        </span>
      </div>
      {campos && (
        <div className="grid grid-cols-3 gap-x-3 gap-y-1 px-2.5 pb-2 sm:grid-cols-5">
          {[
            ["ID", String(p.id)],
            ["Data", p.cadastro.slice(0, 10)],
            ["Financiado", p.valor],
            ["Liberado", p.liberado],
            ["Produto/Operação", p.produto],
          ].map(([k, v], i) => (
            <span key={k} className={`min-w-0 ${i > 2 ? "max-sm:hidden" : ""}`}>
              <span className={`block truncate text-[8.5px] ${t.sub}`}>{k}</span>
              <span className={`block truncate text-[10px] font-medium tabular-nums ${t.text}`}>{v}</span>
            </span>
          ))}
        </div>
      )}
      <div className={`flex items-center gap-3 border-t px-2.5 py-1 text-[9px] ${t.border} ${t.inner} ${t.sub}`}>
        <span className="truncate max-sm:hidden">
          Cadastro: <span className={t.text}>{p.cadastro}</span>
        </span>
        <span className="truncate">
          Vendedor: <span className={t.text}>{p.vendedor}</span>
        </span>
        <span className="truncate max-sm:hidden">
          Loja: <span className={t.text}>{p.loja}</span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-0.5">
          <ClockIcon className="size-3" /> {p.ha}
        </span>
      </div>
    </div>
  );
}
