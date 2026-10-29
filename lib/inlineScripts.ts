// Scripts que rodam antes da pintura (injetados no <head> por app/layout.tsx).
// Ficam fora de módulos "use client": exportados de lá, viram referências de cliente no servidor.

// Aplica o tema salvo (ou o do sistema) para evitar o "piscar" de tema.
export const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

// Esconde o herói até a timeline do GSAP rodar; se o JS falhar, libera em 2,5 s.
export const motionScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2500)}`;
