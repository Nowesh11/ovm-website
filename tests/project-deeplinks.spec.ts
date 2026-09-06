import { test, expect } from "@playwright/test";
import { DIAGRAM_IMAGES, PROFILE_2026_PROJECTS, scrollThroughPage } from "./helpers";

/* The carousel lazily loads 25 photos and the deep-link test waits on a
   smooth scroll plus a 1.5s highlight, so the default 30s is too tight. */
test.describe.configure({ timeout: 90_000 });

test.describe("project deep links", () => {
  test("every carousel card carries a project-<slug> anchor id", async ({ page }) => {
    await page.goto("/");
    const rail = page.getByRole("region", { name: "Reference projects" });
    await rail.scrollIntoViewIfNeeded();

    const ids = await rail
      .locator("article")
      .evaluateAll((els) => els.map((el) => el.id));

    expect(ids.length).toBeGreaterThan(20);
    for (const id of ids) expect(id).toMatch(/^project-[a-z0-9-]+$/);
    /* Ids are the link targets, so duplicates would break the deep links. */
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("the 2026 profile-deck projects render with their photos", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const rail = page.getByRole("region", { name: "Reference projects" });
    await rail.scrollIntoViewIfNeeded();

    for (const { slug, title, image } of PROFILE_2026_PROJECTS) {
      const card = page.locator(`#project-${slug}`);
      await expect(card).toHaveCount(1);
      await card.scrollIntoViewIfNeeded();
      await expect(card).toContainText(title);

      const img = card.locator("img");
      await expect(img).toHaveAttribute("src", new RegExp(encodeURIComponent(image)));

      /* Asserted over HTTP rather than by polling naturalWidth: the dev
         image optimizer leaves cards deep in this rail undecoded even when
         they are on screen (a production build loads all 25), so a decode
         assertion here would be testing the dev server, not the site. */
      expect((await request.get(image)).status(), `${image} should be served`).toBe(200);
      const optimised = await request.get(
        `/_next/image?url=${encodeURIComponent(image)}&w=640&q=75`,
      );
      expect(optimised.status(), `${image} should optimise`).toBe(200);
    }
  });

  test("ECRL carries its expanded scope text", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("#project-east-coast-rail-link-ecrl");
    await card.scrollIntoViewIfNeeded();

    await expect(card).toContainText("intelligent tensioning equipment");
    await expect(card).toContainText("approximately 665 kilometers");
  });

  test("reference project cards link only where a carousel entry exists", async ({
    page,
  }) => {
    await page.goto("/technologies/cable-systems");
    await scrollThroughPage(page);

    const section = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: "Reference Projects" }) });

    /* Jepak Bridge is in the carousel as "Bintulu-Jepak Bridge". */
    const jepak = section.locator("article").filter({ hasText: "Jepak Bridge" });
    await expect(jepak.locator("a")).toHaveAttribute(
      "href",
      "/#project-bintulu-jepak-bridge",
    );

    /* The overseas projects have no carousel card, so no link at all —
       a href to a missing anchor would scroll nowhere. */
    const overseas = section.locator("article").filter({ hasText: "FAST Telescope" });
    await expect(overseas).toHaveCount(1);
    await expect(overseas.locator("a")).toHaveCount(0);

    /* Every link that is rendered must point at an id that exists. */
    const hrefs = await section
      .locator("a")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")!));

    await page.goto("/");
    for (const href of hrefs) {
      expect(href.startsWith("/#project-")).toBe(true);
      await expect(page.locator(`#${href.slice(2)}`)).toHaveCount(1);
    }
  });

  test("clicking a reference project scrolls the homepage card into view and highlights it", async ({
    page,
  }) => {
    await page.goto("/technologies/cable-systems");
    await scrollThroughPage(page);

    await page
      .locator('a[href="/#project-bintulu-jepak-bridge"]')
      .first()
      .click();

    await page.waitForURL("**/#project-bintulu-jepak-bridge", { timeout: 60_000 });

    const card = page.locator("#project-bintulu-jepak-bridge");

    /* The highlight is added on arrival and removed ~1.5s later. */
    await expect
      .poll(
        () => card.evaluate((el) => el.classList.contains("anchor-highlight")),
        { timeout: 3_000, intervals: [50] },
      )
      .toBe(true);

    /* And the scroll actually landed on it — vertically in the viewport and
       horizontally inside the rail. */
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

    /* The ring clears itself rather than sticking. */
    await expect
      .poll(() => card.evaluate((el) => el.classList.contains("anchor-highlight")), {
        timeout: 6_000,
      })
      .toBe(false);
  });

  test("the ECRL card on the post-tensioning page deep-links to the carousel", async ({
    page,
  }) => {
    await page.goto("/technologies/post-tensioning-systems");
    await scrollThroughPage(page);

    await expect(
      page.locator('a[href="/#project-east-coast-rail-link-ecrl"]'),
    ).toHaveCount(1);
  });
});

test.describe("technical reference diagrams", () => {
  test("cable systems renders every diagram and they all decode", async ({ page }) => {
    await page.goto("/technologies/cable-systems");

    const heading = page.getByRole("heading", { name: "How the system fits together" });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    const section = page.locator("section").filter({ has: heading });
    await expect(section.getByText("Technical Reference", { exact: true })).toBeVisible();

    const cards = section.locator("figure");
    await expect(cards).toHaveCount(DIAGRAM_IMAGES.length);

    await scrollThroughPage(page);
    for (let i = 0; i < DIAGRAM_IMAGES.length; i += 1) {
      const img = cards.nth(i).locator("img");
      await expect
        .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
      await expect(cards.nth(i).locator("h3")).not.toBeEmpty();
    }
  });

  test("technologies without diagrams skip the section entirely", async ({ page }) => {
    for (const slug of ["bearing", "dampers", "post-tensioning-systems"]) {
      await page.goto(`/technologies/${slug}`);
      await scrollThroughPage(page);
      await expect(page.getByText("Technical Reference", { exact: true })).toHaveCount(0);
    }
  });

  test("every diagram file is served without a 404", async ({ request }) => {
    for (const src of DIAGRAM_IMAGES) {
      expect((await request.get(src)).status(), `${src} should be served`).toBe(200);
    }
  });
});
