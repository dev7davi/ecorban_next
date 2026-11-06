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

// A tela de cada aba fica em components/mock/ModuleScreens.tsx (mesmo id).
// Textos revisados contra o sistema real (ecorban-site-ajustes-mockups.md §6): nada que o sistema não mostre.
export type Module = {
  id: string;
  tab: string;
  title: string;
  icon: Icon;
  text: string;
  bullets: string[];
  highlight: { value: string; label: string };
};

export const modules: Module[] = [
  {
    id: "esteira",
    tab: "Esteira",
    title: "Esteira de propostas",
    icon: QueueListIcon,
    text: "Acompanhe cada venda da digitação ao pagamento, com o status de cada proposta e o histórico de cada mudança.",
    bullets: ["Status personalizados, com cor e fluxo por equipe", "Linha do tempo completa de cada proposta", "Proteção de propostas já pagas"],
    highlight: { value: "63", label: "Propostas pagas hoje" },
  },
  {
    id: "clientes",
    tab: "Clientes",
    title: "Clientes e atendimento",
    icon: UserGroupIcon,
    text: "Cadastro único por CPF, criado na própria digitação. Ninguém mais procura cliente em planilha.",
    bullets: ["Atendimento com tabulação e relatório", "Telefones, documentos e bancos no cadastro", "Agenda de retornos na tela inicial"],
    highlight: { value: "1 cadastro", label: "por CPF" },
  },
  {
    id: "campanhas",
    tab: "Campanhas",
    title: "Campanhas e telemarketing",
    icon: MegaphoneIcon,
    text: "Sorteio automático de cliente, um para cada vendedor, sem duplicidade.",
    bullets: ["Ninguém liga para o mesmo cliente duas vezes", "Central de Atendimento: sorteie o próximo cliente", "Progresso de cada campanha por usuário"],
    highlight: { value: "0", label: "ligações duplicadas" },
  },
  {
    id: "metas",
    tab: "Metas",
    title: "Metas e produção",
    icon: FlagIcon,
    text: "Metas por vendedor, gerente ou loja, com projeção realista por dia útil.",
    bullets: ["Projeção realista por dia útil", "Ranking na tela inicial", "Meta por vendedor, gerente ou loja"],
    highlight: { value: "87%", label: "da meta do mês" },
  },
  {
    id: "relatorios",
    tab: "Relatórios",
    title: "Relatórios e dashboards",
    icon: PresentationChartBarIcon,
    text: "Rankings, desempenho por período e calendário de produção — com valor, quantidade e comissão por banco e por vendedor.",
    bullets: ["Rankings Diversos: banco, vendedor e loja", "Desempenho por período, com comparativo", "Calendário de produção, dia a dia"],
    highlight: { value: "Barras ou pizza", label: "em 1 clique" },
  },
  {
    id: "comissoes",
    tab: "Comissões",
    title: "Comissões e repasses",
    icon: BanknotesIcon,
    text: "Convênios com vigência: a comissão é calculada pelo valor da data do pagamento.",
    bullets: ["Repasse em lote para vendedor, gerente e loja", "Sem pagar duas vezes", "Tabela certa de cada época"],
    highlight: { value: "R$ 11.295", label: "repasse do período" },
  },
  {
    id: "financeiro",
    tab: "Financeiro",
    title: "Financeiro",
    icon: WalletIcon,
    text: "Lançamentos, contas a pagar e caixa da empresa junto da receita de comissões.",
    bullets: ["Tudo da empresa em um painel", "Comissões e repasses lançados sozinhos", "Contas a pagar com vencimento"],
    highlight: { value: "1 painel", label: "para receita e despesa" },
  },
  {
    id: "simulacoes",
    tab: "Simulações",
    title: "Simulações bancárias",
    icon: CalculatorIcon,
    text: "Simule direto nos bancos integrados e mande para a esteira sem digitar tudo de novo.",
    bullets: ["Bancos integrados no mesmo lugar", "“Enviar pra esteira” em um clique", "Compare condições sem sair do sistema"],
    highlight: { value: "5", label: "bancos integrados" },
  },
  {
    id: "governanca",
    tab: "Governança",
    title: "Governança e segurança",
    icon: ShieldCheckIcon,
    text: "Quem fez o quê e quando — tudo registrado, com o antes e o depois de cada alteração.",
    bullets: ["Permissões por grupo de acesso e função", "Calendário de acessos ao sistema", "Auditoria legível: quem, quando e o que mudou"],
    highlight: { value: "207", label: "registros esta semana" },
  },
];
