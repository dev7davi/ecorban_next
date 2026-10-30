// Planos reais do eCorban — fonte: ecorban.com/planos (varredura manual de 29/10/2026, Downloads/planos-ecorban.md).
// Os preços POR MÊS são exatamente os do site oficial, guardados em centavos. NÃO recalcular a partir do Mensal:
// a partir de 60 usuários o Trimestral não é exatamente 5% menor (ex.: 60 usuários → 1.711,56, a conta daria 1.710,46).

/** Faixas de usuários do seletor (35 opções, de 3 a 320). */
export const faixas = [3, 6, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320] as const;
export type Faixa = (typeof faixas)[number];

export type CicloId = "mensal" | "trimestral" | "semestral" | "anual";

export type Ciclo = {
  id: CicloId;
  nome: string;
  meses: number;
  /** Selo de desconto sem e com "Pagamento à vista no boleto" (o Mensal não tem a opção do boleto). */
  selo?: string;
  seloBoleto?: string;
  popular?: boolean;
};

export const ciclos: Ciclo[] = [
  { id: "mensal", nome: "Mensal", meses: 1 },
  { id: "trimestral", nome: "Trimestral", meses: 3, selo: "5% de desconto", seloBoleto: "10% de desconto" },
  { id: "semestral", nome: "Semestral", meses: 6, selo: "10% de desconto", seloBoleto: "15% de desconto" },
  { id: "anual", nome: "Anual", meses: 12, selo: "2 meses grátis", seloBoleto: "25% de desconto", popular: true },
];

// Colunas: mensal, trimestral, semestral, anual, trimestral boleto, semestral boleto, anual boleto (centavos/mês).
const tabela: Record<Faixa, readonly [number, number, number, number, number, number, number]> = {
  3: [36300, 34485, 32670, 30250, 32670, 30855, 27225],
  6: [54450, 51728, 49005, 45375, 49005, 46283, 40838],
  10: [72600, 68970, 65340, 60500, 65340, 61710, 54450],
  15: [87120, 82764, 78408, 72600, 78408, 74052, 65340],
  20: [101640, 96558, 91476, 84700, 91476, 86394, 76230],
  30: [123420, 117249, 111078, 102850, 111078, 104907, 92565],
  40: [143748, 136561, 129307, 119790, 129307, 122186, 107811],
  50: [162624, 154493, 146362, 135520, 146362, 138230, 121968],
  60: [180048, 171156, 162043, 150040, 162043, 153041, 135036],
  70: [197472, 187818, 177725, 164560, 177725, 167851, 148104],
  80: [214896, 204481, 193406, 179080, 193406, 182662, 161172],
  90: [232320, 221144, 209088, 193600, 209088, 197472, 174240],
  100: [249744, 237807, 224770, 208120, 224770, 212282, 187308],
  110: [267168, 254470, 240451, 222640, 240451, 227093, 200376],
  120: [284592, 271132, 256133, 237160, 256133, 241903, 213444],
  130: [302016, 287795, 271814, 251680, 271814, 256714, 226512],
  140: [319440, 304458, 287496, 266200, 287496, 271524, 239580],
  150: [336864, 321121, 303178, 280720, 303178, 286334, 252648],
  160: [354288, 337784, 318859, 295240, 318859, 301145, 265716],
  170: [371712, 354446, 334541, 309760, 334541, 315955, 278784],
  180: [389136, 371109, 350222, 324280, 350222, 330766, 291852],
  190: [406560, 387772, 365904, 338800, 365904, 345576, 304920],
  200: [423984, 404435, 381586, 353320, 381586, 360386, 317988],
  210: [441408, 421098, 397267, 367840, 397267, 375197, 331056],
  220: [458832, 437760, 412949, 382360, 412949, 390007, 344124],
  230: [476256, 454423, 428630, 396880, 428630, 404818, 357192],
  240: [493680, 471086, 444312, 411400, 444312, 419628, 370260],
  250: [511104, 487749, 459994, 425920, 459994, 434438, 383328],
  260: [528528, 504412, 475675, 440440, 475675, 449249, 396396],
  270: [545952, 521074, 491357, 454960, 491357, 464059, 409464],
  280: [563376, 537737, 507038, 469480, 507038, 478870, 422532],
  290: [580800, 554400, 522720, 484000, 522720, 493680, 435600],
  300: [598224, 571063, 538402, 498520, 538402, 508490, 448668],
  310: [615648, 587726, 554083, 513040, 554083, 523301, 461736],
  320: [633072, 604388, 569765, 527560, 569765, 538111, 474804],
};

const coluna: Record<CicloId, [number, number | null]> = {
  mensal: [0, null],
  trimestral: [1, 4],
  semestral: [2, 5],
  anual: [3, 6],
};

/** Preço por mês em reais, exatamente como no site oficial. */
export function precoPorMes(usuarios: Faixa, ciclo: CicloId, boleto = false): number {
  const [normal, aVista] = coluna[ciclo];
  const idx = boleto && aVista !== null ? aVista : normal;
  return tabela[usuarios][idx] / 100;
}

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

/** Rótulo do seletor, como no site oficial ("03 usuários"). */
export const rotuloFaixa = (u: number) => `${String(u).padStart(2, "0")} usuários`;
