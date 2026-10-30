"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { tokens } from "@/lib/tokens";

// Número que "sobe" do zero ao entrar na tela. Com reduced-motion, mostra o valor final direto.
// O HTML do servidor já sai com o valor final (SEO e leitores de tela); a contagem só começa quando ele entra na tela.
export function Counter({ value, duration = 1.6, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration, ease: tokens.motion.easeOutCubic, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {(reduce ? value : n).toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
