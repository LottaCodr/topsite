import { useEffect, useRef, useState } from 'react'
import { SITE, PROOF_STATS } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

const LETTERS = [
  { char: 'T', gold: false },
  { char: '.', gold: true },
  { char: 'O', gold: false },
  { char: '.', gold: true },
  { char: 'P', gold: false },
  { char: '.', gold: true },
]

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [instant, setInstant] = useState(false)
  const visualRef = useRef(null)
  const { playSound } = useApp()

  useEffect(() => {
    if (reduced()) {
      setInstant(true)
      setLoaded(true)
      return
    }
    const t = setTimeout(() => setLoaded(true), 60)
    return () => clearTimeout(t)
  }, [])

  /* Scroll Parallax on Visual */
  useEffect(() => {
    const el = visualRef.current
    if (!el || reduced() || window.matchMedia?.('(pointer: coarse)').matches) return

    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const y = window.scrollY
        if (y < window.innerHeight * 1.2) {
          el.style.transform = `translate3d(0, ${y * 0.045}px, 0)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const step = (i) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'none' : 'translateY(16px)',
    transition: instant
      ? 'none'
      : `opacity .7s var(--ease-out-expo) ${0.75 + i * 0.1}s, transform .7s var(--ease-out-expo) ${0.75 + i * 0.1}s`,
  })

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40"
    >
      {/* Ambient Lighting Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-44 h-[720px] w-[720px] rounded-full opacity-75"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.15) 0%, transparent 68%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-36 h-[540px] w-[540px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.10) 0%, transparent 68%)' }}
      />

      {/* Grid Pattern Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block opacity-[0.4]"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '25% 100%',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 75%, transparent)',
        }}
      />

      {/* Background Monogram Watermark */}
      <span
        aria-hidden="true"
        className="top-wordmark pointer-events-none absolute -top-[0.25em] left-1/2 -translate-x-1/2 select-none opacity-[0.035] text-ink"
        style={{ fontSize: 'clamp(200px, 46vw, 760px)', letterSpacing: '-0.05em' }}
      >
        T.O.P.
      </span>

      <div className="container-page relative z-10 grid items-start gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Copy Column (Left) */}
        <div className="lg:col-span-6 xl:col-span-6">
          {/* Availability Status Badge */}
          <div
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface2/90 py-2 pl-3 pr-4 backdrop-blur-md shadow-sm"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(-10px)',
              transition: instant ? 'none' : 'opacity .6s ease .1s, transform .6s var(--ease-out-expo) .1s',
            }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-pulse-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="section-label whitespace-nowrap !text-[11px] !text-ink font-bold">
              {SITE.availability.status} · {SITE.availability.quarter}
            </span>
            <span className="hidden h-3 w-px bg-border2 sm:block" aria-hidden="true" />
            <span className="hidden whitespace-nowrap text-xs text-muted sm:block">{SITE.location}</span>
          </div>

          {/* Letter Drop Wordmark */}
          <div className="mb-4 flex items-end" aria-label="T.O.P">
            {LETTERS.map(({ char, gold }, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`top-wordmark select-none ${gold ? 'text-gold' : 'text-ink'}`}
                style={{
                  fontSize: 'clamp(56px, 8.8vw, 120px)',
                  opacity: instant ? 1 : 0,
                  animation:
                    loaded && !instant
                      ? `letterDrop .6s var(--ease-out-expo) ${0.2 + i * 0.07}s forwards`
                      : 'none',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <p className="section-label mb-5" style={step(0)}>
            {SITE.legalName} · Studio &amp; Engineering Lab
          </p>

          <h1
            className="display mb-6 text-ink"
            style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', maxWidth: '20ch', ...step(1) }}
          >
            Brand identity, AI systems and motion for companies that have outgrown their{' '}
            <span className="gold-underline relative inline-block text-gold">presentation.</span>
          </h1>

          <p
            className="mb-8 text-base sm:text-lg font-light leading-relaxed text-subtle"
            style={{ maxWidth: '48ch', ...step(2) }}
          >
            Top One Percent is an elite tech and media company in Abuja. We engineer brand systems,
            full-stack AI applications, and kinetic motion — four disciplines, zero junior handoffs,
            one uncompromising standard.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4" style={step(3)}>
            <a
              href="#contact"
              onClick={() => playSound('open')}
              className="btn-gold"
            >
              Start a Project Brief <span className="arrow" aria-hidden="true">→</span>
            </a>

            <a
              href="#calculator"
              onClick={() => playSound('click')}
              className="btn-outline"
            >
              Calculate Scope &amp; Price
            </a>

            <a
              href="#work"
              onClick={() => playSound('click')}
              className="btn-ghost-dark hidden sm:inline-flex"
            >
              View Work ↓
            </a>
          </div>

          {/* Mini Assurance Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted" style={step(4)}>
            <span className="flex items-center gap-1.5">
              <span className="text-gold font-bold">✓</span> 24h Guaranteed Reply
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold font-bold">✓</span> Fixed-Scope Milestone Pricing
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold font-bold">✓</span> 100% IP Code &amp; Asset Ownership
            </span>
          </div>
        </div>

        {/* Visual Column (Right) */}
        <div className="lg:col-span-6 xl:col-span-6" style={step(5)}>
          <div ref={visualRef} className="relative" style={{ willChange: 'transform' }}>
            {/* Glow Behind Visual */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-3xl"
            />

            {/* Editorial Visual Frame */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface shadow-2xl">
              <img
                src="/images/hero-visual.webp"
                alt="T.O.P Brand Identity and Product Design Architecture"
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                style={{ aspectRatio: '16/10', objectPosition: 'center' }}
                loading="eager"
                decoding="async"
              />

              {/* Gradient Overlay for Stats Bar */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)' }}
              />

              {/* Floating Bottom Stats Row */}
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-2 p-4 sm:p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                {PROOF_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-syne text-lg sm:text-2xl font-extrabold text-bone">
                      {stat.value}<span className="text-gold-lt">{stat.suffix}</span>
                    </div>
                    <div className="mt-0.5 text-[10px] sm:text-[11px] leading-tight text-bone/70">
                      {stat.label.split(' ')[0]} {stat.label.split(' ')[1] || ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Right Live Badge */}
            <div className="absolute -top-4 right-4 sm:-top-5 sm:right-6">
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse-slow" aria-hidden="true" />
                <span className="font-syne text-xs font-bold text-gold">3 Flagship Products Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 opacity-50 transition-opacity hover:opacity-100 lg:flex"
      >
        <span className="section-label !text-[9px] !text-muted">Explore Capabilities</span>
        <span className="h-8 w-px bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  )
}
