import Image from "next/image";
import { about, firstRepoYear, profile, projects, type Project } from "./data";
import { BrandMark } from "./brand-mark";
import { ContactForm } from "./contact-form";
import { ProjectIndex } from "./project-index";
import { ThemeSwitcher } from "./theme-switcher";

const totalCommits = projects.reduce((sum, p) => sum + p.commits, 0);
const maxCommits = Math.max(...projects.map((p) => p.commits));
const techCount = new Set(projects.flatMap((p) => p.stack)).size;
const figures = [
  // Seuls les projets avec une démo publique comptent (Deckbuilder n'en a pas).
  { value: projects.filter((p) => p.demo).length, label: "projets en ligne", color: "sky" },
  { value: totalCommits, label: "commits", color: "coral" },
  { value: techCount, label: "technos", color: "lime" },
  { value: firstRepoYear, label: "premier dépôt", color: "lilac" },
] as const;
// Liens vers d'autres sites : nouvel onglet, sans accès de la page ouverte à celle-ci.
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const stackMarquee = [
  "Next.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "React",
  "Playwright",
  "Vitest",
  "Docker",
];

export default function Home() {
  const contacts = [
    { label: "GitHub", href: profile.github },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <header className="nav wrap">
        <a href="#" className="brand">
          <BrandMark className="brand-mark" />
          <span className="brand-name">
            <span className="brand-full">{profile.name}</span>
            <span className="brand-short">{profile.shortName}</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#projets">
            <span className="jp" aria-hidden>
              作品
            </span>
            Projets
          </a>
          <a href="#contact">
            <span className="jp" aria-hidden>
              連絡
            </span>
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="hero wrap">
          <div>
            <div className="sun only-japon" aria-hidden />
            <p className="eyebrow">
              <span className="only-sobre">{profile.role}</span>
              <span className="only-brutal">● {profile.role}</span>
            </p>
            <h1 className="hero-title">
              <span className="only-sobre">{profile.headlines.sobre}</span>
              <span className="only-japon">{profile.headlines.japon}</span>
              <span className="only-brutal">
                Salut, moi c&apos;est <mark>{profile.name.split(" ")[0]}</mark>.
              </span>
            </h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="cta">
              <a href="#projets" className="btn btn-primary">
                Voir les projets
              </a>
              <a href={profile.github} className="btn" {...external}>
                GitHub
              </a>
            </div>
          </div>
          <div className="vert only-japon" aria-hidden>
            作品集・二〇二六
          </div>
          <aside className="statcard only-brutal" aria-label="Fiche perso">
            <span className="sticker">fiche perso</span>
            <h2>{profile.name}</h2>
            <dl>
              <div>
                <dt>Classe</dt>
                <dd>Full-stack</dd>
              </div>
              <div>
                <dt>Langue</dt>
                <dd>TypeScript</dd>
              </div>
              <div>
                <dt>Projets</dt>
                <dd>{projects.length}</dd>
              </div>
              <div>
                <dt>Commits</dt>
                <dd>{totalCommits}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <div className="marquee only-brutal" aria-hidden>
          <div className="marquee-track">
            {[...stackMarquee, ...stackMarquee].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>

        <section id="presentation" className="section about wrap">
          <h2 className="section-label">
            <span className="jp" aria-hidden>
              紹介
            </span>
            <span className="jp-sub">Présentation</span>
          </h2>
          <div className="about-body">
            <div className="about-photo" aria-hidden>
              <BrandMark className="about-photo-mark" />
              <span className="about-photo-note">Ta photo ici</span>
            </div>
            <div className="about-text">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="about-more">
              <dl className="about-facts">
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div
                className="about-timeline-scroll"
                role="region"
                aria-label="Parcours"
                tabIndex={0}
              >
                <ol className="about-timeline">
                  {about.timeline.map((t) => (
                    <li key={t.what}>
                      <span className="about-when">{t.when}</span>
                      <span className="about-what">{t.what}</span>
                      <span className="about-where">{t.where}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="projets" className="section wrap">
          <div className="section-side">
            <h2 className="section-label">
              <span className="jp" aria-hidden>
                作品
              </span>
              <span className="jp-sub">Projets choisis</span>
            </h2>
            <ProjectIndex
              items={projects.map(({ slug, kanji, name, period }) => ({
                slug,
                kanji,
                name,
                period,
              }))}
            />
          </div>
          <dl className="figures only-brutal">
            {figures.map((f) => (
              <div key={f.label} data-color={f.color}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="projects">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="contact">
        <div className="wrap">
          <div className="contact-inner">
            <h2 className="section-label contact-label">
              <span className="jp" aria-hidden>
                連絡
              </span>
              <span className="jp-sub">Contact</span>
            </h2>
            <div>
              <h2>
                <span className="only-sobre">Travaillons ensemble.</span>
                <span className="only-japon">Un projet, une question, un café ?</span>
                <span className="only-brutal">On construit un truc ?</span>
              </h2>
              <p>
                Une question sur un projet, ou envie de voir le code d&apos;un dépôt privé ?
                Écris-moi ici.
              </p>
              <ContactForm fallbackEmail={profile.email} />
              <ul>
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="link" {...external}>
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="footer">© 2026 {profile.name}</p>
        </div>
      </footer>

      <ThemeSwitcher />
    </>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <article id={p.slug} className="project" data-color={p.color}>
      {p.sticker && <span className="sticker only-brutal">{p.sticker}</span>}
      <div className="project-num" aria-hidden>
        {p.kanji}
      </div>
      <div className={`shot${p.image.portrait ? " portrait" : ""}`}>
        <Image
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.width}
          height={p.image.height}
          sizes={
            index === 0
              ? "(min-width: 1024px) 720px, (min-width: 768px) 480px, 100vw"
              : "(min-width: 1024px) 600px, (min-width: 768px) 480px, 100vw"
          }
          priority={index === 0}
        />
      </div>
      <div className="project-body">
        <div className="meta">
          <span>{p.tagline}</span>
          <span>
            {p.period} · {p.commits} commits
          </span>
        </div>
        <h3>{p.name}</h3>
        <p className="summary">{p.summary}</p>
        <ul className="highlights">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="xp only-brutal" aria-hidden>
          <span>XP</span>
          <span className="xp-bar">
            <span style={{ width: `${Math.round((p.commits / maxCommits) * 100)}%` }} />
          </span>
          <span>{p.commits}</span>
        </div>
        <ul className="stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="links">
          {p.demo && (
            <a href={p.demo} className="link" {...external}>
              Voir la démo ↗
            </a>
          )}
          {p.code && (
            <a href={p.code} className="link" {...external}>
              Code source ↗
            </a>
          )}
          {!p.code && <span className="muted">Code privé, sur demande</span>}
          {p.note && <span className="muted">{p.note}</span>}
        </div>
      </div>
    </article>
  );
}
