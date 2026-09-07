import { test, expect } from "@playwright/test";
import { NEWS_SLUGS, imageLoaded, waitForImages } from "./helpers";

test.describe("homepage", () => {
  test("hero renders with headline and a loaded background image", async ({ page }) => {
    await page.goto("/");

    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();

    await waitForImages(page);
    expect(await imageLoaded(page, 'img[alt*="Cable-stayed bridge"]')).toBe(true);
  });

  test("stats count up and settle on their final values", async ({ page }) => {
    await page.goto("/");
    await page.locator("text=Turnover 2025").scrollIntoViewIfNeeded();

    /* The count-up tween runs 2.1s; assert the settled values. */
    await expect(page.getByText("USD 450M")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("1,700+", { exact: true })).toBeVisible();
    await expect(page.getByText("1,350+", { exact: true })).toBeVisible();
    await expect(page.getByText("80+", { exact: true })).toBeVisible();
  });

  test("services grid renders 6 cards with working Discover links", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const grid = page.locator("#technologies");

    await expect(grid.locator("article")).toHaveCount(6);
    await expect(grid.getByRole("heading", { name: "Monitoring", exact: true })).toBeVisible();

    /* Retired from the grid — it had no page of its own to link to. */
    await expect(
      grid.getByRole("heading", { name: "Leading-edge Technology" }),
    ).toHaveCount(0);

    const discoverHrefs = await grid
      .locator("a")
      .evaluateAll((links) =>
        links
          .filter((a) => a.textContent?.includes("Discover"))
          .map((a) => a.getAttribute("href")!),
      );

    /* Only the services backed by a technology page carry a Discover link. */
    expect(discoverHrefs).toEqual([
      "/technologies/post-tensioning-systems",
      "/technologies/cable-systems",
      "/technologies/bearing",
      "/technologies/structural-health-monitoring",
    ]);

    for (const href of discoverHrefs) {
      expect((await request.get(href)).status()).toBe(200);
    }
  });

  test("a Discover link navigates to its technology page", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('#technologies a[href="/technologies/structural-health-monitoring"]')
      .click();

    await page.waitForURL("**/technologies/structural-health-monitoring", { timeout: 60_000 });
    await expect(page.locator("h1")).toHaveText("Structural Health Monitoring");
  });

  test("latest news renders the three most recent articles with images and links", async ({
    page,
  }) => {
    await page.goto("/");
    const news = page.locator("#news");
    await news.scrollIntoViewIfNeeded();
    await waitForImages(page);

    await expect(news.locator("article")).toHaveCount(3);

    for (const slug of NEWS_SLUGS) {
      await expect(news.locator(`a[href="/news/${slug}"]`)).toHaveCount(1);
    }

    const imgs = news.locator("img");
    const count = await imgs.count();
    expect(count).toBe(3);
    for (let i = 0; i < count; i += 1) {
      const natural = await imgs.nth(i).evaluate((el) => (el as HTMLImageElement).naturalWidth);
      expect(natural).toBeGreaterThan(0);
    }
  });

  test("each article page exposes its LinkedIn source link", async ({ page }) => {
    for (const slug of NEWS_SLUGS) {
      await page.goto(`/news/${slug}`);
      const link = page.getByRole("link", { name: /View original post on LinkedIn/i });

      await expect(link).toHaveAttribute("href", /^https:\/\/www\.linkedin\.com\//);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("projects carousel scrolls horizontally", async ({ page }) => {
    await page.goto("/");
    const rail = page.getByRole("region", { name: "Reference projects" });
    await rail.scrollIntoViewIfNeeded();

    const before = await rail.evaluate((el) => el.scrollLeft);
    await rail.evaluate((el) => {
      el.scrollLeft = 800;
    });
    const after = await rail.evaluate((el) => el.scrollLeft);

    expect(before).toBe(0);
    expect(after).toBeGreaterThan(before);
  });

  test("carousel card reveals its detail overlay on hover (desktop)", async ({ page }) => {
    await page.goto("/");
    const rail = page.getByRole("region", { name: "Reference projects" });
    await rail.scrollIntoViewIfNeeded();

    const card = rail.locator("article").first();
    const overlay = card.locator("div.absolute.inset-0").first();

    expect(await overlay.evaluate((el) => getComputedStyle(el).opacity)).toBe("0");
    await card.hover();
    await expect
      .poll(async () => overlay.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test.describe("touch", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true });

    test("tapping a carousel card toggles its overlay", async ({ page }) => {
      await page.goto("/");
      const rail = page.getByRole("region", { name: "Reference projects" });
      await rail.scrollIntoViewIfNeeded();

      const card = rail.locator("article").first();
      const overlay = card.locator("div.absolute.inset-0").first();

      expect(await overlay.evaluate((el) => getComputedStyle(el).opacity)).toBe("0");

      await card.tap();
      await expect
        .poll(async () => overlay.evaluate((el) => getComputedStyle(el).opacity))
        .toBe("1");

      await card.tap();
      await expect
        .poll(async () => overlay.evaluate((el) => getComputedStyle(el).opacity))
        .toBe("0");
    });
  });

  test("CTA section links to /contact", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("heading", { name: /Have a project in mind/i });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();

    const button = page
      .locator("section")
      .filter({ has: cta })
      .locator('a[href="/contact"]')
      .first();
    await expect(button).toBeVisible();
  });
});
