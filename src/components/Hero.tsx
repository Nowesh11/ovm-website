"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* Shared easing curve — same one the navbar enters with. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* The navbar's entrance runs 0.7s; the hero copy starts just before it lands. */
const container = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.55, staggerChildren: 0.14 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background photograph */}
      <Image
        src="/hero.jpeg"
        alt="Cable-stayed bridge under construction at sunset"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Overlay stack — strongest at the bottom-left where the copy sits. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* 1. Diagonal weight: opaque bottom-left, clear toward the top-right. */}
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-deep via-ink/70 to-transparent" />
        {/* 2. Extra pool of ink behind the text block itself. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_0%_100%,rgba(6,10,20,0.94)_0%,rgba(10,15,28,0.62)_38%,transparent_72%)]" />
        {/* 3. Seam into the section below so the photo never cuts off hard. */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
        {/* 4. Faint navy lift in the sky, and an amber echo of the sunset. */}
        <div className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-navy/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[130px]" />
      </div>

      {/* Copy — bottom-left aligned, cleared past the transparent navbar. */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="shell relative flex flex-1 flex-col justify-end pb-52 pt-32 sm:pb-56 lg:pb-64"
      >
        {/* Eyebrow */}
        <motion.div variants={rise} className="mb-7">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line/90 bg-surface/50 py-2 pl-3 pr-4 text-[11px] font-medium uppercase tracking-[0.16em] text-muted backdrop-blur-md sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            OVM Prestressing Technology · Since 1966
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={rise}
          className="max-w-4xl font-display text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
        >
          Engineering quality, leading innovation
          <span className="mt-2 block text-gradient-brand">
            — the strength behind the span
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={rise}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          For nearly six decades, OVM has engineered the post-tensioning systems,
          stay cables and bearings that carry the world&rsquo;s longest spans —
          now delivered across Malaysia with global R&amp;D behind every anchorage.
        </motion.p>

        {/* Calls to action */}
        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#technologies"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-amber-400 px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_40px_-12px_rgba(245,148,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-12px_rgba(245,148,31,0.9)]"
          >
            Explore our technologies
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-300/60 hover:bg-surface/70"
          >
            Talk to an engineer
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue — sits above the zone the stats card overlaps into. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="pointer-events-none absolute bottom-32 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:bottom-36 sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-dim">
          Scroll
        </span>
        {/* Hairline with a light travelling down it */}
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span
            animate={{ y: ["-100%", "140%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-amber to-transparent"
          />
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-amber" />
        </motion.span>
      </motion.div>
    </section>
  );
}
