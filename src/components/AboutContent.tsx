"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

import CatalogueButton from "@/components/CatalogueButton";

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

const INTRO = [
  "Founded in 1966, OVM has grown to become a leading specialist in prestressing technology and advanced construction techniques. With over five decades of expertise, we have earned a global reputation for reliability, professionalism, and technological innovation in infrastructure development.",
  "Since expanding into Malaysia in 2015 and formally establishing OVM Prestressing Technology (M) Sdn. Bhd. in 2023, OVM has become a key partner in the country's infrastructure development.",
];

type Expertise = {
  name: string;
  href: string;
  image: string;
  description: string;
};

const EXPERTISE: Expertise[] = [
  {
    name: "Post-Tensioning Systems",
    href: "/technologies/post-tensioning-systems",
    image: "/technologies/post-tensioning-hero-algeria.jpg",
    description:
      "OVM designs, manufactures, and installs advanced post-tensioning systems that meet international standards, ensuring enhanced durability and performance for bridges, high-rise buildings, solar farms, wind farms, and large-scale civil structures.",
  },
  {
    name: "Cable Systems",
    href: "/technologies/cable-systems",
    image: "/technologies/cable-systems-hero-archbridge.jpg",
    description:
      "OVM provides high-performance cable systems designed for bridges, buildings, and special structures, complying with international standards to ensure optimal load distribution, structural stability, and long-term performance.",
  },
  {
    name: "Bearings & Expansion Joints",
    href: "/technologies/bearing",
    image: "/technologies/bearing-anti-seismic-hero.jpg",
    description:
      "OVM provides high-quality bearings designed to accommodate structural movements, ensure load transfer, and enhance the durability of bridges and buildings, alongside durable expansion joints designed for seamless traffic flow and long-term performance.",
  },
  {
    name: "Structural Health Monitoring",
    /* No dedicated technology page for monitoring yet — points at the
       homepage technologies section. */
    href: "/#technologies",
    image: "/technologies/cable-systems-night-bridge.jpg",
    description:
      "Structural health monitoring with live sensor data and load analytics, keeping watch over cable force, deflection and temperature across the asset lifecycle.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero
      --------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[62svh] flex-col overflow-hidden">
        <Image
          src="/hero.jpeg"
          alt="Cable-stayed bridge under construction at sunset"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-center"
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
                About
              </li>
            </ol>
          </motion.nav>

          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
              <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
              About OVM
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 max-w-4xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            Global leader in prestressing technology
          </motion.h1>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Intro
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px]"
        />
        <div className="shell">
          <motion.div {...reveal} className="mx-auto max-w-3xl">
            {INTRO.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-6 text-base leading-[1.85] text-muted last:mb-0 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------
   Core of expertise — alternating image / text rows. Exported
   separately so the page can slot StatsSection between it and the
   intro without nesting sections.
--------------------------------------------------------------- */
export function AboutExpertise() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[30rem] rounded-full bg-navy/12 blur-[140px]" />
      </div>

      <div className="shell">
        <motion.div {...reveal} className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
            <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
            What we do
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
            Our core of expertise
          </h2>
        </motion.div>

        <motion.div {...reveal} className="mt-10">
          <CatalogueButton
            href="/catalogues/OVM-Engineering-Solutions-2024.pdf"
            label="View Full Engineering Solutions Catalogue"
          />
        </motion.div>

        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {EXPERTISE.map(({ name, href, image, description }, i) => (
            <motion.div
              key={name}
              {...reveal}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              {/* Every second row swaps sides on desktop; on mobile the
                  image always leads. */}
              <div
                className={`relative aspect-[16/11] overflow-hidden rounded-[18px] border border-line bg-surface ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/55 via-transparent to-transparent" />
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-3xl">
                  {name}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>

                <Link
                  href={href}
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber transition-colors duration-300 hover:text-amber-400"
                >
                  Explore {name}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
