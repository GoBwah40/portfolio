import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { DAS, MODES, gotoTheme } from "./helpers";

const WCAG_22_AA = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test.describe("Accessibilité (axe, WCAG 2.2 AA)", () => {
  for (const da of DAS) {
    for (const mode of MODES) {
      test(`${da} / ${mode}`, async ({ page }) => {
        await gotoTheme(page, da, mode);
        await page.evaluate(() => document.fonts.ready);
        const { violations } = await new AxeBuilder({ page }).withTags(WCAG_22_AA).analyze();
        const summary = violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          targets: v.nodes.map((n) => n.target.join(" ")).slice(0, 5),
          detail: v.nodes[0]?.failureSummary,
        }));
        expect(summary).toEqual([]);
      });
    }
  }
});
