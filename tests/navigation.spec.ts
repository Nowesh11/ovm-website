import { test, expect } from "@playwright/test";
import { TECH_SLUGS, collectConsoleErrors } from "./helpers";

test.describe("navigation", () => {
  test("homepage returns 200 with no console errors", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("navbar is transparent at top and gains a solid background after scrolling", async ({
    page,
  }) => {
    await page.goto("/");
    const header = page.locator("header").first();

    /* The navbar swaps a transparent border/background for an ink one past 24px. */
    await expect(header).toHaveClass(/bg-transparent/);

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveClass(/bg-ink\/85/);
    await expect(header).toHaveClass(/backdrop-blur-xl/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveClass(/bg-transparent/);
  });

  test("every desktop navbar link resolves", async ({ page, request }) => {
    await page.goto("/");

    const expected = [
      "/",
      "/about",
      "/news",
      "/contact",
      ...TECH_SLUGS.map((slug) => `/technologies/${slug}`),
    ];

    /* Open the dropdown so its links are mounted. */
    await page.getByRole("button", { name: /OVM Technologies/i }).first().click();
    await expect(page.locator('a[href="/technologies/cable-systems"]').first()).toBeVisible();

    for (const href of expected) {
      await expect(page.locator(`a[href="${href}"]`).first()).toHaveCount(1);
      const response = await request.get(href);
      expect(response.status(), `${href} should return 200`).toBe(200);
    }
  });

  test("technology dropdown links navigate to the right page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /OVM Technologies/i }).first().click();

    const target = "/technologies/structural-health-monitoring";
    await page.locator(`a[href="${target}"]`).first().click();

    /* The dev server compiles routes on first hit, so allow well past the
       5s default before calling this a navigation failure. */
    await page.waitForURL(`**${target}`, { timeout: 60_000 });
    await expect(page.locator("h1")).toHaveText("Structural Health Monitoring");
  });

  test.describe("mobile menu", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("opens, lists links, closes on link click and on Escape", async ({ page }) => {
      await page.goto("/");

      const openButton = page.getByRole("button", { name: /open menu/i });
      await openButton.click();

      const panel = page.locator("aside");
      await expect(panel).toBeVisible();
      await expect(panel.locator('a[href="/about"]')).toBeVisible();
      await expect(panel.locator('a[href="/contact"]').first()).toBeVisible();

      // Escape closes it
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();

      // Reopen, then close by following a link
      await openButton.click();
      await expect(panel).toBeVisible();
      await panel.locator('a[href="/about"]').click();

      await page.waitForURL("**/about", { timeout: 60_000 });
      await expect(page.locator("aside")).toHaveCount(0);
    });

    test("mobile menu exposes every technology link", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: /open menu/i }).click();

      const panel = page.locator("aside");
      await panel.getByRole("button", { name: /OVM Technologies/i }).click();

      for (const slug of TECH_SLUGS) {
        await expect(panel.locator(`a[href="/technologies/${slug}"]`)).toHaveCount(1);
      }
    });
  });

  test("all footer links resolve without 404s", async ({ page, request }) => {
    await page.goto("/");

    const hrefs = await page
      .locator("footer a[href^='/']")
      .evaluateAll((links) =>
        [...new Set(links.map((a) => a.getAttribute("href")!).filter(Boolean))],
      );

    expect(hrefs.length).toBeGreaterThan(5);

    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), `footer link ${href} should not 404`).toBe(200);
    }
  });
});
