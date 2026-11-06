"use client";

import { BanknotesIcon, CheckCircleIcon, DocumentCheckIcon, FlagIcon, HomeIcon, PresentationChartBarIcon, QueueListIcon, UserIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROPOSTAS, StatusPill } from "@/components/mock/system";

// Os números do mês batem com os cards do herói (52 pagas, R$ 36,5 mil, R$ 522.000,00 = 87% da meta).
const periodos = [
  { id: "Hoje", pagas: "4", comissoes: "R$ 1.240", producao: "R$ 18.700,00", meta: "de R$ 28.000,00", pct: 67 },
  { id: "Semana", pagas: "17", comissoes: "R$ 8.950", producao: "R$ 121.300,00", meta: "de R$ 150.000,00", pct: 81 },
  { id: "Mês", pagas: "52", comissoes: "R$ 36,5 mil", producao: "R$ 522.000,00", meta: "de R$ 600.000,00", pct: 87 },
];

// Avisos que aparecem no topo da tela, um a cada troca de período.
const avisos = [
  { icon: CheckCircleIcon, cor: "#22c55e", txt: "Proposta #5085 averbada", sub: "Carla Menezes · INSS" },
  { icon: BanknotesIcon, cor: "#2751c5", txt: "Repasse gerado", sub: "R$ 4.820,00 · Marina Souza" },
  { icon: FlagIcon, cor: "#f59e0b", txt: "Você passou de 85% da meta", sub: "Faltam R$ 78.000,00" },
];

const lista = [PROPOSTAS.carla, PROPOSTAS.joel, PROPOSTAS.ana, PROPOSTAS.maria, PROPOSTAS.roberto];

