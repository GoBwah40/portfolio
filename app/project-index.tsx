"use client";

import { useEffect, useState } from "react";

type Item = { slug: string; kanji: string; name: string; period: string };

/** Sommaire collant des projets (DA Japon minimal), qui suit le projet en cours de lecture. */
export function ProjectIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // Bande fine au milieu de l'écran : un seul projet la traverse à la fois.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { slug } of items) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="project-index only-japon" aria-label="Sommaire des projets">
      <ol>
        {items.map((item) => (
          <li key={item.slug}>
            <a href={`#${item.slug}`} aria-current={item.slug === active ? "true" : undefined}>
              <span className="jp" aria-hidden>
                {item.kanji}
              </span>
              <span>
                {item.name}
                <small>{item.period}</small>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
