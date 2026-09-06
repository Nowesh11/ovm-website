import { TECH_SLUGS, NEWS_SLUGS } from "./helpers";

/**
 * The Next dev server compiles each route on its first request. Without this,
 * parallel workers all trigger compilation at once and the slowest requests
 * time out. Warming every route serially up front makes the suite
 * deterministic — and costs a few seconds once, rather than per worker.
 */
export default async function globalSetup() {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

  const routes = [
    "/",
    "/about",
    "/contact",
    "/careers",
    "/news",
    ...TECH_SLUGS.map((slug) => `/technologies/${slug}`),
    ...NEWS_SLUGS.map((slug) => `/news/${slug}`),
  ];

  for (const route of routes) {
    try {
      const res = await fetch(`${baseURL}${route}`);
      if (!res.ok) {
        console.warn(`[warmup] ${route} responded ${res.status}`);
      }
      await res.text();
    } catch (err) {
      console.warn(`[warmup] ${route} failed:`, (err as Error).message);
    }
  }
}