/** Celular com a versão mobile do sistema: o período troca sozinho e os números, a meta, os avisos e a lista acompanham. */
export function PhoneMockup() {
  const reduzir = useReducedMotion();
  const [k, setK] = useState(2);
  useEffect(() => {
    if (reduzir) return;
    const t = setInterval(() => setK((v) => (v + 1) % periodos.length), 3600);
    return () => clearInterval(t);
  }, [reduzir]);
  const p = periodos[k];
  const aviso = avisos[k];

  return (
    <div aria-hidden="true" className="relative w-[320px] rounded-[46px] bg-[#0b1220] p-[9px] shadow-[0_40px_80px_-30px_rgba(6,20,50,.75)] ring-1 ring-white/10">
      {/* Botões laterais */}
      <span className="absolute top-28 -left-[3px] h-10 w-[3px] rounded-l bg-[#1e293b]" />
      <span className="absolute top-44 -left-[3px] h-14 w-[3px] rounded-l bg-[#1e293b]" />
      <span className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-[#1e293b]" />

      <div className="relative h-[680px] overflow-hidden rounded-[38px] bg-[#f3f4f6] font-sans text-[#111827]">
        {/* Barra de status + ilha */}
        <div className="relative z-20 flex h-11 items-center justify-between bg-[#1f2937] px-6 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="absolute top-2 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 18 12" className="h-2.5 w-3.5 fill-white">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5" width="3" height="7" rx="1" />
              <rect x="10" y="2" width="3" height="10" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" opacity=".4" />
            </svg>
            <span className="h-2.5 w-5 rounded-[3px] border border-white/70 p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-white" />
            </span>
          </span>
        </div>

        {/* Topo do sistema */}
        <div className="flex items-center justify-between bg-[#1f2937] px-4 pt-1 pb-3">
          <Image src="/logo/logo-branca.svg" alt="" width={86} height={13} className="h-[13px] w-auto" />
          <Image src="/pessoas/marina.webp" alt="" width={28} height={28} className="size-7 rounded-full object-cover ring-2 ring-[#ec4899]" />
        </div>

        {/* Aviso que desce do topo */}
        <div className="pointer-events-none absolute inset-x-3 top-[48px] z-30 h-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={k}
              initial={{ y: -24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring", stiffness: 260, damping: 22 } }}
              exit={{ y: -16, opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2 shadow-[0_12px_30px_-10px_rgba(15,23,42,.45)] ring-1 ring-black/5 backdrop-blur"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full" style={{ background: `${aviso.cor}1f`, color: aviso.cor }}>
                <aviso.icon className="size-4.5" />
              </span>
              <span className="min-w-0 leading-tight">
                <b className="block truncate text-[11.5px]">{aviso.txt}</b>
                <span className="block truncate text-[10px] text-[#6b7280]">{aviso.sub}</span>
              </span>
              <span className="ml-auto self-start text-[9px] text-[#9ca3af]">agora</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-4 pt-[24px]">
          <p className="text-[10.5px] text-[#6b7280]">
            Olá, <b className="text-[13px] font-bold text-[#111827]">Marina Souza</b>
          </p>

          {/* Seletor de período */}
          <div className="relative mt-1.5 grid grid-cols-3 rounded-full bg-white p-0.5 text-center text-[10px] font-semibold ring-1 ring-black/5">
            {periodos.map((x, i) => (
              <span key={x.id} className={`relative z-10 py-1 transition-colors duration-300 ${i === k ? "text-white" : "text-[#6b7280]"}`}>
                {i === k && <motion.span layoutId="periodo" className="absolute inset-0 -z-10 rounded-full bg-[#2751c5]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {x.id}
              </span>
            ))}
          </div>

          {/* KPIs */}
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <Kpi icon={DocumentCheckIcon} cor="#16a34a" fundo="#dcfce7" rotulo="Propostas pagas" valor={p.pagas} k={k} />
            <Kpi icon={BanknotesIcon} cor="#d97706" fundo="#fef3c7" rotulo="Comissões" valor={p.comissoes} k={k} />
          </div>

          {/* Meta */}
          <div className="mt-1.5 rounded-xl bg-white px-2.5 py-2 ring-1 ring-black/5">
            <div className="flex items-center justify-between text-[9.5px]">
              <span className="flex items-center gap-1 font-semibold">
                <FlagIcon className="size-3 text-[#2751c5]" /> Meta da empresa
              </span>
              <AnimatePresence mode="wait">
                <motion.b key={k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-[12px] text-[#2751c5]">
                  {p.pct}%
                </motion.b>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-0.5 text-[11.5px] font-bold tabular-nums">
                {p.producao} <span className="text-[10px] font-normal text-[#6b7280]">{p.meta}</span>
              </motion.p>
            </AnimatePresence>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]">
              <motion.div className="h-full rounded-full bg-linear-to-r from-[#22c55e] to-[#16a34a]" initial={false} animate={{ width: `${p.pct}%` }} transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }} />
            </div>
          </div>

          {/* Propostas recentes: a lista rola devagar */}
          <div className="mt-2 flex items-center justify-between">
            <b className="text-[11px]">Propostas recentes</b>
            <span className="text-[9.5px] font-semibold text-[#2751c5]">Ver todas</span>
          </div>
          <div className="mt-1.5 h-[360px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_88%,transparent)]">
            <div className="flex animate-scroll-y flex-col gap-1.5 motion-reduce:animate-none">
              {[...lista, ...lista].map((x, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 ring-1 ring-black/5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#eef2ff] text-[9px] font-bold text-[#2751c5]">
                    {x.nome
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <b className="block truncate text-[10px]">{x.nome}</b>
                    <span className="block truncate text-[8.5px] text-[#6b7280]">
                      #{x.id} · {x.produto}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-0.5">
                    <b className="text-[9.5px] tabular-nums">{x.valor}</b>
                    <StatusPill s={x.status} className="max-w-[80px] px-1.5! py-0! text-[8px]!" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra de navegação */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-[#1f2937] p-1.5 text-white/60 shadow-[0_10px_24px_-10px_rgba(0,0,0,.5)]">
          <span className="flex items-center gap-1.5 rounded-full bg-[#2751c5] px-3 py-1.5 text-[11px] font-semibold text-white">
            <HomeIcon className="size-4" /> Início
          </span>
          <QueueListIcon className="mx-2 size-5" />
          <PresentationChartBarIcon className="mx-2 size-5" />
          <UserIcon className="mr-3 ml-2 size-5" />
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, cor, fundo, rotulo, valor, k }: { icon: typeof HomeIcon; cor: string; fundo: string; rotulo: string; valor: string; k: number }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-2 py-1.5 ring-1 ring-black/5">
      <span className="grid size-6 shrink-0 place-items-center rounded-full" style={{ background: fundo, color: cor }}>
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0 leading-tight">
        <AnimatePresence mode="wait">
          <motion.b key={k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="block truncate text-[12.5px] tabular-nums">
            {valor}
          </motion.b>
        </AnimatePresence>
        <span className="block truncate text-[8.5px] text-[#6b7280]">{rotulo}</span>
      </span>
    </div>
  );
}

/**
 * Palco do celular no CTA final. Mede a própria coluna e escala o celular (320 px de largura base) para ocupar ~60% dela
 * no desktop (≈ 1/3 do painel), com a ponta de cima 18% da altura acima do painel. O clip-path corta só a base.
 * No celular/tablet o aparelho entra pelo alto da coluna e a base também é cortada.
 */
export function PhoneStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ s: 1, top: 40, desktop: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setM(desktop ? { s: Math.min(1.6, Math.max(1, (w * 0.6) / 320)), top: -h * 0.18, desktop } : { s: Math.min(1, (w - 24) / 320), top: 36, desktop });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[460px] [clip-path:inset(-400px_0_0_0)] lg:h-auto lg:min-h-[420px] xl:min-w-0 xl:flex-1">
      <div className="absolute left-1/2 origin-top" style={{ top: m.top, transform: `translateX(-50%) scale(${m.s})` }}>
        <PhoneMockup />
      </div>
    </div>
  );
}
