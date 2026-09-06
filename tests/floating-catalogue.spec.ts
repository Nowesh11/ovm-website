import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { CATALOGUE_DOWNLOADS, revealFloatingButton } from "./helpers";

/** Pages that carry a floating catalogue button, and the PDF each offers. */
const WITH_BUTTON = Object.entries(CATALOGUE_DOWNLOADS);

/** Technology pages that deliberately have none. */
const WITHOUT_BUTTON = [
  "/technologies/bearing",
  "/technologies/dampers",
  "/technologies/expansion-joints",
  "/technologies/anti-seismic-device",
  "/technologies/structural-health-monitoring",
];

const button = (page: Page) => page.getByRole("link", { name: /Download Catalogue/i });

test.describe("floating catalogue button", () => {
  for (const [route, pdf] of WITH_BUTTON) {
    test(`${route} holds the button in a fixed screen position while scrolling`, async ({
      page,
    }) => {
      await page.goto(route);

      /* Held back until the visitor is past the hero. */
      await expect(button(page)).toHaveCount(0);

      await revealFloatingButton(page);
      const cta = button(page);
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute("href", pdf);

      /* `position: fixed` on the wrapper is what pins it to the viewport
         rather than to the scrolling content. */
      expect(
        await cta.evaluate((el) => getComputedStyle(el.parentElement!).position),
      ).toBe("fixed");

      const at = async () => {
        const box = (await cta.boundingBox())!;
        return { x: Math.round(box.x), y: Math.round(box.y) };
      };

      const start = await at();

      /* Bottom-right corner of the viewport. */
      const viewport = page.viewportSize()!;
      expect(start.x).toBeGreaterThan(viewport.width / 2);
      expect(start.y).toBeGreaterThan(viewport.height / 2);

      /* Scroll a long way down, then back up: the button must not move a
         pixel on screen, and must stay visible the whole time. */
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(cta).toBeVisible();
      expect(await at()).toEqual(start);

      await page.evaluate(() => window.scrollTo(0, 1400));
      await page.waitForTimeout(400);
      await expect(cta).toBeVisible();
      expect(await at()).toEqual(start);

      /* Once revealed it stays revealed, even back near the top. */
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await expect(cta).toBeVisible();
      expect(await at()).toEqual(start);
    });

    test(`${route} downloads ${pdf} instead of navigating`, async ({ page }) => {
      await page.goto(route);
      await revealFloatingButton(page);

      const cta = button(page);
      await expect(cta).toHaveAttribute("download", "");
      await expect(cta).not.toHaveAttribute("target", "_blank");

      const [download] = await Promise.all([
        page.waitForEvent("download"),
        cta.click(),
      ]);

      expect(download.suggestedFilename()).toBe(pdf.split("/").pop());
      expect(new URL(page.url()).pathname).toBe(route);
    });
  }

  for (const route of WITHOUT_BUTTON) {
    test(`${route} shows no catalogue button at all`, async ({ page }) => {
      await page.goto(route);
      await revealFloatingButton(page);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      await expect(button(page)).toHaveCount(0);
      await expect(page.locator('a[href^="/catalogues/"]')).toHaveCount(0);
    });
  }

  test("the button is smaller on mobile and clears the safe area", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/technologies/cable-systems");
    await revealFloatingButton(page);

    const cta = button(page);
    await expect(cta).toBeVisible();

    const box = (await cta.boundingBox())!;
    /* Comfortably inside a 375px viewport, with the corner gap intact. */
    expect(box.width).toBeLessThan(230);
    expect(box.x).toBeGreaterThan(0);
    expect(box.x + box.width).toBeLessThanOrEqual(375);
    expect(box.y + box.height).toBeLessThanOrEqual(812);

    /* Smaller than the desktop rendering of the same button. */
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);
    const desktop = (await cta.boundingBox())!;
    expect(desktop.height).toBeGreaterThan(box.height);
  });

  test("it sits above page content but below the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/about");
    await revealFloatingButton(page);

    const cta = button(page);
    const z = await cta.evaluate((el) => getComputedStyle(el.parentElement!).zIndex);
    expect(Number(z)).toBeGreaterThanOrEqual(40);

    /* The navbar (z-50) and its menu overlay (z-60) must still win. */
    const navZ = await page
      .locator("header, nav")
      .first()
      .evaluate((el) => getComputedStyle(el).zIndex);
    expect(Number(navZ)).toBeGreaterThan(Number(z));
  });

  test("the inline catalogue buttons are gone", async ({ page }) => {
    /* One pattern site-wide: the only catalogue link on these pages is the
       floating one, which is absent until you scroll. */
    for (const route of ["/about", "/technologies/post-tensioning-systems"]) {
      await page.goto(route);
      await expect(page.locator('a[href^="/catalogues/"]')).toHaveCount(0);

      await revealFloatingButton(page);
      await expect(page.locator('a[href^="/catalogues/"]')).toHaveCount(1);
    }
  });
});
