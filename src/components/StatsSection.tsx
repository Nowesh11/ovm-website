"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Award, Globe2, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/* Fast out, long tail — makes the count-up feel like it settles rather than stops. */
const COUNT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Stat = {
  icon: LucideIcon;
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { icon: TrendingUp, prefix: "USD ", value: 571, suffix: "M", label: "Turnover in 2024" },
  { icon: Users, value: 2000, suffix: "+", label: "Skilled employees" },
  { icon: Award, value: 1200, suffix: "+", label: "Patents held" },
  { icon: Globe2, value: 80, suffix: "+", label: "Countries served" },
];

/* Counts 0 → value once the number scrolls into view. Writes straight to the
   DOM node so the 60fps tween never triggers a React re-render. */
function Counter({ value, prefix = "", suffix = "" }: Pick<Stat, "value" | "prefix" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    const controls = animate(0, value, {
      duration: 2.1,
      ease: COUNT_EASE,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-US");
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function StatsSection() {
  return (
    <section className="relative z-10 -mt-24 sm:-mt-28 lg:-mt-32">
      <div className="shell">
        <div className="relative">
          {/* Soft glow pooling underneath the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -bottom-8 -top-4 -z-10"
          >
            <div className="absolute left-[12%] top-1/2 h-40 w-1/3 -translate-y-1/2 rounded-full bg-navy/25 blur-[90px]" />
            <div className="absolute right-[10%] top-1/2 h-40 w-1/3 -translate-y-1/2 rounded-full bg-amber/15 blur-[90px]" />
          </div>

          {/* Gradient hairline border wrapper */}
          <div className="rounded-[22px] bg-gradient-to-b from-line via-line/50 to-line/20 p-px shadow-[0_30px_80px_-24px_rgba(0,0,0,0.95)]">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-[21px] bg-line/40 sm:grid-cols-2 lg:grid-cols-4"
            >
              {STATS.map(({ icon: Icon, prefix, value, suffix, label }) => (
                <motion.div
                  key={label}
                  variants={rise}
                  className="group relative bg-surface px-7 py-8 transition-colors duration-300 hover:bg-surface-2 sm:px-8 sm:py-10"
                >
                  {/* Amber wash that blooms in on hover */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-amber/20 via-surface-2 to-navy/30 text-amber shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <Icon size={19} strokeWidth={1.9} />
                    </span>

                    <div className="min-w-0">
                      <p className="font-display text-3xl font-bold leading-none tracking-[-0.03em] text-white sm:text-[2rem] lg:text-4xl">
                        <Counter value={value} prefix={prefix} suffix={suffix} />
                      </p>
                      <p className="mt-2.5 text-sm leading-snug text-muted">{label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
