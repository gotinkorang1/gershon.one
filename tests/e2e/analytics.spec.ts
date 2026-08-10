import { expect, test } from "@playwright/test";

test.use({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

test("PostHog sends the initial page view to its ingestion endpoint", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "One browser verifies the integration");

  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false });
  });

  let pageviewSent = false;
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (request.method() === "POST" && url.hostname.endsWith("posthog.com")) pageviewSent = true;
  });
  await page.route(/^https:\/\/.*\.posthog\.com\/.*$/, (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
  );

  await page.goto("/");
  const clientState = await page.evaluate(() => {
    const client = (
      window as unknown as {
        posthog?: {
          __loaded?: boolean;
          is_capturing?: () => boolean;
          config?: { api_host?: string; token?: string };
        };
      }
    ).posthog;

    return {
      exists: Boolean(client),
      loaded: Boolean(client?.__loaded),
      capturing: client?.is_capturing?.() ?? false,
      host: client?.config?.api_host,
      tokenPrefix: client?.config?.token?.slice(0, 4),
    };
  });
  expect(clientState).toEqual({
    exists: true,
    loaded: true,
    capturing: true,
    host: "https://us.i.posthog.com",
    tokenPrefix: "phx_",
  });
  await expect.poll(() => pageviewSent, { timeout: 10_000 }).toBe(true);
});
