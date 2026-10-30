"use client";

import { ArrowUpRightIcon, ChatBubbleLeftRightIcon, CheckIcon, ChevronDownIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Ring } from "@/components/ui/Ring";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { brl, type Ciclo, type CicloId, ciclos, type Faixa, faixas, precoPorMes, rotuloFaixa } from "@/content/pricing";
import { site, whatsappLink } from "@/content/site";

const resumo: Record<CicloId, string> = {
  mensal: "Cobrança mês a mês, renovada automaticamente.",
  trimestral: "Pague a cada 3 meses e economize 5%.",
  semestral: "Pague a cada 6 meses e economize 10%.",
  anual: "O melhor custo: 2 meses grátis no ano.",
};

/** Chave liga/desliga do "pagamento à vista no boleto". */
function Switch({ on, onChange, label, dark }: { on: boolean; onChange: (v: boolean) => void; label: string; dark: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${
        on ? (dark ? "bg-brand-950" : "bg-brand-600") : "bg-neutral-300"
      }`}
    >
      <span
        className={`inline-block size-5 rounded-full shadow transition-transform duration-200 ${on ? "translate-x-[22px]" : "translate-x-0.5"} ${
          on && dark ? "bg-brand-300" : "bg-white"
        }`}
      />
    </button>
  );
}

/** Preço que desliza ao mudar (usuários ou boleto). */
function Preco({ valor, className }: { valor: number; className: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={valor}
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          className="tabular-nums"
        >
          {brl(valor)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Card({ c, usuarios, aVista, setAVista }: { c: Ciclo; usuarios: Faixa; aVista: boolean; setAVista: (v: boolean) => void }) {
  const dark = !!c.popular;
  const valor = precoPorMes(usuarios, c.id, aVista);
  const renovacao = c.meses === 1 ? "a cada mês" : `a cada ${c.meses} meses`;
  const msg = `Olá, quero contratar o plano ${c.nome} do eCorban para ${usuarios} usuários${aVista ? ", com pagamento à vista no boleto" : ""}.`;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${
        dark
          ? "bg-linear-to-br from-brand-700 via-brand-800 to-brand-950 text-white shadow-[0_30px_60px_-24px_rgba(22,44,105,.75)] ring-1 ring-white/10 xl:-translate-y-3 xl:hover:-translate-y-4"
          : "bg-surface text-strong shadow-[0_10px_30px_-18px_rgba(17,24,39,.35)] ring-1 ring-line/70 hover:shadow-[0_24px_50px_-24px_rgba(39,81,197,.45)]"
      }`}
    >
      {dark && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-300 px-3 py-1 text-xs font-bold tracking-wide text-brand-950 uppercase shadow">
          Mais escolhido
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-extrabold tracking-wide uppercase">{c.nome}</h3>
        {c.selo && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={aVista ? "b" : "n"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={`rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${dark ? "bg-brand-300 text-brand-950" : "bg-brand-50 text-brand-700"}`}
            >
              {aVista ? c.seloBoleto : c.selo}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <p className={`mt-2 min-h-[2.75rem] text-sm ${dark ? "text-brand-100" : "text-muted"}`}>{resumo[c.id]}</p>

      {/* Pílula do preço, com a chave do boleto (como na referência) */}
      <div className={`mt-5 flex items-center justify-between gap-2 rounded-full py-2.5 pr-2.5 pl-4 sm:pl-5 xl:pl-4 ${dark ? "bg-white text-strong" : "bg-page-alt ring-1 ring-line/70"}`}>
        <span className="flex items-baseline gap-1">
          <Preco valor={valor} className="text-[22px] leading-tight font-extrabold xl:text-[19px]" />
          <span className="text-xs text-muted sm:text-sm xl:text-xs">/mês</span>
        </span>
        {c.id !== "mensal" && <Switch on={aVista} onChange={setAVista} label={`Pagamento à vista no boleto, plano ${c.nome}`} dark={dark} />}
      </div>
      <p className={`mt-2 px-1 text-xs ${dark ? "text-brand-100" : "text-muted"}`}>
        {c.id === "mensal" ? "Cobrança mensal" : aVista ? `À vista no boleto · ${c.seloBoleto}` : "Ative para pagar à vista no boleto"}
      </p>

      <ul className={`mt-6 flex flex-col gap-3 text-sm ${dark ? "text-white" : "text-body"}`}>
        {["Todos os módulos do sistema", `Até ${usuarios} usuários`, `Renovação automática ${renovacao}`].map((t) => (
          <li key={t} className="flex items-center gap-3">
            <span className={`size-1.5 shrink-0 rounded-full ${dark ? "bg-brand-300" : "bg-brand-600"}`} />
            {t}
          </li>
        ))}
      </ul>

      {/* CTA em pílula com a seta num círculo (como na referência) */}
      <div className="mt-auto pt-8">
        <a
          href={site.trialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between rounded-full py-2 pr-2 pl-6 text-[15px] font-semibold transition-colors ${
            dark ? "bg-brand-300 text-brand-950 hover:bg-brand-200" : "bg-chrome text-white hover:bg-brand-900"
          }`}
        >
          Testar grátis
          <span
            className={`grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
              dark ? "bg-brand-950 text-brand-300" : "bg-brand-300 text-brand-950"
            }`}
          >
            <ArrowUpRightIcon className="size-4" strokeWidth={2.4} aria-hidden="true" />
          </span>
        </a>
        <a
          href={whatsappLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline ${dark ? "text-white" : "text-brand-600"}`}
        >
          <ChatBubbleLeftRightIcon className="size-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>
        <p className={`mt-3 text-center text-[11px] ${dark ? "text-brand-200" : "text-muted"}`}>* taxa de adesão</p>
      </div>
    </article>
  );
}

const COLUNAS = 5;

/**
 * Seletor de usuários no lugar do <select> do navegador: o painel abre em grade (as 35 faixas visíveis de uma vez,
 * sem rolagem), no mesmo escuro da barra. Teclado: setas movem o foco (←→ 1, ↑↓ uma linha), Home/End, Enter escolhe,
 * Esc fecha e devolve o foco ao botão. Clicar fora fecha.
 */
function UsuariosPicker({ usuarios, onChange }: { usuarios: Faixa; onChange: (u: Faixa) => void }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const opts = useRef<(HTMLButtonElement | null)[]>([]);
  const atual = faixas.indexOf(usuarios);

  useEffect(() => {
    if (!open) return;
    opts.current[atual]?.focus();
    const fora = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", fora);
    return () => document.removeEventListener("pointerdown", fora);
    // só ao abrir: o foco inicial vai para a faixa escolhida
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const mover = (para: number) => opts.current[Math.min(faixas.length - 1, Math.max(0, para))]?.focus();
  const teclas = (e: React.KeyboardEvent) => {
    const foco = opts.current.findIndex((el) => el === document.activeElement);
    const passos: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLUNAS, ArrowUp: -COLUNAS };
    if (e.key in passos) {
      e.preventDefault();
      mover((foco < 0 ? atual : foco) + passos[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      mover(0);
    } else if (e.key === "End") {
      e.preventDefault();
      mover(faixas.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    }
  };

  return (
    <div ref={wrap} className="contents">
      <button
        ref={trigger}
        type="button"
        id="planos-usuarios"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="planos-usuarios-lista"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-300 py-2 pr-3.5 pl-5 text-[15px] font-bold text-brand-950 tabular-nums transition-colors hover:bg-brand-200 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
      >
        {rotuloFaixa(usuarios)}
        <ChevronDownIcon className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={2.4} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="planos-usuarios-lista"
            role="listbox"
            aria-label="Quantidade de usuários"
            onKeyDown={teclas}
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-full left-1/2 z-30 mt-3 w-[min(348px,calc(100vw-38px))] -translate-x-1/2 rounded-3xl bg-chrome p-4 shadow-[0_28px_60px_-18px_rgba(17,24,39,.75)] ring-1 ring-white/10"
          >
            <div className="mb-3 flex items-baseline justify-between px-1">
              <span className="text-sm font-semibold text-white">Tamanho da equipe</span>
              <span className="text-xs text-white/55">de {faixas[0]} a {faixas[faixas.length - 1]} usuários</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {faixas.map((u, i) => {
                const on = u === usuarios;
                return (
                  <button
                    key={u}
                    ref={(el) => {
                      opts.current[i] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => {
                      onChange(u);
                      setOpen(false);
                      trigger.current?.focus();
                    }}
                    className={`relative grid h-10 cursor-pointer place-items-center rounded-full text-sm font-semibold tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none ${
                      on ? "bg-brand-300 text-brand-950" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {String(u).padStart(2, "0")}
                    {on && <CheckIcon className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-brand-950 p-0.5 text-brand-300" strokeWidth={3.2} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 px-1 text-xs text-white/55">Escolha o número de usuários do seu time. O preço atualiza na hora.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Pricing() {
  const [usuarios, setUsuarios] = useState<Faixa>(3);
  const [boleto, setBoleto] = useState<Record<CicloId, boolean>>({ mensal: false, trimestral: false, semestral: false, anual: false });
  const i = faixas.indexOf(usuarios);
  const passo = (d: number) => setUsuarios(faixas[Math.min(faixas.length - 1, Math.max(0, i + d))]);

  return (
    <section id="planos" className="relative overflow-hidden bg-linear-to-b from-page via-brand-50/50 to-page px-[19px] py-16 sm:px-8 sm:py-24">
      <Ring size={520} thickness={80} tone="soft" className="-top-40 -left-48" />
      <Ring size={380} thickness={64} tone="soft" className="top-1/2 -right-40" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle title="Qual plano combina mais com a sua empresa?">
            Todos os módulos, de 3 a 320 usuários. Escolha o tamanho da equipe e o ciclo de pagamento.
          </SectionTitle>
        </Reveal>

        {/* Barra escura em pílula, com a faixa de usuários em destaque (como as abas da referência) */}
        <div className="relative z-20 mt-9 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-chrome p-1.5 pl-5 shadow-[0_14px_30px_-14px_rgba(17,24,39,.6)]">
            <label htmlFor="planos-usuarios" className="mr-1 hidden text-sm font-medium text-white/80 sm:block">
              Quantos usuários?
            </label>
            <button
              type="button"
              onClick={() => passo(-1)}
              disabled={i === 0}
              aria-label="Menos usuários"
              className="grid size-9 place-items-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              <MinusIcon className="size-4" strokeWidth={2.4} />
            </button>
            <UsuariosPicker usuarios={usuarios} onChange={setUsuarios} />
            <button
              type="button"
              onClick={() => passo(1)}
              disabled={i === faixas.length - 1}
              aria-label="Mais usuários"
              className="grid size-9 place-items-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
            >
              <PlusIcon className="size-4" strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {ciclos.map((c) => (
            <Reveal key={c.id} className="h-full">
              <Card c={c} usuarios={usuarios} aVista={boleto[c.id]} setAVista={(v) => setBoleto({ ...boleto, [c.id]: v })} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-pretty text-muted">
          Todos os planos incluem todos os módulos do sistema. * Há taxa de adesão na contratação — fale com o nosso time para saber o valor.
        </p>
      </div>
    </section>
  );
}
