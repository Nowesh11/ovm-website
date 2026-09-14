import { test, expect } from "@playwright/test";
import {
  PROJECTS_BY_TECHNOLOGY,
  TECHNOLOGIES_WITHOUT_PROJECTS,
  scrollThroughPage,
} from "./helpers";

/* These pages now carry up to 23 project cards each, all with photography. */
test.describe.configure({ timeout: 90_000 });

const heading = "Reference Projects";

test.describe("technology reference projects", () => {
  for (const [slug, expected] of Object.entries(PROJECTS_BY_TECHNOLOGY)) {
    test(`${slug} lists exactly the ${expected.length} projects tagged with it`, async ({
      page,
    }) => {
      await page.goto(`/technologies/${slug}`);
      await scrollThroughPage(page);

      const section = page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: heading }) });
      await expect(section).toHaveCount(1);

      /* Every card is a link to its carousel anchor, so the hrefs are the
         cleanest way to assert both the set and the order. */
      const hrefs = await section
        .locator("article a")
        .evaluateAll((els) => els.map((el) => el.getAttribute("href")!));

      expect(hrefs).toEqual(expected.map((p) => `/#project-${p}`));
      await expect(section.locator("article")).toHaveCount(expected.length);
    });
  }

  test("the technology pages draw only from the 24-project homepage list", async ({
    page,
  }) => {
    /* Collect every project anchor on the homepage, then confirm no
       technology page links to anything outside it — the catalogue-sourced
       global projects are gone. */
    await page.goto("/");
    const rail = page.getByRole("region", { name: "Reference projects" });
    await rail.scrollIntoViewIfNeeded();
    const carousel = new Set(
      await rail.locator("article").evaluateAll((els) => els.map((el) => el.id)),
    );

    for (const slug of Object.keys(PROJECTS_BY_TECHNOLOGY)) {
      await page.goto(`/technologies/${slug}`);
      await scrollThroughPage(page);

      const section = page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: heading }) });

      const hrefs = await section
        .locator("article a")
        .evaluateAll((els) => els.map((el) => el.getAttribute("href")!));

      for (const href of hrefs) {
        expect(carousel.has(href.replace("/#", "")), `${href} exists on the homepage`).toBe(
          true,
        );
      }
    }
  });

  test("the catalogue-sourced global projects are gone site-wide", async ({ page }) => {
    const retired = [
      "CBD Egypt",
      "Fuqing Nuclear",
      "Yavuz Sultan Selim",
      "Jiayu Bridge",
      "Stonecutters",
      "Jianyi",
      "TWRP",
      "Kigamboni",
      "FAST Telescope",
      "Central-Wan Chai",
      "Mohmand",
      "El Ferdan",
      "LNG Tank",
      "Hong Kong–Zhuhai–Macao",
    ];

    for (const slug of [
      ...Object.keys(PROJECTS_BY_TECHNOLOGY),
      ...TECHNOLOGIES_WITHOUT_PROJECTS,
    ]) {
      await page.goto(`/technologies/${slug}`);
      await scrollThroughPage(page);
      const body = (await page.locator("main").textContent()) ?? "";

      for (const name of retired) {
        expect(body, `${slug} should not mention ${name}`).not.toContain(name);
      }
    }
  });

  for (const slug of TECHNOLOGIES_WITHOUT_PROJECTS) {
    test(`${slug} renders no Reference Projects section at all`, async ({ page }) => {
      await page.goto(`/technologies/${slug}`);
      await scrollThroughPage(page);

      await expect(page.getByRole("heading", { name: heading })).toHaveCount(0);
      await expect(page.getByText("Track Record", { exact: true })).toHaveCount(0);
      /* Not an empty section either — no stray project links. */
      await expect(page.locator('main a[href^="/#project-"]')).toHaveCount(0);
    });
  }

  test("each card carries the project's photo, name, location and scope", async ({
    page,
  }) => {
    await page.goto("/technologies/bearing-expansion-joints-anti-seismic-device");
    await scrollThroughPage(page);

    const section = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: heading }) });

    const ecrl = section.locator("article").filter({ hasText: "East Coast Rail Link" });
    await expect(ecrl).toHaveCount(1);
    await expect(ecrl).toContainText("Malaysia, 665km");
    await expect(ecrl).toContainText("elastomeric bearing");
    await expect(ecrl.locator("img")).toHaveCount(1);
    await expect(ecrl.locator("a")).toHaveAttribute(
      "href",
      "/#project-east-coast-rail-link-ecrl",
    );
  });

  test("a card click scrolls to and highlights the matching homepage card", async ({
    page,
  }) => {
    await page.goto("/technologies/bearing-expansion-joints-anti-seismic-device");
    await scrollThroughPage(page);

    await page.locator('a[href="/#project-muara-lassa-bridge"]').first().click();
    await page.waitForURL("**/#project-muara-lassa-bridge", { timeout: 60_000 });

    const card = page.locator("#project-muara-lassa-bridge");

    await expect
      .poll(() => card.evaluate((el) => el.classList.contains("anchor-highlight")), {
        timeout: 3_000,
        intervals: [50],
      })
      .toBe(true);

    await expect
      .poll(
        () =>
          card.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return r.top > -50 && r.bottom < window.innerHeight + 50 && r.left > -50;
          }),
        { timeout: 5_000 },
      )
      .toBe(true);
  });
});
