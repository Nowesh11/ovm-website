"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";

import NewsGallery from "@/components/NewsGallery";
import { formatNewsDate, type NewsItem } from "@/data/news";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE },
};

type Props = {
  item: NewsItem;
  others: NewsItem[];
};

export default function NewsArticle({ item, others }: Props) {
  const { title, category, date, image, focus, body, tags, gallery, linkedinUrl } = item;

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — same overlay stack as the homepage hero, scaled down for
          an article header.
      --------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[68svh] flex-col overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          preload
          sizes="100vw"
          style={{ objectPosition: focus }}
          className="-z-20 object-cover"
        />

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-deep via-ink/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_0%_100%,rgba(6,10,20,0.94)_0%,rgba(10,15,28,0.62)_38%,transparent_72%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
          <div className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-navy/20 blur-[120px]" />
          <div className="absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[130px]" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="shell relative flex flex-1 flex-col justify-end pb-16 pt-32 sm:pb-20"
        >
          {/* Breadcrumb. "News" points at the homepage section, which is
              where the newsroom currently lives. */}
          <motion.nav variants={rise} aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-muted-dim">
                <ChevronRight size={13} />
              </li>
              <li>
                <Link
                  href="/#news"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  News
                </Link>
              </li>
              <li aria-hidden className="text-muted-dim">
                <ChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-white/90">
                {title}
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={rise} className="flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber backdrop-blur-md">
              {category}
            </span>
            <time
              dateTime={date}
              className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] text-muted"
            >
              <span className="h-1 w-1 rounded-full bg-amber" />
              {formatNewsDate(date)}
            </time>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 max-w-4xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Article body
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px]"
        />

        <div className="shell">
          <motion.div {...reveal} className="mx-auto max-w-3xl">
            {body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mb-6 text-base leading-[1.85] text-muted last:mb-0 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}

            {tags.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-navy-300/30 bg-navy/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {/* Origin link — these posts started life on LinkedIn. */}
            <div className="mt-10 border-t border-line pt-8">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-line bg-surface/50 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-400 hover:-translate-y-0.5 hover:border-amber/55 hover:shadow-[0_18px_45px_-16px_rgba(245,148,31,0.5)]"
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/40 to-amber/25 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                View original post on LinkedIn
                <ExternalLink
                  size={15}
                  className="text-amber transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Gallery
      --------------------------------------------------------------- */}
      {gallery.length > 0 && (
        <section className="relative overflow-hidden pb-20 sm:pb-24">
          <div className="shell">
            <motion.div {...reveal} className="mx-auto max-w-5xl">
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                Gallery
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl">
                From the day
              </h2>
              <p className="mt-4 text-sm text-muted sm:text-base">
                Select any photo to view it full screen — use the arrow keys to move
                between shots, Escape to close.
              </p>

              <div className="mt-10">
                <NewsGallery images={gallery} title={title} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          More updates
      --------------------------------------------------------------- */}
      {others.length > 0 && (
        <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[30rem] w-[36rem] rounded-full bg-navy/10 blur-[150px]"
          />

          <div className="shell">
            <motion.div {...reveal} className="mx-auto max-w-5xl">
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                More updates
              </span>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {others.map((other) => (
                  <article
                    key={other.slug}
                    className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={other.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        style={{ objectPosition: other.focus }}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full border border-white/12 bg-ink-deep/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber backdrop-blur-md">
                        {other.category}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
                      <time
                        dateTime={other.date}
                        className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-dim"
                      >
                        <span className="h-1 w-1 rounded-full bg-amber" />
                        {formatNewsDate(other.date)}
                      </time>

                      <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400 sm:text-xl">
                        {other.title}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {other.excerpt}
                      </p>

                      <Link
                        href={`/news/${other.slug}`}
                        /* Stretched over the whole card — one anchor, no nesting. */
                        className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-amber transition-colors duration-300 after:absolute after:inset-0 hover:text-amber-400"
                      >
                        Read more
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                        <span className="sr-only"> about {other.title}</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
