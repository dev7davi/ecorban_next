"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { tokens } from "@/lib/tokens";

// Número que "sobe" do zero ao entrar na tela. Com reduced-motion, mostra o valor final direto.
export function Counter({ value, duration = 1.6, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

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
