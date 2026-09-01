import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Screenshots written by visual-and-responsive.spec.ts live under tests/, so
     keep Playwright's own artifacts out of that folder. */
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  /* Capped: the Next dev server compiles routes on demand, and more workers
     than this just queue behind the same compiler. */
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],

  /* Compiles every route once before the workers start. */
  globalSetup: "./tests/global-setup.ts",

  expect: { timeout: 10_000 },

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 20_000,
    navigationTimeout: 60_000,
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    /* The dev server compiles routes on first hit, so give it room. */
    timeout: 180_000,
  },
});
