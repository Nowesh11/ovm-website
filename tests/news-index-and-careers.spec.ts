import { test, expect } from "@playwright/test";
import {
  JOB_TITLES,
  NEWS_SLUGS,
  brokenImages,
  collectConsoleErrors,
  scrollThroughPage,
  waitForImages,
} from "./helpers";

test.describe("news index", () => {
  test("lists every article, including the Sejingkat milestone", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto("/news");

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("News & Updates");

    const grid = page.locator("main section").nth(1);
    await expect(grid.locator("article")).toHaveCount(NEWS_SLUGS.length);

    for (const slug of NEWS_SLUGS) {
      await expect(grid.locator(`a[href="/news/${slug}"]`)).toHaveCount(1);
    }

    await expect(
      page.getByRole("heading", {
        name: "Milestone Achieved: Sejingkat Bridge P7 Side-Span Closure",
      }),
    ).toBeVisible();

    await scrollThroughPage(page);
    await waitForImages(page);
    expect(await brokenImages(page), "no broken images").toEqual([]);
    expect(errors, "no console errors").toEqual([]);
  });

  test("a card opens its article", async ({ page }) => {
    await page.goto("/news");

    await page.locator('a[href="/news/sejingkat-bridge-p7-closure"]').first().click();
    await page.waitForURL("**/news/sejingkat-bridge-p7-closure", { timeout: 60_000 });

    await expect(page.locator("h1")).toHaveText(
      "Milestone Achieved: Sejingkat Bridge P7 Side-Span Closure",
    );
  });

  test("the navbar News link reaches the index", async ({ page }) => {
    await page.goto("/");

    await page.locator('header a[href="/news"]').first().click();
    await page.waitForURL("**/news", { timeout: 60_000 });
    await expect(page.locator("h1")).toHaveText("News & Updates");
  });

  test("the homepage teaser links through to the index", async ({ page }) => {
    await page.goto("/");

    const allNews = page.locator('#news a[href="/news"]');
    await allNews.scrollIntoViewIfNeeded();
    await expect(allNews).toHaveCount(1);
  });
});

/* The catalogue download feature was removed at the client's request — no
   button, no PDFs in the repo, and nothing served from /catalogues. */
test.describe("catalogue downloads are gone", () => {
  const ROUTES = [
    "/",
    "/about",
    "/contact",
    "/careers",
    "/news",
    "/technologies/post-tensioning-systems",
    "/technologies/cable-systems",
  ] as const;

  test("no page offers a catalogue link or button", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      await scrollThroughPage(page);

      await expect(page.getByRole("link", { name: /Download Catalogue/i })).toHaveCount(0);
      await expect(page.locator('a[href*="/catalogues/"]')).toHaveCount(0);
      await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
    }
  });

  test("the old PDF paths 404", async ({ request }) => {
    const pdfs = [
      "/catalogues/OVM-Post-Tensioning-System-2025.pdf",
      "/catalogues/OVM250-OVMAT-Cable-System-2025.pdf",
      "/catalogues/OVM-Engineering-Solutions-2024.pdf",
      "/api/catalogue",
    ];

    for (const path of pdfs) {
      const response = await request.get(path);
      expect(response.status(), `${path} should be gone`).toBe(404);
    }
  });
});

