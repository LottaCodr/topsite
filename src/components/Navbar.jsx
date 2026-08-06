import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../data/site.js'
import { useScrollState, useActiveSection } from '../hooks/useScrollState.js'

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export default function Navbar() {
  const { scrolled, hidden, progress } = useScrollState(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const active = useActiveSection(SECTION_IDS)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  /* Lock body scroll + trap Escape while the mobile sheet is open. */
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Close on route change
  useEffect(() => setMenuOpen(false), [pathname])

  if (pathname === '/card') return null

  return (
    <header
      style={{
        /* GPU-composited transform: avoids layout jitter during scroll */
        transform: hidden && !menuOpen ? 'translate3d(0,-100%,0)' : 'translate3d(0,0,0)',
        willChange: 'transform',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={[
        'fixed inset-x-0 top-0 z-50',
        scrolled || menuOpen
          ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-[0_1px_24px_-12px_rgba(16,14,10,0.2)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      {/* Reading progress — quiet orientation cue, no layout cost */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold via-gold-lt to-gold/0"
        style={{
          transform: `scaleX(${progress})`,
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <nav
        aria-label="Primary"
        className="container-page flex items-center justify-between"
        style={{
          /* Smooth height change via padding instead of height — avoids reflow jitter */
          paddingTop: scrolled ? '0.75rem' : '1.125rem',
          paddingBottom: scrolled ? '0.75rem' : '1.125rem',
          transition: 'padding 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <Link
          to="/"
          className="top-wordmark text-2xl select-none transition-opacity hover:opacity-70 shrink-0"
          aria-label="T.O.P — Top One Percent, home"
        >
          <span className="text-ink">T</span><span className="text-gold">.</span>
          <span className="text-ink">O</span><span className="text-gold">.</span>
          <span className="text-ink">P</span><span className="text-gold">.</span>
        </Link>

        {/* Desktop nav — pill group with a sliding active indicator */}
        <ul className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-white/60 p-1 backdrop-blur-sm">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                    isActive ? 'text-ink' : 'text-subtle hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-surface2 ring-1 ring-border"
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="btn-gold !min-h-[42px] !px-5 !py-2.5 !text-[13px]"
          >
            Start a Project <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Hamburger — 44px target */}
        <button
          ref={triggerRef}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden -mr-1 grid h-11 w-11 place-items-center rounded-lg shrink-0"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-2 block h-px w-6 bg-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
          </span>
        </button>
      </nav>

      {/* Mobile sheet — full-screen overlay for small screens */}
      <div
        id="mobile-menu"
        ref={panelRef}
        aria-hidden={!menuOpen}
        className={[
          'md:hidden border-t border-border bg-white',
          'transition-[opacity,visibility] duration-300',
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        ].join(' ')}
        style={{ maxHeight: menuOpen ? '100dvh' : 0, overflow: menuOpen ? 'auto' : 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, visibility 0.3s ease' }}
      >
        <div className="container-page flex flex-col gap-1 py-5 pb-8">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-3.5 text-base text-ink2 transition-colors hover:bg-surface active:bg-surface2"
              style={{ animation: menuOpen ? `fadeUp .4s var(--ease-out-expo) ${i * 40}ms both` : 'none' }}
            >
              {l.label}
              <span className="text-subtle" aria-hidden="true">→</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-gold mt-3 w-full text-center"
          >
            Start a Project <span className="arrow" aria-hidden="true">→</span>
          </a>
          <p className="mt-3 px-3 text-xs text-subtle">
            Or email{' '}
            <a href={`mailto:${SITE.email}`} className="text-gold underline underline-offset-2">
              {SITE.emailDisplay}
            </a>
          </p>
        </div>
      </div>
    </header>
  )
}

