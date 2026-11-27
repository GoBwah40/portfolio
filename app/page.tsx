import Image from "next/image";
import { earlier, profile, projects, type Project } from "./data";
import { ThemeSwitcher } from "./theme-switcher";

const totalCommits = projects.reduce((sum, p) => sum + p.commits, 0);
const maxCommits = Math.max(...projects.map((p) => p.commits));
const stackMarquee = ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Supabase", "React", "Playwright", "Vitest", "Docker"];

export default function Home() {
  const contacts = [
    { label: "GitHub", href: profile.github },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.email && { label: profile.email, href: `mailto:${profile.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <header className="nav wrap">
        <a href="#" className="brand">
          <span className="hanko only-japon" aria-hidden>マ</span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#projets"><span className="jp" aria-hidden>作品</span>Projets</a>
          <a href="#contact"><span className="jp" aria-hidden>連絡</span>Contact</a>
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
              <a href="#projets" className="btn btn-primary">Voir les projets</a>
              <a href={profile.github} className="btn">GitHub</a>
            </div>
          </div>
          <div className="vert only-japon" aria-hidden>作品集・二〇二六</div>
          <aside className="statcard only-brutal" aria-label="Fiche perso">
            <span className="sticker">fiche perso</span>
            <h2>{profile.name}</h2>
            <dl>
              <div><dt>Classe</dt><dd>Full-stack</dd></div>
              <div><dt>Langue</dt><dd>TypeScript</dd></div>
              <div><dt>Projets</dt><dd>{projects.length} + {earlier.length}</dd></div>
              <div><dt>Commits</dt><dd>{totalCommits}</dd></div>
            </dl>
          </aside>
        </section>

        <div className="marquee only-brutal" aria-hidden>
          <div className="marquee-track">
            {[...stackMarquee, ...stackMarquee].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        <section id="projets" className="section wrap">
          <h2 className="section-label">
            <span className="jp" aria-hidden>作品</span>
            <span className="jp-sub">Projets choisis</span>
          </h2>
          <div className="projects">
            {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
          </div>
        </section>

        <section className="section wrap">
          <h2 className="section-label">
            <span className="jp" aria-hidden>初期</span>
            <span className="jp-sub">Premiers projets (2022 – 2023)</span>
          </h2>
          <ul className="early">
            {earlier.map((e) => (
              <li key={e.name}>
                <a href={e.href} className="link">{e.name}</a>
                <span>{e.stack}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contact" className="contact">
        <div className="wrap">
          <div className="contact-inner">
            <h2 className="section-label contact-label">
              <span className="jp" aria-hidden>連絡</span>
              <span className="jp-sub">Contact</span>
            </h2>
            <div>
              <h2>
                <span className="only-sobre">Travaillons ensemble.</span>
                <span className="only-japon">Un projet, une question, un café ?</span>
                <span className="only-brutal">On construit un truc ?</span>
              </h2>
              <p>Une question sur un projet, ou envie de voir le code d&apos;un dépôt privé ?</p>
              <ul>
                {contacts.map((c) => (
                  <li key={c.href}><a href={c.href} className="link">{c.label}</a></li>
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
    <article className="project" data-color={p.color}>
      {p.sticker && <span className="sticker only-brutal">{p.sticker}</span>}
      <div className="project-num" aria-hidden>{p.kanji}</div>
      <div className={`shot${p.image.portrait ? " portrait" : ""}`}>
        <Image
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.width}
          height={p.image.height}
          sizes="(min-width: 768px) 480px, 100vw"
          priority={index === 0}
        />
      </div>
      <div className="project-body">
        <div className="meta">
          <span>{p.tagline}</span>
          <span>{p.period} · {p.commits} commits</span>
        </div>
        <h3>{p.name}</h3>
        <p className="summary">{p.summary}</p>
        <ul className="highlights">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <div className="xp only-brutal" aria-hidden>
          <span>XP</span>
          <span className="xp-bar"><span style={{ width: `${Math.round((p.commits / maxCommits) * 100)}%` }} /></span>
          <span>{p.commits}</span>
        </div>
        <ul className="stack">
          {p.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <div className="links">
          {p.demo && <a href={p.demo} className="link">Voir la démo ↗</a>}
          {p.code && <a href={p.code} className="link">Code source ↗</a>}
          {!p.code && <span className="muted">Code privé, sur demande</span>}
          {p.note && <span className="muted">{p.note}</span>}
        </div>
      </div>
    </article>
  );
}
