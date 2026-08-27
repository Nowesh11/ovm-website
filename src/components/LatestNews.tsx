"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------------------------------------------------------------
   PLACEHOLDER CONTENT — swap for real articles.
   Drop real photos into /public/news/ and point `image` at them
   (e.g. "/news/batang-lupar.jpg"); `focus` sets the crop anchor.
--------------------------------------------------------------- */
type Article = {
  slug: string;
  title: string;
  date: string; // ISO — formatted for display below
  excerpt: string;
  image: string;
  focus: string;
};

const ARTICLES: Article[] = [
  {
    slug: "batang-lupar-stay-cables-complete",
    title: "Final stay cables tensioned on the Batang Lupar crossing",
    date: "2025-11-18",
    excerpt:
      "The last of 176 OVM stay cables has been installed and stressed, closing the main span of Sarawak's longest cable-stayed bridge.",
    image: "/hero.jpeg",
    focus: "50% 62%",
  },
  {
    slug: "ovm-anchorage-eta-certification",
    title: "OVM anchorage system earns European Technical Assessment",
    date: "2025-09-04",
    excerpt:
      "Our OVM.M15 multi-strand anchorage has passed ETA fatigue and load-transfer testing, opening the system to EU infrastructure tenders.",
    image: "/hero.jpeg",
    focus: "20% 45%",
  },
  {
    slug: "structural-health-monitoring-goes-live",
    title: "Structural health monitoring goes live on three viaducts",
    date: "2025-07-22",
    excerpt:
      "Over 400 sensors now stream cable force, deflection and temperature data from Klang Valley viaducts into OVM's monitoring platform.",
    image: "/hero.jpeg",
    focus: "80% 55%",
  },
];

/* Fixed locale + UTC so server and client render the same string. */
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const formatDate = (iso: string) => DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function LatestNews() {
  return (
    <section id="news" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[30rem] w-[36rem] rounded-full bg-navy/10 blur-[150px]"
      />

      <div className="shell">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Newsroom
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
              Latest News
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Project milestones, certifications and engineering notes from across the
              OVM network.
            </p>
          </div>
        </motion.div>

        {/* Article cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-4 lg:mt-16 lg:grid-cols-3"
        >
          {ARTICLES.map(({ slug, title, date, excerpt, image, focus }, i) => (
            <motion.article
              key={slug}
              variants={rise}
              /* With 3 cards in a 4-col tablet grid, the third is centred
                 rather than left-hung; reset to normal flow at lg. */
              className={`group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)] sm:col-span-2 lg:col-span-1 ${
                i === 2 ? "sm:col-start-2 lg:col-start-auto" : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: focus }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* Blends the photo into the card body instead of a hard edge */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                <span className="pointer-events-none absolute inset-0 bg-ink/20 transition-opacity duration-400 group-hover:opacity-0" />
              </div>

              {/* Body */}
              <div className="relative flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
                <time
                  dateTime={date}
                  className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-dim"
                >
                  <span className="h-1 w-1 rounded-full bg-amber" />
                  {formatDate(date)}
                </time>

                <h3 className="mt-3.5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400 sm:text-xl">
                  {title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{excerpt}</p>

                <Link
                  href={`/news/${slug}`}
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-amber transition-colors duration-300 hover:text-amber-400"
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
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/news"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-line bg-surface/50 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-400 hover:-translate-y-0.5 hover:border-amber/55 hover:shadow-[0_18px_45px_-16px_rgba(245,148,31,0.5)]"
          >
            {/* Navy → amber wash that fills in from the left on hover */}
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/40 to-amber/25 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            View all news
            <ArrowRight
              size={16}
              className="text-amber transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
