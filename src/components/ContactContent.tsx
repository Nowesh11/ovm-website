"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { CONTACT, MAP_EMBED_URL, MAP_SEARCH_URL } from "@/data/contact";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.12, staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: EASE },
};

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* Every row is a link (map, dialer, mail client, LinkedIn), so the hover
   state has to read as interactive rather than decorative. */
const rowClass =
  "group flex items-start gap-4 rounded-2xl border border-line bg-ink-deep/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/45 hover:bg-surface-2 hover:shadow-[0_16px_36px_-18px_rgba(245,148,31,0.45)]";

/* Value text warms to amber alongside the row. */
const valueClass =
  "mt-1.5 text-sm text-white/90 transition-colors duration-300 group-hover:text-amber-400";

const iconClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-amber/20 via-surface-2 to-navy/30 text-amber shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105";

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-dim";

export default function ContactContent() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — no photograph for this page, so a grid + glow panel.
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
                Contact
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            Contact Us
          </motion.h1>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Form + details
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px]"
        />

        <div className="shell">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left — form */}
            <motion.div {...reveal}>
              <h2 className="font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                Send us a message
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Tell us about your project and our engineering team will get back to you.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </motion.div>

            {/* Right — details */}
            <motion.div {...reveal}>
              <h2 className="font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                Reach us directly
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                OVM Prestressing Technology (M) Sdn. Bhd.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                <a
                  href={MAP_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span className={iconClass}>
                    <MapPin size={19} strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className={labelClass}>Address</p>
                    <address className={`${valueClass} not-italic leading-relaxed`}>
                      {CONTACT.address}
                    </address>
                  </div>
                </a>

                <a href={CONTACT.phoneHref} className={rowClass}>
                  <span className={iconClass}>
                    <Phone size={19} strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className={labelClass}>Phone</p>
                    <p className={valueClass}>{CONTACT.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${CONTACT.email}`} className={rowClass}>
                  <span className={iconClass}>
                    <Mail size={19} strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className={labelClass}>Email</p>
                    <p className={`${valueClass} break-all`}>{CONTACT.email}</p>
                  </div>
                </a>

                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span className={iconClass}>
                    <LinkedInIcon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className={labelClass}>LinkedIn</p>
                    <p className={valueClass}>OVM Malaysia on LinkedIn</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            {...reveal}
            className="mt-12 overflow-hidden rounded-[18px] border border-line bg-surface"
          >
            <iframe
              src={MAP_EMBED_URL}
              title="OVM Prestressing Technology (M) Sdn. Bhd. location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[22rem] w-full border-0 sm:h-[26rem]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
