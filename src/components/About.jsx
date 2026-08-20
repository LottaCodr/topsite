import { useReveal } from '../hooks/useReveal.js'
import { BELIEFS, SITE } from '../data/site.js'

const SKILLS = ['Next.js 15', 'React 19', 'TypeScript', 'FastAPI (Python)', 'React Native', 'Supabase & Postgres', 'Claude & OpenAI APIs', 'Figma & Design Tokens', 'Blender 3D', 'After Effects']

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32 border-b border-border">
      <div className="container-page">

        {/* Section Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="section-label mb-4">Origin &amp; Philosophy</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Built at the crossroads of<br /><span className="text-gold">taste &amp; engineering.</span>
            </h2>
          </div>
          <div className="reveal flex flex-col justify-end gap-4 text-base sm:text-lg font-light leading-relaxed">
            <p className="text-ink2">
              Top One Percent was founded on a simple observation: most category-leading companies
              build incredible technology, but have completely outgrown their digital presentation.
            </p>
            <p className="text-subtle">
              We close that gap permanently — by merging high-taste editorial branding, sub-second
              AI application development, and kinetic motion under one disciplined roof in Abuja.
            </p>
          </div>
        </div>

        {/* Core Beliefs 2x2 */}
        <div className="mb-20">
          <p className="reveal section-label mb-8">What We Stand For</p>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {BELIEFS.map((b, i) => (
              <li key={i} className="reveal">
                <div className="card-base card-hover flex h-full flex-col justify-between p-6 sm:p-8 bg-surface2/60">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-syne text-sm font-extrabold text-gold">
                      PRINCIPLE 0{i + 1}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
                  </div>
                  <h3 className="font-syne text-lg font-bold text-ink mb-2">{b.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-subtle">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Founder Spotlight Card */}
        <div className="reveal">
          <div className="card-base overflow-hidden bg-surface2 border-gold/30 shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-12">
              {/* Obsidian Identity Column */}
              <div className="noise relative flex items-center gap-5 bg-obsidian text-bone p-6 sm:p-10 lg:col-span-4 lg:flex-col lg:items-start lg:justify-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)' }}
                />
                <div className="relative grid h-16 w-16 sm:h-20 sm:w-20 shrink-0 place-items-center rounded-2xl border border-graphite bg-charcoal shadow-xl">
                  <span className="font-syne text-2xl sm:text-3xl font-extrabold text-gold-lt">
                    {SITE.founder.initials}
                  </span>
                </div>
                <div className="relative">
                  <p className="font-syne text-lg sm:text-xl font-bold text-bone lg:mt-6">
                    {SITE.founder.name}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-gold-lt font-semibold">
                    {SITE.founder.role}
                  </p>
                  <p className="mt-1 text-xs text-muted font-mono">
                    {SITE.location} · {SITE.timezoneDisplay}
                  </p>
                </div>
              </div>

              {/* Founder Statement & Skills */}
              <div className="p-6 sm:p-10 lg:col-span-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <blockquote className="mb-6 border-l-2 border-gold pl-5">
                    <p className="font-syne text-lg sm:text-xl font-bold leading-snug text-ink">
                      &ldquo;Ambitious founders building the most impactful technology deserve
                      to be presented with unmistakable market authority.&rdquo;
                    </p>
                  </blockquote>

                  <p className="mb-6 text-sm sm:text-base font-light leading-relaxed text-subtle">
                    {SITE.founder.bio}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted font-bold mb-3 font-syne">
                    Core Technical &amp; Design Architecture:
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {SKILLS.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink2"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
