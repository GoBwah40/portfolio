// Contenu du portfolio : modifier ce fichier suffit pour mettre à jour le site.

export const profile = {
  name: "Matthias Della-Libera",
  role: "Développeur full-stack TypeScript",
  intro:
    "Je conçois des applications web de bout en bout : interface, API, base de données, tests et mise en production. " +
    "J'aime les produits soignés et le code qui se laisse maintenir.",
  github: "https://github.com/GoBwah40",
  // Destinataire du formulaire de contact (non affiché tel quel sur la page).
  email: "dellalibera40@gmail.com",
  linkedin: "https://www.linkedin.com/in/matthias-della-libera-9b6721174/",
  // Accroche du hero, une par direction artistique.
  headlines: {
    sobre: "Des applications web complètes, de l'idée à la production.",
    japon: "Construire avec soin, livrer avec calme.",
  },
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  period: string;
  commits: number;
  image: { src: string; width: number; height: number; alt: string; portrait?: boolean };
  /** Numéral japonais (DA Japon minimal). */
  kanji: string;
  /** Couleur de carte (DA néo-brutaliste). */
  color: "sky" | "coral" | "lime" | "lilac";
  /** Étiquette collée sur la carte (DA néo-brutaliste). */
  sticker?: string;
  demo?: string;
  code?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "gaijinjob",
    kanji: "一", color: "sky", sticker: "★ projet phare",
    name: "GaijinJob",
    tagline: "Plateforme d'emploi full-stack",
    summary:
      "Site d'offres d'emploi qui met en relation des candidats étrangers et des employeurs des campagnes japonaises. " +
      "Les offres sont vérifiées par les préfectures avant publication, l'interface est multilingue.",
    highlights: [
      "Monorepo pnpm : front Next.js, API NestJS, PostgreSQL via Prisma, paquet partagé",
      "Client d'API typé généré à partir du schéma OpenAPI de l'API",
      "Authentification par session (Better Auth), stockage S3 avec repli local",
      "8 décisions d'architecture documentées (ADR), CI lint + types + tests + code mort",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "next-intl", "Docker"],
    period: "2026",
    commits: 289,
    image: { src: "/projects/gaijinjob.jpg", width: 1600, height: 1000, alt: "Page d'accueil de GaijinJob" },
    demo: "https://gaijinjob.vercel.app",
  },
  {
    slug: "virgule",
    kanji: "二", color: "coral",
    name: "Virgule",
    tagline: "Décider à plusieurs, sans compte",
    summary:
      "Brainstorming et vote en petit groupe : on partage un lien, chacun donne son prénom, propose des idées et vote anonymement. " +
      "Plusieurs tours, bilan exportable en Markdown, CSV ou PDF, ajout au calendrier.",
    highlights: [
      "Temps réel avec Pusher, et repli automatique sur du polling",
      "Limitation de débit par IP et par participant (Upstash Redis)",
      "Tests Vitest + Playwright de bout en bout, Storybook, CI sur chaque push",
      "Versions sémantiques, notes de version bilingues, déploiement automatique sur tag",
    ],
    stack: ["Next.js 16", "Prisma", "Turso", "Pusher", "shadcn/ui", "Playwright"],
    period: "2026",
    commits: 123,
    image: { src: "/projects/virgule.jpg", width: 1600, height: 1000, alt: "Écran de création de séance de Virgule" },
    demo: "https://virgule.vercel.app",
    code: "https://github.com/GoBwah40/virgule",
  },
  {
    slug: "deckbuilder",
    kanji: "三", color: "lime", sticker: "▶ jouable",
    name: "Deckbuilder",
    tagline: "Jeu de cartes roguelike",
    summary:
      "Jeu de combat au tour par tour à base de cartes, dans l'esprit des roguelikes deckbuilders. " +
      "Le moteur de jeu est écrit en TypeScript pur et testé, l'interface React ne fait que l'afficher.",
    highlights: [
      "Moteur découplé de React : un réducteur pur combatReducer(state, action)",
      "Journal d'événements rejoué pas à pas pour animer les combats",
      "Aléatoire seedé : une seed donne une partie rejouable à l'identique",
      "IA ennemie aux intentions pondérées, reliques, récompenses par rareté",
    ],
    stack: ["TypeScript", "React", "Vite", "Vitest", "Tailwind"],
    period: "2024 – 2026",
    commits: 59,
    image: { src: "/projects/deckbuilder.jpg", width: 1600, height: 1000, alt: "Écran de combat du deckbuilder" },
    note: "Démo sur demande",
  },
  {
    slug: "night-binder",
    kanji: "四", color: "lilac",
    name: "Night Binder",
    tagline: "Compagnon mobile de jeu de cartes",
    summary:
      "Application mobile-first pour gérer sa collection du jeu de cartes Cyberpunk : catalogue, prix Cardmarket et création de decks. " +
      "Application de fan non officielle.",
    highlights: [
      "Supabase (Postgres) avec règles d'accès par utilisateur (RLS) et export RGPD",
      "Synchronisation du catalogue et des prix toutes les 12 h via GitHub Actions",
      "Moteur de validité des decks (formats, cartes bannies)",
      "Hors ligne d'abord : stockage local synchronisé, service worker, mode démo",
    ],
    stack: ["Next.js 15", "Supabase", "Tailwind v4", "Vitest", "GitHub Actions"],
    period: "2026",
    commits: 45,
    image: {
      src: "/projects/night-binder.jpg",
      width: 1600,
      height: 1000,
      alt: "Trois écrans de Night Binder en mode démo : catalogue, collection et fiche de carte",
    },
    demo: "https://cyberpunk-tcg-murex.vercel.app",
  },
];

// Dépôts anciens, plus maintenus : affichés sans lien, avec la mention « indisponible ».
export const earlier = [
  { name: "CV en ligne", stack: "HTML, CSS, JS" },
  { name: "Projet CEFIM", stack: "Site vitrine" },
  { name: "Ma Ghibli liste", stack: "JS, API" },
  { name: "Pomodoro", stack: "Kotlin, Android" },
  { name: "MemoApp", stack: "Java" },
];
