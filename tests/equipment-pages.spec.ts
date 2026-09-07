import { test, expect } from "@playwright/test";

import {
  EQUIPMENT_IMAGES,
  EQUIPMENT_SLUGS,
  brokenImages,
  collectConsoleErrors,
  scrollThroughPage,
  waitForImages,
} from "./helpers";

const FIRST_SLUG = EQUIPMENT_SLUGS[0];

test.describe("equipment section", () => {
  test("/equipment redirects to the first item", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto("/equipment");

    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe(`/equipment/${FIRST_SLUG}`);
    await expect(page.locator("h1")).toHaveText("680t Hydraulic Gantry Crane");
    expect(errors).toEqual([]);
  });

  test("sidebar lists all five items and marks the current one active", async ({ page }) => {
    await page.goto(`/equipment/${FIRST_SLUG}`);

    const sidebar = page.getByRole("navigation", { name: "Equipment" }).first();
    await expect(sidebar.getByRole("link")).toHaveCount(EQUIPMENT_SLUGS.length);

    /* Exactly one link is the current page, and it carries the amber accent. */
    const active = sidebar.locator('a[aria-current="page"]');
    await expect(active).toHaveCount(1);
    await expect(active).toHaveAttribute("href", `/equipment/${FIRST_SLUG}`);
    await expect(active).toHaveClass(/border-amber/);
    await expect(active).toHaveClass(/bg-amber\/10/);
  });

  test("every sidebar link switches the content and moves the highlight", async ({ page }) => {
    await page.goto(`/equipment/${FIRST_SLUG}`);

    const expectedHeadings: Record<string, string> = {
      "680t-hydraulic-gantry-crane": "680t Hydraulic Gantry Crane",
      "large-diameter-wire-rope-tension-jack-system":
        "Large Diameter Wire Rope Tension Jack System",
      "lzdj1000t-cable-supported-crane": "LZDJ1000t Cable-Supported Crane",
      "walking-incremental-launching-equipment":
        "Walking Incremental Launching Equipment with Distributed Bearing and Reaction Forces",
      "tunnel-construction-equipment": "Tunnel Construction Equipment",
    };

    for (const slug of EQUIPMENT_SLUGS) {
      const sidebar = page.getByRole("navigation", { name: "Equipment" }).first();
      await sidebar.locator(`a[href="/equipment/${slug}"]`).click();
      await page.waitForURL(`**/equipment/${slug}`, { timeout: 60_000 });

      await expect(page.locator("h1")).toHaveText(expectedHeadings[slug]);
      await expect(
        page
          .getByRole("navigation", { name: "Equipment" })
          .first()
          .locator('a[aria-current="page"]'),
      ).toHaveAttribute("href", `/equipment/${slug}`);
    }
  });

  test("the contact button links to /contact", async ({ page, request }) => {
    await page.goto(`/equipment/${FIRST_SLUG}`);

    const contact = page.getByRole("link", { name: /Contact Us/i }).first();
    await expect(contact).toBeVisible();
    await expect(contact).toHaveAttribute("href", "/contact");
    expect((await request.get("/contact")).status()).toBe(200);
  });

  test("the gantry crane shows a video placeholder, not a player", async ({ page }) => {
    await page.goto("/equipment/680t-hydraulic-gantry-crane");

    await expect(page.getByText("Video coming soon")).toBeVisible();
    /* No <video>/<iframe> pointed at a file that does not exist yet. */
    await expect(page.locator("main video, main iframe")).toHaveCount(0);
  });

  test("only the gantry crane page carries the placeholder", async ({ page }) => {
    for (const slug of EQUIPMENT_SLUGS.filter((s) => s !== "680t-hydraulic-gantry-crane")) {
      await page.goto(`/equipment/${slug}`);
      await expect(page.getByText("Video coming soon")).toHaveCount(0);
    }
  });

  test("the tunnel page shows its intro and both sub-items with image and bullets", async ({
    page,
  }) => {
    await page.goto("/equipment/tunnel-construction-equipment");

    await expect(page.locator("h1")).toHaveText("Tunnel Construction Equipment");
    await expect(
      page.getByText(/In a single-hole double-track shield tunnel/i),
    ).toBeVisible();

    const subHeadings = [
      "Self-Propelled Arc Component Installation Equipment",
      "Compact Mid-Partition Wall Equipment",
    ];
    for (const heading of subHeadings) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await scrollThroughPage(page);
    await waitForImages(page);

    /* One photo per sub-item, plus their bullet lists — 1 and 3 respectively.
       Nested sections, so the selector skips the page's own outer <section>. */
    await expect(page.locator('main img[src*="tunnel-arc-component-installation"]')).toHaveCount(1);
    await expect(
      page.locator('main img[src*="tunnel-midpartition-wall-equipment"]'),
    ).toHaveCount(1);

    const blocks = page.locator("main > section section");
    await expect(blocks).toHaveCount(2);
    await expect(blocks.nth(0).locator("ul li")).toHaveCount(1);
    await expect(blocks.nth(1).locator("ul li")).toHaveCount(3);
    expect(await brokenImages(page)).toEqual([]);
  });

  test("every equipment image is served without a 404", async ({ request }) => {
    for (const src of EQUIPMENT_IMAGES) {
      const response = await request.get(src);
      expect(response.status(), `${src} should return 200`).toBe(200);
    }
  });

  test("no page renders a broken image", async ({ page }) => {
    for (const slug of EQUIPMENT_SLUGS) {
      await page.goto(`/equipment/${slug}`);
      await scrollThroughPage(page);
      await waitForImages(page);
      expect(await brokenImages(page), `${slug} has broken images`).toEqual([]);
    }
  });

});

