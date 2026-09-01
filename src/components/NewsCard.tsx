"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { formatNewsDate } from "@/data/news";
import type { NewsItem } from "@/data/news";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Staggered by the parent grid — see `newsGridContainer` below. */
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Parent variant that staggers a grid of `NewsCard`s. */
export const newsGridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

/* One teaser card, shared by the homepage "Latest News" section and the
   /news index so both stay visually identical. */
export default function NewsCard({
  item: { slug, title, category, date, excerpt, image, focus },
  sizes = "(min-width: 640px) 50vw, 100vw",
}: {
  item: NewsItem;
  /** Overridden by the /news index, where the grid runs three across. */
  sizes?: string;
}) {
  return (
    <motion.article
      variants={rise}
      className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes}
          style={{ objectPosition: focus }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Blends the photo into the card body instead of a hard edge */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
        <span className="pointer-events-none absolute inset-0 bg-ink/20 transition-opacity duration-400 group-hover:opacity-0" />

        <span className="absolute left-5 top-5 rounded-full border border-white/12 bg-ink-deep/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber backdrop-blur-md">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
        <time
          dateTime={date}
          className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-dim"
        >
          <span className="h-1 w-1 rounded-full bg-amber" />
          {formatNewsDate(date)}
        </time>

        <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400 sm:text-xl">
          {title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{excerpt}</p>

        <Link
          href={`/news/${slug}`}
          /* `after:absolute after:inset-0` stretches this single anchor
             over the whole card, so the card is clickable without
             nesting interactive elements inside one another. */
          className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-amber transition-colors duration-300 after:absolute after:inset-0 hover:text-amber-400"
        >
          Read more
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
          <span className="sr-only"> about {title}</span>
        </Link>
      </div>
    </motion.article>
  );
}
