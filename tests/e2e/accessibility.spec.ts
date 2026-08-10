import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const representativeRoutes = [
  "/",
  "/fr",
  "/for/network",
  "/fr/for/network",
  "/brief",
  "/work/industrial-park-network-1200-acres",
  "/fr/work/industrial-park-network-1200-acres",
  "/blog",
  "/blog/two-id-cards-per-a4-erpnext",
] as const;

const wcag21LevelAA = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function expectNoWcagViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(wcag21LevelAA).analyze();

  const summary = violations.map(({ help, id, impact, nodes }) => ({
    help,
    id,
    impact,
    nodes: nodes.map(({ failureSummary, target }) => ({ failureSummary, target })),
  }));

  expect(summary, "Page must have no automated WCAG 2.1 A/AA violations").toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\/.*\.posthog\.com\/.*$/, (route) => route.abort());
});

for (const route of representativeRoutes) {
  test(`${route} passes automated WCAG 2.1 AA checks`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    await expectNoWcagViolations(page);
  });
}

test("open navigation passes automated WCAG checks", async ({ page }, testInfo) => {
  await page.goto("/");

  if (testInfo.project.name === "desktop-1440") {
    await page.getByRole("button", { name: "Open command palette", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
  } else {
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await expect(page.getByRole("navigation", { name: "Mobile menu" })).toBeVisible();
  }

  await expectNoWcagViolations(page);
});

test("CV dialog passes automated WCAG checks", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Download CV", exact: true }).first().click();
  await expect(page.getByRole("dialog", { name: "Curriculum vitae" })).toBeVisible();

  await expectNoWcagViolations(page);
});
