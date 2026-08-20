import { useReveal } from '../hooks/useReveal.js'
import { SERVICES } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

const SERVICE_IMAGES = {
  '01': { src: '/images/svc-brand.webp', alt: 'Brand identity and design system architecture' },
  '02': { src: '/images/svc-ai.webp', alt: 'AI application development and full-stack software' },
  '03': { src: '/images/svc-motion.webp', alt: 'Kinetic motion design and 3D animation' },
  '04': { src: '/images/svc-illustration.webp', alt: 'Digital artwork and bespoke illustration' },
}

export default function Services() {
  const ref = useReveal()
  const { currency, setBriefPreset, playSound } = useApp()

  const handleDiscuss = (service) => {
    playSound('open')
    setBriefPreset({
      service: service.name,
      message: `Inquiry regarding ${service.name} (${service.timeline}). We want to explore scope and kick-off details.`,
    })
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32 border-b border-border">
      <div className="container-page">

        {/* Section Header */}
        <header className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal">
            <p className="section-label mb-4">Core Capabilities</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Four disciplines.<br />One <span className="text-gold">standard.</span>
            </h2>
          </div>
          <div className="reveal max-w-md">
            <p className="text-base sm:text-lg font-light leading-relaxed text-subtle">
              Every deliverable is held to a single litmus test:{' '}
              <strong className="font-semibold text-ink">Is this top one percent in its category?</strong>
            </p>
            <p className="mt-2 text-xs text-muted">
              Fixed milestones · Full IP handover · Sub-second performance benchmarks
            </p>
          </div>
        </header>

        {/* Services 2x2 Grid */}
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((svc) => {
            const img = SERVICE_IMAGES[svc.num]
            const price = currency === 'USD' ? svc.fromUSD : svc.fromNGN

            return (
              <li key={svc.num} className="reveal">
                <article className="card-base card-hover group relative flex h-full flex-col overflow-hidden">
                  {/* Subtle Gold Edge Highlight on Hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Visual Header Banner */}
                  <div className="relative h-48 overflow-hidden sm:h-56 bg-surface2">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3"
                      style={{ background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 100%)' }}
                    />
                    {/* Department Number Badge */}
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-border/80 bg-surface/90 px-3 py-1 font-syne text-xs font-bold tracking-[0.2em] text-gold backdrop-blur-md shadow">
                        DEPT {svc.num}
                      </span>
                    </div>

                    {/* Timeline & Price Pill */}
                    <div className="absolute right-5 top-5 flex items-center gap-2">
                      <span className="rounded-full border border-border/80 bg-surface/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-md shadow">
                        {svc.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8 pt-2">
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-gold">
                        {svc.name}
                      </h3>
                      <span className="font-syne text-sm font-bold text-gold">
                        from {price}
                      </span>
                    </div>

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-lt">
                      {svc.tagline}
                    </p>

                    <p className="mb-6 text-sm font-light leading-relaxed text-subtle">
                      {svc.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mb-6 border-t border-border pt-4">
                      <p className="section-label mb-3 !text-[9px]">Included Deliverables</p>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {svc.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-ink2">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlight Box */}
                    <div className="mt-auto mb-6 rounded-xl bg-surface2 p-3.5 border border-border text-xs text-muted font-light">
                      <span className="font-semibold text-gold">Standard:</span> {svc.highlight}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <button
                        type="button"
                        onClick={() => handleDiscuss(svc)}
                        className="inline-flex items-center gap-2 font-syne text-xs sm:text-sm font-bold text-gold hover:text-gold-lt transition-colors"
                      >
                        Initiate Brief <span className="arrow">→</span>
                      </button>

                      <a
                        href="#calculator"
                        onClick={() => playSound('click')}
                        className="text-xs text-subtle hover:text-ink transition-colors underline underline-offset-4"
                      >
                        Configure in Estimator
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
