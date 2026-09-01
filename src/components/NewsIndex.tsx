"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import NewsCard, { newsGridContainer } from "@/components/NewsCard";
import { newsItems } from "@/data/news";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.12, staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function NewsIndex() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — no single cover photo represents the archive, so this
          matches the Contact page's grid + glow panel.
      --------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[46svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-ink to-ink" />
          <div className="bg-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(75%_70%_at_50%_30%,black,transparent)]" />
          <div className="absolute -top-24 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-navy/18 blur-[140px]" />
          <div className="absolute -bottom-32 right-1/4 h-[24rem] w-[24rem] rounded-full bg-amber/10 blur-[130px]" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="shell relative flex flex-1 flex-col justify-end pb-14 pt-32"
        >
          <motion.nav variants={rise} aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted sm:text-sm">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-amber-400">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-muted-dim">
                <ChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-white/90">
                News
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Newsroom
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            News &amp; Updates
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Project milestones, certifications and engineering notes from across the OVM
            network.
          </motion.p>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Full archive
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px]"
        />

        <div className="shell">
          <motion.div
            variants={newsGridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {newsItems.map((item) => (
              <NewsCard
                key={item.slug}
                item={item}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
