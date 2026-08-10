import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site.js'

const LETTERS = [
  { char: 'T', gold: false },
  { char: '.', gold: true },
  { char: 'O', gold: false },
  { char: '.', gold: true },
  { char: 'P', gold: false },
  { char: '.', gold: true },
]

const STATS = [
  ['4', 'Disciplines in-house'],
  ['3', 'Products shipped'],
  ['24h', 'Reply time'],
  ['100%', 'Senior-built'],
]

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [instant, setInstant] = useState(false)
  const visualRef = useRef(null)

  useEffect(() => {
    if (reduced()) { setInstant(true); setLoaded(true); return }
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* Subtle scroll-linked parallax on the hero visual — the visual drifts
     slower than the page, adding depth. rAF-throttled; disabled for users
     who prefer reduced motion and on touch where it can feel gimmicky. */
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
          el.style.transform = `translate3d(0, ${y * 0.055}px, 0)`
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
    transform: loaded ? 'none' : 'translateY(14px)',
    transition: instant
      ? 'none'
      : `opacity .7s var(--ease-out-expo) ${0.9 + i * 0.11}s, transform .7s var(--ease-out-expo) ${0.9 + i * 0.11}s`,
  })

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32"
    >
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-52 h-[760px] w-[760px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.10) 0%, transparent 66%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-44 h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.06) 0%, transparent 66%)' }}
      />
      {/* Editorial grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block opacity-[0.55]"
        style={{
          backgroundImage: 'linear-gradient(to right, #EFEBE3 1px, transparent 1px)',
          backgroundSize: '25% 100%',
          maskImage: 'linear-gradient(to bottom, transparent, black 22%, black 72%, transparent)',
        }}
      />

      {/* Giant faded monogram — editorial watermark behind the copy */}
      <span
        aria-hidden="true"
        className="top-wordmark pointer-events-none absolute -top-[0.28em] left-1/2 -translate-x-1/2 select-none text-ink/[0.045]"
        style={{ fontSize: 'clamp(200px, 46vw, 720px)', letterSpacing: '-0.05em' }}
      >
        T.O.P.
      </span>

      <div className="container-page relative z-10 grid items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* ------------------------------------------------ copy column */}
        <div className="lg:col-span-6 xl:col-span-5">
          {/* Availability pill */}
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 py-2 pl-3 pr-4 backdrop-blur-sm"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(-10px)',
              transition: instant ? 'none' : 'opacity .6s ease .15s, transform .6s var(--ease-out-expo) .15s',
            }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-pulse-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="section-label whitespace-nowrap !text-[10px] !text-ink2">
              Taking 2 projects · Q3 2026
            </span>
            <span className="hidden h-3 w-px bg-border2 sm:block" aria-hidden="true" />
            <span className="hidden whitespace-nowrap text-[11px] text-subtle sm:block">{SITE.location}</span>
          </div>

          {/* Wordmark */}
          <div className="mb-4 flex items-end" aria-label="T.O.P">
            {LETTERS.map(({ char, gold }, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`top-wordmark select-none ${gold ? 'text-gold' : 'text-ink'}`}
                style={{
                  fontSize: 'clamp(52px, 8.5vw, 118px)',
                  opacity: instant ? 1 : 0,
                  animation:
                    loaded && !instant
                      ? `letterDrop .6s var(--ease-out-expo) ${0.25 + i * 0.075}s forwards`
                      : 'none',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <p className="section-label mb-6" style={step(0)}>
            {SITE.name} · Est. {SITE.founded}
          </p>

          <h1
            className="display mb-5 text-ink"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', maxWidth: '22ch', ...step(1) }}
          >
            Brand, product and motion for companies that have outgrown their{' '}
            <span className="gold-underline relative inline-block text-gold">presentation.</span>
          </h1>

          <p
            className="mb-8 text-[16px] font-light leading-relaxed text-subtle"
            style={{ maxWidth: '48ch', ...step(2) }}
          >
            T.O.P is a tech and media company in Abuja. We build identities, AI-powered
            products and motion content — four disciplines, one senior team, one standard.
          </p>

          <div className="flex flex-wrap items-center gap-3" style={step(3)}>
            <a href="#contact" className="btn-gold">
              Start a Project <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#work" className="btn-outline">See our work</a>
            <span className="ml-1 hidden text-xs text-subtle sm:inline">
              Free 30-min brief call · reply within 24h
            </span>
          </div>
        </div>

        {/* ------------------------------------------- visual column */}
        <div className="lg:col-span-6 xl:col-span-7" style={step(4)}>
          <div ref={visualRef} className="relative" style={{ willChange: 'transform' }}>
            {/* Glow behind the visual */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/12 via-transparent to-transparent blur-3xl"
            />

            {/* Hero image — full editorial visual */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/60 shadow-[0_24px_64px_-24px_rgba(16,14,10,0.18)]">
              <img
                src="/images/hero-visual.webp"
                alt="T.O.P brand identity and product design work"
                className="w-full object-cover"
                style={{ aspectRatio: '16/10', objectPosition: 'center' }}
                loading="eager"
                decoding="async"
              />
              {/* Gradient overlay at the bottom for the stats to sit on */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, transparent 100%)' }}
              />

              {/* Floating stats bar pinned to image bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                {STATS.map(([v, l]) => (
                  <div key={l} className="text-center">
                    <div className="font-syne text-lg font-extrabold text-bone sm:text-xl">{v}</div>
                    <div className="mt-0.5 text-[10px] leading-tight text-bone/60 sm:text-[11px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently building pill — floats above the image */}
            <div className="absolute -top-4 right-4 sm:-top-5 sm:right-6">
              <div className="flex items-center gap-2 rounded-full border border-graphite bg-obsidian/95 px-3 py-2 backdrop-blur-sm sm:px-4">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-slow" aria-hidden="true" />
                <span className="font-syne text-[11px] font-bold text-gold-lt">3 Products in-market</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-40 transition-opacity hover:opacity-80 lg:flex"
        style={{ opacity: loaded ? undefined : 0, transition: 'opacity .6s ease 1.9s' }}
      >
        <span className="section-label !text-[9px] !text-subtle">Scroll</span>
        <span className="h-10 w-px" style={{ background: 'linear-gradient(to bottom, #B8924A, transparent)' }} />
      </a>
    </section>
  )
}
