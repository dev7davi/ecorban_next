// Scripts que rodam antes da pintura (injetados no <head> por app/layout.tsx).
// Ficam fora de módulos "use client": exportados de lá, viram referências de cliente no servidor.

// Esconde o herói até a timeline do GSAP rodar; se o JS falhar, libera em 2,5 s.
export const motionScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2500)}`;
