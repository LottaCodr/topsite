import { useReveal } from '../hooks/useReveal.js'
import { PROJECTS } from '../data/site.js'

// Visual assets per project — we use brand-colored gradient panels for
// projects that don't have a photo mockup yet, which still look premium.
const PROJECT_VISUALS = {
  Glimms: {
    type: 'image',
    src: '/images/work-glimms.webp',
    alt: 'Glimms AI fashion styling app interface',
  },
  'nēro': {
    type: 'gradient',
    dot: '#B8924A',
    bg: 'linear-gradient(135deg, #0A0A0A 0%, #1a1510 50%, #26200f 100%)',
    accent: 'rgba(184,146,74,0.22)',
    label: 'Personal Finance',
    icon: '₦',
  },
  'Nile Valley EMR': {
    type: 'gradient',
    dot: '#2B8A72',
    bg: 'linear-gradient(135deg, #071813 0%, #0d2520 50%, #112e28 100%)',
    accent: 'rgba(43,138,114,0.22)',
    label: 'Healthcare Platform',
    icon: '✦',
  },
}

export default function Work() {
  const ref = useReveal()

  return (
    <section id="work" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32">
      <div className="container-page">

        <header className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal">
            <p className="section-label mb-4">Recent work</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Products we have<br /><span className="text-gold">built.</span>
            </h2>
          </div>
          <p className="reveal max-w-xs text-[15px] font-light leading-relaxed text-subtle">
            Three products designed, engineered and shipped in-house — not client
            logos borrowed for a wall.
          </p>
        </header>

        <ol className="flex flex-col gap-6">
          {PROJECTS.map((p, i) => {
            const visual = PROJECT_VISUALS[p.name]
            return (
              <li key={p.name} className="reveal">
                <article className="card-base card-hover group relative overflow-hidden">
                  <div className="grid gap-0 lg:grid-cols-12">

                    {/* ---- Visual panel ---- */}
                    <div className="relative h-56 overflow-hidden sm:h-64 lg:col-span-5 lg:h-auto lg:min-h-[280px]">
                      {visual.type === 'image' ? (
                        <img
                          src={visual.src}
                          alt={visual.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        /* Styled gradient panel for projects without a photo */
                        <div
                          className="relative flex h-full flex-col items-center justify-center overflow-hidden"
                          style={{ background: visual.bg }}
                        >
                          {/* Radial glow */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{ background: `radial-gradient(ellipse at 60% 40%, ${visual.accent} 0%, transparent 65%)` }}
                          />
                          {/* Animated noise texture */}
                          <div className="noise pointer-events-none absolute inset-0 opacity-40" />
                          {/* Central icon / brand mark */}
                          <div className="relative flex flex-col items-center gap-4">
                            <div
                              className="grid h-20 w-20 place-items-center rounded-2xl border"
                              style={{ borderColor: `${visual.dot}55`, background: `${visual.dot}18` }}
                            >
                              <span
                                className="font-syne text-3xl font-extrabold"
                                style={{ color: visual.dot }}
                              >
                                {visual.icon}
                              </span>
                            </div>
                            <span
                              className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-widest"
                              style={{ borderColor: `${visual.dot}40`, color: `${visual.dot}` }}
                            >
                              {visual.label}
                            </span>
                          </div>
                          {/* Grid decoration */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-[0.06]"
                            style={{
                              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                              backgroundSize: '40px 40px',
                            }}
                          />
                        </div>
                      )}
                      {/* Gradient fade into card body on desktop (right edge) */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 right-0 hidden w-16 lg:block"
                        style={{ background: 'linear-gradient(to right, transparent, #fff)' }}
                      />
                      {/* Gradient fade on mobile (bottom edge) */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-10 lg:hidden"
                        style={{ background: 'linear-gradient(to top, #fff, transparent)' }}
                      />
                    </div>

                    {/* ---- Content panel ---- */}
                    <div className="p-7 lg:col-span-7 lg:p-10">

                      {/* identity */}
                      <div className="mb-5">
                        <div className="mb-3 flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full animate-pulse-slow"
                            style={{ background: p.dot }}
                            aria-hidden="true"
                          />
                          <span className="text-[11px] uppercase tracking-[0.16em] text-subtle">
                            {p.status}
                          </span>
                        </div>

                        <h3
                          className="display mb-1 text-ink transition-colors duration-300 group-hover:text-gold"
                          style={{ fontSize: 'clamp(26px,3vw,36px)' }}
                        >
                          {p.name}
                        </h3>
                        <p className="text-sm text-subtle">{p.type} · {p.year}</p>
                      </div>

                      <p className="mb-6 text-[15px] font-light leading-relaxed text-ink2">{p.desc}</p>

                      {/* Metrics */}
                      <div className="mb-6 flex gap-8">
                        {p.metrics.map(([v, l]) => (
                          <div key={l}>
                            <div className="font-syne text-lg font-extrabold text-ink">{v}</div>
                            <div className="mt-0.5 text-[11px] leading-tight text-subtle">{l}</div>
                          </div>
                        ))}
                      </div>

                      {/* Stack */}
                      <ul className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-border bg-white px-3 py-1 text-xs text-subtle transition-colors duration-300 group-hover:border-gold/40"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* bottom accent line */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 group-hover:scale-x-100"
                  />
                  <span className="sr-only">Project {i + 1} of {PROJECTS.length}</span>
                </article>
              </li>
            )
          })}
        </ol>

        <div className="reveal mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-light text-subtle">
            Full case studies and client portfolio shared during project conversations.
          </p>
          <a href="#contact" className="btn-outline">
            Request the portfolio <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
