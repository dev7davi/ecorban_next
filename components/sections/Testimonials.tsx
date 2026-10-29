"use client";

import { ArrowLeftIcon, ArrowRightIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";
import { Ring } from "@/components/ui/Ring";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [page, setPage] = useState(0);
  const [video, setVideo] = useState<{ src: string; empresa: string } | null>(null);

  function go(dir: number) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? el.clientWidth) + 24), behavior: "smooth" });
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    setPage(Math.round(el.scrollLeft / ((card?.offsetWidth ?? 1) + 24)));
  }

  useEffect(() => {
    if (video) dialog.current?.showModal();
  }, [video]);

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-linear-to-b from-brand-50 to-page px-4 py-16 sm:py-24 sm:px-8 dark:from-brand-950">
      <Ring size={820} thickness={120} className="-top-40 left-[calc(50%-410px)]" />
      <Ring size={260} thickness={50} tone="soft" className="bottom-10 -left-20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <h2 data-split className="text-[clamp(30px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.02em] text-strong">Quem usa, conta</h2>
          <div className="flex gap-3">
            <button onClick={() => go(-1)} aria-label="Depoimento anterior" className="grid size-12 place-items-center rounded-full bg-brand-100 text-brand-600 transition-colors hover:bg-brand-200 dark:bg-brand-900 dark:text-brand-300">
              <ArrowLeftIcon className="size-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Próximo depoimento" className="grid size-12 place-items-center rounded-full bg-brand-600 text-white shadow-[0_8px_20px_rgba(39,81,197,.3)] transition-colors hover:bg-brand-700">
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </div>

        <div ref={track} onScroll={onScroll} className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] sm:mt-10">
          {testimonials.map((t) => (
            <figure key={t.empresa} className="relative flex shrink-0 basis-full snap-start flex-col rounded-2xl bg-surface p-7 shadow-[0_16px_40px_-12px_rgba(39,81,197,.2)] ring-1 ring-line/50 md:basis-[calc(50%-12px)]">
              <span aria-hidden="true" className="absolute top-3 right-6 text-6xl leading-none font-bold text-brand-200 dark:text-brand-800">
                ”
              </span>
              <blockquote className="flex-1 pr-8 text-[17px] leading-relaxed text-pretty text-body">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-brand-50 font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-300">{t.sigla}</span>
                  <div>
                    <div className="font-semibold text-strong">{t.empresa}</div>
                    <div className="text-sm text-muted">Cliente eCorban</div>
                  </div>
                </div>
                {t.logo && <Image src={t.logo} alt="" width={96} height={32} className="hidden h-8 w-auto sm:block dark:brightness-0 dark:invert" />}
                <button
                  onClick={() => setVideo({ src: t.video, empresa: t.empresa })}
                  className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-600 py-2 pr-4 pl-2 sm:w-auto text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white/20">
                    <PlayIcon className="size-3.5" />
                  </span>
                  Assistir
                  <span className="sr-only"> ao depoimento da {t.empresa}</span>
                </button>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {testimonials.map((t, i) => (
            <span key={t.empresa} className={`h-2.5 rounded-full transition-all ${i === page ? "w-8 bg-brand-600" : "w-2.5 bg-brand-200 dark:bg-brand-800"}`} />
          ))}
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setVideo(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(92vw,420px)] overflow-visible bg-transparent p-0 backdrop:bg-black/70"
        aria-label={video ? `Depoimento da ${video.empresa}` : undefined}
      >
        {video && (
          <div className="relative">
            <button onClick={() => dialog.current?.close()} aria-label="Fechar vídeo" className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
              <XMarkIcon className="size-5" />
            </button>
            <video src={video.src} controls autoPlay playsInline className="max-h-[80vh] w-full rounded-2xl bg-black" />
          </div>
        )}
      </dialog>
    </section>
  );
}
