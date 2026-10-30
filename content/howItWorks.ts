// Jornada da proposta ao repasse, com as cores reais dos status da esteira, em sequência:
// Simulado → Digitada → Aguardando Formalização → Pendência Documentação → Averbado → Pago - Produtos.
// `dark` marca a cor clara, que pede número escuro para ter contraste.
export const steps = [
  { title: "Simula no banco", text: "O vendedor compara condições do C6, PAN, Crefaz, Facta e QualiBanking sem sair do sistema.", color: "#fb923c" },
  { title: "Digita a proposta", text: "Da simulação, um clique em “Enviar pra esteira”. O cliente é cadastrado por CPF na hora.", color: "#154ef9" },
  { title: "Status na esteira", text: "O status é atualizado na esteira, com o histórico de cada mudança.", color: "#f5d224", dark: true },
  { title: "Pendência? O sino avisa", text: "A proposta entra nas “Propostas em alerta” e quem precisa agir fica sabendo.", color: "#ef4444" },
  { title: "Averbado gera comissão", text: "Calculada pela tabela vigente na data do pagamento.", color: "#22c55e" },
  { title: "Repasse em lote", text: "O financeiro paga vendedor, gerente e loja de uma vez.", color: "#16a34a" },
];
