import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { site } from "@/content/site";
import { Splash } from "@/components/motion/Splash";
import { motionScript, splashScript } from "@/lib/inlineScripts";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "eCorban — Sistema de gestão e CRM para correspondente bancário",
  description:
    "A nova versão do eCorban, o CRM consignado para Corbans e correspondentes bancários: esteira de propostas, atendimento, metas, comissões e financeiro em um só lugar.",
  openGraph: {
    title: "eCorban — Gestão eficiente para Corbans",
    description: "Esteira de propostas, atendimento, metas e comissões da sua operação de consignado em um só lugar.",
    locale: "pt_BR",
    type: "website",
    siteName: "eCorban",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={figtree.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="font-sans text-[17px] leading-relaxed">
        <Splash />
        {children}
      </body>
    </html>
  );
}
