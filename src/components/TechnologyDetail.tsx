"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Anchor,
  ArrowRight,
  Award,
  Blocks,
  Cable,
  Check,
  ChevronRight,
  FileCheck2,
  Layers,
  MapPin,
  Radar,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { projectAnchorId, projectsForTechnology } from "@/data/projects";
import type {
  TechIconKey,
  Technology,
  TechnologyComponent,
  TechnologyEquipment,
  TechnologyStandard,
  TechnologySubProduct,
  TechnologyType,
} from "@/data/technologies";

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
    slug,
    name,
    icon,
    heroImage,
    summary,
    types,
    components,
    diagrams,
    groups,
    galleryImages,
    features,
    standards,
    authoredStandards,
    certifications,
    subProducts,
    equipment,
    services,
  } = tech;
  const Icon = ICONS[icon];

  /* Pulled from the one project list rather than stored per technology, so
     the homepage carousel and these cards can never drift apart. */
  const referenceProjects = projectsForTechnology(slug);

  /* Hero jump nav. A combined page advertises its product lines; a single
     line advertises the deep sections instead. Built from what actually
     rendered, so a link can never point at a section that is not there. */
  const jumpLinks: { id: string; label: string; icon: LucideIcon }[] = [
    ...(groups?.map((group) => ({
      id: group.id,
      label: group.name,
      icon: ICONS[group.icon],
    })) ?? []),
    ...(!groups && subProducts?.length
      ? [{ id: "product-range", label: "Product Range", icon: Layers }]
      : []),
    ...(equipment?.length
      ? [{ id: "equipment", label: "Equipment", icon: Settings2 }]
      : []),
    ...(standards?.length || authoredStandards?.length || certifications?.length
      ? [{ id: "standards", label: "Standards", icon: FileCheck2 }]
      : []),
  ];

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

          {jumpLinks.length > 0 && (
            <motion.nav
              variants={rise}
              aria-label="Sections on this page"
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {jumpLinks.map(({ id, label, icon: JumpIcon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-amber/50 hover:text-amber-400"
                >
                  <JumpIcon size={15} strokeWidth={1.9} className="text-amber" />
                  {label}
                </a>
              ))}
            </motion.nav>
          )}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------
          Key features — the headline capabilities of the line, straight
          from OVM's product documentation.
      --------------------------------------------------------------- */}
      {features && features.length > 0 && (
        <section className="relative overflow-hidden border-b border-line py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-0 -z-10 h-[26rem] w-[30rem] rounded-full bg-amber/[0.06] blur-[150px]"
          />

          <div className="shell">
            <SectionHeading
              eyebrow="Key Features"
              title={`Why specify OVM ${name.toLowerCase()}`}
            />
            <FeatureList items={features} />
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Types
      --------------------------------------------------------------- */}
      {!groups && (types.length > 0 || galleryImages.length > 0) && (
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

            <TypeGrid types={types} Icon={Icon} />

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
      )}

      {/* ---------------------------------------------------------------
          Product range — the named systems within this line, each with its
          own features and the numbered part callouts from OVM's assembly
          drawings. The deepest technical content on the page.
      --------------------------------------------------------------- */}
      {subProducts && subProducts.length > 0 && (
        <section
          id="product-range"
          className="relative scroll-mt-20 overflow-hidden border-t border-line py-20 sm:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[30rem] w-[34rem] rounded-full bg-navy/12 blur-[150px]"
          />

          <div className="shell">
            <SectionHeading
              eyebrow="Product Range"
              title="The systems in detail"
              lead={`Each OVM ${name.toLowerCase()} variant, with its published features and the labelled components of its assembly.`}
            />
            <SubProductList subProducts={subProducts} />
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Product lines — a combined page gives each line its own section
          holding that line's types and parts together, so a reader never
          has to match a type up with its components further down.
      --------------------------------------------------------------- */}
      {groups?.map((group, i) => {
        const GroupIcon = ICONS[group.icon];

        return (
          <section
            key={group.id}
            id={group.id}
            className={`relative scroll-mt-20 overflow-hidden py-20 sm:py-24 ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute top-1/4 -z-10 h-[28rem] w-[32rem] rounded-full bg-navy/10 blur-[150px] ${
                i % 2 === 0 ? "-left-40" : "-right-40"
              }`}
            />

            <div className="shell">
              <motion.div {...reveal}>
                <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                  <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                  {String(i + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}
                </span>
                <h2 className="mt-5 flex items-center gap-4 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-amber/20 via-surface-2 to-navy/30 text-amber">
                    <GroupIcon size={20} strokeWidth={1.9} />
                  </span>
                  {group.name}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
                  {group.summary}
                </p>
              </motion.div>

              <TypeGrid types={group.types} Icon={GroupIcon} />

              {group.features && group.features.length > 0 && (
                <FeatureList items={group.features} />
              )}

              {group.subProducts && group.subProducts.length > 0 && (
                <SubProductList subProducts={group.subProducts} />
              )}

              {group.standards && group.standards.length > 0 && (
                <div className="mt-16">
                  <SectionHeading
                    as="h3"
                    eyebrow="Standards"
                    title={`${group.name} — design and manufacture`}
                  />
                  <StandardsGrid standards={group.standards} />
                </div>
              )}

              {group.certifications && group.certifications.length > 0 && (
                <div className="mt-12">
                  <CertificationList items={group.certifications} />
                </div>
              )}

              {group.components.length > 0 && (
                <>
                  <motion.div {...reveal} className="mt-16">
                    <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                      <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                      System Supply
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
                      {group.name} components
                    </h3>
                  </motion.div>

                  <ComponentGrid components={group.components} techName={group.name} />
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* ---------------------------------------------------------------
          Technical reference — labelled line drawings. Same light-plate
          treatment as System Supply below, but these are drawings rather
          than parts we sell, so they get their own section.
      --------------------------------------------------------------- */}
      {diagrams && diagrams.length > 0 && (
        <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[26rem] w-[30rem] rounded-full bg-navy/10 blur-[150px]"
          />

          <div className="shell">
            <motion.div {...reveal}>
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
                Technical Reference
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                How the system fits together
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                Assembly drawings and cross-sections from the OVM {name.toLowerCase()}{" "}
                engineering documentation.
              </p>
            </motion.div>

            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {diagrams.map(({ name: diagramName, image }) => (
                <motion.figure
                  key={image}
                  variants={gridRise}
                  className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)]"
                >
                  {/* Line art on white — `contain` so nothing is cropped out
                      of a drawing whose labels run to the edges. */}
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={image}
                      alt={`${diagramName} — OVM ${name} technical drawing`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <figcaption className="border-t border-line px-5 py-4">
                    <h3 className="font-display text-sm font-bold leading-snug tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-amber-400">
                      {diagramName}
                    </h3>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>
      )}

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

            <ComponentGrid components={components} techName={name} />
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Equipment — the plant OVM supplies to install, stress and grout
          the system, so a contractor can source the whole operation here.
      --------------------------------------------------------------- */}
      {equipment && equipment.length > 0 && (
        <section
          id="equipment"
          className="relative scroll-mt-20 overflow-hidden border-t border-line py-20 sm:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[26rem] w-[30rem] rounded-full bg-navy/10 blur-[150px]"
          />

          <div className="shell">
            <SectionHeading
              eyebrow="Equipment & Service"
              title="Plant for installation, stressing and grouting"
              lead="Jacks, pumps, swaging and grouting equipment supplied and supported by OVM alongside the system itself."
            />
            <EquipmentGrid equipment={equipment} />
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Standards, co-authored standards and certification.
      --------------------------------------------------------------- */}
      {((standards && standards.length > 0) ||
        (authoredStandards && authoredStandards.length > 0) ||
        (certifications && certifications.length > 0)) && (
        <section
          id="standards"
          className="relative scroll-mt-20 overflow-hidden border-t border-line py-20 sm:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[26rem] w-[30rem] rounded-full bg-amber/[0.05] blur-[150px]"
          />

          <div className="shell">
            {standards && standards.length > 0 && (
              <>
                <SectionHeading
                  eyebrow="Standards & Compliance"
                  title="Designed, tested and certified against"
                  lead={`OVM ${name.toLowerCase()} comply with the specifications and recommendations below.`}
                />
                <StandardsGrid standards={standards} />
              </>
            )}

            {authoredStandards && authoredStandards.length > 0 && (
              <div className={standards && standards.length > 0 ? "mt-16" : ""}>
                <SectionHeading
                  as="h3"
                  eyebrow="Standards We Wrote"
                  title="Standards OVM helped draft"
                  lead="OVM sits on the drafting committee for the national and industry standards that govern this system."
                />
                <StandardsGrid standards={authoredStandards} authored />
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div className="mt-16">
                <SectionHeading
                  as="h3"
                  eyebrow="Certification"
                  title="Approvals and test reports"
                />
                <CertificationList items={certifications} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Contracting scope — what OVM undertakes beyond supply.
      --------------------------------------------------------------- */}
      {services && services.length > 0 && (
        <section className="relative overflow-hidden border-t border-line py-20 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[26rem] w-[30rem] rounded-full bg-navy/10 blur-[150px]"
          />

          <div className="shell">
            <SectionHeading
              eyebrow="Construction Service"
              title="What OVM undertakes on site"
              lead="Beyond product supply, OVM works as a specialist contractor across the full scope below."
            />
            <ServiceList items={services} />
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          Reference projects — filtered out of the one project list in
          `data/projects.ts` by this technology's slug, so a project is
          described once and appears wherever it applies. Technologies none
          of the Malaysian projects used render nothing at all.
      --------------------------------------------------------------- */}
      {referenceProjects.length > 0 && (
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
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                Malaysian projects carrying OVM {name.toLowerCase()}.
              </p>
            </motion.div>

            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {referenceProjects.map(
                ({ slug, title, location, scope, image: projectImage }) => (
                  <motion.article
                    key={slug}
                    variants={gridRise}
                    className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:border-navy-300/45 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(79,143,214,0.14)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={projectImage}
                        alt={`${title}, ${location}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      {/* Blends the photo into the card body instead of a hard edge */}
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                    </div>

                    <div className="relative flex flex-1 flex-col p-6 pt-5">
                      <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-amber-400">
                        {title}
                      </h3>

                      <div className="mt-2.5 flex items-center gap-2 text-sm text-muted">
                        <MapPin size={14} className="shrink-0 text-amber" />
                        <span>{location}</span>
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                        {scope}
                      </p>

                      <Link
                        href={`/#${projectAnchorId(slug)}`}
                        /* Stretched over the card — one anchor, and the
                           homepage's ScrollToHash does the scrolling and
                           the highlight on arrival. */
                        className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-amber transition-colors duration-300 after:absolute after:inset-0 hover:text-amber-400"
                      >
                        See the project
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                        <span className="sr-only"> {title} on the homepage</span>
                      </Link>
                    </div>
                  </motion.article>
                ),
              )}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}

/* ------------------------------------------------------------------
   Shared section furniture. Every band below the hero opens with the
   same amber eyebrow rule and display heading, so the page reads as one
   document rather than a stack of unrelated blocks.
------------------------------------------------------------------ */
function SectionHeading({
  eyebrow,
  title,
  lead,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  as?: "h2" | "h3";
}) {
  const Title = as;

  return (
    <motion.div {...reveal}>
      <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
        <span className="h-px w-8 bg-gradient-to-r from-amber to-transparent" />
        {eyebrow}
      </span>
      <Title
        className={`mt-5 font-display font-bold leading-[1.15] tracking-[-0.03em] text-white ${
          as === "h2" ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
        }`}
      >
        {title}
      </Title>
      {lead && (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">{lead}</p>
      )}
    </motion.div>
  );
}

/** Ticked bullet list — used for every "features" block on the page. */
function FeatureList({ items, columns = true }: { items: string[]; columns?: boolean }) {
  return (
    <motion.ul
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`mt-10 grid gap-x-8 gap-y-4 ${
        columns ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {items.map((item) => (
        <motion.li key={item} variants={gridRise} className="flex gap-3.5">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber/30 bg-amber/10 text-amber">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className="text-sm leading-relaxed text-muted">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* Sub-systems within a line. Each card carries its own features and, where
   OVM publishes one, the numbered part callout from the assembly drawing —
   the numbering here matches the numbering on the drawing. */
function SubProductList({ subProducts }: { subProducts: TechnologySubProduct[] }) {
  return (
    <motion.div
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      /* Both this list and the types grid render <article> cards, so the
         suite needs a hook to tell them apart. */
      data-testid="sub-products"
      className="mt-12 flex flex-col gap-5"
    >
      {subProducts.map((sub, i) => (
        <motion.article
          key={sub.id}
          id={sub.id}
          variants={gridRise}
          className="group scroll-mt-24 overflow-hidden rounded-[18px] border border-line bg-surface transition-all duration-400 hover:border-navy-300/45 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.95)]"
        >
          <div className="border-b border-line bg-gradient-to-r from-surface-2 via-surface to-surface px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[11px] font-semibold tabular-nums tracking-[0.1em] text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-white sm:text-xl">
                {sub.name}
              </h3>
            </div>
            {sub.summary && (
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted">
                {sub.summary}
              </p>
            )}
          </div>

          {(sub.features || sub.assemblies || sub.applications) && (
            <div className="px-6 py-6 sm:px-8">
              {sub.features && (
                <ul className="flex flex-col gap-3">
                  {sub.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                      <span className="text-sm leading-relaxed text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sub.applications && (
                <div className={sub.features ? "mt-7" : ""}>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-dim">
                    Applications
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sub.applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs leading-relaxed text-muted"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {sub.assemblies && (
                <div
                  className={`grid gap-4 ${
                    sub.features || sub.applications ? "mt-7" : ""
                  } ${sub.assemblies.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}
                >
                  {sub.assemblies.map((assembly) => (
                    <div
                      key={assembly.name}
                      className="rounded-[12px] border border-line bg-ink-deep/40 p-5"
                    >
                      <h4 className="font-display text-sm font-bold leading-snug text-white">
                        {assembly.name}
                      </h4>

                      {assembly.parts && (
                        <ol className="mt-3.5 flex flex-col gap-1.5">
                          {assembly.parts.map((part, pi) => (
                            <li key={part} className="flex gap-2.5 text-xs text-muted">
                              <span className="font-mono tabular-nums text-amber/70">
                                {String(pi + 1).padStart(2, "0")}
                              </span>
                              <span className="leading-relaxed">{part}</span>
                            </li>
                          ))}
                        </ol>
                      )}

                      {assembly.notes && (
                        <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-3.5">
                          {assembly.notes.map((note) => (
                            <li
                              key={note}
                              className="text-[11px] leading-relaxed text-muted-dim"
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.article>
      ))}
    </motion.div>
  );
}

/* Compliance. `authored` marks the standards OVM sat on the drafting
   committee for, which is a stronger claim than conformance and so gets
   its own visual treatment. */
function StandardsGrid({
  standards,
  authored = false,
}: {
  standards: TechnologyStandard[];
  authored?: boolean;
}) {
  return (
    <motion.div
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {standards.map(({ code, title }) => (
        <motion.div
          key={code}
          variants={gridRise}
          className={`flex gap-3.5 rounded-[12px] border p-4 transition-colors duration-300 ${
            authored
              ? "border-amber/30 bg-amber/[0.06] hover:border-amber/55"
              : "border-line bg-surface hover:border-navy-300/45"
          }`}
        >
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
              authored ? "bg-amber/15 text-amber" : "bg-surface-2 text-amber/75"
            }`}
          >
            <FileCheck2 size={14} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold tracking-[0.02em] text-white">
              {code}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{title}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CertificationList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={gridRise}
          className="flex gap-3.5 rounded-[12px] border border-line bg-surface p-4 transition-colors duration-300 hover:border-amber/40"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber/12 text-amber">
            <Award size={14} strokeWidth={2} />
          </span>
          <span className="text-sm leading-relaxed text-muted">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function EquipmentGrid({ equipment }: { equipment: TechnologyEquipment[] }) {
  return (
    <motion.div
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {equipment.map(({ name, desc }) => (
        <motion.div
          key={name}
          variants={gridRise}
          className="group rounded-[14px] border border-line bg-surface p-5 transition-all duration-400 hover:-translate-y-1 hover:border-amber/40 hover:bg-surface-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-gradient-to-br from-amber/20 via-surface-2 to-navy/30 text-amber">
            <Settings2 size={16} strokeWidth={1.9} />
          </span>
          <h3 className="mt-4 font-display text-sm font-bold leading-snug text-white transition-colors duration-300 group-hover:text-amber-400">
            {name}
          </h3>
          {desc && <p className="mt-2 text-xs leading-relaxed text-muted">{desc}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}

function ServiceList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={gridRise}
          className="flex gap-3.5 border-b border-line pb-3"
        >
          <Wrench size={15} className="mt-0.5 shrink-0 text-amber" strokeWidth={1.9} />
          <span className="text-sm leading-relaxed text-muted">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function TypeGrid({ types, Icon }: { types: TechnologyType[]; Icon: LucideIcon }) {
  /* A group whose depth lives entirely in its sub-products carries no types;
     bail out rather than leaving the section's top margin behind. */
  if (types.length === 0) return null;

  return (
    <motion.div
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      data-testid="types-grid"
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
  );
}

/* 1 part gets a single wide card; 2 fill the row. Past that, prefer the
   column count that divides evenly, so the last row is never a lone
   orphan card — 6 and 9 parts run three across, 4 and 8 run four. */
const componentColumnsFor = (count: number) =>
  count === 1
    ? "max-w-sm grid-cols-1"
    : count === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : count % 4 === 0
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

function ComponentGrid({
  components,
  techName,
}: {
  components: TechnologyComponent[];
  techName: string;
}) {
  const columns = componentColumnsFor(components.length);

  return (
    <motion.div
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className={`mt-12 grid gap-5 ${columns}`}
    >
      {components.map(({ name: partName, image, desc, plate }, i) => (
        <motion.figure
          key={image}
          variants={gridRise}
          className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-all duration-400 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)]"
        >
          {/* Studio product shots are cut out on white and need a
              light plate — the dark card would swallow them. The
              profile-deck renders bring their own dark ground, so
              they fill a dark plate instead of floating on white. */}
          <div
            className={`relative aspect-[4/3] ${
              plate === "dark" ? "bg-ink-deep" : "bg-white"
            }`}
          >
            <Image
              src={image}
              alt={`${partName} — OVM ${techName}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                plate === "dark" ? "object-cover" : "object-contain p-5"
              }`}
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
  );
}
