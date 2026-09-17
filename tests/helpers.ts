import type { Page, ConsoleMessage } from "@playwright/test";

/** Slugs of every technology page, in menu order. */
export const TECH_SLUGS = [
  "post-tensioning-systems",
  "cable-systems",
  "bearing-expansion-joints-anti-seismic-device",
  "dampers",
  "structural-health-monitoring",
] as const;

/** Slugs of every equipment page, in sidebar order. /equipment lands on the first. */
export const EQUIPMENT_SLUGS = [
  "680t-hydraulic-gantry-crane",
  "large-diameter-wire-rope-tension-jack-system",
  "lzdj1000t-cable-supported-crane",
  "walking-incremental-launching-equipment",
  "tunnel-construction-equipment",
] as const;

/** Every image referenced by src/data/equipment.ts, sub-items included. */
export const EQUIPMENT_IMAGES = [
  "/equipment/680t-hydraulic-gantry-crane.png",
  "/equipment/large-diameter-wire-rope-tension-jack-system.png",
  "/equipment/lzdj1000t-cable-supported-crane.png",
  "/equipment/walking-incremental-launching-equipment.png",
  "/equipment/tunnel-arc-component-installation.png",
  "/equipment/tunnel-midpartition-wall-equipment.png",
] as const;

/** Mirrors src/data/technologies.ts for assertions that depend on content shape. */
export const TECH_EXPECTATIONS: Record<
  (typeof TECH_SLUGS)[number],
  {
    name: string;
    hasHeroImage: boolean;
    typeCount: number;
    projectCount: number;
    /** Project photography only — product shots are counted by componentCount. */
    galleryCount: number;
    componentCount: number;
    /** Cards in the "Technical Reference" section; 0 means it must not render. */
    diagramCount: number;
    /** Cards in the "Product Range" section, which carries the detailed
        per-system content sourced from OVM's own product documentation.
        0 means the section must not render. */
    subProductCount: number;
    /** Ticked items in the "Key Features" band; 0 means it must not render. */
    featureCount: number;
    /** Cards in "Equipment & Service"; 0 means it must not render. */
    equipmentCount: number;
    /** True where the page carries a Standards & Compliance section. */
    hasStandards: boolean;
    /** Product-line sections on a combined page, in order. Counts above are
        then totals across every line. */
    groups?: readonly {
      id: string;
      name: string;
      typeCount: number;
      componentCount: number;
      subProductCount: number;
    }[];
  }
> = {
  "post-tensioning-systems": { name: "Post-Tensioning Systems", hasHeroImage: true, typeCount: 5, projectCount: 23, galleryCount: 2, componentCount: 6, diagramCount: 3, subProductCount: 5, featureCount: 6, equipmentCount: 15, hasStandards: true },
  "cable-systems": { name: "Cable Systems", hasHeroImage: true, typeCount: 5, projectCount: 9, galleryCount: 3, componentCount: 13, diagramCount: 5, subProductCount: 7, featureCount: 5, equipmentCount: 0, hasStandards: true },
  "bearing-expansion-joints-anti-seismic-device": {
    name: "Bearing, Expansion Joints & Anti-Seismic Device",
    hasHeroImage: true,
    /* Every bearing, joint and isolator is described in full by its group's
       Product Range cards, so no group carries a types grid. */
    typeCount: 0,
    projectCount: 8,
    galleryCount: 0,
    componentCount: 12,
    diagramCount: 0,
    subProductCount: 9,
    featureCount: 0,
    equipmentCount: 0,
    hasStandards: false,
    groups: [
      { id: "bearing", name: "Bearing", typeCount: 0, componentCount: 7, subProductCount: 3 },
      { id: "expansion-joints", name: "Expansion Joints", typeCount: 0, componentCount: 4, subProductCount: 4 },
      { id: "anti-seismic-device", name: "Anti-Seismic Device", typeCount: 0, componentCount: 1, subProductCount: 2 },
    ],
  },
  dampers: { name: "Dampers", hasHeroImage: false, typeCount: 3, projectCount: 0, galleryCount: 0, componentCount: 3, diagramCount: 0, subProductCount: 3, featureCount: 0, equipmentCount: 0, hasStandards: false },
  "structural-health-monitoring": { name: "Structural Health Monitoring", hasHeroImage: true, typeCount: 4, projectCount: 0, galleryCount: 1, componentCount: 0, diagramCount: 0, subProductCount: 0, featureCount: 0, equipmentCount: 0, hasStandards: false },
};

