import { BELIEFS } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { Badge } from './ui/badge.jsx'
import { Separator } from './ui/separator.jsx'

export default function Manifesto() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      className="noise relative overflow-hidden bg-[#0A0A0A] py-24 text-[#FAF7F2] lg:py-32"
      style={{ color: '#FAF7F2' }}
    >
      {/* Ambient gold light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(184,146,74,0.14) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(184,146,74,0.10) 0%, transparent 50%)',
        }}
      />

      {/* Watermark */}
      <span
        aria-hidden="true"
        className="top-wordmark pointer-events-none absolute -bottom-[0.3em] left-1/2 -translate-x-1/2 select-none opacity-[0.04]"
        style={{ fontSize: 'clamp(140px, 26vw, 420px)' }}
      >
        1%
      </span>

      <div className="container-page relative z-10">
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <Badge variant="gold" className="mb-6">The Standard</Badge>
          <h2
            className="display leading-[1.08]"
            style={{ fontSize: 'clamp(28px, 4.4vw, 52px)' }}
          >
            “We are not a vendor. We are the{' '}
            <span className="text-gold-lt">technical co-founders</span> you wish you had
            hired on day one.”
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed" style={{ color: 'rgba(250,247,242,0.65)' }}>
            T.O.P exists because brilliant African founders kept losing months and millions to
            bloated agencies and ghosting freelancers. We flipped the model: senior-only teams,
            fixed scope, total transparency, and work that defends itself in any room.
          </p>
        </div>

        <Separator className="mx-auto mb-16 max-w-4xl" style={{ background: 'rgba(250,247,242,0.12)' }} />

        <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
          {BELIEFS.map((b, i) => (
            <div key={b.title} className="reveal flex gap-5">
              <span className="font-mono text-xs font-bold text-gold-lt" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3 className="mb-2 font-syne text-base font-bold leading-snug lg:text-lg">
                  {b.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(250,247,242,0.6)' }}>
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
