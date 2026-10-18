import { Check } from 'lucide-react'
import { PROCESS } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { Badge } from './ui/badge.jsx'
import { Card, CardContent } from './ui/card.jsx'

export default function Process() {
  const ref = useReveal()

  return (
    <section id="process" ref={ref} className="scroll-mt-24 border-b border-border py-24 lg:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Engineering Methodology</p>
            <h2 className="display text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Four sprints from brief to{' '}
              <span className="text-gold">market launch.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
            No vague timelines or black-box development. You see clickable production
            milestones every single week.
          </p>
        </div>

        {/* Stepper */}
        <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS.map((p, i) => (
            <li key={p.num} className="reveal relative">
              {/* Connector line (desktop) */}
              {i < PROCESS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-8 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-gold/50 to-transparent xl:block"
                />
              )}

              <Card className="h-full border-border py-0 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 font-syne text-sm font-extrabold text-gold">
                      {p.num}
                    </span>
                    <Badge variant="secondary" className="font-dm text-[10px] font-semibold normal-case tracking-normal">
                      {p.dur}
                    </Badge>
                  </div>

                  <p className="mb-1 font-syne text-[10px] font-bold uppercase tracking-widest text-gold">
                    {p.phase}
                  </p>
                  <h3 className="mb-3 font-display text-lg font-extrabold text-foreground">
                    {p.name}
                  </h3>
                  <p className="mb-5 text-sm font-light leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>

                  <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-foreground/85">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-gold" />
                        <span className="leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
