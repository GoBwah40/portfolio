import type { Page } from "@playwright/test";

export const DAS = ["sobre", "japon", "brutal"] as const;
export const MODES = ["light", "dark"] as const;

export const DA_LABELS = { sobre: "Sobre", japon: "Japon minimal", brutal: "Néo-brutaliste" };
export const MODE_LABELS = { light: "Clair", dark: "Sombre", system: "Auto" };

/** Ouvre la page avec un style et un mode donnés, via les paramètres d'URL. */
export async function gotoTheme(page: Page, da: string, mode: string) {
  await page.goto(`/?theme=${da}&mode=${mode}`);
  await page.locator("html").waitFor();
}
