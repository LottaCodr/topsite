import { useReveal } from '../hooks/useReveal.js'
import { PROCESS } from '../data/site.js'

export default function Process() {
  const ref = useReveal()

  return (
    <section id="process" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32 border-b border-border">
      <div className="container-page">

        {/* Header */}
        <header className="mb-14 max-w-2xl">
          <p className="reveal section-label mb-4">Engineering Methodology</p>
          <h2 className="reveal display mb-5 text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
            No black boxes.<br />Just a <span className="text-gold">disciplined sprint.</span>
          </h2>
          <p className="reveal text-base sm:text-lg font-light leading-relaxed text-subtle">
            You receive live clickable staging links from Week 1. Weekly async video walkthroughs,
            fixed scope agreements, and zero unexpected billable hour creep.
          </p>
        </header>

        {/* 4-Step Process Grid */}
        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting Rail for Desktop */}
          <span
            aria-hidden="true"
            className="absolute left-6 right-6 top-[62px] hidden h-[2px] bg-gradient-to-r from-border via-gold/40 to-border lg:block pointer-events-none"
          />

          {PROCESS.map((s) => (
            <li key={s.num} className="reveal relative">
              <div className="card-base card-hover flex h-full flex-col justify-between p-6 sm:p-7 bg-surface2/70">
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-surface font-syne text-sm font-extrabold text-gold shadow-sm">
                      {s.num}
                    </span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-wider text-muted font-mono font-medium">
                      {s.dur}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-widest text-gold font-syne font-bold mb-1">
                    {s.phase}
                  </p>
                  <h3 className="mb-3 font-syne text-lg font-bold text-ink">{s.name}</h3>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-subtle mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Deliverables for this Phase */}
                <div className="border-t border-border pt-4 mt-auto">
                  <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-2">Phase Outputs:</p>
                  <ul className="flex flex-col gap-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-ink2">
                        <span className="h-1 w-1 rounded-full bg-gold shrink-0" />
                        <span className="leading-tight">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}
