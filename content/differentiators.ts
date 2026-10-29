import {
  ArrowDownTrayIcon,
  BoltIcon,
  CircleStackIcon,
  ClipboardDocumentCheckIcon,
  DocumentDuplicateIcon,
  LinkIcon,
  LockClosedIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export const differentiators = [
  { title: "Dados isolados", text: "Um banco de dados por empresa.", icon: CircleStackIcon },
  { title: "Tempo real", text: "Tudo atualiza sem recarregar.", icon: BoltIcon },
  { title: "5 integrações bancárias", text: "PAN, C6, Crefaz, Facta e QualiBanking.", icon: LinkIcon },
  { title: "Comissão versionada", text: "A tabela certa de cada época.", icon: DocumentDuplicateIcon },
  { title: "Segurança de banco", text: "Sessão única, IP e horário de acesso.", icon: LockClosedIcon },
  { title: "Auditoria de 5 anos", text: "Histórico legível de quem fez o quê.", icon: ClipboardDocumentCheckIcon },
  { title: "Importação em massa", text: "Traga e leve planilhas com facilidade.", icon: ArrowDownTrayIcon },
  { title: "Várias abas", text: "Trabalhe em paralelo sem perder nada.", icon: Squares2X2Icon },
];
