"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE },
};

type Milestone = {
  year: string;
  title: string;
  description: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "1966",
    title: "OVM founded",
    description:
      "OVM is founded and becomes China's leading specialist in prestressing technology.",
  },
  {
    year: "2015",
    title: "Entry into Malaysia",
    description:
      "OVM expands into the Malaysian market, supplying prestressing materials to local post-tensioning partners.",
  },
  {
    year: "2023",
    title: "OVM Malaysia established",
    description:
      "OVM Prestressing Technology (M) Sdn. Bhd. is formally established in Malaysia.",
  },
  {
    year: "Today",
    title: "A global operation",
    description:
      "2,000+ employees, 1,200+ patents, projects delivered across 80+ countries.",
  },
];

export default function AboutTimeline() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/3 h-[28rem] w-[32rem] rounded-full bg-navy/12 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[30rem] rounded-full bg-amber/8 blur-[140px]" />
      </div>

      <div className="shell">
        <motion.div {...reveal} className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
            <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
            Our story
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
            Six decades of prestressing
          </h2>
        </motion.div>

        <div className="relative mt-16 lg:mt-20">
          {/* Spine — hugs the left edge on mobile, centred from lg up. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-[15px] w-px bg-gradient-to-b from-transparent via-line to-transparent lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-12 lg:gap-4">
            {MILESTONES.map(({ year, title, description }, i) => {
              const isRight = i % 2 === 1;

              return (
                <motion.li
                  key={year}
                  {...reveal}
                  className="relative pl-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:pl-0"
                >
                  {/* Dot marker */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                  >
                    <span className="absolute h-8 w-8 rounded-full bg-amber/20 blur-[8px]" />
                    <span className="relative h-3.5 w-3.5 rounded-full border-2 border-amber bg-ink shadow-[0_0_0_4px_rgba(10,15,28,1)]" />
                  </span>

                  {/* Year — opposite side from the copy on desktop */}
                  <div
                    className={`mb-3 lg:mb-0 ${
                      isRight
                        ? "lg:order-2 lg:pl-16 lg:text-left"
                        : "lg:order-1 lg:pr-16 lg:text-right"
                    }`}
                  >
                    <span className="font-display text-3xl font-bold tracking-[-0.03em] text-amber sm:text-4xl lg:text-5xl">
                      {year}
                    </span>
                  </div>

                  {/* Copy */}
                  <div
                    className={`${
                      isRight ? "lg:order-1 lg:pr-16 lg:text-right" : "lg:order-2 lg:pl-16"
                    }`}
                  >
                    <div className="rounded-[16px] border border-line bg-surface p-6 transition-all duration-400 hover:-translate-y-1 hover:border-navy-300/45 hover:bg-surface-2 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)] sm:p-7">
                      <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white sm:text-xl">
                        {title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">
                        {description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
