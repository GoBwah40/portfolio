import { expect, test } from "@playwright/test";

test("les liens externes s'ouvrent dans un nouvel onglet, sans opener ni referrer", async ({
  page,
}) => {
  await page.goto("/");
  const links = await page.locator("a[href^='http']").evaluateAll((as) =>
    as.map((a) => ({
      href: a.getAttribute("href"),
      target: a.getAttribute("target"),
      rel: (a.getAttribute("rel") ?? "").split(/\s+/),
    })),
  );
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    expect(link.target, link.href ?? "").toBe("_blank");
    expect(link.rel, link.href ?? "").toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
  }
});
