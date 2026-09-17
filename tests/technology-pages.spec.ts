import { test, expect } from "@playwright/test";
import {
  COMPONENT_IMAGES,
  TECH_SLUGS,
  TECH_EXPECTATIONS,
  brokenImages,
  collectConsoleErrors,
  scrollThroughPage,
} from "./helpers";

/* These pages carry the most photography on the site, and the dev image
   optimizer serves it one request at a time — the default 30s is not enough
   headroom for a page with nine product shots on it. */
test.describe.configure({ timeout: 90_000 });

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

      // Types grid — one per product line on a combined page
      if (expected.groups) {
        await expect(page.getByRole("heading", { name: "Systems we supply" })).toHaveCount(0);
        for (const group of expected.groups) {
          const section = page.locator(`section#${group.id}`);
          await expect(section.locator("h2")).toHaveText(group.name);
          await expect(
            section.locator('[data-testid="types-grid"] article'),
          ).toHaveCount(group.typeCount);
        }
      } else if (expected.typeCount > 0) {
        await expect(page.getByRole("heading", { name: "Systems we supply" })).toBeVisible();
        const typesGrid = page
          .locator("section")
          .filter({ has: page.getByRole("heading", { name: "Systems we supply" }) });
        await expect(
          typesGrid.locator('[data-testid="types-grid"] article'),
        ).toHaveCount(expected.typeCount);
      }

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

    /* The detailed product documentation sourced from OVM's own product
       pages: per-system features, assembly part callouts, plant and
       standards. Guards against a page silently losing its depth. */
    test(`${slug} renders its OVM product documentation`, async ({ page }) => {
      await page.goto(`/technologies/${slug}`);
      await scrollThroughPage(page);

      // Key features
      const features = page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: /^Why specify OVM/ }) });
      if (expected.featureCount > 0) {
        await expect(features.locator("li")).toHaveCount(expected.featureCount);
      } else {
        await expect(page.getByRole("heading", { name: /^Why specify OVM/ })).toHaveCount(0);
      }

      // Product range — on a combined page it lives inside each group
      if (expected.groups) {
        await expect(page.locator("section#product-range")).toHaveCount(0);
        for (const group of expected.groups) {
          await expect(
            page.locator(`section#${group.id} [data-testid="sub-products"] > article`),
          ).toHaveCount(group.subProductCount);
        }
      }

      await expect(page.locator('[data-testid="sub-products"] > article')).toHaveCount(
        expected.subProductCount,
      );

      if (expected.subProductCount === 0) {
        await expect(page.getByRole("heading", { name: "The systems in detail" })).toHaveCount(0);
      }

      // Equipment & Service
      const equipmentSection = page.locator("section#equipment");
      if (expected.equipmentCount > 0) {
        await expect(
          equipmentSection.getByRole("heading", {
            name: "Plant for installation, stressing and grouting",
          }),
        ).toBeVisible();
        await expect(equipmentSection.locator("h3")).toHaveCount(expected.equipmentCount);
      } else {
        await expect(equipmentSection).toHaveCount(0);
      }

      // Standards & Compliance
      const standards = page.locator("section#standards");
      await expect(standards).toHaveCount(expected.hasStandards ? 1 : 0);
      if (expected.hasStandards) {
        await expect(
          standards.getByRole("heading", { name: "Designed, tested and certified against" }),
        ).toBeVisible();
      }
    });

    test(`${slug} system supply matches its parts list`, async ({ page }) => {
      await page.goto(`/technologies/${slug}`);

      /* Combined pages carry a parts list inside each product line. */
      if (expected.groups) {
        await scrollThroughPage(page);
        for (const group of expected.groups) {
          const section = page.locator(`section#${group.id}`);
          await expect(section.getByText("System Supply", { exact: true })).toBeVisible();
          await expect(
            section.getByRole("heading", { name: `${group.name} components` }),
          ).toBeVisible();
          await expect(section.locator("figure")).toHaveCount(group.componentCount);
        }
        await expect(page.locator("main figure")).toHaveCount(expected.componentCount);
        return;
      }

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

        /* Polled, not asserted once: the dev image optimizer queues, and
           these pages now carry up to nine product shots apiece. */
        await expect
          .poll(
            () =>
              card.locator("img").evaluate((el) => (el as HTMLImageElement).naturalWidth),
            { message: `component ${i} image should decode`, timeout: 25_000 },
          )
          .toBeGreaterThan(0);
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
    await page.goto("/technologies/bearing-expansion-joints-anti-seismic-device");
    await scrollThroughPage(page);

    const figures = page.locator("section#bearing figure");
    await expect(figures).toHaveCount(7);

    await expect(figures.locator("h3")).toHaveText([
      "Elastomeric Bearing",
      "Pot Bearing",
      "Spherical Bearing",
      /* Added from the 2026 profile deck. */
      "Bearings",
      /* Added from the 2026 render set. */
      "Laminated Elastomeric Bearing (Square)",
      "Laminated Elastomeric Bearing (Round)",
      "Load Testing Rig",
    ]);

    /* Studio shots are cut out on white, so the image plate must be light
       even though the surrounding card is dark, and the part is contained
       rather than cropped — these are parts, not scenery. */
    const studio = await figures
      .first()
      .locator("img")
      .evaluate((el) => ({
        plate: getComputedStyle(el.parentElement!).backgroundColor,
        fit: getComputedStyle(el).objectFit,
      }));
    expect(studio.plate).toBe("rgb(255, 255, 255)");
    expect(studio.fit).toBe("contain");

    /* The profile-deck renders carry their own dark ground, so they take a
       dark plate and fill it — a white plate would frame them in a border. */
    const deck = await figures
      .filter({ has: page.getByRole("heading", { name: "Bearings", exact: true }) })
      .locator("img")
      .evaluate((el) => ({
        plate: getComputedStyle(el.parentElement!).backgroundColor,
        fit: getComputedStyle(el).objectFit,
      }));
    expect(deck.plate).not.toBe("rgb(255, 255, 255)");
    expect(deck.fit).toBe("cover");
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

  test("combined page links each product line from the hero", async ({ page }) => {
    await page.goto("/technologies/bearing-expansion-joints-anti-seismic-device");

    const jump = page.getByRole("navigation", { name: "Sections on this page" });
    await expect(jump.locator("a")).toHaveText([
      "Bearing",
      "Expansion Joints",
      "Anti-Seismic Device",
    ]);

    await jump.getByRole("link", { name: "Expansion Joints" }).click();
    await page.waitForURL("**#expansion-joints");
    await expect(page.locator("section#expansion-joints h2")).toBeInViewport();
  });

  test("retired per-line URLs redirect to their section on the combined page", async ({
    request,
  }) => {
    for (const id of ["bearing", "expansion-joints", "anti-seismic-device"]) {
      const response = await request.get(`/technologies/${id}`, { maxRedirects: 0 });
      expect(response.status(), id).toBe(308);
      expect(response.headers().location, id).toBe(`/technologies/bearing-expansion-joints-anti-seismic-device#${id}`);
    }
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
