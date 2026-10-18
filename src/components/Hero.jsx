import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Sparkles } from 'lucide-react'
import { SITE, PROOF_STATS } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'
import { Badge } from './ui/badge.jsx'
import { Button } from './ui/button.jsx'
import { Separator } from './ui/separator.jsx'

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
      {/* Ambient Lighting */}
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

      {/* Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.4] lg:block"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--border) 1px, transparent 1px)',
          backgroundSize: '25% 100%',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 75%, transparent)',
        }}
      />

      {/* Monogram Watermark */}
      <span
        aria-hidden="true"
        className="top-wordmark pointer-events-none absolute -top-[0.25em] left-1/2 -translate-x-1/2 select-none text-foreground opacity-[0.035]"
        style={{ fontSize: 'clamp(200px, 46vw, 760px)', letterSpacing: '-0.05em' }}
      >
        T.O.P.
      </span>

      <div className="container-page relative z-10 grid items-start gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Copy Column */}
        <div className="lg:col-span-6 xl:col-span-6">
          {/* Availability Badge */}
          <div
            className="mb-8 flex"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(-10px)',
              transition: instant ? 'none' : 'opacity .6s ease .1s, transform .6s var(--ease-out-expo) .1s',
            }}
          >
            <Badge variant="secondary" className="gap-2.5 border-border bg-secondary/80 py-1.5 pl-3 pr-4 backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-foreground">{SITE.availability.status} · {SITE.availability.quarter}</span>
              <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
              <span className="hidden font-dm text-xs font-medium normal-case tracking-normal text-muted-foreground sm:block">
                {SITE.location}
              </span>
            </Badge>
          </div>

          {/* Letter Drop Wordmark */}
          <div className="mb-4 flex items-end" aria-label="T.O.P">
            {LETTERS.map(({ char, gold }, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`top-wordmark select-none ${gold ? 'text-gold' : 'text-foreground'}`}
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
            className="display mb-6 text-foreground"
            style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', maxWidth: '20ch', ...step(1) }}
          >
            Brand identity, AI systems and motion for companies that have outgrown their{' '}
            <span className="gold-underline relative inline-block text-gold">presentation.</span>
          </h1>

          <p
            className="mb-8 text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
            style={{ maxWidth: '48ch', ...step(2) }}
          >
            Top One Percent is an elite tech and media company in Abuja. We engineer brand systems,
            full-stack AI applications, and kinetic motion: four disciplines, zero junior handoffs,
            one uncompromising standard.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4" style={step(3)}>
            <Button asChild size="lg" onClick={() => playSound('open')}>
              <a href="#contact">
                <Sparkles />
                Start Your Brief
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" onClick={() => playSound('click')}>
              <a href="#calculator">Price Your Scope</a>
            </Button>

            <Button asChild variant="ghost" size="lg" className="hidden text-muted-foreground sm:inline-flex" onClick={() => playSound('click')}>
              <a href="#work">
                View Work
                <ChevronDown />
              </a>
            </Button>
          </div>

          {/* Trust strip: social proof directly under the hero CTAs (UX research F2) */}
          <div
            className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm sm:grid-cols-4"
            style={step(4)}
          >
            {PROOF_STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-syne text-2xl font-extrabold leading-none text-foreground">
                  {stat.value}
                  <span className="text-gold">{stat.suffix}</span>
                </div>
                <div className="mt-1.5 text-[10px] font-medium leading-tight text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Assurance row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground" style={step(4)}>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-gold" /> 24h Guaranteed Reply
            </span>
            <span className="hidden text-border sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-gold" /> Fixed-Scope Milestone Pricing
            </span>
            <span className="hidden text-border sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-gold" /> 100% IP Code &amp; Asset Ownership
            </span>
          </div>
        </div>

        {/* Visual Column */}
        <div className="lg:col-span-6 xl:col-span-6" style={step(5)}>
          <div ref={visualRef} className="relative" style={{ willChange: 'transform' }}>
            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-3xl"
            />

            {/* Editorial Visual Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:rounded-3xl">
              <img
                src="/images/hero-visual.webp"
                alt="T.O.P Brand Identity and Product Design Architecture"
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                style={{ aspectRatio: '16/10', objectPosition: 'center' }}
                loading="eager"
                decoding="async"
              />

              {/* Bottom gradient for stats */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)' }}
              />

              {/* Floating stats bar */}
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-2 border-t border-white/10 bg-black/40 p-4 backdrop-blur-md sm:p-6">
                {PROOF_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-syne text-lg font-extrabold text-bone sm:text-2xl" style={{ color: '#FAF7F2' }}>
                      {stat.value}<span className="text-gold-lt">{stat.suffix}</span>
                    </div>
                    <div className="mt-0.5 text-[10px] leading-tight text-bone/70 sm:text-[11px]" style={{ color: 'rgba(250,247,242,0.7)' }}>
                      {stat.label.split(' ')[0]} {stat.label.split(' ')[1] || ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live badge */}
            <div className="absolute -top-4 right-4 sm:-top-5 sm:right-6">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-1.5 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse-slow rounded-full bg-gold" aria-hidden="true" />
                <span className="font-syne text-xs font-bold text-gold">3 Flagship Products Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="container-page relative z-10 mt-10 hidden justify-center lg:flex">
        <Separator className="max-w-xs bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-gold lg:block"
        aria-label="Scroll to services"
      >
        <ChevronDown className="size-5 animate-bounce" />
      </a>
      <span className="sr-only">
        Scroll down, or use the arrow key after focusing this link, to continue to the services section.
      </span>
    </section>
  )
}
