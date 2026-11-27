// Lighthouse CI : audit du build de production local (pas de l'aperçu Vercel).
// Utilise le Chromium installé par Playwright, en local comme en CI.
const { chromium } = require("@playwright/test");

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start -- -p 3200",
      startServerReadyPattern: "Ready",
      url: ["http://localhost:3200/"],
      numberOfRuns: 3,
      chromePath: chromium.executablePath(),
      settings: { chromeFlags: "--no-sandbox" },
    },
    assert: {
      assertions: {
        // La performance varie sur les machines GitHub : simple avertissement.
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
