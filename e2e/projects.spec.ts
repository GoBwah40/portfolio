import { expect, test } from "@playwright/test";
import { gotoTheme } from "./helpers";

test.describe("Sommaire des projets (Japon minimal)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("suit le projet lu et mène au projet cliqué", async ({ page }) => {
    await gotoTheme(page, "japon", "light");
    const index = page.getByRole("navigation", { name: "Sommaire des projets" });
    await expect(index).toBeVisible();

    await page.locator("#virgule").evaluate((el) => el.scrollIntoView({ block: "center" }));
    await expect(index.locator("[aria-current]")).toContainText("Virgule");

    await index.getByRole("link", { name: /Night Binder/ }).click();
    await expect(page).toHaveURL(/#night-binder$/);
    await expect(index.locator("[aria-current]")).toContainText("Night Binder");
  });

  test("n'apparaît pas dans les autres styles", async ({ page }) => {
    await gotoTheme(page, "sobre", "light");
    await expect(page.getByRole("navigation", { name: "Sommaire des projets" })).toBeHidden();
  });
});
