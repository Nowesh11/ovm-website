import { test, expect } from "@playwright/test";
import {
  CATALOGUE_DOWNLOADS,
  JOB_TITLES,
  NEWS_SLUGS,
  brokenImages,
  collectConsoleErrors,
  revealFloatingButton,
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

test.describe("catalogue downloads", () => {
  for (const [route, pdf] of Object.entries(CATALOGUE_DOWNLOADS)) {
    test(`${route} offers ${pdf} as a download, not a navigation`, async ({
      page,
      request,
    }) => {
      await page.goto(route);
      /* The button is floating now — it reveals itself past the hero. */
      await revealFloatingButton(page);

      const link = page.locator(`a[href="${pdf}"]`);
      await expect(link).toHaveCount(1);

      /* `download` is what makes the browser save the file instead of
         navigating away from the page. */
      await expect(link).toHaveAttribute("download", "");
      await expect(link).not.toHaveAttribute("target", "_blank");

      const response = await request.get(pdf);
      expect(response.status(), `${pdf} should exist`).toBe(200);
      expect(response.headers()["content-type"]).toContain("pdf");
    });
  }

  test("clicking the button actually starts a file download", async ({ page }) => {
    await page.goto("/technologies/post-tensioning-systems");
    await revealFloatingButton(page);

    const link = page.getByRole("link", { name: /Download Catalogue/i });

    const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);

    expect(download.suggestedFilename()).toBe("OVM-Post-Tensioning-System-2025.pdf");
    /* The page must still be where it was — a download, not a navigation. */
    expect(new URL(page.url()).pathname).toBe("/technologies/post-tensioning-systems");
  });

  test("technology pages without a catalogue show no download button", async ({ page }) => {
    for (const slug of ["dampers", "bearing", "expansion-joints"]) {
      await page.goto(`/technologies/${slug}`);
      await revealFloatingButton(page);

      await expect(page.getByRole("link", { name: /Download Catalogue/i })).toHaveCount(0);
      /* Nor any other catalogue — a page without its own PDF must not fall
         back to somebody else's. */
      await expect(page.locator('a[href^="/catalogues/"]')).toHaveCount(0);
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

  test("the new Malaysian reference projects are listed", async ({ page }) => {
    await page.goto("/technologies/post-tensioning-systems");
    const ptProjects = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: "Reference Projects" }) });
    await ptProjects.scrollIntoViewIfNeeded();
    await expect(
      ptProjects.getByRole("heading", { name: "East Coast Rail Link (ECRL)" }),
    ).toBeVisible();

    await page.goto("/technologies/cable-systems");
    await expect(page.getByRole("heading", { name: "Jepak Bridge" })).toBeVisible();

    await page.goto("/technologies/structural-health-monitoring");
    await expect(
      page.getByRole("heading", { name: "Hong Kong Stonecutters Bridge" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Jiangxi Jianyi Bridge" }),
    ).toBeVisible();
  });
});
