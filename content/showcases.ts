export type Showcase = {
  id: "esteira" | "tempo-real" | "comissoes";
  pain: string;
  title: string;
  text: string;
  bullets: string[];
  cta: { label: string; message: string };
};

// Cada destaque abre com a dor que resolve (antes × depois).
export const showcases: Showcase[] = [
  {
    id: "esteira",
    pain: "Chega de contrato espalhado em planilha e WhatsApp",
    title: "Esteira única, com status em tempo real",
    text: "O vendedor digita, o operacional trata e os status mostram na hora o que está pendente e o que foi aprovado. O seu status e o do banco aparecem lado a lado, com a linha do tempo de cada proposta — ninguém mais pergunta “em que etapa parou?”.",
    bullets: ["Status seu e do banco, lado a lado", "Linha do tempo completa da proposta", "Pendência avisada pelo sino"],
    cta: { label: "Quero ver a esteira", message: "Olá, quero ver a esteira de propostas do eCorban." },
  },
  {
    id: "tempo-real",
    pain: "Chega de cada um trabalhar de um jeito",
    title: "Veja a operação acontecendo, ao vivo",
    text: "Com o Equipe ao Vivo você sabe quem está vendendo, atendendo ou em pausa — sem recarregar a página e sem planilha de fim de dia. No Modo TV, o escritório inteiro acompanha a meta junto.",
    bullets: ["Equipe ao Vivo: vendendo, atendendo, em pausa", "Modo TV para o escritório", "Fluxo padronizado para toda a equipe"],
    cta: { label: "Quero ver ao vivo", message: "Olá, gostaria de conhecer o Equipe ao Vivo do eCorban." },
  },
  {
    id: "comissoes",
    pain: "Chega de comissão errada quando o banco muda a tabela",
    title: "Comissão certa, repasse em lote",
    text: "Os convênios têm vigência: a comissão é calculada pelo valor da data do pagamento, mesmo que o banco mude a tabela depois. O financeiro gera o repasse em lote para vendedor, gerente e loja, sem pagar duas vezes.",
    bullets: ["Convênios com vigência", "Repasse em lote para vendedor, gerente e loja", "Sem pagar a mesma comissão duas vezes"],
    cta: { label: "Quero acertar minhas comissões", message: "Olá, quero entender o comissionamento do eCorban." },
  },
];
