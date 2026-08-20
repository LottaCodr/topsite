import { useReveal } from '../hooks/useReveal.js'
import { COMPARISON } from '../data/site.js'

export default function Advantage() {
  const ref = useReveal()

  return (
    <section id="advantage" ref={ref} className="scroll-mt-24 bg-surface2 py-24 lg:py-32 border-b border-border">
      <div className="container-page">

        <header className="reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">The T.O.P Advantage</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Built for speed.<br />Obsessed with <span className="text-gold">mastery.</span>
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-subtle">
            Traditional agencies sell you senior partners and hand your codebase to
            junior interns. We eliminated the bloat. You work directly with elite architects.
          </p>
        </header>

        {/* Responsive Comparison Matrix */}
        <div className="reveal overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface3/60">
                  <th className="p-5 sm:p-6 font-syne text-xs font-bold uppercase tracking-wider text-muted w-1/4">
                    Comparison Factor
                  </th>
                  <th className="p-5 sm:p-6 font-syne text-xs font-extrabold uppercase tracking-wider text-gold bg-gold/10 w-1/3 border-x border-gold/30">
                    ★ T.O.P Studio Model
                  </th>
                  <th className="p-5 sm:p-6 font-syne text-xs font-bold uppercase tracking-wider text-muted w-1/5">
                    Traditional Agency
                  </th>
                  <th className="p-5 sm:p-6 font-syne text-xs font-bold uppercase tracking-wider text-muted w-1/5">
                    Solo Freelancer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="transition-colors hover:bg-surface2/60">
                    <td className="p-5 sm:p-6 font-syne text-sm font-bold text-ink">
                      {row.feature}
                    </td>
                    <td className="p-5 sm:p-6 text-sm font-semibold text-ink bg-gold/5 border-x border-gold/20">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 font-bold text-gold text-base">✓</span>
                        <span className="leading-relaxed">{row.top}</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-xs sm:text-sm text-subtle font-light leading-relaxed">
                      {row.agency}
                    </td>
                    <td className="p-5 sm:p-6 text-xs sm:text-sm text-subtle font-light leading-relaxed">
                      {row.freelance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="card-base p-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 font-syne text-xl font-extrabold text-gold">
              01
            </div>
            <h3 className="font-syne text-base font-bold text-ink mb-2">100% Senior Craft</h3>
            <p className="text-xs font-light text-subtle leading-relaxed">
              Every line of code and vector asset is designed and reviewed by senior engineers and lead designers.
            </p>
          </div>

          <div className="card-base p-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 font-syne text-xl font-extrabold text-gold">
              02
            </div>
            <h3 className="font-syne text-base font-bold text-ink mb-2">Fixed-Scope Certainty</h3>
            <p className="text-xs font-light text-subtle leading-relaxed">
              We define clear milestones, fixed budgets, and guaranteed weekly sprint checkpoints before kick-off.
            </p>
          </div>

          <div className="card-base p-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 font-syne text-xl font-extrabold text-gold">
              03
            </div>
            <h3 className="font-syne text-base font-bold text-ink mb-2">Total IP Ownership</h3>
            <p className="text-xs font-light text-subtle leading-relaxed">
              You own every Figma file, Git repository, API key, and database schema 100% upon handover.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
