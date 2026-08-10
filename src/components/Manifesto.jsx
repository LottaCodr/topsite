import { useReveal } from '../hooks/useReveal.js'
import { DISCIPLINES } from '../data/site.js'

/**
 * Full-bleed dark manifesto band: giant clipped wordmark + an index of the
 * four disciplines. It is the page's "signature moment" — intentionally the
 * only section with oversized type running edge-to-edge.
 */
export default function Manifesto() {
  const ref = useReveal()

  return (
    <section ref={ref} aria-label="Our standard" className="scroll-mt-24 overflow-hidden bg-obsidian">
      <div className="noise relative">
        {/* Ambient gold light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 66%)' }}
        />

        <div className="container-page relative py-20 sm:py-24 lg:py-28">
          <div className="reveal mb-12 sm:mb-16">
            <p className="section-label mb-4 !text-gold-lt">Our standard</p>
            <p className="display text-bone" style={{ fontSize: 'clamp(34px,5.4vw,68px)', maxWidth: '20ch' }}>
              Good enough is a <span className="text-gold-lt">slow decline.</span>{' '}
              Top one percent compounds.
            </p>
          </div>

          {/* Discipline index — hover reveals pricing + timeline */}
          <ol className="border-t border-graphite">
            {DISCIPLINES.map((d, i) => (
              <li key={d.name} className="reveal">
                <a
                  href="#contact"
                  onClick={() => {
                    /* Pre-select this discipline in the contact form. */
                    try { sessionStorage.setItem('top_service', d.name) } catch { /* private mode */ }
                  }}
                  className="group flex items-baseline justify-between gap-6 border-b border-graphite py-5 transition-colors duration-300 hover:border-gold/40 sm:py-6"
                >
                  <span className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-syne text-xs font-bold tracking-[0.2em] text-gold-lt/60">
                      0{i + 1}
                    </span>
                    <span className="font-syne text-xl font-bold text-bone transition-colors duration-300 group-hover:text-gold-lt sm:text-2xl lg:text-3xl">
                      {d.name}
                    </span>
                  </span>
                  <span className="hidden text-sm text-muted transition-colors duration-300 group-hover:text-gold-lt/80 sm:block">
                    {d.meta}
                  </span>
                  <span className="arrow shrink-0 font-syne text-lg text-gold-lt/50 transition-colors duration-300 group-hover:text-gold-lt" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Giant clipped wordmark running off the edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative select-none"
          style={{
            marginTop: '-0.16em',
            marginBottom: '-0.2em',
            textAlign: 'center',
            transform: 'translateY(0.06em)',
          }}
        >
          <span
            className="top-wordmark block text-bone/[0.06]"
            style={{ fontSize: 'clamp(88px, 21vw, 340px)', letterSpacing: '-0.04em' }}
          >
            TOP ONE PERCENT
          </span>
        </div>
      </div>
    </section>
  )
}
