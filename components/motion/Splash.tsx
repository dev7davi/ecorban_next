"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Mesmos traços de public/logo/icone-branca.svg (viewBox 590 × 749): a barra verde e o "C" de baixo.
const BARRA =
  "M86.8 159.0C56.8 153.9 32.5 131.7 24.3 102.0C21.5 91.9 21.8 67.1 24.8 56.7C30.8 35.6 45.4 17.9 64.3 8.6C82.5 -0.3 58.1 0.5 306.0 0.5L525.5 0.5L533.3 2.8C559.8 10.4 580.3 31.3 587.7 58.0C590.5 68.1 590.2 92.9 587.2 103.3C581.2 124.4 566.6 142.1 547.7 151.4C529.5 160.3 554.4 159.4 309.0 159.6C189.4 159.7 89.4 159.4 86.8 159.0Z";
const LETRA =
  "M121.5 747.9C115.1 747.5 107.5 746.2 103.5 745.0C28.3 721.6 -17.5 580.3 6.6 446.5C20.9 366.9 58.4 308.0 103.5 294.1C116.1 290.1 130.6 289.9 333.0 290.2L526.5 290.5L533.8 292.8C560.3 301.0 580.4 321.6 587.7 348.0C590.5 358.1 590.2 382.9 587.2 393.3C581.2 414.4 566.6 432.1 547.7 441.4C529.7 450.2 548.8 449.4 351.9 449.7L177.3 450.0L173.2 460.3C158.0 498.4 157.3 542.3 171.1 580.6L174.2 589.0L350.3 589.2L526.5 589.5L533.8 591.8C560.3 600.0 580.4 620.6 587.7 647.0C590.5 657.1 590.2 681.9 587.2 692.3C581.2 713.4 566.6 731.1 547.7 740.4C529.6 749.3 551.7 748.4 329.5 748.6C221.1 748.7 127.5 748.4 121.5 747.9Z";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Abertura da primeira visita: a barra verde entra, o "C" se desenha e se preenche, e a cortina sobe revelando o site.
 * Só aparece quando o script do <head> ligou html[data-splash=on] (ninguém visitou antes neste navegador); no fim grava
 * a visita e avisa o herói (evento "ecorban:splash-done") para começar a entrada dele.
 */
export function Splash() {
  const reduzir = useReducedMotion();
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    // Quem já visitou: a cortina fica no DOM, mas escondida pelo CSS (html sem data-splash=on)
    if (html.dataset.splash !== "on") return;
    const t = setTimeout(() => setAtivo(false), reduzir ? 900 : 2900);
    return () => clearTimeout(t);
  }, [reduzir]);

  const terminar = () => {
    try {
      localStorage.setItem("ecorban-visitou", "1");
    } catch {}
    document.documentElement.dataset.splash = "off";
    window.dispatchEvent(new Event("ecorban:splash-done"));
  };

  return (
    <AnimatePresence onExitComplete={terminar}>
      {ativo && (
        <motion.div
          id="splash"
          aria-hidden="true"
          className="fixed inset-0 z-[100] place-items-center bg-[radial-gradient(ellipse_at_center,#123a7a_0%,#0a2650_55%,#061a3a_100%)]"
          exit={reduzir ? { opacity: 0, transition: { duration: 0.4 } } : { y: "-100%", transition: { duration: 0.8, ease } }}
        >
          <motion.div className="flex flex-col items-center gap-7" exit={reduzir ? undefined : { y: -60, opacity: 0, transition: { duration: 0.5, ease } }}>
            <motion.svg
              viewBox="-20 -20 630 789"
              className="w-[68px] overflow-visible sm:w-[80px]"
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.9, 1, 1.06, 1] }}
              transition={{ duration: 1.9, times: [0, 0.55, 0.75, 1], ease: "easeOut" }}
            >
              {/* Barra verde: cresce da esquerda para a direita */}
              <motion.path
                d={BARRA}
                fill="#29b37a"
                style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.15 }}
              />
              {/* "C": o contorno se desenha e depois se preenche */}
              <motion.path
                d={LETRA}
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth={14}
                strokeLinejoin="round"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ pathLength: { duration: 0.9, ease: "easeInOut", delay: 0.35 }, fillOpacity: { duration: 0.35, delay: 1.1 } }}
              />
            </motion.svg>

            {/* Frase de apresentação, entra depois que o "E" se desenha */}
            <motion.p
              className="-mt-1 max-w-[260px] px-4 text-center text-[13px] font-medium tracking-wide text-white/75"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              O que antes era bom, está ainda melhor!
            </motion.p>

            {/* Linha de carregamento */}
            <span className="h-[3px] w-28 overflow-hidden rounded-full bg-white/15">
              <motion.span
                className="block h-full origin-left rounded-full bg-[#29b37a]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.6, ease: [0.33, 1, 0.68, 1] }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
