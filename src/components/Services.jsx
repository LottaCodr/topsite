import { useReveal } from '../hooks/useReveal.js'
import { SERVICES } from '../data/site.js'

// Map service numbers to their visual assets
const SERVICE_IMAGES = {
  '01': { src: '/images/svc-brand.png', alt: 'Brand identity design composition' },
  '02': { src: '/images/svc-ai.png', alt: 'AI app development product mockup' },
  '03': { src: '/images/svc-motion.png', alt: 'Motion design and animation visual' },
  '04': { src: '/images/svc-illustration.png', alt: 'Digital illustration and artwork' },
}

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" ref={ref} className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="container-page">

        <header className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal">
            <p className="section-label mb-4">What we do</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Four departments.<br />One <span className="text-gold">standard.</span>
            </h2>
          </div>
          <p className="reveal max-w-xs text-[15px] font-light leading-relaxed text-subtle">
            Every project is held to a single question:{' '}
            <span className="text-ink2">Is this top one percent?</span>
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SERVICES.map((svc) => {
            const img = SERVICE_IMAGES[svc.num]
            return (
              <li key={svc.num} className="reveal">
                <article className="card-base card-hover group relative flex h-full flex-col overflow-hidden">
                  {/* gold wash on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Visual header image */}
                  <div className="relative h-48 overflow-hidden sm:h-52">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient overlay into the card body */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/2"
                      style={{ background: 'linear-gradient(to top, #fff 0%, transparent 100%)' }}
                    />
                    {/* Service number badge */}
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-border/80 bg-white/90 px-3 py-1 font-syne text-xs font-bold tracking-[0.2em] text-gold backdrop-blur-sm">
                        {svc.num}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-7 lg:p-8 pt-4">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="font-syne text-xl font-bold text-ink transition-colors duration-300 group-hover:text-gold">
                        {svc.name}
                      </h3>
                      <div className="flex shrink-0 items-center gap-2 text-[11px] text-subtle">
                        <span className="rounded-full border border-border px-2.5 py-1">{svc.timeline}</span>
                        <span className="rounded-full border border-border px-2.5 py-1">From {svc.from}</span>
                      </div>
                    </div>

                    <p className="mb-6 text-sm font-light leading-relaxed text-subtle">{svc.desc}</p>

                    <ul className="mb-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {svc.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[13px] text-ink2">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-auto inline-flex items-center gap-2 font-syne text-[13px] font-semibold text-ink transition-colors hover:text-gold"
                    >
                      Discuss this <span className="arrow" aria-hidden="true">→</span>
                      <span className="sr-only">— {svc.name}</span>
                    </a>
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
