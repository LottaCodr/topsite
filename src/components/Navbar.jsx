import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../data/site.js'
import { useScrollState, useActiveSection } from '../hooks/useScrollState.js'
import { useApp } from '../hooks/useApp.js'

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export default function Navbar() {
  const { scrolled, hidden, progress } = useScrollState(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const active = useActiveSection(SECTION_IDS)
  const triggerRef = useRef(null)

  const {
    theme,
    toggleTheme,
    currency,
    toggleCurrency,
    soundEnabled,
    toggleSound,
    setCommandOpen,
    studioTime,
    playSound,
  } = useApp()

  /* Lock body scroll + trap Escape while mobile sheet is open */
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

  useEffect(() => setMenuOpen(false), [pathname])

  if (pathname === '/card') return null

  return (
    <header
      style={{
        transform: hidden && !menuOpen ? 'translate3d(0,-100%,0)' : 'translate3d(0,0,0)',
        willChange: 'transform',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease, border-color 0.3s ease',
      }}
      className={[
        'fixed inset-x-0 top-0 z-40',
        scrolled || menuOpen
          ? 'bg-surface/90 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.15)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      {/* Top Reading Progress Bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold via-gold-lt to-gold/0"
        style={{
          transform: `scaleX(${progress})`,
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top Mini Banner / Studio Clock (Desktop only) */}
      <div className="hidden lg:block border-b border-border/40 bg-surface2/50 py-1 text-[11px] text-muted">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-slow" />
              <span className="font-syne font-bold text-ink">Abuja Studio:</span>
              <span>{studioTime || '12:00'} WAT</span>
            </span>
            <span className="text-border">|</span>
            <span className="text-subtle">
              Status: <span className="text-gold font-semibold">2 Project Slots Available for Q3/Q4</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>Guaranteed &lt;24h Brief Response</span>
            <span className="text-border">|</span>
            <a
              href={`mailto:${SITE.email}`}
              className="text-subtle hover:text-gold transition-colors font-mono text-[10px]"
            >
              {SITE.emailDisplay}
            </a>
          </div>
        </div>
      </div>

      <nav
        aria-label="Primary navigation"
        className="container-page flex items-center justify-between"
        style={{
          paddingTop: scrolled ? '0.75rem' : '1.1rem',
          paddingBottom: scrolled ? '0.75rem' : '1.1rem',
          transition: 'padding 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Brand Wordmark */}
        <Link
          to="/"
          className="top-wordmark text-2xl sm:text-3xl select-none transition-opacity hover:opacity-80 shrink-0"
          aria-label="T.O.P — Top One Percent Home"
        >
          <span className="text-ink">T</span><span className="text-gold">.</span>
          <span className="text-ink">O</span><span className="text-gold">.</span>
          <span className="text-ink">P</span><span className="text-gold">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden xl:flex items-center gap-1 rounded-full border border-border/80 bg-surface2/80 p-1.5 backdrop-blur-md">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 font-syne text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-gold-lt bg-surface shadow-sm' : 'text-subtle hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop Controls (Currency, Theme, Search, CTA) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Quick Command Search Button */}
          <button
            type="button"
            onClick={() => {
              setCommandOpen(true)
              playSound('open')
            }}
            className="flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1.5 text-xs text-subtle hover:border-gold hover:text-ink transition-colors"
            title="Open Command Search (⌘K)"
          >
            <span>Search</span>
            <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-gold border border-border">⌘K</kbd>
          </button>

          {/* Currency Switcher */}
          <button
            type="button"
            onClick={() => {
              toggleCurrency()
              playSound('click')
            }}
            className="rounded-full border border-border bg-surface2 px-3 py-1.5 font-syne text-xs font-bold text-subtle hover:border-gold hover:text-gold transition-colors"
            title="Toggle NGN / USD Currency"
          >
            {currency === 'NGN' ? '₦ NGN' : '$ USD'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={() => {
              toggleTheme()
              playSound('click')
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface2 text-sm text-subtle hover:border-gold hover:text-ink transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              toggleSound()
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface2 text-xs text-subtle hover:border-gold hover:text-ink transition-colors"
            aria-label={`Audio haptics: ${soundEnabled ? 'Enabled' : 'Muted'}`}
            title={`Audio haptics: ${soundEnabled ? 'Enabled' : 'Muted'}`}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Direct Brief CTA */}
          <a href="#contact" className="btn-gold !py-2 !px-4 !min-h-[40px] !text-xs">
            Start Brief <span className="arrow">→</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => {
              toggleCurrency()
              playSound('click')
            }}
            className="rounded-full border border-border bg-surface2 px-2.5 py-1 font-syne text-[11px] font-bold text-gold"
          >
            {currency}
          </button>

          <button
            type="button"
            onClick={() => {
              toggleTheme()
              playSound('click')
            }}
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface2 text-xs"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface2 text-ink"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                  menuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                  menuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[60px] z-30 flex flex-col justify-between bg-surface p-6 backdrop-blur-2xl md:hidden overflow-y-auto"
          style={{ animation: 'fadeUp 0.25s var(--ease-out-expo) both' }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="section-label !text-[10px]">Navigation Index</span>
              <span className="text-xs text-muted">{SITE.location}</span>
            </div>

            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-2 font-syne text-2xl font-bold text-ink hover:text-gold"
                  >
                    <span>{l.label}</span>
                    <span className="text-sm text-gold">→</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/card"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-2 font-syne text-2xl font-bold text-gold"
                >
                  <span>Digital Business Card</span>
                  <span className="text-sm">📇 →</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-6 mt-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setCommandOpen(true)
                  setMenuOpen(false)
                }}
                className="btn-outline !min-h-[44px] !text-xs w-full"
              >
                ⌘ Search
              </button>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-outline !min-h-[44px] !text-xs w-full text-emerald-500"
              >
                WhatsApp CEO
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-gold w-full text-center"
            >
              Start a Project Brief <span className="arrow">→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
