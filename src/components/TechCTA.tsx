"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Deliberately not the homepage's centred CTASection — a two-column split so
   the seven technology pages don't read as the same block seven times. */
export default function TechCTA({ technologyName }: { technologyName: string }) {
  return (
    <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(60%_70%_at_30%_50%,black,transparent)]" />
        <div className="absolute -left-24 top-1/2 h-72 w-[28rem] -translate-y-1/2 rounded-full bg-navy/22 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-64 w-[24rem] rounded-full bg-amber/12 blur-[120px]" />
      </div>

      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
        >
          {/* Left — the ask */}
          <div>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Next step
            </span>

            <h2 className="mt-5 font-display text-2xl font-bold leading-[1.14] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
              Need {technologyName} for your project?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Talk to our engineering team about specifications, standards compliance, and
              lead times.
            </p>
          </div>

          {/* Right — stacked actions */}
          <div className="flex flex-col gap-3.5">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-amber to-amber-400 px-6 py-5 text-sm font-semibold text-ink shadow-[0_14px_36px_-14px_rgba(245,148,31,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-14px_rgba(245,148,31,0.9)]"
            >
              Discuss this project
              <ArrowRight
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>

            <Link
              href="/#technologies"
              className="group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-surface/60 px-6 py-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-300/50 hover:bg-surface-2"
            >
              View all technologies
              <LayoutGrid
                size={17}
                className="shrink-0 text-amber transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
