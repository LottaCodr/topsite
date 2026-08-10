import { useReveal } from '../hooks/useReveal.js'
import { BELIEFS } from '../data/site.js'

const SKILLS = ['React', 'Next.js', 'TypeScript', 'Python', 'Figma', 'After Effects']

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32">
      <div className="container-page">

        <div className="mb-18 grid grid-cols-1 gap-12 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="section-label mb-4">Who we are</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              A different kind<br />of <span className="text-gold">company.</span>
            </h2>
          </div>
          <div className="reveal flex flex-col justify-end gap-5">
            <p className="text-[17px] font-light leading-relaxed text-ink2">
              T.O.P was founded on a simple observation: most companies have outgrown
              their current brand. The work is there. The presence is not.
            </p>
            <p className="text-[17px] font-light leading-relaxed text-subtle">
              We exist to close that gap — through brand identity, AI-powered products,
              motion content and illustration. Four disciplines, one standard. Based in
              Abuja, built for anywhere.
            </p>
          </div>
        </div>

        {/* Beliefs */}
        <div className="mb-16">
          <p className="reveal section-label mb-7">What we believe</p>
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {BELIEFS.map((b, i) => (
              <li key={i} className="reveal">
                <div className="card-base card-hover flex h-full gap-5 p-7">
                  <span className="font-syne text-sm font-bold text-gold">0{i + 1}</span>
                  <p className="text-[15px] font-light leading-relaxed text-ink2">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Founder */}
        <div className="reveal">
          <div className="card-base overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-12">
              {/* dark identity panel */}
              <div className="noise relative flex items-center gap-4 bg-obsidian p-6 sm:p-8 lg:col-span-4 lg:flex-col lg:items-start lg:justify-center lg:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.16) 0%, transparent 70%)' }}
                />
                <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-graphite bg-charcoal sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                  <span className="font-syne text-xl font-extrabold text-gold-lt sm:text-2xl lg:text-3xl">L</span>
                </div>
                <div className="relative">
                  <p className="font-syne text-base font-bold text-bone sm:text-lg lg:mt-5">Lotanna Iwuanyanwu</p>
                  <p className="mt-1 text-sm text-gold-lt">Founder &amp; CEO</p>
                  <p className="mt-1 text-xs text-muted">Abuja, Nigeria</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-8 lg:p-12">
                <blockquote className="mb-7 border-l-2 border-gold/40 pl-5">
                  <p className="font-syne text-base font-semibold leading-snug text-ink sm:text-lg lg:text-xl">
                    “The companies building the most interesting things deserve to be
                    seen clearly.”
                  </p>
                </blockquote>
                <p className="mb-7 max-w-2xl text-[15px] font-light leading-relaxed text-subtle">
                  Full-stack engineer, designer and founder. Built T.O.P at the intersection
                  of technology and creative culture — because taste without engineering
                  stalls, and engineering without taste never gets noticed.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <li key={s} className="rounded-full border border-border px-3 py-1 text-xs text-subtle">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
