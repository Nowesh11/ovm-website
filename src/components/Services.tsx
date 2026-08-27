"use client";

import { motion } from "framer-motion";
import { Anchor, Cable, Cpu, HardHat, Radar, Waves, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: Anchor,
    title: "Post Tensioning",
    description: "Anchorage systems, strands and jacks for bonded and unbonded tendons.",
  },
  {
    icon: Cable,
    title: "Cable",
    description: "Stay cables, suspension and external tendons for long-span structures.",
  },
  {
    icon: Waves,
    title: "Bearing and Vibrating Damping",
    description: "Structural bearings, isolators and dampers that absorb load and motion.",
  },
  {
    icon: HardHat,
    title: "Construction Service",
    description: "On-site stressing, grouting and erection led by our own field engineers.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Inspection, re-stressing and cable replacement across the asset lifecycle.",
  },
  {
    icon: Radar,
    title: "Monitoring",
    description: "Structural health monitoring with live sensor data and load analytics.",
  },
  {
    icon: Cpu,
    title: "Leading-edge Technology",
    description: "In-house R&D turning six decades of field data into new systems.",
  },
];

/* Trailing-row centring: with an 8-col grid and 2-col cards, starting the 5th
   card at column 2 leaves the last three cards balanced instead of left-hung. */
const COL_START: Record<number, string> = {
  4: "lg:col-start-2",
  6: "md:col-start-2 lg:col-start-auto",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Services() {
  return (
    <section id="technologies" className="relative overflow-hidden py-24 sm:py-28 lg:py-36">
      {/* Faint grid + a navy bloom to keep the flat background from going dead */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-navy/12 blur-[140px]" />
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
            What we do
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
            OVM Technologies
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A complete post-tensioning ecosystem — from the anchorage in the deck to
            the sensors that watch it decades later.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-4 lg:mt-16 lg:grid-cols-8"
        >
          {SERVICES.map(({ icon: Icon, title, description }, i) => (
            <motion.article
              key={title}
              variants={rise}
              className={`group relative overflow-hidden rounded-[16px] border border-line bg-surface p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:bg-surface-2 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)] md:col-span-2 ${
                COL_START[i] ?? ""
              }`}
            >
              {/* Light sweeping across the card's top edge on hover */}
              <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-90" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/[0.14] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              <div className="relative">
                {/* Glowing navy → amber circle */}
                <div className="relative mb-6 inline-flex">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-navy-400 to-amber opacity-40 blur-[14px] transition-all duration-400 group-hover:opacity-80 group-hover:blur-[18px]"
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy via-navy-400 to-amber text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition-transform duration-400 group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
