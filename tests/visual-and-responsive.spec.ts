import { test, expect } from "@playwright/test";
import { brokenImages, scrollThroughPage } from "./helpers";

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const PAGES = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "news-index", path: "/news" },
  { name: "technology-bearing", path: "/technologies/bearing" },
] as const;

test.describe("responsive layout", () => {
  for (const viewport of VIEWPORTS) {
    for (const target of PAGES) {
      test(`${target.name} at ${viewport.name} (${viewport.width}px) has no horizontal overflow`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(target.path);
        await scrollThroughPage(page);
        await page.evaluate(() => window.scrollTo(0, 0));

        const { scrollWidth, innerWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        }));

        expect(
          scrollWidth,
          `${target.path} overflows horizontally at ${viewport.width}px`,
        ).toBeLessThanOrEqual(innerWidth);

        expect(await brokenImages(page), `${target.path} has broken images`).toEqual([]);

        await page.screenshot({
          path: `tests/screenshots/${target.name}-${viewport.name}.png`,
          fullPage: true,
        });
      });
    }
  }
});

test.describe("assets", () => {
  test("favicon is served without a 404", async ({ request, page }) => {
    await page.goto("/");
    const iconHref = await page
      .locator('link[rel*="icon"]')
      .first()
      .getAttribute("href");

    expect(iconHref, "an icon link should be present in <head>").toBeTruthy();
    expect((await request.get(iconHref!)).status()).toBe(200);
  });
});
