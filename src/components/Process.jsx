import { useReveal } from '../hooks/useReveal.js'
import { PROCESS } from '../data/site.js'

export default function Process() {
  const ref = useReveal()

  return (
    <section id="process" ref={ref} className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="container-page">

        <header className="mb-14 max-w-2xl">
          <p className="reveal section-label mb-4">How we work</p>
          <h2 className="reveal display mb-5 text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
            No mystery.<br />Just a <span className="text-gold">clear process.</span>
          </h2>
          <p className="reveal text-[17px] font-light leading-relaxed text-subtle">
            You always know what stage the work is in, what happens next, and what
            we need from you. Four steps, fixed scope, weekly checkpoints.
          </p>
        </header>

        <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting rail on desktop */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[70px] hidden h-px bg-gradient-to-r from-border via-gold/35 to-border lg:block"
          />
          {PROCESS.map((s) => (
            <li key={s.num} className="reveal relative">
              <div className="card-base card-hover h-full bg-white p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/35 bg-white font-syne text-xs font-bold text-gold">
                    {s.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-subtle">{s.dur}</span>
                </div>
                <h3 className="mb-2.5 font-syne text-lg font-bold text-ink">{s.name}</h3>
                <p className="text-sm font-light leading-relaxed text-subtle">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
