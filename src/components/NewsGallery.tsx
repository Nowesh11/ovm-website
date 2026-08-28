"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

type Props = {
  images: string[];
  /** Used to build meaningful alt text for each frame. */
  title: string;
};

export default function NewsGallery({ images, title }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = open !== null;

  const close = useCallback(() => setOpen(null), []);

  /* Functional update so this never has to depend on `open`, which keeps the
     key handler effect from re-binding on every navigation. */
  const step = useCallback(
    (direction: 1 | -1) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + direction + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  /* Lock the page behind the overlay, and restore whatever was there before. */
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const altFor = (i: number) => `${title} — photo ${i + 1} of ${images.length}`;

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 gap-4 lg:grid-cols-3"
      >
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            variants={rise}
            onClick={() => setOpen(i)}
            aria-label={`Expand ${altFor(i)}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-[14px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1 hover:border-navy-300/45 hover:shadow-[0_24px_50px_-22px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
          >
            <Image
              src={src}
              alt={altFor(i)}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
            <span className="pointer-events-none absolute inset-0 bg-ink-deep/25 transition-opacity duration-400 group-hover:opacity-0" />
            <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-ink-deep/70 text-white opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <Expand size={15} />
            </span>
          </motion.button>
        ))}
      </motion.div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          onClick={close}
          className="fixed inset-0 z-[70] flex flex-col bg-ink-deep/95 p-4 backdrop-blur-md sm:p-8"
        >
          {/* Top bar — counter and close */}
          <div
            className="relative z-10 flex shrink-0 items-center justify-between"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium tabular-nums tracking-[0.1em] text-muted">
              {open + 1} / {images.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/70 text-white transition-all duration-300 hover:border-amber/55 hover:text-amber-400"
            >
              <X size={18} />
            </button>
          </div>

          {/* Stage. Clicks on the surrounding backdrop close; clicks on the
              image itself do not, so navigating never dismisses by accident. */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <div
              className="relative h-full w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                key={images[open]}
                src={images[open]}
                alt={altFor(open)}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          {images.length > 1 && (
            <div
              className="relative z-10 flex shrink-0 items-center justify-center gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/70 text-white transition-all duration-300 hover:border-navy-300/45 hover:text-amber-400"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/70 text-white transition-all duration-300 hover:border-navy-300/45 hover:text-amber-400"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
