import { expect, test } from "@playwright/test";
import { DAS, DA_LABELS, MODE_LABELS } from "./helpers";

const html = (page: import("@playwright/test").Page) => page.locator("html");

async function openPanel(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Changer de style" }).click();
  await expect(page.getByRole("dialog", { name: "Changer de style" })).toBeVisible();
}

test.describe("Sélecteur de style", () => {
  for (const da of DAS) {
    test(`choisir la direction « ${da} » et la retrouver après rechargement`, async ({ page }) => {
      await page.goto("/");
      await openPanel(page);
      await page
        .getByRole("radiogroup", { name: "Direction artistique" })
        .getByRole("radio", { name: DA_LABELS[da] })
        .click();
      await expect(html(page)).toHaveAttribute("data-da", da);
      expect(await page.evaluate(() => localStorage.getItem("portfolio-da"))).toBe(da);

      await page.reload();
      await expect(html(page)).toHaveAttribute("data-da", da);
      await openPanel(page);
      await expect(page.getByRole("radio", { name: DA_LABELS[da] })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });
  }

  for (const mode of ["light", "dark", "system"] as const) {
    test(`choisir le mode « ${mode} » et le retrouver après rechargement`, async ({ page }) => {
      await page.goto("/");
      await openPanel(page);
      await page
        .getByRole("radiogroup", { name: "Mode" })
        .getByRole("radio", { name: MODE_LABELS[mode] })
        .click();
      await expect(html(page)).toHaveAttribute("data-mode", mode);
      expect(await page.evaluate(() => localStorage.getItem("portfolio-mode"))).toBe(mode);

      await page.reload();
      await expect(html(page)).toHaveAttribute("data-mode", mode);
    });
  }

  test("se ferme avec Échap", async ({ page }) => {
    await page.goto("/");
    await openPanel(page);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Changer de style" })).toBeHidden();
  });

  test("applique ?theme=japon&mode=dark depuis l'URL", async ({ page }) => {
    await page.goto("/?theme=japon&mode=dark");
    await expect(html(page)).toHaveAttribute("data-da", "japon");
    await expect(html(page)).toHaveAttribute("data-mode", "dark");
  });

  test("ignore une valeur inconnue dans l'URL", async ({ page }) => {
    await page.goto("/?theme=inconnu&mode=fluo");
    await expect(html(page)).toHaveAttribute("data-da", "sobre");
    await expect(html(page)).toHaveAttribute("data-mode", "system");
  });

  test.describe("sans flash : attributs posés avant l'hydratation", () => {
    // Le JavaScript de Next est bloqué : seul le script inline du <head> peut poser les attributs.
    test.beforeEach(async ({ page }) => {
      await page.route("**/_next/static/**/*.js", (route) => route.abort());
    });

    test("depuis le localStorage", async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem("portfolio-da", "brutal");
        localStorage.setItem("portfolio-mode", "dark");
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      expect(await page.evaluate(() => ({ ...document.documentElement.dataset }))).toEqual({
        da: "brutal",
        mode: "dark",
      });
    });

    test("depuis l'URL", async ({ page }) => {
      await page.goto("/?theme=japon&mode=light", { waitUntil: "domcontentloaded" });
      expect(await page.evaluate(() => ({ ...document.documentElement.dataset }))).toEqual({
        da: "japon",
        mode: "light",
      });
    });
  });
});
