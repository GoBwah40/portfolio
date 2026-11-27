// Contenu du portfolio : modifier ce fichier suffit pour mettre à jour le site.

export const profile = {
  name: "Matthias Della-Libera",
  // Version courte affichée dans l'en-tête quand la place manque.
  shortName: "Matthias D.-L.",
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

// Bloc « Présentation ». Rédigé d'après les anciens CV en ligne (dépôts cv et cv_en_Ligne)
// et les projets, complété par l'utilisateur et son profil LinkedIn (expériences, formations).
export const about = {
  paragraphs: [
    "Je viens du Pays basque, et mon chemin vers le code n'a pas été tout droit : j'ai exploré plusieurs voies avant de trouver la mienne. C'est en montant un site WordPress pendant un stage que j'ai découvert la programmation, et je ne l'ai plus lâchée.",
    "J'ai commencé en autodidacte avec OpenClassrooms, puis je me suis formé chez Simplon, en alternance chez Staffelio, où je suis resté ensuite comme développeur front-end. Depuis 2026, je suis ingénieur full-stack chez Winback Group, à Biarritz. À côté, je continue à construire mes propres projets : une plateforme d'emploi au Japon, des jeux de cartes, des outils pour décider à plusieurs. Je maîtrise aussi Claude et Claude Code, que j'utilise au quotidien pour concevoir, tester et livrer plus vite, sans rien lâcher sur la qualité.",
    "Passionné de culture japonaise depuis l'adolescence, je pratique aussi le surf, la pala et le foot. Ce qui me guide en développement : des interfaces soignées et accessibles, du code testé qui se laisse maintenir, et des produits qui rendent vraiment service.",
  ],
  facts: [
    { label: "Basé à", value: "Tarnos, Landes" },
    { label: "Disponible", value: "En fin de journée et le week-end" },
    { label: "Langues", value: "Français, anglais" },
    { label: "Spécialité", value: "TypeScript, Next.js, NestJS" },
  ],
  timeline: [
    {
      when: "2017 – 2019",
      what: "BTS Communication, premier site WordPress",
      where: "Talis Business School",
    },
    { when: "2020", what: "Autodidacte : HTML, CSS, JavaScript", where: "OpenClassrooms" },
    {
      when: "2022 – 2024",
      what: "Développeur full-stack en alternance",
      where: "Staffelio · Simplon Grand Ouest",
    },
    { when: "2024 – 2026", what: "Développeur front-end", where: "Staffelio" },
    { when: "2026 – aujourd'hui", what: "Ingénieur full-stack", where: "Winback Group, Biarritz" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  /** Technologies, sans numéro de version (« Next.js », pas « Next.js 16 »). */
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
    kanji: "一",
    color: "sky",
    sticker: "★ projet phare",
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
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "next-intl", "Docker", "Claude Code"],
    period: "2026",
    commits: 289,
    image: {
      src: "/projects/gaijinjob.jpg",
      width: 1600,
      height: 1000,
      alt: "Page d'accueil de GaijinJob",
    },
    demo: "https://gaijinjob.vercel.app",
  },
  {
    slug: "virgule",
    kanji: "二",
    color: "coral",
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
    stack: ["Next.js", "Prisma", "Turso", "Pusher", "shadcn/ui", "Playwright"],
    period: "2026",
    commits: 123,
    image: {
      src: "/projects/virgule.jpg",
      width: 1600,
      height: 1000,
      alt: "Écran de création de séance de Virgule",
    },
    demo: "https://virgule.vercel.app",
    code: "https://github.com/GoBwah40/virgule",
  },
  {
    slug: "deckbuilder",
    kanji: "三",
    color: "lime",
    sticker: "▶ jouable",
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
    stack: ["TypeScript", "React", "Vite", "Vitest", "Tailwind", "Claude Code"],
    period: "2024 – 2026",
    commits: 59,
    image: {
      src: "/projects/deckbuilder.jpg",
      width: 1600,
      height: 1000,
      alt: "Écran de combat du deckbuilder",
    },
    note: "Démo sur demande",
  },
  {
    slug: "night-binder",
    kanji: "四",
    color: "lilac",
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
    stack: ["Next.js", "Supabase", "Tailwind", "Vitest", "GitHub Actions"],
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
  {
    slug: "ghiblilist",
    kanji: "五",
    color: "sky",
    name: "The GhibliList",
    tagline: "Catalogue des films du Studio Ghibli",
    summary:
      "Les 24 longs métrages du Studio Ghibli : affiches, synopsis, équipe, note, et recherche en anglais, japonais ou rōmaji. " +
      "Projet de 2023 remis à neuf en 2026, avec l'accessibilité comme fil rouge.",
    highlights: [
      "WCAG 2.2 AA : Lighthouse 100, axe-core en CI, parcours testé avec VoiceOver",
      "Quatre thèmes avec logotype adapté, choix mémorisé sans flash",
      "Données TMDB générées au build et rafraîchies chaque jour (ISR)",
      "Migration Next.js 13 → 16, React 19 et Tailwind v4",
    ],
    stack: ["Next.js", "React", "Tailwind", "TMDB API", "Playwright"],
    period: "2023 – 2026",
    commits: 59,
    image: {
      src: "/projects/ghiblilist.jpg",
      width: 1600,
      height: 1000,
      alt: "Trois écrans mobiles de The GhibliList dans trois thèmes : liste des films, fiche de The Boy and the Heron, liste façon affiche",
    },
    demo: "https://ghiblilist.vercel.app",
    code: "https://github.com/GoBwah40/ghiblilist",
  },
];

// Année du premier dépôt (chiffres néo-brutalistes).
export const firstRepoYear = 2022;
