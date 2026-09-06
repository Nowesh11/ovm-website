"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";

import NewsCard, { newsGridContainer } from "@/components/NewsCard";
import { newsItems } from "@/data/news";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Teaser only — the full archive lives at /news. */
const TEASER_COUNT = 3;

/* Matches NewsCard's entrance so the hiring card joins the same stagger. */
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* A recruiting card, not an article — deliberately a <div> so the news grid
   still reports exactly TEASER_COUNT <article>s. Solid amber-tinted panel
   instead of a photo, so it reads as a different kind of card. */
function HiringCard() {
  return (
    <motion.div
      variants={rise}
      className="group relative flex flex-col justify-center overflow-hidden rounded-[16px] border border-amber/35 bg-gradient-to-br from-amber/20 via-amber/10 to-navy/20 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-amber/60 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(245,148,31,0.22)] sm:col-span-2 sm:p-8 lg:col-span-3 xl:col-span-1"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber/20 blur-[70px]"
      />

      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber/35 bg-ink-deep/50 text-amber transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
        <Briefcase size={19} strokeWidth={1.9} />
      </span>

      <h3 className="relative mt-5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white sm:text-xl">
        We&rsquo;re Hiring
      </h3>

      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        Join our growing team in Malaysia.
      </p>

      <Link
        href="/careers"
        /* Stretched over the whole card — one anchor, no nested
           interactive elements. */
        className="relative mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-amber transition-colors duration-300 after:absolute after:inset-0 hover:text-amber-400"
      >
        View open roles
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </Link>
    </motion.div>
  );
}

export default function LatestNews() {
  const latest = newsItems.slice(0, TEASER_COUNT);

  return (
    <section id="news" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[30rem] w-[36rem] rounded-full bg-navy/10 blur-[150px]"
      />

      <div className="shell">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Newsroom
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
              Latest News
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Project milestones, certifications and engineering notes from across the
              OVM network.
            </p>
          </div>

          <Link
            href="/news"
            className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-amber transition-colors duration-300 hover:text-amber-400 sm:self-end"
          >
            All news
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>

        {/* Article cards */}
        <motion.div
          variants={newsGridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          /* On xl the hiring card sits alongside the three articles; below
             that it spans the full width directly under the grid. */
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4"
        >
          {latest.map((item) => (
            <NewsCard
              key={item.slug}
              item={item}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}

          <HiringCard />
        </motion.div>
      </div>
    </section>
  );
}
