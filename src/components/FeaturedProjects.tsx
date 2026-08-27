"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

/* ---------------------------------------------------------------
   PLACEHOLDER CONTENT — swap for real project photography.
   Drop images into /public/projects/ and point `image` at them
   (e.g. "/projects/penang-second-bridge.jpg"); `focus` is the crop anchor.
--------------------------------------------------------------- */
type Project = {
  slug: string;
  name: string;
  location: string;
  image: string;
  focus: string;
};

const PROJECTS: Project[] = [
  {
    slug: "sultan-abdul-halim-muadzam-shah-bridge",
    name: "Sultan Abdul Halim Muadzam Shah Bridge",
    location: "Batu Kawan, Penang",
    image: "/hero.jpeg",
    focus: "50% 58%",
  },
  {
    slug: "batang-lupar-bridge",
    name: "Batang Lupar Bridge",
    location: "Sri Aman, Sarawak",
    image: "/hero.jpeg",
    focus: "22% 50%",
  },
  {
    slug: "suke-elevated-expressway",
    name: "SUKE Elevated Expressway",
    location: "Kuala Lumpur",
    image: "/hero.jpeg",
    focus: "78% 46%",
  },
  {
    slug: "pan-borneo-highway-viaducts",
    name: "Pan Borneo Highway Viaducts",
    location: "Kuching, Sarawak",
    image: "/hero.jpeg",
    focus: "38% 70%",
  },
  {
    slug: "pulau-indah-bridge",
    name: "Pulau Indah Bridge",
    location: "Port Klang, Selangor",
    image: "/hero.jpeg",
    focus: "64% 66%",
  },
  {
    slug: "sungai-kelantan-crossing",
    name: "Sungai Kelantan Crossing",
    location: "Kota Bharu, Kelantan",
    image: "/hero.jpeg",
    focus: "50% 34%",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 h-[28rem] w-[32rem] rounded-full bg-amber/8 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[30rem] rounded-full bg-navy/14 blur-[140px]" />
      </div>

      <div className="shell">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
            <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
            Selected work
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
            Reference Projects in Malaysia
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Crossings, viaducts and expressways carrying OVM post-tensioning, stay-cable
            and bearing systems.
          </p>
        </motion.div>

        {/* Project tiles */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {PROJECTS.map(({ slug, name, location, image, focus }) => (
            <motion.a
              key={slug}
              href={`/projects/${slug}`}
              variants={rise}
              className="group relative block aspect-[4/3] overflow-hidden rounded-[16px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:shadow-[0_30px_65px_-26px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
            >
              <Image
                src={image}
                alt={`${name}, ${location}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectPosition: focus }}
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />

              {/* Resting scrim — keeps the name legible before any hover, which
                  matters on touch devices where hover never fires. */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/25 to-transparent" />

              {/* Hover scrim — rises from the bottom to deepen the tile. */}
              <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-50 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-100" />

              {/* Amber hairline sweeping the bottom edge */}
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white sm:text-xl">
                    {name}
                  </h3>

                  {/* Location slides up and fades in on hover */}
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100 lg:translate-y-3">
                    <MapPin size={14} className="shrink-0 text-amber" />
                    <span className="truncate">{location}</span>
                  </div>
                </div>
              </div>

              {/* Corner affordance */}
              <span className="pointer-events-none absolute right-5 top-5 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full border border-white/15 bg-ink-deep/60 text-white opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={17} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
