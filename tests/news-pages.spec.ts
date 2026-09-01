import { test, expect } from "@playwright/test";
import { NEWS_SLUGS, brokenImages, collectConsoleErrors, scrollThroughPage } from "./helpers";

const TITLES = {
  "greener-coastline-mangrove-planting": "Together for a Greener Coastline",
  "easec19-platinum-sponsor": "OVM Malaysia at EASEC-19 as Platinum Sponsor",
  "sejingkat-bridge-p7-closure":
    "Milestone Achieved: Sejingkat Bridge P7 Side-Span Closure",
} as const;

const EXPECTED = {
  "greener-coastline-mangrove-planting": { galleryCount: 7, bodyCount: 4 },
  "easec19-platinum-sponsor": { galleryCount: 5, bodyCount: 4 },
  "sejingkat-bridge-p7-closure": { galleryCount: 2, bodyCount: 6 },
} as const;

/** The other two articles an article page cross-links to. */
const othersOf = (slug: (typeof NEWS_SLUGS)[number]) =>
  NEWS_SLUGS.filter((s) => s !== slug);

test.describe("news articles", () => {
  for (const slug of NEWS_SLUGS) {
    const expected = EXPECTED[slug];

    test(`${slug} renders hero, body and gallery`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const response = await page.goto(`/news/${slug}`);

      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(TITLES[slug]);

      // Breadcrumb
      const crumbs = page.locator('nav[aria-label="Breadcrumb"] li');
      await expect(crumbs.filter({ hasText: "News" })).toHaveCount(1);

      // Full body — one paragraph per entry in the article's body array
      const body = page.locator(".max-w-3xl p");
      await expect(body).toHaveCount(expected.bodyCount);
      for (let i = 0; i < expected.bodyCount; i += 1) {
        await expect(body.nth(i)).not.toBeEmpty();
      }

      // Gallery thumbnails
      await scrollThroughPage(page);
      const thumbs = page.locator('[aria-label^="Expand"]');
      await expect(thumbs).toHaveCount(expected.galleryCount);

      expect(await brokenImages(page)).toEqual([]);
      expect(errors).toEqual([]);
    });

    test(`${slug} lightbox opens, navigates and closes`, async ({ page }) => {
      await page.goto(`/news/${slug}`);
      await scrollThroughPage(page);

      const thumbs = page.locator('[aria-label^="Expand"]');
      await thumbs.nth(1).click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.locator(".tabular-nums")).toHaveText(
        `2 / ${expected.galleryCount}`,
      );

      /* Read the src attribute, not currentSrc — the latter stays empty until
         the browser has actually decoded the image. */
      const shown = () => dialog.locator("img").first().getAttribute("src");
      const first = await shown();
      expect(first).toBeTruthy();

      // Arrow right advances, wrapping past the last image
      const next = (2 % expected.galleryCount) + 1;
      await page.keyboard.press("ArrowRight");
      await expect(dialog.locator(".tabular-nums")).toHaveText(
        `${next} / ${expected.galleryCount}`,
      );
      expect(await shown()).not.toBe(first);

      // Arrow left goes back
      await page.keyboard.press("ArrowLeft");
      await expect(dialog.locator(".tabular-nums")).toHaveText(
        `2 / ${expected.galleryCount}`,
      );

      // Wraps backwards from the first image
      await page.keyboard.press("ArrowLeft");
      await expect(dialog.locator(".tabular-nums")).toHaveText(
        `1 / ${expected.galleryCount}`,
      );
      await page.keyboard.press("ArrowLeft");
      await expect(dialog.locator(".tabular-nums")).toHaveText(
        `${expected.galleryCount} / ${expected.galleryCount}`,
      );

      // Escape closes and restores scrolling
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    });

    test(`${slug} cross-links to every other article`, async ({ page }) => {
      await page.goto(`/news/${slug}`);

      const moreHeading = page.getByText("More updates", { exact: true });
      await moreHeading.scrollIntoViewIfNeeded();

      const others = othersOf(slug);
      for (const other of others) {
        await expect(page.locator(`a[href="/news/${other}"]`)).toHaveCount(1);
      }

      // It must not link to itself
      await expect(page.locator(`a[href="/news/${slug}"]`)).toHaveCount(0);

      const [first] = others;
      await page.locator(`a[href="/news/${first}"]`).click();
      await page.waitForURL(`**/news/${first}`, { timeout: 60_000 });
      await expect(page.locator("h1")).toHaveText(TITLES[first]);
    });

    test(`${slug} has a LinkedIn source link`, async ({ page }) => {
      await page.goto(`/news/${slug}`);
      const link = page.getByRole("link", { name: /View original post on LinkedIn/i });

      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:activity:\d+/);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    });
  }

  test("lightbox closes when clicking the backdrop", async ({ page }) => {
    await page.goto("/news/easec19-platinum-sponsor");
    await scrollThroughPage(page);

    await page.locator('[aria-label^="Expand"]').first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    /* Click the backdrop well away from the image stage. */
    await dialog.click({ position: { x: 5, y: 300 } });
    await expect(dialog).toHaveCount(0);
  });

  test("unknown news slug returns 404", async ({ request }) => {
    expect((await request.get("/news/not-a-real-article")).status()).toBe(404);
  });
});
