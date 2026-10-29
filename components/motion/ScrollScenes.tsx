"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "power3.out";

/*
 * Cenas de movimento da página, ligadas por atributos data-* nas seções:
 *  data-hero-*                timeline de entrada do herói + parallax
 *  data-split                 títulos sobem linha a linha (SplitText com máscara)
 *  data-reveal                entrada suave em lote (ScrollTrigger.batch)
 *  data-stack / data-stack-card   cards empilhados que encolhem quando o próximo cobre
 *  data-steps / data-step     linha do tempo que acende passo a passo com a rolagem
 *  data-cloud / data-cloud-tile   nuvem de integrações que se espalha a partir do centro
 *  data-ring                  círculos do CTA final crescem com a rolagem
 * Com prefers-reduced-motion, nada anima e tudo aparece no estado final.
 */
export function ScrollScenes() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      hero();
      splits();
      reveals();
      stack();
      steps();
      cloud();
      rings();
      floatRings();
      root.classList.remove("motion-pending");
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("motion-pending");
    });

    // Fontes e imagens mudam alturas: recalcula os gatilhos depois que tudo carrega.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  });

  return null;
}

function hero() {
  const tl = gsap.timeline({ defaults: { ease: EASE, duration: 0.8 } });
  tl.from("[data-hero-badge]", { autoAlpha: 0, y: 16, scale: 0.94 })
    .from("[data-hero-word]", { autoAlpha: 0, yPercent: 60, rotateX: -50, stagger: 0.06, duration: 0.9 }, "-=0.5")
    .fromTo("[data-hero-underline]", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.4")
    .from("[data-hero-sub]", { autoAlpha: 0, y: 20 }, "-=0.7")
    .from("[data-hero-form]", { autoAlpha: 0, y: 20, scale: 0.97 }, "-=0.6")
    .from("[data-hero-float]", { autoAlpha: 0, scale: 0.8, stagger: 0.12, ease: "back.out(1.6)" }, "-=0.5")
    .from("[data-hero-panel]", { autoAlpha: 0, y: 80, rotateX: 14, transformOrigin: "50% 100%", stagger: 0.12, duration: 1 }, "-=0.8");

  // Parallax: cada elemento rola numa velocidade (data-speed).
  gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed || "0");
    gsap.to(el, {
      yPercent: speed * -100,
      ease: "none",
      scrollTrigger: { trigger: "#topo", start: "top top", end: "bottom top", scrub: true },
    });
  });
}

function splits() {
  gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }),
    });
  });
}

function reveals() {
  gsap.set("[data-reveal]", { autoAlpha: 0, y: 40 });
  const show = (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: EASE, overwrite: true });
  // onLeave/onEnterBack cobrem saltos de rolagem (âncoras, atalhos) que passam direto pelo bloco.
  ScrollTrigger.batch("[data-reveal]", { start: "top 88%", once: true, onEnter: show, onLeave: show, onEnterBack: show });
}

function stack() {
  // Os cards só grudam no topo a partir do lg (lg:sticky); abaixo disso o efeito apenas borraria o card anterior.
  if (!window.matchMedia("(min-width: 1024px)").matches) return;
  const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card.firstElementChild, {
      scale: 0.92,
      autoAlpha: 0.45,
      filter: "blur(2px)",
      ease: "none",
      scrollTrigger: { trigger: next, start: "top bottom", end: "top 120px", scrub: true },
    });
  });
}

function steps() {
  const wrap = document.querySelector<HTMLElement>("[data-steps]");
  if (!wrap) return;
  const items = gsap.utils.toArray<HTMLElement>("[data-step]", wrap);
  const tl = gsap.timeline({
    scrollTrigger: { trigger: wrap, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
  });
  tl.fromTo("[data-steps-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: items.length }, 0);
  items.forEach((item, i) => {
    tl.fromTo(item, { autoAlpha: 0.25, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, i);
    tl.fromTo(item.querySelector("[data-step-dot]"), { scale: 0.4 }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, i);
  });
}

function cloud() {
  const wrap = document.querySelector<HTMLElement>("[data-cloud]");
  if (!wrap) return;
  const tiles = gsap.utils.toArray<HTMLElement>("[data-cloud-tile]", wrap);
  const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
  const box = wrap.getBoundingClientRect();
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height * 0.3;

  gsap.from(tiles, {
    // No desktop os blocos partem do centro (onde fica o texto) e se espalham em arco.
    x: (_, el: HTMLElement) => (isDesktop ? cx - (el.getBoundingClientRect().left + el.offsetWidth / 2) : 0),
    y: (_, el: HTMLElement) => (isDesktop ? cy - (el.getBoundingClientRect().top + el.offsetHeight / 2) : 40),
    scale: 0.3,
    autoAlpha: 0,
    rotation: () => gsap.utils.random(-20, 20),
    stagger: { each: 0.04, from: "center" },
    ease: "power2.out",
    scrollTrigger: { trigger: wrap, start: "top 80%", end: "center 55%", scrub: 0.8 },
  });

  // Depois de posicionados, flutuam levemente em ritmos diferentes.
  tiles.forEach((tile, i) => {
    gsap.to(tile, { yPercent: 8, duration: 2 + (i % 4) * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.1 });
  });
}

// Deriva lenta e sutil; repeatRefresh sorteia um novo destino a cada ciclo, então o trajeto nunca se repete.
function floatRings() {
  gsap.utils.toArray<HTMLElement>("[data-float-ring]").forEach((ring) => {
    gsap.to(ring, {
      x: () => gsap.utils.random(-36, 36),
      y: () => gsap.utils.random(-28, 28),
      scale: () => gsap.utils.random(0.96, 1.05),
      duration: () => gsap.utils.random(7, 11),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      delay: gsap.utils.random(0, 2),
    });
  });
}

function rings() {
  gsap.utils.toArray<HTMLElement>("[data-ring]").forEach((ring, i) => {
    gsap.fromTo(
      ring,
      { scale: 0.6, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: ring.parentElement, start: "top bottom", end: "bottom bottom", scrub: 1 + i * 0.5 } },
    );
  });
}
