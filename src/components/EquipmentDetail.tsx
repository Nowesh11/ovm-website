"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";

import { equipmentItems } from "@/data/equipment";
import type { EquipmentItem, EquipmentSubItem } from "@/data/equipment";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: EASE },
};

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.09 } },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ---------------------------------------------------------------
   Shared pieces
--------------------------------------------------------------- */

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-4">
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="flex gap-3.5 text-sm leading-relaxed text-muted sm:text-[0.95rem]"
        >
          {/* Same amber dot the Navbar and Footer menus use, nudged down onto
              the first line's optical centre. */}
          <span
            aria-hidden
            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

/* CAD renders and studio shots, all cut out on white — they need the light
   plate, and `contain` so nothing is cropped from a wide elevation drawing. */
function EquipmentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-line bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-contain p-5"
      />
    </div>
  );
}

/* Footage of the unit exists but is not on the site yet, so the page shows a
   placeholder rather than a player pointed at a missing file. */
function VideoPlaceholder({ name }: { name: string }) {
  return (
    <div className="mt-5 flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-[14px] border border-line bg-ink-deep">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber/35 bg-amber/10 text-amber">
        <Play size={22} strokeWidth={1.8} fill="currentColor" className="translate-x-0.5" />
      </span>
      <p className="text-sm font-medium text-muted">Video coming soon</p>
      <span className="sr-only">Footage of the {name} is not yet available.</span>
    </div>
  );
}

function SubItemBlock({ subItem, index }: { subItem: EquipmentSubItem; index: number }) {
  return (
    <motion.section
      {...reveal}
      className={index > 0 ? "mt-12 border-t border-line pt-12 sm:mt-14 sm:pt-14" : "mt-10"}
    >
      <h2 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
        <span className="mr-3 font-mono text-sm font-semibold tabular-nums text-amber">
          {String(index + 1).padStart(2, "0")}
        </span>
        {subItem.name}
      </h2>

      <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:grid-cols-2 lg:gap-10">
        <EquipmentImage src={subItem.image} alt={`${subItem.name} — OVM equipment`} />
        <BulletList bullets={subItem.bullets} />
      </div>
    </motion.section>
  );
}

/* ---------------------------------------------------------------
   Sidebar navigation — the section's index. A sticky column on desktop,
   collapsed into a dropdown above the content on mobile, where a fixed
   280px rail would eat the viewport.
--------------------------------------------------------------- */

function SidebarLinks({
  activeSlug,
  onNavigate,
}: {
  activeSlug: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {equipmentItems.map((entry) => {
        const active = entry.slug === activeSlug;
        return (
          <li key={entry.slug}>
            <Link
              href={`/equipment/${entry.slug}`}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={
                "group flex items-start gap-3 rounded-xl border-l-2 py-2.5 pl-3.5 pr-3 text-sm leading-snug transition-all duration-300 " +
                (active
                  ? "border-amber bg-amber/10 font-semibold text-white"
                  : "border-transparent text-muted hover:border-navy-300/60 hover:bg-surface-2 hover:text-white")
              }
            >
              <span
                aria-hidden
                className={
                  "mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 " +
                  (active ? "bg-amber" : "bg-line group-hover:bg-amber/70")
                }
              />
              {entry.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ContactButton({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/contact"
      onClick={onNavigate}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber to-amber-400 px-5 py-3 text-sm font-semibold text-ink shadow-[0_12px_34px_-12px_rgba(245,148,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(245,148,31,0.85)]"
    >
      Contact Us
      <ArrowRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

function MobileSelector({ current }: { current: EquipmentItem }) {
  const [open, setOpen] = useState(false);

  /* Escape closes the list, matching the Navbar's menus. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mb-9 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5 text-left transition-colors duration-300 hover:border-amber/45"
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-amber">
            Equipment
          </span>
          <span className="mt-1 block truncate text-sm font-semibold text-white">
            {current.name}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={
            "shrink-0 text-muted transition-transform duration-300 " +
            (open ? "rotate-180 text-amber" : "")
          }
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <nav aria-label="Equipment" className="mt-2 rounded-xl border border-line bg-surface p-2">
              <SidebarLinks activeSlug={current.slug} onNavigate={() => setOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------
   Page
--------------------------------------------------------------- */

export default function EquipmentDetail({ item }: { item: EquipmentItem }) {
  const { name, image, intro, bullets, subItems, hasVideo, comingSoon } = item;

  return (
    /* `overflow-clip`, not `overflow-hidden` — hidden would make this section a
       scroll container and the sticky sidebar below would never pin. */
    <section className="relative overflow-clip pb-24 pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[30rem] w-[34rem] rounded-full bg-navy/12 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[26rem] w-[30rem] rounded-full bg-amber/[0.06] blur-[150px]"
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
          {/* -------- Sidebar (desktop) -------- */}
          <motion.aside
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            /* top-28 clears the fixed 80px navbar once the column pins. */
            className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
          >
            <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-white">
              Equipment
            </h2>
            <span
              aria-hidden
              className="mt-3 block h-px w-12 bg-gradient-to-r from-amber to-transparent"
            />

            <nav aria-label="Equipment" className="mt-5">
              <SidebarLinks activeSlug={item.slug} />
            </nav>

            <div className="mt-7">
              <ContactButton />
            </div>
          </motion.aside>

          {/* -------- Content -------- */}
          <div className="min-w-0">
            <MobileSelector current={item} />

            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={rise}>
                <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                  <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                  Equipment
                </span>
              </motion.div>

              <motion.h1
                variants={rise}
                className="mt-5 font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]"
              >
                {name}
                {comingSoon && (
                  <span className="ml-3 inline-block -translate-y-1 rounded-full border border-line bg-surface-2 px-3 py-1 align-middle text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Coming soon
                  </span>
                )}
              </motion.h1>

              {intro && (
                <motion.p
                  variants={rise}
                  className="mt-6 max-w-3xl text-base leading-relaxed text-muted"
                >
                  {intro}
                </motion.p>
              )}
            </motion.div>

            {subItems ? (
              subItems.map((subItem, i) => (
                <SubItemBlock key={subItem.name} subItem={subItem} index={i} />
              ))
            ) : (
              <motion.div
                {...reveal}
                className="mt-9 grid grid-cols-1 items-start gap-7 lg:grid-cols-2 lg:gap-10"
              >
                <div>
                  {image && <EquipmentImage src={image} alt={`${name} — OVM equipment`} />}
                  {hasVideo && <VideoPlaceholder name={name} />}
                </div>
                {bullets && <BulletList bullets={bullets} />}
              </motion.div>
            )}

            {/* The sidebar's call to action, re-sited for the collapsed layout. */}
            <div className="mt-12 lg:hidden">
              <ContactButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