test.describe("equipment navbar link", () => {
  const OTHER_PAGES = [
    "/",
    "/about",
    "/news",
    "/contact",
    "/careers",
    "/technologies/bearing",
  ] as const;

  test("appears between OVM Technologies and About", async ({ page }) => {
    await page.goto("/");

    const labels = await page
      .locator("header")
      .first()
      .locator("nav > div a, nav > div button")
      .allInnerTexts();
    const trimmed = labels.map((label) => label.trim()).filter(Boolean);

    const tech = trimmed.findIndex((l) => l.startsWith("OVM Technologies"));
    const equipment = trimmed.indexOf("Equipment");
    const about = trimmed.indexOf("About");

    expect(equipment).toBeGreaterThan(tech);
    expect(equipment).toBeLessThan(about);
  });

  test("navigates to the first item from every other page", async ({ page }) => {
    for (const path of OTHER_PAGES) {
      await page.goto(path);

      /* The header slides in on mount — wait it out before clicking. */
      const link = page.locator('header a[href="/equipment"]').first();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(`**/equipment/${FIRST_SLUG}`, { timeout: 60_000 });
      await expect(page.locator("h1")).toHaveText("680t Hydraulic Gantry Crane");
    }
  });
});

test.describe("equipment at mobile width", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("collapses the sidebar into a working dropdown", async ({ page }) => {
    await page.goto(`/equipment/${FIRST_SLUG}`);

    /* The desktop rail is out; the selector button stands in for it. */
    const selector = page.getByRole("button", { name: /680t Hydraulic Gantry Crane/i });
    await expect(selector).toBeVisible();
    await expect(selector).toHaveAttribute("aria-expanded", "false");

    await selector.click();
    await expect(selector).toHaveAttribute("aria-expanded", "true");

    /* Scoped by role — the desktop rail is display:none here, so it is out of
       the accessibility tree and only the dropdown's list matches. */
    const target = "/equipment/lzdj1000t-cable-supported-crane";
    const link = page
      .getByRole("navigation", { name: "Equipment" })
      .locator(`a[href="${target}"]`);
    await expect(link).toBeVisible();
    await link.click();

    await page.waitForURL(`**${target}`, { timeout: 60_000 });
    await expect(page.locator("h1")).toHaveText("LZDJ1000t Cable-Supported Crane");
  });

  test("Escape closes the dropdown", async ({ page }) => {
    await page.goto(`/equipment/${FIRST_SLUG}`);

    const selector = page.getByRole("button", { name: /680t Hydraulic Gantry Crane/i });
    await selector.click();
    await expect(selector).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(selector).toHaveAttribute("aria-expanded", "false");
  });

  test("every page fits the viewport without horizontal overflow", async ({ page }) => {
    for (const slug of EQUIPMENT_SLUGS) {
      await page.goto(`/equipment/${slug}`);
      await scrollThroughPage(page);
      await page.evaluate(() => window.scrollTo(0, 0));

      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      expect(scrollWidth, `${slug} overflows horizontally at 375px`).toBeLessThanOrEqual(
        innerWidth,
      );
    }
  });
});
