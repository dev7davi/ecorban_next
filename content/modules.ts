import {
  BanknotesIcon,
  CalculatorIcon,
  FlagIcon,
  MegaphoneIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type Module = {
  id: string;
  tab: string;
  title: string;
  icon: Icon;
  text: string;
  bullets: string[];
  // Linhas ilustrativas do mini-mockup: [rótulo, status, cor]
  rows: [string, string, string][];
  highlight: { value: string; label: string };
};

export const modules: Module[] = [
  {
    id: "esteira",
    tab: "Esteira",
    title: "Esteira de propostas",
    icon: QueueListIcon,
    text: "Acompanhe cada venda da digitação ao pagamento, com o seu status e o do banco lado a lado.",
    bullets: ["Status personalizados e retorno do banco lado a lado", "Linha do tempo completa de cada proposta", "Proteção de propostas já pagas"],
    rows: [["Ana Lúcia Ferreira", "Em Análise", "#ea580c"], ["Roberto Almeida", "Pendência", "#ef4444"], ["Carla Menezes", "Averbado", "#22c55e"], ["Joel Batista", "Pago", "#16a34a"]],
    highlight: { value: "63", label: "Propostas pagas hoje" },
  },
  {
    id: "clientes",
    tab: "Clientes",
    title: "Clientes e atendimento",
    icon: UserGroupIcon,
    text: "Cadastro único por CPF, criado na própria digitação. Ninguém mais procura cliente em planilha.",
    bullets: ["Atendimento ao vivo com tabulação", "Documentos guardados por 5 anos", "Histórico do cliente em um só lugar"],
    rows: [["CPF 123.***.***-09", "Cadastrado", "#2751c5"], ["Maria Aparecida", "Em atendimento", "#3c67dd"], ["José Carlos", "Retornar amanhã", "#f97316"], ["Luzia Prado", "Tabulado", "#22c55e"]],
    highlight: { value: "5 anos", label: "de documentos guardados" },
  },
  {
    id: "campanhas",
    tab: "Campanhas",
    title: "Campanhas e telemarketing",
    icon: MegaphoneIcon,
    text: "Sorteio automático de cliente, um para cada vendedor, sem duplicidade.",
    bullets: ["Ninguém liga para o mesmo cliente duas vezes", "Modo contínuo de call center", "Campanhas por convênio e perfil"],
    rows: [["Marina", "Cliente sorteado", "#2751c5"], ["Diego", "Em ligação", "#f97316"], ["Paula", "Próximo cliente", "#22c55e"], ["Rafael", "Em ligação", "#f97316"]],
    highlight: { value: "0", label: "ligações duplicadas" },
  },
  {
    id: "metas",
    tab: "Metas",
    title: "Metas e produção",
    icon: FlagIcon,
    text: "Metas por vendedor, gerente ou loja, com projeção realista por dia útil.",
    bullets: ["Projeção realista por dia útil", "Ranking na tela inicial", "Meta por vendedor, gerente ou loja"],
    rows: [["Marina", "112% da meta", "#22c55e"], ["Diego", "87% da meta", "#f97316"], ["Paula", "64% da meta", "#ef4444"], ["Rafael", "98% da meta", "#22c55e"]],
    highlight: { value: "87%", label: "da meta do mês" },
  },
  {
    id: "relatorios",
    tab: "Relatórios",
    title: "Relatórios e dashboards",
    icon: PresentationChartBarIcon,
    text: "Dashboard animado, rankings e desempenho por período, por vendedor e por banco.",
    bullets: ["Modo TV para o escritório", "Desempenho por vendedor e por banco", "Rankings por período"],
    rows: [["Outubro", "+12%", "#22c55e"], ["Setembro", "+4%", "#22c55e"], ["Agosto", "−2%", "#ef4444"], ["Julho", "+7%", "#22c55e"]],
    highlight: { value: "+12%", label: "vs. mês anterior" },
  },
  {
    id: "comissoes",
    tab: "Comissões",
    title: "Comissões e repasses",
    icon: BanknotesIcon,
    text: "Convênios com vigência: a comissão é calculada pelo valor da data do pagamento.",
    bullets: ["Repasse em lote para vendedor, gerente e loja", "Sem pagar duas vezes", "Tabela certa de cada época"],
    rows: [["Lote #482", "Pago", "#16a34a"], ["Lote #483", "Gerado", "#f97316"], ["Lote #484", "Em conferência", "#3c67dd"], ["Lote #481", "Pago", "#16a34a"]],
    highlight: { value: "Lote #483", label: "pronto para repasse" },
  },
  {
    id: "financeiro",
    tab: "Financeiro",
    title: "Financeiro",
    icon: WalletIcon,
    text: "Lançamentos, contas a pagar e caixa da empresa junto da receita de comissões.",
    bullets: ["Tudo da empresa em um painel", "Receita de comissões integrada", "Contas a pagar com vencimento"],
    rows: [["Aluguel", "A pagar", "#f97316"], ["Comissões", "Recebido", "#16a34a"], ["Folha", "Pago", "#16a34a"], ["Internet", "A pagar", "#f97316"]],
    highlight: { value: "1 painel", label: "para receita e despesa" },
  },
  {
    id: "simulacoes",
    tab: "Simulações",
    title: "Simulações bancárias",
    icon: CalculatorIcon,
    text: "Simule e digite direto nos bancos integrados, com o status atualizado sozinho.",
    bullets: ["PAN, C6, Crefaz, Facta e QualiBanking", "Retorno automático para a esteira", "Compare condições sem sair do sistema"],
    rows: [["PAN", "Simulado", "#fb923c"], ["C6", "Digitada", "#f97316"], ["Facta", "Averbado", "#22c55e"], ["Crefaz", "Em Análise", "#ea580c"]],
    highlight: { value: "5", label: "bancos integrados" },
  },
  {
    id: "governanca",
    tab: "Governança",
    title: "Governança e segurança",
    icon: ShieldCheckIcon,
    text: "Quem faz o quê, quando e de onde — tudo registrado.",
    bullets: ["Permissões por tela e ação", "Horário e IP de acesso, sessão única", "Jornada com pausa e auditoria legível de 5 anos"],
    rows: [["Login 08:02", "IP válido", "#22c55e"], ["Edição de proposta", "Registrado", "#2751c5"], ["Acesso 22:40", "Bloqueado", "#ef4444"], ["Pausa · café", "Registrada", "#f97316"]],
    highlight: { value: "5 anos", label: "de auditoria" },
  },
];
