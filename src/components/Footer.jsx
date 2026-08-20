import { Link } from 'react-router-dom'
import { FOOTER_LINKS, SITE, SOCIALS } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const {
    theme,
    toggleTheme,
    currency,
    toggleCurrency,
    soundEnabled,
    toggleSound,
    studioTime,
    setCommandOpen,
    playSound,
  } = useApp()

  return (
    <footer className="noise relative overflow-hidden border-t border-graphite bg-obsidian text-bone">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 68%)' }}
      />

      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        {/* Main Grid */}
        <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">

          {/* Brand Info (2 cols) */}
          <div className="sm:col-span-2">
            <Link
              to="/"
              className="top-wordmark mb-5 inline-block select-none text-3xl sm:text-4xl text-bone"
              aria-label="T.O.P Home"
            >
              <span>T</span><span className="text-gold-lt">.</span>
              <span>O</span><span className="text-gold-lt">.</span>
              <span>P</span><span className="text-gold-lt">.</span>
            </Link>

            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-muted">
              {SITE.legalName} is an elite tech and media company headquartered in {SITE.location}.
              Engineering category-defining brand systems, AI products, and kinetic motion for global clients.
            </p>

            {/* Live Studio Status Pill */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-graphite bg-charcoal px-3.5 py-1.5 text-xs text-muted font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-slow" />
              <span>Abuja {studioTime || '12:00'} WAT</span>
              <span className="text-graphite">•</span>
              <span className="text-gold-lt font-sans">2 Slots Open</span>
            </div>

            {/* Direct Connect Pills */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`mailto:${SITE.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-graphite bg-charcoal px-3.5 py-2 text-xs text-gold-lt transition-colors hover:border-gold"
              >
                <span>✉</span>
                <span>{SITE.emailDisplay}</span>
              </a>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-graphite bg-charcoal px-3.5 py-2 text-xs text-emerald-400 transition-colors hover:border-emerald-500"
              >
                <span>💬</span>
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(FOOTER_LINKS).map(([cat, items]) => (
            <nav key={cat} aria-label={cat}>
              <h2 className="section-label mb-5 !text-[11px] !text-gold-lt">{cat}</h2>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.internal ? (
                      <Link
                        to={item.href}
                        className="text-xs sm:text-sm text-muted transition-colors hover:text-bone hover:text-gold-lt"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-xs sm:text-sm text-muted transition-colors hover:text-bone hover:text-gold-lt"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>

        {/* Global Controls & Preferences Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-graphite bg-charcoal/80 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted font-syne font-bold uppercase tracking-wider">Preferences:</span>

            {/* Currency Button */}
            <button
              onClick={() => { toggleCurrency(); playSound('click') }}
              className="rounded-lg border border-graphite bg-obsidian px-3 py-1 text-xs font-syne font-bold text-gold-lt hover:border-gold transition-colors"
            >
              Currency: {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>

            {/* Theme Button */}
            <button
              onClick={() => { toggleTheme(); playSound('click') }}
              className="rounded-lg border border-graphite bg-obsidian px-3 py-1 text-xs text-muted hover:text-bone hover:border-gold transition-colors"
            >
              Theme: {theme === 'dark' ? '🌙 Obsidian' : '☀️ Parchment'}
            </button>

            {/* Sound Button */}
            <button
              onClick={() => { toggleSound() }}
              className="rounded-lg border border-graphite bg-obsidian px-3 py-1 text-xs text-muted hover:text-bone hover:border-gold transition-colors"
            >
              Sound Haptics: {soundEnabled ? '🔊 On' : '🔇 Off'}
            </button>
          </div>

          <button
            onClick={() => { setCommandOpen(true); playSound('open') }}
            className="inline-flex items-center gap-2 rounded-lg border border-graphite bg-obsidian px-3 py-1 text-xs text-gold-lt hover:border-gold transition-colors"
          >
            <span>Command Menu</span>
            <kbd className="rounded bg-charcoal px-1.5 py-0.5 text-[10px] text-muted border border-graphite">⌘K</kbd>
          </button>
        </div>

        <div className="mb-6 h-px bg-graphite" />

        {/* Legal & Socials */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs font-light text-muted">
            © {year} {SITE.legalName} · {SITE.location} · All intellectual property rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-graphite px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold hover:text-bone"
                >
                  <span>{s.label}</span>
                  <span className="text-[10px] text-muted/60">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  )
}
