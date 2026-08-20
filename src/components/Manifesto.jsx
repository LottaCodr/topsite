import { useReveal } from '../hooks/useReveal.js'
import { DISCIPLINES } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

export default function Manifesto() {
  const ref = useReveal()
  const { currency, setBriefPreset, playSound } = useApp()

  const handleSelectDiscipline = (d) => {
    playSound('open')
    setBriefPreset({
      service: d.name,
      message: `Inquiry for ${d.name} (${currency === 'USD' ? d.metaUSD : d.metaNGN}, ${d.timeline}).`,
    })
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} aria-label="Our standard" className="scroll-mt-24 overflow-hidden bg-obsidian text-bone">
      <div className="noise relative">
        {/* Ambient Gold Radial Light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.16) 0%, transparent 68%)' }}
        />

        <div className="container-page relative py-20 sm:py-24 lg:py-32">
          {/* Headline */}
          <div className="reveal mb-12 sm:mb-16">
            <p className="section-label mb-4 !text-gold-lt">Our Core Thesis</p>
            <p className="display text-bone" style={{ fontSize: 'clamp(34px,5.4vw,70px)', maxWidth: '22ch' }}>
              Average work is a <span className="text-gold-lt">slow decline.</span>{' '}
              Top one percent compounds forever.
            </p>
            <p className="mt-4 max-w-xl text-base sm:text-lg font-light text-muted">
              We reject template aesthetics, bloated agency retainers, and outsourced sub-contractors.
              Every project is architected for sovereign category dominance.
            </p>
          </div>

          {/* Discipline Index */}
          <ol className="border-t border-graphite">
            {DISCIPLINES.map((d, i) => {
              const metaPrice = currency === 'USD' ? d.metaUSD : d.metaNGN
              return (
                <li key={d.name} className="reveal">
                  <button
                    type="button"
                    onClick={() => handleSelectDiscipline(d)}
                    className="group flex w-full items-baseline justify-between gap-6 border-b border-graphite py-5 sm:py-7 text-left transition-colors duration-300 hover:border-gold/60"
                  >
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-syne text-xs font-bold tracking-[0.2em] text-gold-lt/70">
                        0{i + 1}
                      </span>
                      <span className="font-syne text-xl font-bold text-bone transition-colors duration-300 group-hover:text-gold-lt sm:text-2xl lg:text-3xl">
                        {d.name}
                      </span>
                    </span>

                    <span className="hidden text-sm text-muted transition-colors duration-300 group-hover:text-gold-lt/90 sm:block">
                      {metaPrice} · {d.timeline}
                    </span>

                    <span
                      className="arrow shrink-0 font-syne text-lg text-gold-lt/60 transition-colors duration-300 group-hover:text-gold-lt"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Large Clipped Watermark Text */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative select-none overflow-hidden"
          style={{
            marginTop: '-0.15em',
            marginBottom: '-0.2em',
            textAlign: 'center',
          }}
        >
          <span
            className="top-wordmark block text-bone/[0.04] whitespace-nowrap"
            style={{ fontSize: 'clamp(80px, 20vw, 320px)', letterSpacing: '-0.04em' }}
          >
            TOP ONE PERCENT
          </span>
        </div>
      </div>
    </section>
  )
}
