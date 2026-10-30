"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { hero } from "@/content/hero";
import { whatsappLink } from "@/content/site";

// glass: vidro fosco sobre a foto do herói (desktop). light: cartão branco para fundos claros ("Comece hoje").
const styles = {
  glass: {
    form: "glass focus-within:border-white/70 focus-within:ring-2 focus-within:ring-white/40 gap-2 rounded-xl p-2",
    input: "text-white placeholder:text-white/75 px-4 py-3 text-base",
    button: "bg-white text-brand-600 shadow-[0_6px_16px_-6px_rgba(0,0,0,.45)] hover:bg-brand-50 px-5 py-3 text-[15px]",
    icon: "size-4",
  },
  light: {
    form: "bg-surface shadow-[0_12px_32px_rgba(39,81,197,.12)] ring-1 ring-line focus-within:ring-2 focus-within:ring-brand-500 gap-2 rounded-xl p-2",
    input: "text-strong placeholder:text-muted px-4 py-3 text-base",
    button: "bg-brand-600 text-white hover:bg-brand-700 px-5 py-3 text-[15px]",
    icon: "size-4",
  },
};

// Sem backend nesta fase: o formulário abre o WhatsApp comercial com a mensagem preenchida.
export function LeadForm({ className = "", variant = "light" }: { className?: string; variant?: keyof typeof styles }) {
  const [empresa, setEmpresa] = useState("");
  const st = styles[variant];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(hero.lead.message(empresa.trim())), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className={`flex w-full max-w-xl flex-col transition-shadow sm:flex-row ${st.form} ${className}`}>
      <label htmlFor={`lead-empresa-${variant}`} className="sr-only">
        {hero.lead.placeholder}
      </label>
      <input
        id={`lead-empresa-${variant}`}
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        placeholder={hero.lead.placeholder}
        autoComplete="organization"
        className={`min-w-0 flex-1 bg-transparent focus:outline-none ${st.input}`}
      />
      <button
        type="submit"
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${st.button}`}
      >
        {hero.lead.button}
        <ArrowUpRightIcon className={st.icon} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </form>
  );
}
