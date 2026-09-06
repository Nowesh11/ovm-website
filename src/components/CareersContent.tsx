"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Mail } from "lucide-react";

import { CAREERS_INTRO, applyHref, jobOpenings } from "@/data/careers";
import type { JobOpening } from "@/data/careers";
import { CONTACT, EMAIL_HREF } from "@/data/contact";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.12, staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* Staggers the listing grid the way `newsGridContainer` staggers news cards. */
const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const bulletClass =
  "relative pl-6 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber/70";

const metaPillClass =
  "rounded-full border border-line bg-ink-deep/50 px-3 py-1 text-[11px] font-medium text-muted";

const sectionHeadingClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-dim";

const applyButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-[0_16px_36px_-16px_rgba(245,148,31,0.75)]";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className={bulletClass}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobCard({ job }: { job: JobOpening }) {
  const meta = [job.location, job.employmentType, job.industry].filter(Boolean);

  return (
    <motion.article
      variants={rise}
      id={job.slug}
      className="group flex scroll-mt-28 flex-col rounded-[16px] border border-line bg-surface p-7 transition-all duration-400 hover:-translate-y-1 hover:border-navy-300/45 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)] sm:p-8"
    >
      <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
        {job.title}
      </h2>

      {meta.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {meta.map((entry) => (
            <span key={entry} className={metaPillClass}>
              {entry}
            </span>
          ))}
        </div>
      )}

      <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{job.summary}</p>

      {/* A role carries either a flat list or headed groups, never both. */}
      {job.responsibilities && (
        <section className="mt-7">
          <h3 className={sectionHeadingClass}>Key Responsibilities</h3>
          <Bullets items={job.responsibilities} />
        </section>
      )}

      {job.responsibilityGroups && (
        <section className="mt-7">
          <h3 className={sectionHeadingClass}>Key Responsibilities</h3>
          <div className="mt-5 flex flex-col gap-6">
            {job.responsibilityGroups.map((group) => (
              <div key={group.heading}>
                <h4 className="font-display text-sm font-bold leading-snug text-white/90">
                  {group.heading}
                </h4>
                <Bullets items={group.items} />
              </div>
            ))}
          </div>
        </section>
      )}

      {job.requirements && (
        <section className="mt-7">
          <h3 className={sectionHeadingClass}>Requirements</h3>
          <Bullets items={job.requirements} />
        </section>
      )}

      {/* Says plainly that the bullets above are a summary, rather than
          letting a truncated listing read as the whole job. */}
      {job.incomplete && (
        <p className="mt-5 text-xs italic leading-relaxed text-muted-dim">
          Full role details available on request
        </p>
      )}

      {/* `mt-auto` keeps every button on a row aligned to the card's foot. */}
      <div className="mt-auto pt-8">
        <a href={applyHref(EMAIL_HREF, job.title)} className={applyButtonClass}>
          <Mail size={16} strokeWidth={2} />
          Apply now
          <span className="sr-only"> for {job.title}</span>
        </a>
      </div>
    </motion.article>
  );
}

export default function CareersContent() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — matches the Contact and News index grid + glow panel.
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
                Careers
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Careers
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            Join OVM Malaysia
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {CAREERS_INTRO}
          </motion.p>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Open roles
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px]"
        />

        <div className="shell">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl"
          >
            Open Positions
          </motion.h2>

          {jobOpenings.length > 0 ? (
            <motion.div
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              /* `items-start` — listings differ wildly in length, and
                 stretching a short one to a long one's height leaves a
                 wide empty gap above its button. */
              className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2"
            >
              {jobOpenings.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </motion.div>
          ) : (
            /* Nothing open is still a message worth showing — an empty grid
               would read as a broken page. */
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-12 rounded-[16px] border border-line bg-surface p-8 text-center sm:p-10"
            >
              <p className="text-base leading-relaxed text-muted">
                No open positions right now — check back soon, or send us your resume
                anyway.
              </p>
              <a
                href={applyHref(EMAIL_HREF, "Open Application")}
                className={`mt-7 ${applyButtonClass}`}
              >
                <Mail size={16} strokeWidth={2} />
                Send your resume
              </a>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 text-sm leading-relaxed text-muted-dim"
          >
            Don&rsquo;t see the right role? Write to us at{" "}
            <a
              href={EMAIL_HREF}
              className="font-semibold text-white/90 underline decoration-amber/40 underline-offset-4 transition-colors duration-300 hover:text-amber-400 hover:decoration-amber"
            >
              {CONTACT.email}
            </a>
            .
          </motion.p>
        </div>
      </section>
    </>
  );
}
