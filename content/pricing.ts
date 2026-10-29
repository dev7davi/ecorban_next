// Faixas de usuários reais do sistema (3 a 320). Não há plano ilimitado nem plano por módulo.
export const faixas = [3, 5, 10, 20, 40, 80, 160, 320] as const;
export type Faixa = (typeof faixas)[number];

// TODO: confirmar valores oficiais — preço mensal de referência por faixa (R$)
export const precoMensal: Record<Faixa, number> = {
  3: 149, 5: 219, 10: 349, 20: 579, 40: 929, 80: 1490, 160: 2390, 320: 3590,
};

export type Ciclo = { id: string; nome: string; meses: number; fator: number; desconto: string; popular?: boolean };

export const ciclos: Ciclo[] = [
  { id: "mensal", nome: "Mensal", meses: 1, fator: 1, desconto: "—" },
  { id: "trimestral", nome: "Trimestral", meses: 3, fator: 0.95, desconto: "5% off" },
  { id: "semestral", nome: "Semestral", meses: 6, fator: 0.9, desconto: "10% off" },
  { id: "anual", nome: "Anual", meses: 12, fator: 10 / 12, desconto: "2 meses grátis", popular: true },
];

export const tiers: { id: string; nome: string; descricao: string; faixas: Faixa[]; destaque?: boolean }[] = [
  { id: "essencial", nome: "Essencial", descricao: "Para a promotora que está saindo da planilha e quer organizar a esteira.", faixas: [3, 5, 10] },
  { id: "crescimento", nome: "Crescimento", descricao: "Para equipes com metas, campanhas e várias lojas rodando juntas.", faixas: [20, 40, 80], destaque: true },
  { id: "operacao", nome: "Operação", descricao: "Para operações grandes, com call center e muitos vendedores.", faixas: [160, 320] },
];

export const incluso = ["Todos os 9 módulos", "Pagamento à vista no boleto", "Renovação automática"];

export function precoPorMes(faixa: Faixa, ciclo: Ciclo) {
  return Math.round(precoMensal[faixa] * ciclo.fator);
}

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
