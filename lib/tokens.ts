// Design tokens extraídos do sistema eCorban. Espelhados em app/globals.css (@theme).
export const tokens = {
  color: {
    brand: {
      50: "#f0f4fe", 100: "#dee6fc", 200: "#bfcef8", 300: "#94acf0",
      400: "#6184e5", 500: "#3c67dd", 600: "#2751c5", 700: "#1f42a3",
      800: "#193685", 900: "#162c69", 950: "#0f1c3d",
    },
    pipeline: {
      simulado: "#fb923c", digitada: "#f97316", emAnalise: "#ea580c",
      pendencia: "#ef4444", averbado: "#22c55e", pago: "#16a34a", cancelado: "#9ca3af",
    },
    chart: ["#2751c5", "#3b82f6", "#60a5fa", "#22c55e", "#f59e0b", "#ef4444", "#9ca3af"],
    chrome: "#111827",
  },
  motion: {
    fast: 0.15, base: 0.2, modal: 0.3, bars: 0.7, count: 0.9,
    easeOut: [0, 0, 0.2, 1],
    easeOutCubic: [0.33, 1, 0.68, 1],
    bounce: [0.2, 0.9, 0.3, 1.2],
    staggerBars: 0.06,
  },
} as const;
