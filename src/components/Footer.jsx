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

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-graphite bg-charcoal px-4 py-2.5 transition-colors hover:border-gold/50"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-lt animate-pulse-slow" aria-hidden="true" />
                <span className="text-sm text-gold-lt">{SITE.emailDisplay}</span>
                <span className="arrow text-gold-lt/60" aria-hidden="true">→</span>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-graphite bg-charcoal px-4 py-2.5 transition-colors hover:border-green-400/50"
              >
                <svg className="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm text-gold-lt">WhatsApp</span>
                <span className="arrow text-gold-lt/60" aria-hidden="true">→</span>
              </a>
            </div>
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
