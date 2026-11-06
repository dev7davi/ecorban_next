// Scripts que rodam antes da pintura (injetados no <head> por app/layout.tsx).
// Ficam fora de módulos "use client": exportados de lá, viram referências de cliente no servidor.

// Abertura com o "E" só na primeira visita: liga html[data-splash=on] antes da pintura (sem piscar para quem já veio).
// Se o JS do componente falhar, libera a página em 6 s.
export const splashScript = `try{if(!localStorage.getItem('ecorban-visitou')){var s=document.documentElement;s.dataset.splash='on';setTimeout(function(){if(s.dataset.splash==='on')s.dataset.splash='off'},6000)}}catch(e){}`;

// Esconde o herói até a timeline do GSAP rodar; se o JS falhar, libera em 2,5 s.
export const motionScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2500)}`;
