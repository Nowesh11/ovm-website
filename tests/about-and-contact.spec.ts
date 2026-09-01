import { test, expect } from "@playwright/test";
import { brokenImages, collectConsoleErrors, scrollThroughPage } from "./helpers";

test.describe("about page", () => {
  test("renders hero, intro and stats", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto("/about");

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Global leader in prestressing technology");
    await expect(page.getByText("Founded in 1966", { exact: false })).toBeVisible();

    await page.locator("text=Turnover in 2024").scrollIntoViewIfNeeded();
    await expect(page.getByText("USD 571M")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText("80+", { exact: true })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("shows the timeline with all 4 milestones, not the projects carousel", async ({
    page,
  }) => {
    await page.goto("/about");

    const heading = page.getByRole("heading", { name: "Six decades of prestressing" });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    const timeline = page.locator("section").filter({ has: heading }).locator("ol");
    await expect(timeline.locator("> li")).toHaveCount(4);

    for (const year of ["1966", "2015", "2023", "Today"]) {
      await expect(timeline.getByText(year, { exact: true })).toBeVisible();
    }
    await expect(timeline.getByRole("heading", { name: "OVM founded" })).toBeVisible();
    await expect(
      timeline.getByRole("heading", { name: "OVM Malaysia established" }),
    ).toBeVisible();

    /* The FeaturedProjects carousel must no longer be on this page. */
    await expect(page.getByRole("region", { name: "Reference projects" })).toHaveCount(0);
  });

  test("core expertise rows link to technology pages", async ({ page, request }) => {
    await page.goto("/about");
    const heading = page.getByRole("heading", { name: "Our core of expertise" });
    await heading.scrollIntoViewIfNeeded();

    const section = page.locator("section").filter({ has: heading });
    const hrefs = await section
      .locator("a")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")!));

    expect(hrefs).toContain("/technologies/post-tensioning-systems");
    expect(hrefs).toContain("/technologies/cable-systems");
    expect(hrefs).toContain("/technologies/bearing");

    for (const href of hrefs.filter((h) => h.startsWith("/technologies/"))) {
      expect((await request.get(href)).status()).toBe(200);
    }
  });
});

test.describe("contact page", () => {
  test("address, phone and email carry the correct hrefs", async ({ page }) => {
    await page.goto("/contact");

    /* Scoped to the contact card — the Footer and the Careers block below
       carry the same mailto: link, so an unscoped locator matches thrice. */
    const card = page.locator("#contact-details");
    await expect(
      card.getByRole("heading", { name: "Reach us directly" }),
    ).toBeVisible();

    const address = card.locator('a[href^="https://www.google.com/maps/search/"]');
    await expect(address).toHaveCount(1);
    const mapHref = await address.getAttribute("href");
    expect(mapHref).toContain("api=1");
    expect(mapHref).toContain("Kota+Damansara");
    expect(mapHref).toContain("Petaling+Jaya");
    await expect(address).toHaveAttribute("target", "_blank");
    await expect(address).toHaveAttribute("rel", /noopener/);

    const phone = card.locator('a[href^="tel:"]');
    await expect(phone).toHaveCount(1);
    await expect(phone).toHaveAttribute("href", "tel:+60173720090");
    /* Display text stays readable even though the href is normalised. */
    await expect(phone).toContainText("017-372 0090");

    const email = card.locator('a[href^="mailto:"]');
    await expect(email).toHaveCount(1);
    await expect(email).toHaveAttribute(
      "href",
      "mailto:guox@ovm.cn,keertigaletchumanan@ovm.cn",
    );
    /* The second recipient rides in the href only — the card still shows
       the one public address. */
    await expect(email).toContainText("guox@ovm.cn");
    await expect(email).not.toContainText("keertigaletchumanan");
  });

  test("google map iframe points at the office address", async ({ page }) => {
    await page.goto("/contact");
    const iframe = page.locator("iframe");

    await expect(iframe).toHaveCount(1);
    const src = await iframe.getAttribute("src");
    expect(src).toContain("google.com/maps");
    expect(src).toContain("output=embed");
    expect(decodeURIComponent(src!)).toContain("Kota Damansara");
  });

  test("form validates before opening WhatsApp", async ({ page }) => {
    await page.goto("/contact");

    const opened: string[] = [];
    await page.exposeFunction("__recordOpen", (url: string) => {
      opened.push(url);
    });
    await page.addInitScript(() => {
      window.open = ((url: string) => {
        // @ts-expect-error injected by exposeFunction
        window.__recordOpen(url);
        return null;
      }) as typeof window.open;
    });
    await page.reload();

    await page.getByRole("button", { name: /Send via WhatsApp/i }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter your email address.")).toBeVisible();
    await expect(page.getByText("Please tell us how we can help.")).toBeVisible();
    expect(opened, "invalid submit must not open WhatsApp").toEqual([]);
  });

  test("submitting opens a WhatsApp deep link containing the form data", async ({ page }) => {
    await page.goto("/contact");

    const opened: string[] = [];
    await page.exposeFunction("__recordOpen", (url: string) => {
      opened.push(url);
    });
    await page.addInitScript(() => {
      window.open = ((url: string) => {
        // @ts-expect-error injected by exposeFunction
        window.__recordOpen(url);
        return null;
      }) as typeof window.open;
    });
    await page.reload();

    const name = "Nowesh Kumar";
    const message = "We need post-tensioning for a viaduct in Selangor.";

    await page.locator("#name").fill(name);
    await page.locator("#email").fill("nowesh03@gmail.com");
    await page.locator("#phone").fill("017-372 0090");
    await page.locator("#message").fill(message);
    await page.getByRole("button", { name: /Send via WhatsApp/i }).click();

    await expect.poll(() => opened.length).toBe(1);

    const url = opened[0];
    expect(url.startsWith("https://wa.me/60173720090?text=")).toBe(true);

    const text = decodeURIComponent(url.split("?text=")[1]);
    expect(text).toContain(name);
    expect(text).toContain(message);
    expect(text).toContain("nowesh03@gmail.com");
    expect(text).toContain("017-372 0090");

    await expect(page.getByRole("heading", { name: "WhatsApp opened" })).toBeVisible();
  });

  test("contact page has no broken images", async ({ page }) => {
    await page.goto("/contact");
    await scrollThroughPage(page);
    expect(await brokenImages(page)).toEqual([]);
  });
});