/** Every image referenced by a `components` entry, across all technologies. */
export const COMPONENT_IMAGES = [
  "/technologies/system-supply/pt-system-full-assembly.jpg",
  "/technologies/system-supply/pt-fiber-anchorage.jpg",
  "/technologies/system-supply/pt-carbon-fiber-anchorage.jpg",
  "/technologies/system-supply/pt-jack-type-ycw.jpg",
  "/technologies/diagrams/bearing-elastomeric-diagram.jpg",
  "/technologies/diagrams/bearing-pot-diagram.jpg",
  "/technologies/diagrams/bearing-spherical-diagram.jpg",
  "/technologies/diagrams/expansion-joint-diagram.jpg",
  "/technologies/diagrams/anti-seismic-lead-core-diagram.jpg",
  "/technologies/diagrams/damper-diagram.jpg",
  /* Added from the 2026 profile deck. */
  "/technologies/profile-2026/regular-pt-system.jpg",
  "/technologies/profile-2026/electrical-isolation-pt.jpg",
  "/technologies/profile-2026/bearing-photo-real.jpg",
  "/technologies/profile-2026/expansion-joint-photo-real.jpg",
  "/technologies/profile-2026/damper-photo-real.jpg",
  "/technologies/profile-2026/sus-main-cable.jpg",
  "/technologies/profile-2026/sus-anchor-blocks-system.jpg",
  "/technologies/profile-2026/sus-hanger.jpg",
  "/technologies/profile-2026/sus-saddle.jpg",
  "/technologies/profile-2026/sus-cable-splay-saddle.jpg",
  "/technologies/profile-2026/sus-cable-clamp.jpg",
  "/technologies/profile-2026/sus-cable-tightening-machine.jpg",
  "/technologies/profile-2026/sus-cable-supported-crane.jpg",
  "/technologies/profile-2026/sus-wire-winding-machine.jpg",
  /* The 2026 render set. */
  "/technologies/renders-2026/post-tensioning/pt-anchor-head-assembly.png",
  "/technologies/renders-2026/post-tensioning/pt-full-tendon-system.png",
  "/technologies/renders-2026/post-tensioning/pt-hydraulic-pump-unit-large.png",
  "/technologies/renders-2026/post-tensioning/pt-hydraulic-pump-unit-small.png",
  "/technologies/renders-2026/cable-systems/cable-anchor-head-labeled-diagram.png",
  "/technologies/renders-2026/cable-systems/cable-strand-cross-section.png",
  "/technologies/renders-2026/cable-systems/cable-full-assembly.png",
  "/technologies/renders-2026/cable-systems/cable-stressing-anchorage-closeup.png",
  "/technologies/renders-2026/bearing/bearing-elastomeric-laminated-square.png",
  "/technologies/renders-2026/bearing/bearing-elastomeric-laminated-round.png",
  "/technologies/renders-2026/bearing/bearing-load-testing-rig.png",
  "/technologies/renders-2026/expansion-joints/expansion-joint-deck-cutaway.png",
  "/technologies/renders-2026/expansion-joints/expansion-joint-modular-hardware.png",
  "/technologies/renders-2026/dampers/damper-cylindrical-gold-pair.png",
] as const;

/** Images referenced by a `diagrams` entry, keyed by the page they sit on. */
export const DIAGRAM_IMAGES_BY_TECHNOLOGY = {
  "cable-systems": [
    "/technologies/profile-2026/cable-anchorage-diagram.jpg",
    "/technologies/profile-2026/cable-saddle-diagram.jpg",
    "/technologies/profile-2026/cable-strand-crosssection.jpg",
    "/technologies/profile-2026/cable-anchor-plate-exploded.jpg",
    "/technologies/profile-2026/cable-galvanized-wire-diagram.jpg",
  ],
  /* Construction equipment, parked on the post-tensioning page for want of
     an equipment page of its own. */
  "post-tensioning-systems": [
    "/technologies/renders-2026/equipment/equipment-segment-launching-gantry.png",
    "/technologies/renders-2026/equipment/equipment-cable-tightening-machine.png",
    "/technologies/renders-2026/equipment/equipment-girder-lifting-gantry.png",
  ],
} as const;

/** Every image referenced by a `diagrams` entry, across all technologies. */
export const DIAGRAM_IMAGES = Object.values(DIAGRAM_IMAGES_BY_TECHNOLOGY).flat();

