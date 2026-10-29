"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { hero } from "@/content/hero";
import { whatsappLink } from "@/content/site";

// Sem backend nesta fase: o formulário abre o WhatsApp comercial com a mensagem preenchida.
export function LeadForm({ className = "" }: { className?: string }) {
  const [empresa, setEmpresa] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(hero.lead.message(empresa.trim())), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={submit}
      className={`flex w-full max-w-xl flex-col gap-2 rounded-lg bg-surface p-2 shadow-[0_12px_32px_rgba(39,81,197,.12)] ring-1 ring-line sm:flex-row ${className}`}
    >
      <label htmlFor="lead-empresa" className="sr-only">
        {hero.lead.placeholder}
      </label>
      <input
        id="lead-empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        placeholder={hero.lead.placeholder}
        autoComplete="organization"
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[15px] text-strong placeholder:text-muted focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-700"
      >
        {hero.lead.button}
        <ArrowUpRightIcon className="size-4" strokeWidth={2.2} aria-hidden="true" />
      </button>
    </form>
  );
}
