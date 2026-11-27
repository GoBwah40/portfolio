import { expect, test } from "@playwright/test";
import { DAS, MODES, gotoTheme } from "./helpers";

test.describe("Pas de défilement horizontal à 375 px", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const da of DAS) {
    for (const mode of MODES) {
      test(`${da} / ${mode}`, async ({ page }) => {
        await gotoTheme(page, da, mode);
        await page.evaluate(() => document.fonts.ready);
        const { scroll, client } = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          client: document.documentElement.clientWidth,
        }));
        expect(scroll).toBeLessThanOrEqual(client);
      });
    }
  }
});
