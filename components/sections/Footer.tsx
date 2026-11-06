import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { nav } from "@/content/nav";
import { site, whatsappLink } from "@/content/site";

const link = "text-neutral-400 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#0b1220] px-[19px] pt-16 pb-24 text-[15px] sm:px-8 sm:pb-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[5fr_7fr]">
        <div className="rounded-2xl bg-linear-to-br from-brand-900 to-brand-950 p-7 ring-1 ring-white/10">
          <h2 className="text-xl font-semibold text-white">Fale com um especialista</h2>
          <p className="mt-2 text-neutral-300">Conte como é a sua operação e a gente mostra o eCorban funcionando nela.</p>
          <Button href={whatsappLink()} external arrow className="mt-6 shadow-none">
            Chamar no WhatsApp
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 font-semibold text-white">Soluções</h3>
            {nav.slice(0, 3).map((n) => (
              <a key={n.href} href={n.href} className={link}>
                {n.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 font-semibold text-white">Empresa</h3>
            <a href="#depoimentos" className={link}>
              Depoimentos
            </a>
            <a href="#faq" className={link}>
              Perguntas frequentes
            </a>
            <a href={whatsappLink("Olá, preciso de suporte no eCorban.", site.contact.whatsappSupport)} target="_blank" rel="noopener noreferrer" className={link}>
              Suporte
            </a>
          </div>
          <div className="col-span-2 flex flex-col gap-2.5 sm:col-span-1">
            <h3 className="mb-1 font-semibold text-white">Contato</h3>
            <a href={`mailto:${site.contact.email}`} className={`${link} break-words`}>
              {site.contact.email}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={link}>
              WhatsApp comercial
            </a>
            <span className="text-neutral-400">{site.contact.city}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-neutral-800 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center">
        <Image src="/logo/logo-branca.svg" alt="eCorban" width={120} height={18} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} eCorban · {site.tagline}</span>
          {/* TODO: ligar às páginas de Política de Privacidade e Termos de Uso */}
          <a href="#" className="hover:text-white">
            Privacidade
          </a>
          <a href="#" className="hover:text-white">
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
}
