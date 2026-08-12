import { expect, test, type Page } from "@playwright/test";

const hydrationErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  hydrationErrors.set(page, errors);
  page.on("console", (message) => {
    if (message.type() === "error" && message.text().includes("Hydration failed")) {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    if (error.message.includes("Hydration failed")) errors.push(error.message);
  });
});

test.afterEach(async ({ page }) => {
  expect(hydrationErrors.get(page) ?? [], "React hydration must remain clean").toEqual([]);
});

const representativeRoutes = [
  "/",
  "/for/network",
  "/brief",
  "/lab",
  "/pack/network",
  "/blog",
  "/blog/two-id-cards-per-a4-erpnext",
] as const;

for (const route of representativeRoutes) {
  test(`${route} stays inside the viewport`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();

    const widths = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
  });
}

test("role-focused navigation preserves a clear active state", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Network", exact: true }).click();

  await expect(page).toHaveURL(/\/for\/network$/);
  await expect(page.getByRole("link", { name: "Network", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByText("Fibre, GPON, MikroTik", { exact: false })).toBeVisible();
});

test("candidate brief controls remain usable and touch friendly", async ({ page }) => {
  await page.goto("/brief");

  const controls = [
    page.getByRole("link", { name: "Download CV", exact: true }),
    page.getByRole("button", { name: "Print / save PDF", exact: true }),
    page.getByRole("button", { name: "Share brief", exact: true }),
    page.getByRole("link", { name: "Save contact", exact: true }),
    page.getByRole("button", { name: "Copy all details", exact: true }),
  ];

  for (const control of controls) {
    await expect(control).toBeVisible();
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await page.getByRole("button", { name: "Copy all details", exact: true }).click();
  await expect(page.getByRole("button", { name: "Details copied", exact: true })).toBeVisible();
});

test("CV chooser exposes both mobile-safe actions", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Download CV", exact: true }).first();
  await expect(trigger).toBeEnabled();
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Curriculum vitae" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: /View here/ })).toBeVisible();
  await expect(dialog.getByRole("button", { name: /Download PDF/ })).toBeVisible();
});

test("mobile navigation opens without moving the document", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop-1440", "Desktop uses the full navigation bar");

  await page.goto("/");
  const widthBefore = await page.evaluate(() => document.documentElement.scrollWidth);
  await page.getByRole("button", { name: "Open menu", exact: true }).click();

  await expect(page.getByRole("navigation", { name: "Mobile menu" })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Mobile menu" }).getByRole("link", { name: /See how I diagnose/ }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Blog", exact: true }).last()).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(widthBefore);
});

test("desktop command palette includes recruiter actions", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "Command trigger is desktop-only");

  await page.goto("/");
  await page.getByRole("button", { name: "Open command palette", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save contact", exact: true })).toBeVisible();
});

test("French navigation keeps the translated contact action", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.getByRole("link", { name: /Enregistrer le contact/ })).toHaveAttribute(
    "href",
    "/gershon-otinkorang.vcf",
  );
});

test("contact card endpoint returns an importable vCard", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "The endpoint only needs one contract check");

  const response = await request.get("/gershon-otinkorang.vcf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("text/vcard");
  expect(response.headers()["content-disposition"]).toContain("gershon-otinkorang.vcf");

  const body = await response.text();
  expect(body).toContain("BEGIN:VCARD\r\nVERSION:3.0");
  expect(body).toContain("EMAIL;TYPE=INTERNET,WORK:contact@gershon.one");
  expect(body).toContain("END:VCARD\r\n");
});
