import { expect, test } from "@playwright/test";

test.use({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

test("PostHog initializes and captures the initial page view", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "One browser verifies the integration");

  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false });

    // Record every posthog.capture(event, …) at the SDK boundary. The initial
    // pageview is sent with `immediate: true`, i.e. navigator.sendBeacon, which
    // headless Chromium drops — so sniffing the network request is unreliable
    // across browsers. Spying on the capture call verifies the same behaviour
    // (the app told PostHog about the pageview) without depending on transport.
    const w = window as unknown as {
      posthog?: { capture?: (...args: unknown[]) => unknown };
      __capturedEvents?: string[];
    };
    w.__capturedEvents = [];
    let instance: { capture?: (...args: unknown[]) => unknown } | undefined;
    Object.defineProperty(window, "posthog", {
      configurable: true,
      get: () => instance,
      set: (value: { capture?: (...args: unknown[]) => unknown } | undefined) => {
        instance = value;
        if (value && typeof value.capture === "function") {
          const original = value.capture.bind(value);
          value.capture = (...args: unknown[]) => {
            if (typeof args[0] === "string") w.__capturedEvents!.push(args[0]);
            return original(...args);
          };
        }
      },
    });
  });

  // Stub PostHog's ingestion endpoint so no real analytics traffic is sent.
  await page.route(/^https:\/\/.*\.posthog\.com\/.*$/, (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
  );

  await page.goto("/");

  const readClientState = () =>
    page.evaluate(() => {
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

  // PostHog boots lazily on requestIdleCallback (up to a 4s timeout) so its
  // parse + init cost stays off the critical path. Wait for it to load before
  // asserting rather than reading synchronously right after navigation.
  await expect.poll(async () => (await readClientState()).loaded, { timeout: 8_000 }).toBe(true);

  expect(await readClientState()).toEqual({
    exists: true,
    loaded: true,
    capturing: true,
    host: "https://us.i.posthog.com",
    tokenPrefix: "phx_",
  });

  // The buffered pageview flushes once PostHog is ready.
  await expect
    .poll(
      () =>
        page.evaluate(
          () => (window as unknown as { __capturedEvents?: string[] }).__capturedEvents ?? [],
        ),
      { timeout: 10_000 },
    )
    .toContain("$pageview");
});