test.describe("careers", () => {
  test("the footer Careers link opens the dedicated /careers page", async ({ page }) => {
    await page.goto("/");

    /* The old link anchored into /contact#careers; careers is its own page now. */
    await expect(page.locator('footer a[href="/contact#careers"]')).toHaveCount(0);

    const careers = page.locator('footer a[href="/careers"]');
    await careers.scrollIntoViewIfNeeded();
    await expect(careers).toHaveCount(1);

    await careers.click();
    await page.waitForURL("**/careers", { timeout: 60_000 });
    await expect(page.locator("h1")).toHaveText("Join OVM Malaysia");
  });

  test("/careers lists every open role", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto("/careers");

    expect(response?.status()).toBe(200);

    const cards = page.locator("main article");
    await expect(cards).toHaveCount(JOB_TITLES.length);

    for (const title of JOB_TITLES) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }

    /* The three truncated listings say so; the complete one does not. */
    await expect(page.getByText("Full role details available on request")).toHaveCount(3);

    /* Grouped responsibilities only exist on the Finance Manager listing. */
    const finance = page.locator("article#finance-manager");
    await expect(finance).toContainText("Financial Planning, Reporting & Compliance");
    await expect(finance).toContainText("Project Finance & Cost Control");
    await expect(finance).toContainText("Requirements");

    await scrollThroughPage(page);
    expect(errors, "no console errors").toEqual([]);
  });

  test("every Apply now button pre-fills a mailto subject for its role", async ({
    page,
  }) => {
    await page.goto("/careers");

    const buttons = page.getByRole("link", { name: /Apply now/ });
    await expect(buttons).toHaveCount(JOB_TITLES.length);

    const hrefs = await buttons.evaluateAll((els) =>
      els.map((el) => el.getAttribute("href")!),
    );

    hrefs.forEach((href, i) => {
      expect(href.startsWith("mailto:guox@ovm.cn,keertigaletchumanan@ovm.cn?subject=")).toBe(
        true,
      );
      /* Subject rides in encoded, so the colon and spaces survive the client. */
      expect(href).toContain(encodeURIComponent(`Application: ${JOB_TITLES[i]}`));
    });
  });

  test("the contact page no longer carries a careers section", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.locator("#careers")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Careers at OVM" })).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("Interested in joining our team");

    /* Every remaining contact mailto is still the one plain pair of
       recipients — no subject-tagged careers link stayed behind. */
    const mailtos = await page
      .locator("main a[href^='mailto:']")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(new Set(mailtos)).toEqual(
      new Set(["mailto:guox@ovm.cn,keertigaletchumanan@ovm.cn"]),
    );
  });

  test("the homepage news section carries the hiring teaser", async ({ page }) => {
    await page.goto("/");

    const news = page.locator("#news");
    await news.scrollIntoViewIfNeeded();

    /* The heading renders a typographic apostrophe, as the rest of the site does. */
    await expect(news.getByRole("heading", { name: /We[’']re Hiring/ })).toBeVisible();
    await expect(news).toContainText("Join our growing team in Malaysia");

    const cta = news.locator('a[href="/careers"]');
    await expect(cta).toHaveCount(1);
    await expect(cta).toContainText("View open roles");
  });
});

test.describe("enriched technology pages", () => {
  const HEROES = {
    "/technologies/post-tensioning-systems": /post-tensioning-ecrl-malaysia/,
    "/technologies/cable-systems": /cable-systems-jepak-malaysia/,
    "/technologies/structural-health-monitoring": /monitoring-hero-jianyi-sunset/,
  } as const;

  for (const [route, pattern] of Object.entries(HEROES)) {
    test(`${route} leads with its new hero image`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      await page.goto(route);

      const hero = page.locator("main section").first().locator("img").first();
      await expect(hero).toHaveAttribute("src", pattern);
      expect(
        await hero.evaluate((el) => (el as HTMLImageElement).naturalWidth),
      ).toBeGreaterThan(0);

      await scrollThroughPage(page);
      expect(await brokenImages(page), "no broken images").toEqual([]);
      expect(errors, "no console errors").toEqual([]);
    });
  }

  test("catalogue copy replaced the placeholder summaries", async ({ page }) => {
    await page.goto("/technologies/post-tensioning-systems");
    await expect(page.locator("main section").first()).toContainText(
      "one of the earliest post-tensioning systems in China",
    );

    await page.goto("/technologies/cable-systems");
    /* Summary rewritten from the 2026 profile deck — the "160 cable-stayed
       bridges" line moved out with it. */
    await expect(page.locator("main section").first()).toContainText(
      "test reports from CTL and EMPA",
    );

    await page.goto("/technologies/bearing");
    await expect(page.locator("main section").first()).toContainText(
      "JT, AASHTO, BS, JIS",
    );
  });

  test("the Malaysian reference projects are listed", async ({ page }) => {
    const section = () =>
      page
        .locator("section")
        .filter({ has: page.getByRole("heading", { name: "Reference Projects" }) });

    await page.goto("/technologies/post-tensioning-systems");
    await section().scrollIntoViewIfNeeded();
    await expect(
      section().getByRole("heading", { name: "East Coast Rail Link (ECRL)" }),
    ).toBeVisible();

    /* The carousel entry's own name now, not the catalogue's "Jepak Bridge". */
    await page.goto("/technologies/cable-systems");
    await section().scrollIntoViewIfNeeded();
    await expect(
      section().getByRole("heading", { name: "Bintulu-Jepak Bridge" }),
    ).toBeVisible();

    /* Monitoring's reference projects were overseas catalogue entries; with
       the lists consolidated onto the 24 Malaysian projects it has none. */
    await page.goto("/technologies/structural-health-monitoring");
    await scrollThroughPage(page);
    await expect(page.getByRole("heading", { name: "Reference Projects" })).toHaveCount(0);
  });
});
