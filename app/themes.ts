export const DAS = [
  {
    id: "sobre",
    label: "Sobre",
    hint: "Clair et chaleureux",
    swatch: ["#f7f5f1", "#17161a", "#d24b2a"],
  },
  {
    id: "japon",
    label: "Japon minimal",
    hint: "Washi, encre et rouge",
    swatch: ["#f6f2ea", "#1d1c1a", "#c8372d"],
  },
  {
    id: "brutal",
    label: "Néo-brutaliste",
    hint: "Couleurs franches",
    swatch: ["#fff4d6", "#7ad3ff", "#ff6b4a"],
  },
] as const;

export const MODES = [
  { id: "light", label: "Clair" },
  { id: "dark", label: "Sombre" },
  { id: "system", label: "Auto" },
] as const;

export type DaId = (typeof DAS)[number]["id"];
export type ModeId = (typeof MODES)[number]["id"];

export const STORAGE_KEYS = { da: "portfolio-da", mode: "portfolio-mode" } as const;

/**
 * Exécuté dans <head> avant le premier rendu : pose data-da et data-mode sur <html>
 * pour éviter tout flash de thème. Priorité : ?theme= dans l'URL, puis localStorage, puis défaut.
 */
export const themeInitScript = `(function(){try{
var d=document.documentElement,das=${JSON.stringify(DAS.map((t) => t.id))},modes=${JSON.stringify(MODES.map((m) => m.id))};
var q=new URLSearchParams(location.search),s=window.localStorage;
var da=q.get("theme")||s.getItem("${STORAGE_KEYS.da}"),mode=q.get("mode")||s.getItem("${STORAGE_KEYS.mode}");
d.dataset.da=das.indexOf(da)>-1?da:"sobre";d.dataset.mode=modes.indexOf(mode)>-1?mode:"system";
}catch(e){}})();`;