/** Projects added to the homepage carousel from the 2026 profile deck. */
export const PROFILE_2026_PROJECTS = [
  {
    slug: "tun-abdul-taib-mahmud-bridge",
    title: "Tun Abdul Taib Mahmud Bridge",
    image: "/technologies/profile-2026/tun-abdul-taib-mahmud-bridge.jpg",
  },
  {
    slug: "east-coast-rail-link-ecrl",
    title: "East Coast Rail Link (ECRL)",
    image: "/technologies/profile-2026/ecrl-aerial-pptx.jpg",
  },
] as const;

/**
 * Reference projects each technology page should list, mirroring the
 * `technologies` tags in src/data/projects.ts. The two omitted slugs
 * (dampers, structural-health-monitoring) have no
 * Malaysian project and must render no Reference Projects section at all.
 */
export const PROJECTS_BY_TECHNOLOGY = {
  "post-tensioning-systems": [
    "duke-3-highway",
    "dash-highway",
    "suke-highway",
    "sg-pulai-balanced-cantilever-bridge",
    "lrt-3",
    "ioi-city-mall-phase-2",
    "jalan-ums",
    "batang-rajang-bridge",
    "batang-igan-bridge",
    "rts-link",
    "east-coast-rail-link-ecrl",
    "bintulu-jepak-bridge",
    "tun-abdul-taib-mahmud-bridge",
    "batang-rambungan-bridge",
    "batang-lupar-1-bridge",
    "sejingkat-bridge",
    "kuts-red-line",
    "kuts-blue-line-2",
    "bandar-lawas-bridge",
    "tg-aru-ums-pedestrian-cyclist-bridge",
    "sungai-paku-bridge",
    "lrt-mutiara-line",
    "pan-borneo-highway-sabah",
  ],
  "cable-systems": [
    "batang-igan-bridge",
    "bintulu-jepak-bridge",
    "tun-abdul-taib-mahmud-bridge",
    "batang-rambungan-bridge",
    "batang-lupar-1-bridge",
    "sejingkat-bridge",
    "bandar-lawas-bridge",
    "tg-aru-ums-pedestrian-cyclist-bridge",
    "sungai-paku-bridge",
  ],
  "bearing-expansion-joints-anti-seismic-device": [
    "muara-lassa-bridge",
    "batang-igan-bridge",
    "batang-saribas-bridge-no-2",
    "east-coast-rail-link-ecrl",
    "bintulu-jepak-bridge",
    "tun-abdul-taib-mahmud-bridge",
    "batang-lupar-1-bridge",
    "sejingkat-bridge",
  ],
} as const;

/** Technology pages that must show no Reference Projects section. */
export const TECHNOLOGIES_WITHOUT_PROJECTS = [
  "dampers",
  "structural-health-monitoring",
] as const;

/** In listing order, mirroring src/data/careers.ts. */
export const JOB_TITLES = [
  "Business Development Engineer / Manager",
  "Site Supervisor",
  "Site Engineer",
  "Finance Manager (Engineering)",
] as const;

/** Newest first, mirroring the order in src/data/news.ts. */
export const NEWS_SLUGS = [
  "greener-coastline-mangrove-planting",
  "easec19-platinum-sponsor",
  "sejingkat-bridge-p7-closure",
] as const;

/**
 * Collects real page errors. Next's dev overlay and the image-optimizer emit
 * advisory warnings that are not defects, so they are filtered out.
 */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (/favicon|Download the React DevTools|Largest Contentful Paint/i.test(text)) return;
    errors.push(text);
  });

  page.on("pageerror", (err) => errors.push(err.message));

  return errors;
}

/** True when the image at `selector` decoded successfully. */
export async function imageLoaded(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const img = document.querySelector(sel) as HTMLImageElement | null;
    return !!img && img.complete && img.naturalWidth > 0;
  }, selector);
}

/**
 * Waits for every <img> currently in the DOM to settle. Lazy images below the
 * fold never fire `load` until scrolled into view, so each wait is capped —
 * otherwise this blocks until the test times out.
 */
export async function waitForImages(page: Page, timeoutMs = 5000) {
  await page.evaluate(async (timeout) => {
    await Promise.all(
      [...document.images]
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((res) => {
              const done = () => res(null);
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
              setTimeout(done, timeout);
            }),
        ),
    );
  }, timeoutMs);
}

/** Scrolls to the bottom in steps so lazy images and scroll-reveals trigger. */
export async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
  });
}

/** Counts images that finished loading but have zero intrinsic width. */
export async function brokenImages(page: Page) {
  return page.evaluate(() =>
    [...document.images]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  );
}
