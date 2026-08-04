import { useReveal } from '../hooks/useReveal.js'
import { SITE } from '../data/site.js'

export default function CTABanner() {
  const ref = useReveal()

  return (
    <section ref={ref} className="bg-white px-6 pb-10 pt-4 lg:px-12">
      <div className="container-page !px-0">
        <div className="reveal">
          <div
            className="noise relative flex flex-col items-start gap-8 overflow-hidden rounded-[1.5rem] bg-obsidian px-6 py-12 sm:rounded-[1.75rem] sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20"
            style={{ border: '1px solid rgba(201,169,110,0.22)' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 85% 40%, rgba(201,169,110,0.14) 0%, transparent 62%)' }}
            />

            <div className="relative z-10 max-w-xl">
              <p className="section-label mb-4 !text-gold-lt">Next step</p>
              <h2 className="display mb-4 text-bone" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
                Ready to be seen the way you deserve?
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-muted">
                One conversation. No commitment. Just clarity on what it takes and
                what it costs.
              </p>
            </div>

            <div className="relative z-10 flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <a href="#contact" className="btn-gold w-full sm:w-auto">
                Start a Project <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="btn-ghost-dark w-full sm:w-auto">
                Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
