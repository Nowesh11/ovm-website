"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { projectAnchorId, projects } from "@/data/projects";

/* Technology pills are derived from the scope wording rather than stored per
   project, so the scope text stays the single source of truth. Order here is
   the order they render in. `\bPT\b` deliberately covers the whole family —
   PT system(s), PT bars, PT materials, PT specialist. */
const TECH_TAGS: { label: string; match: RegExp }[] = [
  { label: "Post-tensioning", match: /\bPT\b/i },
  { label: "Cable systems", match: /cable/i },
  { label: "Bearing", match: /bearing/i },
  { label: "Expansion joints", match: /expansion joint/i },
];

function tagsFor(scope: string) {
  return TECH_TAGS.filter(({ match }) => match.test(scope)).map(({ label }) => label);
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Reads `project-<slug>` out of the URL hash, or null. */
function hashSlug() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return id.startsWith("project-") ? id.slice("project-".length) : null;
}

export default function FeaturedProjects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  /* Which card a deep link is pointing at, so its photo can skip lazy
     loading — see `targeted` below. Read in an effect, not during render,
     because the hash does not exist on the server. */
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setTarget(hashSlug());
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 2);
    setAtEnd(rail.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    /* Card width is responsive, so re-measure on resize rather than mirroring
       the breakpoints in JS. */
    const observer = new ResizeObserver(sync);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;

    /* Distance between two card origins = card width + gap, measured off the
       DOM so the `gap-5` utility stays the single source of truth. */
    const first = rail.children[0] as HTMLElement | undefined;
    const second = rail.children[1] as HTMLElement | undefined;
    const delta =
      first && second ? second.offsetLeft - first.offsetLeft : rail.clientWidth * 0.8;

    rail.scrollBy({
      left: direction * delta,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 h-[28rem] w-[32rem] rounded-full bg-amber/8 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[30rem] rounded-full bg-navy/14 blur-[140px]" />
      </div>

      <div className="shell">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
            <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
            Track Record
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
            Reference Projects in Malaysia
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Highways, rail links and record-span crossings carrying OVM post-tensioning,
            stay-cable, bearing and expansion joint systems — from the Klang Valley to
            Sabah and Sarawak.
          </p>
        </motion.div>
      </div>

      {/* Rail — full-bleed so cards run off both edges, with the shell gutter
          recreated as scroll padding so the first card still lines up. */}
      <div className="relative mt-14 lg:mt-16">
        {/* Fade edges, dimmed away once you reach either end */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent transition-opacity duration-300 sm:w-24 lg:w-32 ${
            atStart ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent transition-opacity duration-300 sm:w-24 lg:w-32 ${
            atEnd ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Scroll nudges, sitting over the fade edges */}
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="Scroll projects left"
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-deep/80 text-white backdrop-blur-md transition-all duration-300 hover:border-navy-300/45 hover:bg-surface-2 hover:text-amber-400 disabled:pointer-events-none disabled:opacity-0 sm:flex lg:left-5"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="Scroll projects right"
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-deep/80 text-white backdrop-blur-md transition-all duration-300 hover:border-navy-300/45 hover:bg-surface-2 hover:text-amber-400 disabled:pointer-events-none disabled:opacity-0 sm:flex lg:right-5"
        >
          <ArrowRight size={18} />
        </button>

        <motion.div
          ref={railRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          role="region"
          aria-label="Reference projects"
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-5 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line hover:[&::-webkit-scrollbar-thumb]:bg-navy-400/70 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5 lg:scroll-px-10 lg:px-10"
        >
          {projects.map(({ slug, title, location, scope, image }, i) => {
            const isActive = active === i;
            const tags = tagsFor(scope);
            /* A card arrived at by deep link must show its photo. Chrome
               defers lazy images in this rail and will not re-evaluate one
               once deferred — not even if `loading` is flipped afterwards —
               so the target is keyed separately and mounts as a fresh,
               eager <img> rather than having its attribute changed. */
            const targeted = target === slug;

            return (
              <motion.article
                key={slug}
                /* Deep-link target for the technology pages' Reference
                   Project cards — see `ScrollToHash`. `scroll-mt` keeps the
                   card clear of the fixed navbar when the browser, rather
                   than our effect, does the scrolling. */
                id={projectAnchorId(slug)}
                variants={rise}
                /* Keyed off the pointer that actually fired the event rather
                   than a `(hover: none)` media query, so a touchscreen laptop
                   gets hover-to-reveal from its mouse and tap-to-toggle from
                   its screen. */
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onPointerDown={(e) => {
                  if (e.pointerType === "mouse") return;
                  setActive(isActive ? null : i);
                }}
                className={`group relative aspect-[3/4] w-80 shrink-0 scroll-mt-28 snap-start overflow-hidden rounded-[16px] border bg-surface transition-all duration-400 sm:w-96 ${
                  isActive
                    ? "-translate-y-1.5 border-navy-300/45 shadow-[0_30px_65px_-26px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
                    : "border-line"
                }`}
              >
                <Image
                  key={targeted ? `${slug}-eager` : slug}
                  src={image}
                  alt={`${title}, ${location}`}
                  fill
                  loading={targeted ? "eager" : "lazy"}
                  sizes="(min-width: 640px) 384px, 320px"
                  className={`object-cover transition-transform duration-[900ms] ease-out ${
                    isActive ? "scale-[1.08]" : "scale-100"
                  }`}
                />

                {/* Base caption — a plain photo caption bar. Hidden from
                    assistive tech because the overlay below repeats it in
                    full, and it fades out as the overlay takes over. */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent p-6 pt-14 transition-opacity duration-400 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white sm:text-xl">
                    {title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted">
                    <MapPin size={14} className="shrink-0 text-amber" />
                    <span className="truncate">{location}</span>
                  </div>
                </div>

                {/* Detail overlay */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end bg-ink-deep/92 p-6 backdrop-blur-[3px] transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[1.05] opacity-0"
                  }`}
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/12 bg-surface/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                    <MapPin size={12} className="shrink-0 text-amber" />
                    {location}
                  </span>

                  <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted">{scope}</p>

                  {tags.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-navy-300/30 bg-navy/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy-300"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Amber hairline anchoring the bottom edge */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent"
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
