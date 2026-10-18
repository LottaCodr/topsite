import { useEffect, useRef, useState } from 'react'
import { MapPin, Quote, Star } from 'lucide-react'
import { PROOF_STATS, TESTIMONIALS } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { Badge } from './ui/badge.jsx'
import { Card, CardContent } from './ui/card.jsx'

/** Animated count-up that fires once when the stat scrolls into view. */
function CountUp({ value, suffix }) {
  const [display, setDisplay] = useState(0)
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const target = Number(value)
    if (Number.isNaN(target)) {
      setDisplay(value)
      return
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target)
      return
    }

    let raf = null
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1200
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(eased * target))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={elRef}>
      {display}
      <span className="text-gold">{suffix}</span>
    </span>
  )
}

export default function Proof() {
  const ref = useReveal()

  return (
    <section id="proof" ref={ref} className="scroll-mt-24 border-b border-border bg-secondary/30 py-24 lg:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="reveal mb-14 max-w-2xl">
          <p className="section-label mb-4">Verified Proof</p>
          <h2 className="display text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
            Numbers on the board.
            <br />
            <span className="text-gold">Words from the room.</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div className="reveal mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PROOF_STATS.map((stat) => (
            <Card key={stat.label} className="items-center border-border py-8 text-center">
              <CardContent className="px-4">
                <div className="font-syne text-4xl font-extrabold leading-none text-foreground lg:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 font-syne text-xs font-bold uppercase tracking-wider text-foreground">
                  {stat.label}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="reveal group border-border transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
              <CardContent className="flex h-full flex-col px-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="size-5 text-gold/30 transition-colors group-hover:text-gold/60" />
                </div>

                <blockquote className="mb-6 flex-1 text-sm font-light leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>

                <Badge variant="gold" className="mb-5 self-start">{t.metric}</Badge>

                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 font-syne text-sm font-bold text-gold"
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-syne text-sm font-bold text-foreground">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.role} · {t.org}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="size-3" />
                      {t.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
