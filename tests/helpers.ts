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
  }
> = {
  "post-tensioning-systems": { name: "Post-Tensioning Systems", hasHeroImage: true, typeCount: 5, projectCount: 7, galleryCount: 2, componentCount: 4 },
  "cable-systems": { name: "Cable Systems", hasHeroImage: true, typeCount: 5, projectCount: 5, galleryCount: 3, componentCount: 4 },
  bearing: { name: "Bearing", hasHeroImage: true, typeCount: 3, projectCount: 2, galleryCount: 0, componentCount: 3 },
  "expansion-joints": { name: "Expansion Joints", hasHeroImage: false, typeCount: 3, projectCount: 0, galleryCount: 0, componentCount: 1 },
  "anti-seismic-device": { name: "Anti-Seismic Device", hasHeroImage: true, typeCount: 1, projectCount: 1, galleryCount: 0, componentCount: 1 },
  dampers: { name: "Dampers", hasHeroImage: false, typeCount: 2, projectCount: 0, galleryCount: 0, componentCount: 1 },
  "structural-health-monitoring": { name: "Structural Health Monitoring", hasHeroImage: true, typeCount: 4, projectCount: 3, galleryCount: 1, componentCount: 0 },
};

/** Every image referenced by a `components` entry, across all technologies. */
export const COMPONENT_IMAGES = [
  "/technologies/system-supply/pt-system-full-assembly.jpg",
  "/technologies/system-supply/pt-fiber-anchorage.jpg",
  "/technologies/system-supply/pt-carbon-fiber-anchorage.jpg",
  "/technologies/system-supply/pt-jack-type-ycw.jpg",
  "/technologies/system-supply/cable-component-duct.jpg",
  "/technologies/system-supply/cable-component-saddle.jpg",
  "/technologies/system-supply/cable-component-anchor-head.jpg",
  "/technologies/system-supply/cable-component-stressing-anchorage.jpg",
  "/technologies/diagrams/bearing-elastomeric-diagram.jpg",
  "/technologies/diagrams/bearing-pot-diagram.jpg",
  "/technologies/diagrams/bearing-spherical-diagram.jpg",
  "/technologies/diagrams/expansion-joint-diagram.jpg",
  "/technologies/diagrams/anti-seismic-lead-core-diagram.jpg",
  "/technologies/diagrams/damper-diagram.jpg",
] as const;

/** Catalogue PDFs offered as downloads, keyed by the page that offers them. */
export const CATALOGUE_DOWNLOADS = {
  "/technologies/post-tensioning-systems": "/catalogues/OVM-Post-Tensioning-System-2025.pdf",
  "/technologies/cable-systems": "/catalogues/OVM250-OVMAT-Cable-System-2025.pdf",
  "/about": "/catalogues/OVM-Engineering-Solutions-2024.pdf",
} as const;

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
