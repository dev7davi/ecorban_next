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

// Só o que o sistema mostra (ecorban-site-ajustes-mockups.md §5.5): "Auditoria de 5 anos" e "Segurança de banco"
// saíram até a confirmação com o Adriano (§9).
export const differentiators = [
  { title: "Dados isolados", text: "Um banco de dados por empresa.", icon: CircleStackIcon },
  { title: "Tempo real", text: "A tela se atualiza sozinha.", icon: BoltIcon },
  { title: "5 integrações bancárias", text: "PAN, C6, Crefaz, Facta e QualiBanking.", icon: LinkIcon },
  { title: "Comissão versionada", text: "A tabela certa de cada época.", icon: DocumentDuplicateIcon },
  { title: "Permissões por função", text: "Grupos de acesso por tela e ação.", icon: LockClosedIcon },
  { title: "Auditoria legível", text: "Quem, quando e o que mudou.", icon: ClipboardDocumentCheckIcon },
  { title: "Importação em massa", text: "Traga e leve planilhas com facilidade.", icon: ArrowDownTrayIcon },
  { title: "Várias abas", text: "Trabalhe em paralelo sem perder nada.", icon: Squares2X2Icon },
];
