"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { tokens } from "@/lib/tokens";

// Pizza/rosca que "se desenha girando", como no dashboard do sistema.
export function Donut({ value, color, label, size = 92, compact = false, onDark = false }: { value: number; color: string; label: string; size?: number; compact?: boolean; onDark?: boolean }) {
  const reduce = useReducedMotion();
  const r = 38;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeOpacity={onDark ? 0.28 : 0.15} strokeWidth="14" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? value / 100 : 0 }}
            whileInView={{ pathLength: value / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: tokens.motion.easeOutCubic }}
          />
        </svg>
        <div className={`absolute inset-[22%] grid place-items-center rounded-full font-bold ${onDark ? "bg-white/15 text-white" : "bg-surface text-strong shadow-sm"} ${compact ? "text-xs" : "text-sm"}`}>
          <Counter value={value} suffix="%" duration={1.2} />
        </div>
      </div>
      <span className={`text-center font-medium ${onDark ? "text-white/90" : "text-muted"} ${compact ? "text-[11px]" : "text-xs"}`}>{label}</span>
    </div>
  );
}

const points = [42, 58, 50, 80, 64, 46, 70, 54, 88, 72, 60, 76];

// Gráfico de área suave com tooltip, para "Propostas digitadas".
export function AreaChart({ compact = false, onDark = false }: { compact?: boolean; onDark?: boolean }) {
  const reduce = useReducedMotion();
  const w = 520;
  const h = 150;
  const step = w / (points.length - 1);
  const xy = points.map((p, i) => [i * step, h - (p / 100) * h] as const);
  const line = xy.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = xy[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const ink = onDark ? "#e3ecff" : "#2751c5";
  const peak = 8;
  const [tx, ty] = xy[peak];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className={`w-full overflow-visible ${compact ? "h-16" : "h-36"}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ink} stopOpacity={onDark ? 0.4 : 0.28} />
            <stop offset="100%" stopColor={ink} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#area-fill)"
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={ink}
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: tokens.motion.easeOutCubic }}
        />
        <line x1={tx} y1={ty} x2={tx} y2={h} stroke={ink} strokeDasharray="4 4" strokeOpacity={onDark ? 0.55 : 0.4} vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        className={`absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow ${onDark ? "bg-brand-400" : "bg-brand-600"}`}
        style={{ left: `${(tx / w) * 100}%`, top: `${(ty / h) * 100}%` }}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-md bg-surface px-3 py-1.5 text-center shadow-lg ring-1 ring-line"
        style={{ left: `${(tx / w) * 100}%`, top: `${(ty / h) * 100}%` }}
      >
        <div className="text-xs font-bold whitespace-nowrap text-strong">128 propostas</div>
        <div className="text-[10px] whitespace-nowrap text-muted">Quinta · 23 out</div>
      </div>
      <div className={`mt-2 flex justify-between ${onDark ? "text-white/90" : "text-muted"} ${compact ? "text-[10px]" : "text-[11px]"}`}>
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function Bars({ values, className = "" }: { values: number[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-end gap-1.5 ${className}`}>
      {values.map((v, i) => (
        <motion.div
          key={i}
          className={`flex-1 origin-bottom rounded-t ${i === values.length - 1 ? "bg-brand-600" : "bg-brand-300 dark:bg-brand-700"}`}
          style={{ height: `${v}%` }}
          initial={{ scaleY: reduce ? 1 : 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: tokens.motion.bars, delay: i * tokens.motion.staggerBars, ease: tokens.motion.easeOutCubic }}
        />
      ))}
    </div>
  );
}
