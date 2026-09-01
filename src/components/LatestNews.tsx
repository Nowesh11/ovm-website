"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import NewsCard, { newsGridContainer } from "@/components/NewsCard";
import { newsItems } from "@/data/news";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Teaser only — the full archive lives at /news. */
const TEASER_COUNT = 3;

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
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {latest.map((item) => (
            <NewsCard
              key={item.slug}
              item={item}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
