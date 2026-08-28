"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

type Project = {
  title: string;
  location: string;
  scope: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    title: "DUKE 3 Highway",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment to 60m T-Beam",
    image: "/projects/duke3-highway.jpg",
  },
  {
    title: "DASH Highway",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment",
    image: "/projects/dash-highway.jpg",
  },
  {
    title: "SUKE Highway",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment",
    image: "/projects/suke-highway.jpg",
  },
  {
    title: "Sg. Pulai Balanced Cantilever Bridge",
    location: "Johor",
    scope: "PT system & prestressing equipment",
    image: "/projects/sg-pulai-bridge.jpg",
  },
  {
    title: "LRT 3",
    location: "Klang Valley",
    scope: "PT system & prestressing equipment",
    image: "/projects/lrt3.jpg",
  },
  {
    title: "IOI City Mall Phase 2",
    location: "Putrajaya",
    scope: "PT system & prestressing equipment",
    image: "/projects/ioi-city-mall.jpg",
  },
  {
    title: "Jalan UMS",
    location: "Kota Kinabalu, Sabah",
    scope: "PT system & prestressing equipment",
    image: "/projects/jalan-ums-kota-kinabalu.jpg",
  },
  {
    title: "Batang Rajang Bridge",
    location: "Pan Borneo WPC 7, Sibu, Sarawak",
    scope: "PT system, prestressing equipment & incremental launching",
    image: "/projects/batang-rajang-bridge.jpg",
  },
  {
    title: "Muara Lassa Bridge",
    location: "Sarawak",
    scope: "Expansion joints",
    image: "/projects/muara-lassa-bridge.jpg",
  },
  {
    title: "Batang Igan Bridge",
    location: "Sarawak",
    scope: "PT system, bearings, expansion joints & stay cables",
    image: "/projects/batang-igan-bridge.jpg",
  },
  {
    title: "Batang Saribas Bridge No. 2",
    location: "Sarawak",
    scope: "Bearings & expansion joints",
    image: "/projects/batang-saribas-bridge-2.jpg",
  },
  {
    title: "RTS Link",
    location: "Johor–Singapore",
    scope: "PL2 PT system",
    image: "/projects/rts-link-johor.jpg",
  },
  {
    title: "East Coast Rail Link (ECRL)",
    location: "Malaysia, 665km",
    scope: "PT system, smart stressing & grouting, bearings & expansion joints for ROBs",
    image: "/projects/ecrl.jpg",
  },
  {
    title: "Bintulu-Jepak Bridge",
    location: "Sarawak",
    scope:
      "Stay cable subcontractor, PT systems, PT bars, expansion joints — main span 267.6m",
    image: "/projects/bintulu-jepak-bridge.jpg",
  },
  {
    title: "Batang Rambungan Bridge",
    location: "Sarawak",
    scope: "Stay cables, installation supervision, PT systems — main span 160m",
    image: "/projects/batang-rambungan-bridge.jpg",
  },
  {
    title: "Batang Lupar 1 Bridge",
    location: "Sarawak",
    scope: "Stay cable subcontractor, PT bars, expansion joints — main span 324.4m",
    image: "/projects/batang-lupar-1-bridge.jpg",
  },
  {
    title: "Sejingkat Bridge",
    location: "Sarawak",
    scope: "Stay cable subcontractor, PT system & expansion joint — main span 400m",
    image: "/projects/sejingkat-bridge.jpg",
  },
  {
    title: "KUTS Red Line",
    location: "Sarawak",
    scope: "PT specialist sub-contractor",
    image: "/projects/kuts-red-line.jpg",
  },
  {
    title: "KUTS Blue Line 2",
    location: "Sarawak",
    scope: "PT materials & supervision",
    image: "/projects/kuts-blue-line-2.jpg",
  },
  {
    title: "Bandar Lawas Bridge",
    location: "Sarawak",
    scope: "PT system, suspension bridge solution & installation supervision",
    image: "/projects/bandar-lawas-bridge.jpg",
  },
  {
    title: "Tg. Aru–UMS Pedestrian & Cyclist Bridge",
    location: "Sabah",
    scope: "PT system, suspension bridge solution & installation supervision",
    image: "/projects/tg-aru-ums-bridge.jpg",
  },
  {
    title: "Sungai Paku Bridge",
    location: "Sarawak",
    scope: "PT system, hanger system for arch bridge",
    image: "/projects/sungai-paku-bridge.jpg",
  },
  {
    title: "LRT Mutiara Line",
    location: "Penang",
    scope: "PL3 PT system, equipment & installation supervision, 5km package SLS2",
    image: "/projects/lrt-mutiara-line-penang.jpg",
  },
  {
    title: "Pan Borneo Highway Sabah",
    location: "WP19 & WP33",
    scope: "PT specialist sub-contractor for all bridges & ground anchors",
    image: "/projects/pan-borneo-sabah.jpg",
  },
];

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

export default function FeaturedProjects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
          {PROJECTS.map(({ title, location, scope, image }, i) => {
            const isActive = active === i;
            const tags = tagsFor(scope);

            return (
              <motion.article
                key={title}
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
                className={`group relative aspect-[3/4] w-80 shrink-0 snap-start overflow-hidden rounded-[16px] border bg-surface transition-all duration-400 sm:w-96 ${
                  isActive
                    ? "-translate-y-1.5 border-navy-300/45 shadow-[0_30px_65px_-26px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
                    : "border-line"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title}, ${location}`}
                  fill
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
