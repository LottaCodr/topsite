import { useReveal } from '../hooks/useReveal.js'
import { SITE } from '../data/site.js'

export default function CTABanner() {
  const ref = useReveal()

  return (
    <section ref={ref} className="bg-surface px-4 py-16 sm:px-6 lg:px-12">
      <div className="container-page !px-0">
        <div className="reveal">
          <div
            className="noise relative flex flex-col items-start gap-8 overflow-hidden rounded-3xl bg-obsidian text-bone px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20 border border-gold/30 shadow-2xl"
          >
            {/* Ambient Lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.18) 0%, transparent 65%)',
              }}
            />

            <div className="relative z-10 max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-graphite bg-charcoal px-3 py-1 text-[11px] text-gold-lt font-syne font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                {SITE.availability.status} · {SITE.availability.quarter}
              </div>

              <h2 className="display mb-4 text-bone" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                Ready to engineer your category-defining presence?
              </h2>

              <p className="text-sm sm:text-base font-light leading-relaxed text-muted">
                One conversation with our senior architects. Zero sales fluff. Fixed-scope clarity
                on architecture, price, and deliverables in under 24 hours.
              </p>
            </div>

            <div className="relative z-10 flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <a href="#contact" className="btn-gold w-full sm:w-auto text-center">
                Start a Project Brief <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost-dark w-full sm:w-auto text-center"
              >
                WhatsApp CEO 💬
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
