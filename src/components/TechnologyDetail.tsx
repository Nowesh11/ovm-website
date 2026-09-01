"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Anchor, Blocks, Cable, ChevronRight, Layers, MapPin, Radar, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import CatalogueButton from "@/components/CatalogueButton";
import type { TechIconKey, Technology } from "@/data/technologies";

/* Resolved here rather than in the data module, so `technologies.ts` stays
   plain data that can cross the server/client boundary. */
const ICONS: Record<TechIconKey, LucideIcon> = {
  anchor: Anchor,
  cable: Cable,
  layers: Layers,
  blocks: Blocks,
  shield: ShieldCheck,
  activity: Activity,
  radar: Radar,
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const gridRise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE },
};

export default function TechnologyDetail({ tech }: { tech: Technology }) {
  const {
    name,
    icon,
    heroImage,
    summary,
    types,
    components,
    galleryImages,
    projects,
    catalogueUrl,
  } = tech;
  const Icon = ICONS[icon];

  /* 1 part gets a single wide card; 2-3 fill the row; 4+ run four across. */
  const componentColumns =
    components.length === 1
      ? "max-w-sm grid-cols-1"
      : components.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : components.length === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — photo where we have one, otherwise a grid/glow panel with
          the technology's icon so nothing renders as a broken image.
      --------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[60svh] flex-col overflow-hidden">
        {heroImage ? (
          <>
            <Image
              src={heroImage}
              alt={name}
              fill
              preload
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-deep via-ink/70 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_0%_100%,rgba(6,10,20,0.94)_0%,rgba(10,15,28,0.62)_38%,transparent_72%)]" />
              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
              <div className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-navy/20 blur-[120px]" />
            </div>
          </>
        ) : (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-ink to-ink" />
            <div className="bg-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(75%_70%_at_50%_35%,black,transparent)]" />
            <div className="absolute -top-24 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-navy/18 blur-[140px]" />
            <div className="absolute -bottom-32 right-1/4 h-[24rem] w-[24rem] rounded-full bg-amber/10 blur-[130px]" />
            {/* Oversized icon standing in for the missing photograph */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-40 w-40 items-center justify-center rounded-[2rem] border border-line bg-surface/40 backdrop-blur-sm sm:h-52 sm:w-52">
                <span className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-navy-400/25 to-amber/20 blur-[30px]" />
                <Icon
                  className="relative h-20 w-20 text-amber/85 sm:h-24 sm:w-24"
                  strokeWidth={1.2}
                />
              </span>
            </div>
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="shell relative flex flex-1 flex-col justify-end pb-16 pt-32 sm:pb-20"
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
              <li>
                <Link
                  href="/#technologies"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  OVM Technologies
                </Link>
              </li>
              <li aria-hidden className="text-muted-dim">
                <ChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-white/90">
                {name}
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber backdrop-blur-md">
              <Icon size={14} strokeWidth={2} />
              OVM Technologies
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 max-w-4xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            {name}
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {summary}
          </motion.p>

          {catalogueUrl && (
            <motion.div variants={rise} className="mt-9">
              <CatalogueButton href={catalogueUrl} />
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Types
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px]"
        />

        <div className="shell">
          <motion.div {...reveal}>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              Types
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
              Systems we supply
            </h2>
          </motion.div>

          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {types.map(({ name: typeName, desc }) => (
              <motion.article
                key={typeName}
                variants={gridRise}
                className="group relative overflow-hidden rounded-[16px] border border-line bg-surface p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:bg-surface-2 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
              >
                <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-90" />

                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-amber/20 via-surface-2 to-navy/30 text-amber shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <Icon size={19} strokeWidth={1.9} />
                  </span>

                  <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400">
                    {typeName}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Project photography, in the dark full-bleed treatment. Product
              shots live in "System Supply" below instead. */}
          {galleryImages.length > 0 && (
            <motion.div
              {...reveal}
              className={`mt-12 grid gap-5 ${
                galleryImages.length === 1
                  ? "max-w-3xl grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {galleryImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-line bg-surface"
                >
                  <Image
                    src={src}
                    alt={`${name} — OVM project photography`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/45 to-transparent" />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          System supply — the parts list. Reads as a spec sheet rather than
          the editorial cards above: numbered, tightly gridded, and each
          product shot on the white plate these studio images need.
          Skipped entirely where we have no component photography.
      --------------------------------------------------------------- */}
      {components.length > 0 && (
        <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[26rem] w-[30rem] rounded-full bg-navy/10 blur-[150px]"
          />

          <div className="shell">
            <motion.div {...reveal}>
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                System Supply
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                Components we supply
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                The individual parts that make up a complete {name.toLowerCase()}{" "}
                installation.
              </p>
            </motion.div>

            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              className={`mt-12 grid gap-5 ${componentColumns}`}
            >
              {components.map(({ name: partName, image, desc }, i) => (
                <motion.figure
                  key={image}
                  variants={gridRise}
                  className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)]"
                >
                  {/* Studio product shots are cut out on white, so they need a
                      light plate — the dark card would swallow them. */}
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={image}
                      alt={`${partName} — OVM ${name}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-ink-deep/80 px-2 py-1 font-mono text-[10px] font-semibold tabular-nums tracking-[0.1em] text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <figcaption className="flex flex-1 flex-col border-t border-line px-5 py-4">
                    <h3 className="font-display text-sm font-bold leading-snug tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-amber-400">
                      {partName}
                    </h3>
                    {desc && (
                      <p className="mt-2 text-xs leading-relaxed text-muted">{desc}</p>
                    )}
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Reference projects
      --------------------------------------------------------------- */}
      {projects.length > 0 && (
        <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[30rem] w-[36rem] rounded-full bg-navy/10 blur-[150px]"
          />

          <div className="shell">
            <motion.div {...reveal}>
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                Track Record
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                Reference Projects
              </h2>
            </motion.div>

            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {projects.map(({ name: projectName, location, detail }) => (
                <motion.article
                  key={`${projectName}-${location}`}
                  variants={gridRise}
                  className="group relative overflow-hidden rounded-[16px] border border-line bg-surface p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:bg-surface-2 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
                >
                  <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-90" />

                  <div className="relative">
                    <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400">
                      {projectName}
                    </h3>

                    <div className="mt-2.5 flex items-center gap-2 text-sm text-muted">
                      <MapPin size={14} className="shrink-0 text-amber" />
                      <span>{location}</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">{detail}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
