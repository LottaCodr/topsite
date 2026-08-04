import { Link } from 'react-router-dom'
import { SITE, FOOTER_LINKS, SOCIALS } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="noise relative overflow-hidden border-t border-graphite bg-obsidian">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.09) 0%, transparent 68%)' }}
      />

      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">

          {/* Brand — spans full width on mobile, 2 cols on sm+, 2 cols on lg */}
          <div className="sm:col-span-2">
            <Link to="/" className="top-wordmark mb-5 inline-block select-none text-3xl sm:text-4xl" aria-label="T.O.P home">
              <span className="text-bone">T</span><span className="text-gold-lt">.</span>
              <span className="text-bone">O</span><span className="text-gold-lt">.</span>
              <span className="text-bone">P</span><span className="text-gold-lt">.</span>
            </Link>
            <p className="mb-7 max-w-xs text-sm font-light leading-relaxed text-muted">
              {SITE.name} — a tech and media company based in {SITE.location}.
              Built different. Built to last.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-2.5 rounded-full border border-graphite bg-charcoal px-4 py-2.5 transition-colors hover:border-gold/50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-lt animate-pulse-slow" aria-hidden="true" />
              <span className="text-sm text-gold-lt">{SITE.email}</span>
              <span className="arrow text-gold-lt/60" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Link columns — each gets 1 col on sm (2-up below brand), 1 col on lg */}
          {Object.entries(FOOTER_LINKS).map(([cat, items]) => (
            <nav key={cat} aria-label={cat}>
              <h2 className="section-label mb-5 !text-[10px] !text-gold-lt">{cat}</h2>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.internal ? (
                      <Link to={item.href} className="text-sm text-muted transition-colors hover:text-bone">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="text-sm text-muted transition-colors hover:text-bone">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mb-6 h-px bg-graphite" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs font-light text-muted">
            © {year} {SITE.name} Ltd · {SITE.location} · All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-graphite px-3.5 py-2 text-xs text-muted transition-colors hover:border-gold/50 hover:text-bone"
                >
                  {s.label}
                  <span className="text-[10px] text-muted/60">{s.handle}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
