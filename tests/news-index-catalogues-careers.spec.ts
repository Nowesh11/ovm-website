import { test, expect } from "@playwright/test";
import {
  CATALOGUE_DOWNLOADS,
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

test.describe("catalogue downloads", () => {
  for (const [route, pdf] of Object.entries(CATALOGUE_DOWNLOADS)) {
    test(`${route} offers ${pdf} as a download, not a navigation`, async ({
      page,
      request,
    }) => {
      await page.goto(route);

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

    const link = page.getByRole("link", { name: /View Catalogue/i });
    await link.scrollIntoViewIfNeeded();

    const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);

    expect(download.suggestedFilename()).toBe("OVM-Post-Tensioning-System-2025.pdf");
    /* The page must still be where it was — a download, not a navigation. */
    expect(new URL(page.url()).pathname).toBe("/technologies/post-tensioning-systems");
  });

  test("technology pages without a catalogue show no download button", async ({ page }) => {
    await page.goto("/technologies/dampers");
    await expect(page.getByRole("link", { name: /View Catalogue/i })).toHaveCount(0);
  });
});

test.describe("careers", () => {
  test("the footer Careers link scrolls to the Careers section on /contact", async ({
    page,
  }) => {
    await page.goto("/");

    const careers = page.locator('footer a[href="/contact#careers"]');
    await careers.scrollIntoViewIfNeeded();
    await expect(careers).toHaveCount(1);

    await careers.click();
    await page.waitForURL("**/contact#careers", { timeout: 60_000 });

    const section = page.locator("#careers");
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Careers at OVM" }),
    ).toBeVisible();

    /* The anchor must have scrolled the section into the viewport, clear of
       the 5rem fixed navbar. */
    const top = await section.evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(0);
    expect(top).toBeLessThan(await page.evaluate(() => window.innerHeight));
  });

  test("the careers email is a mailto link to the one company address", async ({
    page,
  }) => {
    await page.goto("/contact");

    const link = page.locator("#careers a");
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute(
      "href",
      "mailto:guox@ovm.cn,keertigaletchumanan@ovm.cn",
    );
    await expect(link).toHaveText("guox@ovm.cn");

    await expect(page.locator("#careers")).toContainText(
      "Interested in joining our team? Send your resume to guox@ovm.cn",
    );

    /* One link everywhere — the same pair of recipients, no separate
       careers inbox. */
    const mailtos = await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(new Set(mailtos)).toEqual(
      new Set(["mailto:guox@ovm.cn,keertigaletchumanan@ovm.cn"]),
    );
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
    await expect(page.locator("main section").first()).toContainText(
      "more than 160 cable-stayed bridges worldwide",
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
