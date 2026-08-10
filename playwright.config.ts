import { defineConfig } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL,
    channel: process.env.CI ? undefined : "chrome",
    colorScheme: "light",
    contextOptions: { reducedMotion: "reduce" },
    locale: "en-CA",
    permissions: ["clipboard-read", "clipboard-write"],
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: process.env.CI
      ? `npm run start -- --hostname 127.0.0.1 --port ${port}`
      : `npm run dev -- --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    env: {
      NEXT_PUBLIC_POSTHOG_KEY:
        "phx_0000000000000000000000000000000000000000000000000000000000000000",
      NEXT_PUBLIC_POSTHOG_HOST: "https://us.i.posthog.com",
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "phone-320",
      use: { viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true },
    },
    {
      name: "tablet-768",
      use: { viewport: { width: 768, height: 900 }, hasTouch: true },
    },
    {
      name: "desktop-1440",
      use: { viewport: { width: 1440, height: 1000 } },
    },
  ],
});
