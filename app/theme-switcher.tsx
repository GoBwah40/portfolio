"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DAS, MODES, STORAGE_KEYS, type DaId, type ModeId } from "./themes";

type Next = { da?: DaId; mode?: ModeId };

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Stockage bloqué (navigation privée…) : le thème s'applique quand même pour la session.
  }
}

/** Applique le thème, avec une révélation circulaire depuis le point cliqué quand le navigateur le permet. */
function applyTheme(next: Next, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const run = () => {
    if (next.da) root.dataset.da = next.da;
    if (next.mode) root.dataset.mode = next.mode;
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce || document.visibilityState !== "visible") return run();
  if (origin) {
    root.style.setProperty("--vt-x", `${origin.x}px`);
    root.style.setProperty("--vt-y", `${origin.y}px`);
  }
  // Un clic rapide sur une autre option interrompt la transition en cours : rejet attendu, sans effet.
  document.startViewTransition(run).ready.catch(() => {});
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [da, setDa] = useState<DaId>("sobre");
  const [mode, setMode] = useState<ModeId>("system");
  const panelId = useId();
  const ref = useRef<HTMLDivElement>(null);

  // Lit l'état posé par le script anti-flash.
  useEffect(() => {
    const root = document.documentElement;
    setDa((root.dataset.da as DaId) ?? "sobre");
    setMode((root.dataset.mode as ModeId) ?? "system");
  }, []);

  // Fermeture : Échap ou clic à l'extérieur.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const pick = (next: Next, e: React.MouseEvent) => {
    applyTheme(next, { x: e.clientX, y: e.clientY });
    if (next.da) {
      setDa(next.da);
      persist(STORAGE_KEYS.da, next.da);
    }
    if (next.mode) {
      setMode(next.mode);
      persist(STORAGE_KEYS.mode, next.mode);
    }
  };

  return (
    <div className="switcher" ref={ref}>
      {open && (
        <div className="switcher-panel" id={panelId} role="dialog" aria-label="Changer de style">
          <div>
            <div className="switcher-title" id={`${panelId}-da`}>Direction artistique</div>
            <div className="switcher-options" role="radiogroup" aria-labelledby={`${panelId}-da`}>
              {DAS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={da === t.id}
                  className="da-option"
                  onClick={(e) => pick({ da: t.id }, e)}
                >
                  <span className="da-swatch" aria-hidden>
                    {t.swatch.map((c) => <i key={c} style={{ background: c }} />)}
                  </span>
                  <span>
                    {t.label}
                    <small>{t.hint}</small>
                  </span>
                  <svg className="da-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="switcher-title" id={`${panelId}-mode`}>Mode</div>
            <div className="mode-group" role="radiogroup" aria-labelledby={`${panelId}-mode`}>
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === m.id}
                  onClick={(e) => pick({ mode: m.id }, e)}
                >
                  <ModeIcon mode={m.id} />
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <p className="switcher-note">Le choix est mémorisé. Partage un style avec ?theme=japon dans l&apos;URL.</p>
        </div>
      )}
      <button
        type="button"
        className="switcher-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 21a9 9 0 1 1 9-9c0 1.66-1.34 3-3 3h-1.5a1.5 1.5 0 0 0-1.06 2.56 1.5 1.5 0 0 1-1.06 2.56Z" />
          <circle cx="7.5" cy="10.5" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16.5" cy="10.5" r="1" />
        </svg>
        Changer de style
      </button>
    </div>
  );
}

function ModeIcon({ mode }: { mode: ModeId }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (mode === "light")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  if (mode === "dark")
    return (
      <svg {...common}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
