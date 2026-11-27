# Portfolio

Site portfolio (Next.js 15, Tailwind v4). Tout le contenu est dans `app/data.ts`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Vérifications

La CI (`.github/workflows/ci.yml`) lance les mêmes commandes qu'en local, sur chaque PR et chaque push vers `main` :

```bash
npm run format:check  # Prettier (corriger avec npm run format)
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run knip          # fichiers, exports et dépendances inutilisés
npm test              # Vitest
npm run build
```

Dependabot propose chaque semaine les mises à jour des dépendances npm et des actions GitHub.

## Thèmes

Trois directions artistiques (Sobre, Japon minimal, Néo-brutaliste), chacune en clair et en sombre :

- `data-da` et `data-mode` sur `<html>` ; chaque token CSS est écrit avec `light-dark()` dans `app/globals.css`.
- Un script dans `<head>` (`app/themes.ts`) pose le thème avant le premier rendu : pas de flash.
- Le sélecteur (`app/theme-switcher.tsx`) mémorise le choix et anime le changement avec la View Transitions API (désactivé si mouvement réduit).
- Lien direct vers un style : `?theme=japon` ou `?theme=brutal&mode=dark`.

## Formulaire de contact

`app/api/contact/route.ts` envoie les messages par e-mail via [Resend](https://resend.com) (validation, champ piège anti-robots, 5 messages / 10 min par IP).
Copier `.env.example` en `.env.local` et renseigner `RESEND_API_KEY` (et la même variable sur Vercel). Sans clé, le formulaire affiche l'adresse e-mail en repli.

Les captures des projets sont dans `public/projects/`. Celle de Night Binder vient du mode démo de l'app (cartes fictives, aucun visuel officiel).
