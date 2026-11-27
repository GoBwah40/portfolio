# Portfolio

Site portfolio (Next.js 15, Tailwind v4). Tout le contenu est dans `app/data.ts`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Thèmes

Trois directions artistiques (Sobre, Japon minimal, Néo-brutaliste), chacune en clair et en sombre :

- `data-da` et `data-mode` sur `<html>` ; chaque token CSS est écrit avec `light-dark()` dans `app/globals.css`.
- Un script dans `<head>` (`app/themes.ts`) pose le thème avant le premier rendu : pas de flash.
- Le sélecteur (`app/theme-switcher.tsx`) mémorise le choix et anime le changement avec la View Transitions API (désactivé si mouvement réduit).
- Lien direct vers un style : `?theme=japon` ou `?theme=brutal&mode=dark`.

Les captures des projets sont dans `public/projects/`. Sur celle de Night Binder, les illustrations des cartes sont floutées volontairement (visuels officiels).
