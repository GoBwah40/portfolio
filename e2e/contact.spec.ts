import { expect, test } from "@playwright/test";
import { profile } from "../app/data";

// Aucun envoi réel : /api/contact est toujours simulé.
test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  async function fillValid(page: import("@playwright/test").Page) {
    await page.getByLabel("Nom").fill("Camille Martin");
    await page.getByLabel("E-mail").fill("camille@example.com");
    await page.getByLabel("Message").fill("Bonjour, j'aimerais discuter d'un projet.");
  }

  test("une soumission vide affiche les 3 erreurs", async ({ page }) => {
    let called = false;
    await page.route("**/api/contact", (route) => {
      called = true;
      return route.abort();
    });
    await page.getByRole("button", { name: "Envoyer le message" }).click();
    await expect(page.locator(".field-error")).toHaveCount(3);
    await expect(page.getByLabel("Nom")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Nom")).toBeFocused();
    expect(called).toBe(false);
  });

  test("un envoi accepté affiche le message de succès", async ({ page }) => {
    let payload: Record<string, string> | undefined;
    await page.route("**/api/contact", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await fillValid(page);
    await page.getByRole("button", { name: "Envoyer le message" }).click();
    await expect(page.getByRole("status")).toContainText("Message envoyé.");
    expect(payload).toMatchObject({ name: "Camille Martin", email: "camille@example.com" });
  });

  test("un refus du serveur affiche l'erreur et l'adresse de repli", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 503, json: { error: "not_configured" } }),
    );
    await fillValid(page);
    await page.getByRole("button", { name: "Envoyer le message" }).click();
    const alert = page.locator(".form-error");
    await expect(alert).toHaveAttribute("role", "alert");
    await expect(alert).toContainText("L'envoi n'est pas encore activé");
    await expect(alert).toContainText(profile.email);
  });
});
