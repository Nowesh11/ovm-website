import { test, expect } from "@playwright/test";
import {
  COMPONENT_IMAGES,
  TECH_SLUGS,
  TECH_EXPECTATIONS,
  brokenImages,
  collectConsoleErrors,
  scrollThroughPage,
} from "./helpers";

test.describe("technology pages", () => {
  for (const slug of TECH_SLUGS) {
    const expected = TECH_EXPECTATIONS[slug];

    test(`${slug} renders correctly`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const response = await page.goto(`/technologies/${slug}`);

      expect(response?.status()).toBe(200);

      // Breadcrumb
      const crumbs = page.locator('nav[aria-label="Breadcrumb"] li');
      await expect(crumbs.filter({ hasText: "Home" })).toHaveCount(1);
      await expect(crumbs.filter({ hasText: "OVM Technologies" })).toHaveCount(1);
      await expect(crumbs.filter({ hasText: expected.name })).toHaveCount(1);

      // Hero: photo where one exists, gradient + icon fallback where it does not
      await expect(page.locator("h1")).toHaveText(expected.name);
      const hero = page.locator("main section").first();
      const heroImages = await hero.locator("img").count();

      if (expected.hasHeroImage) {
        expect(heroImages).toBeGreaterThan(0);
      } else {
        expect(heroImages, "fallback hero must not render an <img>").toBe(0);
        /* The fallback shows the technology's icon instead. */
        expect(await hero.locator("svg").count()).toBeGreaterThan(0);
      }

      // Summary paragraph
      await expect(hero.locator("p").first()).not.toBeEmpty();

      // Types grid
      await expect(page.getByRole("heading", { name: "Systems we supply" })).toBeVisible();
      const typesGrid = page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: "Systems we supply" }) });
      await expect(typesGrid.locator("article")).toHaveCount(expected.typeCount);

      // Reference projects render only when the entry has projects
      const refHeading = page.getByRole("heading", { name: "Reference Projects" });
      if (expected.projectCount > 0) {
        await expect(refHeading).toBeVisible();
        const refSection = page.locator("section").filter({ has: refHeading });
        await expect(refSection.locator("article")).toHaveCount(expected.projectCount);
      } else {
        await expect(refHeading).toHaveCount(0);
      }

      await scrollThroughPage(page);
      expect(await brokenImages(page), "no broken images").toEqual([]);
      expect(errors, "no console errors").toEqual([]);
    });

    test(`${slug} renders the split TechCTA, not the homepage CTA`, async ({ page }) => {
      await page.goto(`/technologies/${slug}`);

      // TechCTA is identified by its dynamic heading and "Next step" eyebrow
      const heading = page.getByRole("heading", {
        name: `Need ${expected.name} for your project?`,
      });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();

      const cta = page.locator("section").filter({ has: heading });
      await expect(cta.getByText("Next step", { exact: true })).toBeVisible();

      const discuss = cta.getByRole("link", { name: /Discuss this project/i });
      const viewAll = cta.getByRole("link", { name: /View all technologies/i });
      await expect(discuss).toHaveAttribute("href", "/contact");
      await expect(viewAll).toHaveAttribute("href", "/#technologies");

      // The homepage's centred CTA must NOT appear on technology pages
      await expect(
        page.getByRole("heading", { name: /Have a project in mind/i }),
      ).toHaveCount(0);
    });

    test(`${slug} system supply matches its parts list`, async ({ page }) => {
      await page.goto(`/technologies/${slug}`);

      const heading = page.getByRole("heading", { name: "Components we supply" });

      /* No component photography — the section must not render at all,
         rather than an empty grid. */
      if (expected.componentCount === 0) {
        await scrollThroughPage(page);
        await expect(heading).toHaveCount(0);
        await expect(page.getByText("System Supply", { exact: true })).toHaveCount(0);
        return;
      }

      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();

      const supply = page.locator("section").filter({ has: heading });
      await expect(supply.getByText("System Supply", { exact: true })).toBeVisible();

      const cards = supply.locator("figure");
      await expect(cards).toHaveCount(expected.componentCount);

      for (let i = 0; i < expected.componentCount; i += 1) {
        const card = cards.nth(i);

        // Named, numbered, and the product shot decoded
        await expect(card.locator("h3")).not.toBeEmpty();
        await expect(card.getByText(String(i + 1).padStart(2, "0"), { exact: true })).toBeVisible();

        const natural = await card
          .locator("img")
          .evaluate((el) => (el as HTMLImageElement).naturalWidth);
        expect(natural, `component ${i} image should decode`).toBeGreaterThan(0);
      }
    });

    if (TECH_EXPECTATIONS[slug].galleryCount > 0) {
      test(`${slug} gallery images load`, async ({ page }) => {
        await page.goto(`/technologies/${slug}`);
        await scrollThroughPage(page);

        const typesSection = page
          .locator("section")
          .filter({ has: page.getByRole("heading", { name: "Systems we supply" }) });

        /* Diagrams render as <figure> cards, photos as plain divs — count both. */
        const galleryImgs = typesSection.locator("figure img, div.aspect-\\[16\\/10\\] img");
        const count = await galleryImgs.count();
        expect(count).toBe(expected.galleryCount);

        for (let i = 0; i < count; i += 1) {
          const natural = await galleryImgs
            .nth(i)
            .evaluate((el) => (el as HTMLImageElement).naturalWidth);
          expect(natural, `gallery image ${i} should decode`).toBeGreaterThan(0);
        }
      });
    }
  }

  test("system supply product shots sit on a light plate", async ({ page }) => {
    await page.goto("/technologies/bearing");
    await scrollThroughPage(page);

    const figures = page.locator("figure");
    await expect(figures).toHaveCount(3);

    await expect(figures.locator("h3")).toHaveText([
      "Elastomeric Bearing",
      "Pot Bearing",
      "Spherical Bearing",
    ]);

    /* Studio shots are cut out on white, so the image plate must be light
       even though the surrounding card is dark. */
    const plate = await figures
      .first()
      .locator("img")
      .evaluate((el) => getComputedStyle(el.parentElement!).backgroundColor);
    expect(plate).toBe("rgb(255, 255, 255)");

    /* The image is contained, not cropped — these are parts, not scenery. */
    const fit = await figures
      .first()
      .locator("img")
      .evaluate((el) => getComputedStyle(el).objectFit);
    expect(fit).toBe("contain");
  });

  test("system supply sits between Types and Reference Projects", async ({ page }) => {
    await page.goto("/technologies/post-tensioning-systems");
    await scrollThroughPage(page);

    const order = await page.evaluate(() => {
      const headings = [...document.querySelectorAll("h2")].map((el) =>
        (el.textContent ?? "").trim(),
      );
      return {
        types: headings.indexOf("Systems we supply"),
        supply: headings.indexOf("Components we supply"),
        projects: headings.indexOf("Reference Projects"),
      };
    });

    expect(order.types).toBeGreaterThanOrEqual(0);
    expect(order.supply).toBeGreaterThan(order.types);
    expect(order.projects).toBeGreaterThan(order.supply);
  });

  test("every component image is served, none 404", async ({ request }) => {
    for (const src of COMPONENT_IMAGES) {
      const response = await request.get(src);
      expect(response.status(), `${src} should be served`).toBe(200);
      expect(response.headers()["content-type"], src).toContain("image");
    }
  });

  test("unknown technology slug returns 404", async ({ request }) => {
    expect((await request.get("/technologies/not-a-real-slug")).status()).toBe(404);
  });
});
