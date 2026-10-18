import { ArrowRight, BrainCircuit, Check, Film, Palette, PenTool } from 'lucide-react'
import { SERVICES } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'
import { useReveal } from '../hooks/useReveal.js'
import { cn } from '../lib/utils.js'
import { Badge } from './ui/badge.jsx'
import { Button } from './ui/button.jsx'
import { Card, CardContent } from './ui/card.jsx'

const ICONS = {
  branding: Palette,
  engineering: BrainCircuit,
  motion: Film,
  illustration: PenTool,
}

const IMAGES = {
  branding: '/images/svc-brand.webp',
  engineering: '/images/svc-ai.webp',
  motion: '/images/svc-motion.webp',
  illustration: '/images/svc-illustration.webp',
}

/** Bento spans: engineering is the hero tile (2 rows), the rest flex around it. */
const SPANS = {
  engineering: 'lg:col-span-7 lg:row-span-2',
  branding: 'lg:col-span-5',
  motion: 'lg:col-span-5',
  illustration: 'lg:col-span-8',
}

const ORDER = ['engineering', 'branding', 'motion', 'illustration']

function ServiceTile({ service, large }) {
  const { currency, setBriefPreset, playSound } = useApp()
  const Icon = ICONS[service.id]
  const image = IMAGES[service.id]

  const addToBrief = () => {
    playSound('open')
    setBriefPreset({
      service:
        service.id === 'engineering'
          ? 'AI App Development'
          : service.id === 'branding'
            ? 'Branding & Visual Identity'
            : service.id === 'motion'
              ? 'Kinetic Motion & 3D Animation'
              : 'Artworks & Illustration',
      message: `I'd like to start with ${service.name} (${currency === 'USD' ? service.fromUSD : service.fromNGN} starting point, ${service.timeline} timeline). Here is what we need:`,
    })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Card
      className="group relative w-full overflow-hidden border-border py-0 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_64px_-16px_rgba(184,146,74,0.18)]"
    >
      {/* Image layer */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-35"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--card) 30%, color-mix(in oklab, var(--card) 70%, transparent) 65%, color-mix(in oklab, var(--card) 45%, transparent) 100%)',
          }}
        />
      </div>

      <CardContent className={cn('relative flex h-full flex-col', large ? 'p-8 lg:p-10' : 'p-6 lg:p-7')}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
              <Icon className="size-5" />
            </span>
            <span className="font-mono text-xs font-bold text-muted-foreground">{service.num}</span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant="gold">From {currency === 'USD' ? service.fromUSD : service.fromNGN}</Badge>
            <span className="text-[11px] text-muted-foreground">{service.timeline}</span>
          </div>
        </div>

        <h3
          className={cn('mb-2 font-display font-extrabold text-foreground', large ? 'text-2xl lg:text-3xl' : 'text-xl')}
        >
          {service.name}
        </h3>
        <p className="mb-4 text-sm font-semibold text-gold">{service.tagline}</p>

        <p
          className={cn(
            'mb-5 font-light leading-relaxed text-muted-foreground',
            large ? 'max-w-md text-sm lg:text-base' : 'line-clamp-3 text-xs lg:text-sm'
          )}
        >
          {service.desc}
        </p>

        {/* Deliverables checklist */}
        <ul className={cn('mb-6 grid gap-2', large && 'lg:grid-cols-2')}>
          {service.deliverables.slice(0, large ? 6 : 3).map((d) => (
            <li key={d} className="flex items-start gap-2 text-xs text-foreground/85 lg:text-[13px]">
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold" />
              <span className="leading-snug">{d}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="hidden text-[11px] leading-tight text-muted-foreground sm:block lg:max-w-[60%]">
            {service.highlight}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={addToBrief}
            className="ml-auto shrink-0 text-gold hover:bg-gold/10 hover:text-gold-lt"
          >
            Add to Brief
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Services() {
  const ref = useReveal()
  const ordered = ORDER.map((id) => SERVICES.find((s) => s.id === id)).filter(Boolean)

  return (
    <section id="services" ref={ref} className="scroll-mt-24 border-b border-border py-24 lg:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Core Disciplines</p>
            <h2 className="display text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Four departments.
              <br />
              One <span className="text-gold">uncompromising</span> standard.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground">
            Every engagement is staffed exclusively by senior architects and designers.
            Transparent starting benchmarks in both currencies: no retainers, no billable-hour games.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {ordered.map((s) => (
            <div key={s.id} className={cn('reveal flex', SPANS[s.id])}>
              <ServiceTile service={s} large={s.id === 'engineering'} />
            </div>
          ))}

          {/* CTA tile */}
          <div className="reveal flex lg:col-span-4">
            <Card className="flex h-full w-full items-center justify-center border-dashed border-gold/30 bg-gold/[0.04] p-8 text-center">
              <CardContent className="px-0">
                <p className="mb-2 font-display text-xl font-extrabold text-foreground">
                  Not sure where to start?
                </p>
                <p className="mx-auto mb-6 max-w-xs text-sm font-light text-muted-foreground">
                  Configure your scope in 60 seconds and get a transparent benchmark before
                  talking to anyone.
                </p>
                <Button asChild>
                  <a href="#calculator">
                    Open Scope Estimator
                    <ArrowRight />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
