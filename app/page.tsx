import Image from "next/image";
import { earlier, profile, projects, type Project } from "./data";

const link =
  "underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

export default function Home() {
  const contacts = [
    { label: "GitHub", href: profile.github },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.email && { label: profile.email, href: `mailto:${profile.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8">
      <header className="flex items-center justify-between py-6 text-sm">
        <span className="font-semibold tracking-tight">{profile.name}</span>
        <nav className="flex gap-5 text-muted">
          <a href="#projets" className="hover:text-ink">Projets</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </nav>
      </header>

      <section className="pb-20 pt-16 sm:pt-24">
        <p className="font-mono text-sm text-accent">{profile.role}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Des applications web complètes, de l&apos;idée à la production.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projets"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Voir les projets
          </a>
          <a
            href={profile.github}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            GitHub
          </a>
        </div>
      </section>

      <section id="projets" className="scroll-mt-8">
        <h2 className="font-mono text-sm uppercase tracking-widest text-muted">Projets choisis</h2>
        <div className="mt-8 flex flex-col gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-mono text-sm uppercase tracking-widest text-muted">Premiers projets (2022 – 2023)</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {earlier.map((e) => (
            <li key={e.name} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
              <a href={e.href} className={link}>{e.name}</a>
              <span className="text-sm text-muted">{e.stack}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer id="contact" className="mt-24 scroll-mt-8 border-t border-line py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Travaillons ensemble.</h2>
        <p className="mt-3 text-muted">Une question sur un projet, ou envie de voir le code d&apos;un dépôt privé ?</p>
        <ul className="mt-6 flex flex-wrap gap-6">
          {contacts.map((c) => (
            <li key={c.href}>
              <a href={c.href} className={link}>{c.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className={`grid md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative flex items-center justify-center bg-chip p-4 sm:p-6">
          {p.image.portrait ? (
            <div className="relative aspect-[390/600] w-48 overflow-hidden rounded-[1.75rem] border-4 border-ink/80 shadow-xl sm:w-56">
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="224px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <Image
              src={p.image.src}
              alt={p.image.alt}
              width={p.image.width}
              height={p.image.height}
              sizes="(min-width: 768px) 480px, 100vw"
              className="w-full rounded-lg shadow-lg"
              priority={index === 0}
            />
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
            <span>{p.tagline}</span>
            <span>{p.period} · {p.commits} commits</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="rounded-full bg-chip px-2.5 py-1 font-mono text-xs">{s}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-5 pt-6 text-sm font-medium">
            {p.demo && <a href={p.demo} className={link}>Voir la démo ↗</a>}
            {p.code && <a href={p.code} className={link}>Code source ↗</a>}
            {!p.code && <span className="text-muted">Code privé, sur demande</span>}
            {p.note && <span className="text-muted">{p.note}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
