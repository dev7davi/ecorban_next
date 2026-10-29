"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { nav } from "@/content/nav";
import { site, whatsappLink } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparente por cima da foto no topo; o fundo só aparece depois que a página rola.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-white/10 bg-chrome/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-[19px] py-3.5 sm:px-8">
        <a href="#topo" aria-label="eCorban — início" className="shrink-0">
          <Image src="/logo/logo_white.svg" alt="eCorban" width={138} height={22} preload />
        </a>

        <nav aria-label="Principal" className="hidden gap-5 text-[14px] font-medium whitespace-nowrap lg:flex xl:gap-7 xl:text-[15px]">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-neutral-300 transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* O invólucro controla a exibição por largura (o Button sempre aplica inline-flex) */}
          <span className="hidden sm:contents">
            <Button href={site.loginUrl} variant="ghost-dark" size="sm">
              Entrar
            </Button>
          </span>
          <span className="hidden lg:contents">
            <Button href={whatsappLink()} external arrow size="sm" className="shadow-none">
              Falar com especialista
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="grid size-10 place-items-center rounded-md border border-white/25 text-white lg:hidden"
          >
            {open ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="border-t border-white/10 px-[19px] pb-4 sm:px-8 lg:hidden" onClick={() => setOpen(false)}>
          <div className="mx-auto flex max-w-7xl flex-col">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="py-3 text-neutral-200 hover:text-white">
                {item.label}
              </a>
            ))}
            <a href={site.loginUrl} className="py-3 text-neutral-200 hover:text-white sm:hidden">
              Entrar
            </a>
            <Button href={whatsappLink()} external className="mt-2 shadow-none">
              Falar com especialista
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
