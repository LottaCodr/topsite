import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Users } from 'lucide-react'
import { SITE } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { Button } from './ui/button.jsx'
import { Card, CardContent } from './ui/card.jsx'
import { Separator } from './ui/separator.jsx'

const PILLARS = [
  {
    icon: Users,
    title: 'Senior-only, by policy',
    desc: 'Every line of code and every vector is produced by senior architects. We do not staff juniors on client work, ever.',
  },
  {
    icon: ShieldCheck,
    title: 'Total IP ownership',
    desc: 'Repos, Figma libraries, database schemas, and documentation transfer 100% to you at handover. Zero licensing strings.',
  },
  {
    icon: BadgeCheck,
    title: 'Fixed-scope economics',
    desc: 'Milestone-based pricing agreed before kickoff. No billable-hour creep, no surprise change orders.',
  },
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="scroll-mt-24 border-b border-border bg-secondary/30 py-24 lg:py-32">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="reveal">
            <p className="section-label mb-4">Origin & Philosophy</p>
            <h2 className="display mb-6 text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Founded in Abuja.
              <br />
              Built for the <span className="text-gold">global top one percent.</span>
            </h2>
            <div className="flex flex-col gap-4 text-base font-light leading-relaxed text-muted-foreground">
              <p>
                {SITE.pitch} T.O.P was founded in {SITE.founded} by {SITE.founder.name} to prove
                that world-class product engineering and brand architecture could ship from
                Nigeria: faster, sharper, and more transparent than any agency in London or
                San Francisco.
              </p>
              <p>
                We operate as a small, deliberate studio: a handful of senior architects,
                designers, and creative technologists who refuse to scale headcount at the
                expense of craft. Every engagement gets direct founder attention from first
                brief to final handover.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href="#work">
                  See the Evidence
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="ghost" className="text-muted-foreground">
                <a href="#contact">Talk to the Founder</a>
              </Button>
            </div>
          </div>

          {/* Founder card + pillars */}
          <div className="flex flex-col gap-5">
            <Card className="reveal overflow-hidden border-gold/25 py-0">
              <CardContent className="flex items-center gap-5 p-6 sm:p-7">
                <span
                  className="grid size-20 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/25 to-gold/5 font-syne text-2xl font-extrabold text-gold"
                  aria-hidden="true"
                >
                  {SITE.founder.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-xl font-extrabold text-foreground">
                    {SITE.founder.name}
                  </p>
                  <p className="mb-2 font-syne text-xs font-bold uppercase tracking-widest text-gold">
                    {SITE.founder.role}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {SITE.founder.location}
                  </p>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="p-6 sm:p-7">
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  “{SITE.founder.bio}”
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {PILLARS.map((p) => (
                <Card key={p.title} className="reveal border-border py-5">
                  <CardContent className="px-5">
                    <span className="mb-3 grid size-9 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <p.icon className="size-4" />
                    </span>
                    <h3 className="mb-1.5 font-syne text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="text-xs font-light leading-relaxed text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
