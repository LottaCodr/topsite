import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { PROOF_STATS, TESTIMONIALS } from '../data/site.js'

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Counts a numeric string ("3" or "24h") from 0 → target once visible. */
function useCountUp(target, started) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return
    const numeric = parseFloat(target)
    const suffix = target.replace(/[\d.]+/, '')
    if (reducedMotion() || Number.isNaN(numeric)) {
      setValue(target)
      return
    }
    let raf
    const t0 = performance.now()
    const dur = 1100
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(`${Math.round(numeric * eased)}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target])

  return value
}

function Stat({ value, label, started }) {
  const v = useCountUp(value, started)
  return (
    <div className="border-l border-border pl-5 sm:pl-6">
      <div className="font-syne text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {v}
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-subtle sm:text-xs">
        {label}
      </div>
    </div>
  )
}

export default function Proof() {
  const ref = useReveal()
  const statsRef = useRef(null)
  const [started, setStarted] = useState(false)

  /* Kick the count-up once the stats row enters the viewport. */
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
      { threshold: 0.3 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section id="proof" ref={ref} aria-label="Client results and testimonials" className="scroll-mt-24 border-y border-border bg-white py-24 lg:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: numbers, then a calm explanation */}
          <div className="reveal lg:col-span-5">
            <p className="section-label mb-4">Proof, not promises</p>
            <h2 className="display mb-6 text-ink" style={{ fontSize: 'clamp(30px,4.2vw,48px)' }}>
              The work speaks.<br />The numbers <span className="text-gold">agree.</span>
            </h2>

            <div ref={statsRef} className="grid grid-cols-2 gap-x-6 gap-y-8">
              {PROOF_STATS.map(([v, l]) => (
                <Stat key={l} value={v} label={l} started={started} />
              ))}
            </div>

            <p className="mt-10 max-w-md text-[15px] font-light leading-relaxed text-subtle">
              We prefer to be judged by shipped products and measurable replies
              rather than adjectives. Here is what people who have worked with us
              say — and what they measured afterwards.
            </p>
          </div>

          {/* Right: testimonial cards */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="reveal">
                <blockquote className="card-base card-hover flex h-full flex-col gap-5 p-7 sm:p-8">
                  <span className="font-syne text-4xl leading-none text-gold/60" aria-hidden="true">
                    “
                  </span>
                  <p className="font-syne text-[15px] font-semibold leading-relaxed text-ink2 sm:text-base">
                    {t.quote}
                  </p>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface2 font-syne text-sm font-extrabold text-gold"
                      aria-hidden="true"
                    >
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-subtle">
                        {t.role} · {t.org}
                      </div>
                    </div>
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
