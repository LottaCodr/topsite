import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { PROOF_STATS, TESTIMONIALS } from '../data/site.js'

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function useCountUp(target, suffix, started) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return
    const numeric = parseFloat(target)
    if (reducedMotion() || Number.isNaN(numeric)) {
      setValue(target)
      return
    }
    let raf
    const t0 = performance.now()
    const dur = 1200
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(numeric * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target])

  return `${value}${suffix}`
}

function Stat({ value, suffix, label, sub, started }) {
  const v = useCountUp(value, suffix, started)
  return (
    <div className="card-base p-6 transition-all hover:border-gold/50">
      <div className="font-syne text-3xl sm:text-4xl font-extrabold tracking-tight text-gold">
        {v}
      </div>
      <div className="mt-2 text-xs sm:text-sm font-bold text-ink">
        {label}
      </div>
      <div className="mt-1 text-[11px] text-muted leading-relaxed">
        {sub}
      </div>
    </div>
  )
}

export default function Proof() {
  const ref = useReveal()
  const statsRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = statsRef.current
    if (!node || reducedMotion() || !('IntersectionObserver' in window)) {
      setStarted(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section id="proof" ref={ref} aria-label="Client results and testimonials" className="scroll-mt-24 bg-surface py-24 lg:py-32 border-b border-border">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Column: Metrics & Philosophy */}
          <div className="reveal lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="section-label mb-4">Empirical Proof</p>
              <h2 className="display mb-6 text-ink" style={{ fontSize: 'clamp(30px,4.2vw,48px)' }}>
                The work speaks.<br />The metrics <span className="text-gold">confirm.</span>
              </h2>

              <p className="mb-8 text-base font-light leading-relaxed text-subtle">
                We prefer to be evaluated by shipped code, sub-second inference speeds,
                and actual revenue lifted rather than vague adjectives. Here is our track
                record across production deployments.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROOF_STATS.map((s) => (
                <Stat
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  sub={s.sub}
                  started={started}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Verified Testimonials */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            <p className="section-label mb-1 !text-xs">Client Voices</p>
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="reveal">
                <blockquote className="card-base card-hover flex h-full flex-col justify-between gap-5 p-6 sm:p-8 bg-surface2/60">
                  <div className="flex items-center justify-between">
                    <span className="font-syne text-3xl sm:text-4xl leading-none text-gold" aria-hidden="true">
                      “
                    </span>
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-syne text-[11px] font-bold text-gold">
                      {t.metric}
                    </span>
                  </div>

                  <p className="font-syne text-sm sm:text-base font-medium leading-relaxed text-ink">
                    {t.quote}
                  </p>

                  <figcaption className="mt-2 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 font-syne text-xs font-extrabold text-gold border border-gold/30"
                        aria-hidden="true"
                      >
                        {t.avatar}
                      </span>
                      <div>
                        <div className="font-syne text-sm font-bold text-ink">{t.name}</div>
                        <div className="text-xs text-muted">
                          {t.role} · <span className="text-subtle font-medium">{t.org}</span>
                        </div>
                      </div>
                    </div>

                    <span className="hidden sm:block text-[11px] text-muted">
                      {t.location}
                    </span>
                  </figcaption>
                </blockquote>
              </figure>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
