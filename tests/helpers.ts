import type { Page, ConsoleMessage } from "@playwright/test";

/** Slugs of every technology page, in menu order. */
export const TECH_SLUGS = [
  "post-tensioning-systems",
  "cable-systems",
  "bearing",
  "expansion-joints",
  "anti-seismic-device",
  "dampers",
  "structural-health-monitoring",
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
  }
> = {
  "post-tensioning-systems": { name: "Post-Tensioning Systems", hasHeroImage: true, typeCount: 5, projectCount: 23, galleryCount: 2, componentCount: 10, diagramCount: 3 },
  "cable-systems": { name: "Cable Systems", hasHeroImage: true, typeCount: 5, projectCount: 9, galleryCount: 3, componentCount: 13, diagramCount: 5 },
  bearing: { name: "Bearing", hasHeroImage: true, typeCount: 3, projectCount: 3, galleryCount: 0, componentCount: 7, diagramCount: 0 },
  "expansion-joints": { name: "Expansion Joints", hasHeroImage: false, typeCount: 3, projectCount: 8, galleryCount: 0, componentCount: 4, diagramCount: 0 },
  "anti-seismic-device": { name: "Anti-Seismic Device", hasHeroImage: true, typeCount: 1, projectCount: 0, galleryCount: 0, componentCount: 1, diagramCount: 0 },
  dampers: { name: "Dampers", hasHeroImage: false, typeCount: 2, projectCount: 0, galleryCount: 0, componentCount: 3, diagramCount: 0 },
  "structural-health-monitoring": { name: "Structural Health Monitoring", hasHeroImage: true, typeCount: 4, projectCount: 0, galleryCount: 1, componentCount: 0, diagramCount: 0 },
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
 * `technologies` tags in src/data/projects.ts. The three omitted slugs
 * (anti-seismic-device, dampers, structural-health-monitoring) have no
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
  bearing: [
    "batang-igan-bridge",
    "batang-saribas-bridge-no-2",
    "east-coast-rail-link-ecrl",
  ],
  "expansion-joints": [
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
  "anti-seismic-device",
  "dampers",
  "structural-health-monitoring",
] as const;

/** Catalogue PDFs offered as downloads, keyed by the page that offers them. */
export const CATALOGUE_DOWNLOADS = {
  "/technologies/post-tensioning-systems": "/catalogues/OVM-Post-Tensioning-System-2025.pdf",
  "/technologies/cable-systems": "/catalogues/OVM250-OVMAT-Cable-System-2025.pdf",
  "/about": "/catalogues/OVM-Engineering-Solutions-2024.pdf",
} as const;

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
 * Scrolls past the hero so `FloatingCatalogueButton` reveals itself, then
 * waits out its entrance animation. Safe to call on pages that have no
 * catalogue — it just scrolls.
 */
export async function revealFloatingButton(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(700);
}

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
