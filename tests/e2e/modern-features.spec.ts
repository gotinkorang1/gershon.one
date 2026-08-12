import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\/.*\.posthog\.com\/.*$/, (route) => route.abort());
});

test("troubleshooting lab completes a real diagnostic path", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: "Compare affected users, media and segments" }).click();
  await page.getByRole("button", { name: "Next check" }).click();
  await page.getByRole("button", { name: "Inspect errors, optical levels and link flaps" }).click();
  await page.getByRole("button", { name: "Next check" }).click();

  await expect(page.getByText("Incident resolved", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Read the fibre latency case study" })).toBeVisible();
});

test("lab tabs expose evidence, architecture and public activity", async ({ page }) => {
  await page.goto("/lab");

  await page.getByRole("tab", { name: "Troubleshoot" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Evidence" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Skills evidence map" })).toBeVisible();
  await page.getByLabel("Select a capability").fill("MikroTik");
  await expect(page.getByRole("button", { name: /MikroTik RouterOS/ })).toBeVisible();

  await page.getByRole("tab", { name: "Architecture" }).click();
  await expect(page.getByRole("heading", { name: "Architecture explorer" })).toBeVisible();
  await page.getByRole("button", { name: "ERP identity workflow" }).click();
  await page.getByRole("button", { name: /A4 PDF/ }).click();
  await expect(page.getByText("two complete cards per sheet", { exact: false })).toBeVisible();

  await page.getByRole("tab", { name: "Activity" }).click();
  await expect(page.getByRole("heading", { name: "Professional activity" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "GitHub activity" })).toBeVisible();
});

test("focused portfolio opens a print-ready matching recruiter pack", async ({ page }) => {
  await page.goto("/for/network");
  const packLink = page.getByRole("link", { name: "Open recruiter pack" });
  await expect(packLink).toHaveAttribute("href", "/pack/network");
  await page.goto("/pack/network");

  await expect(page).toHaveURL(/\/pack\/network$/);
  await expect(page.getByRole("heading", { level: 1, name: /Network Technician/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Print / save PDF" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Relevant experience" })).toBeVisible();
});

test("saved reading persists into the blog index", async ({ page }) => {
  await page.goto("/blog/two-id-cards-per-a4-erpnext");
  await page.getByRole("button", { name: "Save article" }).click();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();
  await page.goto("/blog");

  await expect(page.getByText("Saved articles", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Two ID cards per A4 sheet, straight from ERPNext", exact: true }),
  ).toBeVisible();
});

test("web app manifest exposes install-grade icons and service worker", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "One browser verifies static PWA contracts");
  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBeTruthy();
  const manifest = await manifestResponse.json();
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ sizes: "192x192" }),
      expect.objectContaining({ sizes: "512x512" }),
    ]),
  );

  const worker = await request.get("/sw.js");
  expect(worker.ok()).toBeTruthy();
  expect(worker.headers()["content-type"]).toContain("application/javascript");
  expect(await worker.text()).toContain('url.pathname.startsWith("/api/")');
});
