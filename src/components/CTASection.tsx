"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTASection() {
  return (
    <section id="contact" className="relative py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative"
        >
          {/* Glow pooling outside the panel — navy on the left, amber on the right */}
          <div aria-hidden className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10">
            <div className="absolute left-0 top-1/2 h-56 w-2/5 -translate-y-1/2 rounded-full bg-navy/30 blur-[110px]" />
            <div className="absolute right-0 top-1/2 h-56 w-2/5 -translate-y-1/2 rounded-full bg-amber/18 blur-[110px]" />
          </div>

          {/* Gradient hairline border: navy at the top-left, amber at the bottom-right,
              neutral through the middle so it reads as an accent, not a filled panel. */}
          <div className="rounded-[24px] bg-[linear-gradient(115deg,var(--color-navy)_0%,var(--color-navy-400)_16%,var(--color-line)_44%,var(--color-line)_58%,var(--color-amber)_100%)] p-px shadow-[0_36px_90px_-32px_rgba(0,0,0,0.95)]">
            <div className="relative overflow-hidden rounded-[23px] bg-ink-deep px-7 py-16 text-center sm:px-14 lg:py-20">
              {/* Interior accents */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(65%_75%_at_50%_50%,black,transparent)]" />
                <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-navy/25 blur-[90px]" />
                <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-amber/12 blur-[90px]" />
                {/* Bright spot where the gradient border is warmest */}
                <span className="absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
              </div>

              <div className="relative mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber" />
                  Let&rsquo;s build
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber" />
                </span>

                <h2 className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3rem]">
                  Have a project in mind?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Bring us the span, the loads and the schedule. Our engineers will
                  specify the post-tensioning, cable and bearing systems to carry it —
                  and stay with the structure long after handover.
                </p>

                <div className="mt-10 flex justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-amber-400 px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_40px_-12px_rgba(245,148,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-12px_rgba(245,148,31,0.9)]"
                  >
                    Contact us
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
