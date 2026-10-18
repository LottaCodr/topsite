import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal.js'
import { PROJECTS } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'
import { Badge } from './ui/badge.jsx'
import { Button } from './ui/button.jsx'
import { Card } from './ui/card.jsx'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs.jsx'

const CATEGORIES = ['All Products', 'AI & Mobile', 'Fintech & Mobile', 'Healthcare & Web OS', 'Brand & Motion']

export default function Work() {
  const ref = useReveal()
  const { openCaseStudy, playSound } = useApp()
  const [activeCategory, setActiveCategory] = useState('All Products')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Products') return PROJECTS
    return PROJECTS.filter((p) =>
      p.category.toLowerCase().includes(activeCategory.split(' ')[0].toLowerCase())
    )
  }, [activeCategory])

  return (
    <section id="work" ref={ref} className="scroll-mt-24 border-b border-border bg-secondary/30 py-24 lg:py-32">
      <div className="container-page">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal">
            <p className="section-label mb-4">Selected Flagships</p>
            <h2 className="display text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Products we have
              <br />
              <span className="text-gold">engineered &amp; launched.</span>
            </h2>
          </div>
          <div className="reveal max-w-md">
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              Engineered, designed, and deployed in-house and for client partners.
              Real software live in production with measurable business metrics.
            </p>
          </div>
        </header>

        {/* Category filter (Radix Tabs) */}
        <Tabs
          value={activeCategory}
          onValueChange={(v) => {
            setActiveCategory(v)
            playSound('click')
          }}
          className="reveal mb-12 gap-0"
          aria-label="Filter projects by category"
        >
          <TabsList className="flex-wrap justify-start">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects */}
        <ol className="flex flex-col gap-8">
          {filteredProjects.map((p, i) => (
            <li key={p.id} className="reveal">
              <Card className="group relative overflow-hidden border-border py-0 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_28px_72px_-16px_rgba(184,146,74,0.15)]">
                <div className="grid gap-0 lg:grid-cols-12">
                  {/* Visual */}
                  <div className="relative h-64 overflow-hidden sm:h-72 lg:col-span-5 lg:h-auto lg:min-h-[340px]">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} interface mockup`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="noise relative flex h-full flex-col items-center justify-center overflow-hidden p-8"
                        style={{ background: p.gradient || '#111' }}
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at center, ${p.accentColor}35 0%, transparent 70%)`,
                          }}
                        />
                        <div
                          className="relative grid h-24 w-24 place-items-center rounded-3xl border shadow-2xl transition-transform duration-500 group-hover:scale-110"
                          style={{
                            borderColor: `${p.accentColor}55`,
                            background: `${p.accentColor}20`,
                          }}
                        >
                          <span className="font-syne text-4xl font-extrabold" style={{ color: p.accentColor }}>
                            {p.icon}
                          </span>
                        </div>
                        <span
                          className="relative mt-4 rounded-md border px-3.5 py-1 font-syne text-xs uppercase tracking-widest"
                          style={{
                            borderColor: `${p.accentColor}40`,
                            color: p.accentColor,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                          }}
                        >
                          {p.category}
                        </span>
                      </div>
                    )}

                    {/* Edge fades */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 lg:block"
                      style={{ background: 'linear-gradient(to right, transparent, var(--card))' }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 lg:hidden"
                      style={{ background: 'linear-gradient(to top, var(--card), transparent)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="outline" className="gap-2">
                          <span
                            className="h-2 w-2 animate-pulse-slow rounded-full"
                            style={{ background: p.dot }}
                            aria-hidden="true"
                          />
                          <span className="text-foreground">{p.badge}</span>
                        </Badge>
                        <Badge variant="secondary" className="font-dm normal-case tracking-normal">
                          {p.timeline} · {p.year}
                        </Badge>
                      </div>

                      <h3
                        className="display mb-1 text-foreground transition-colors duration-300 group-hover:text-gold"
                        style={{ fontSize: 'clamp(26px, 3.2vw, 38px)' }}
                      >
                        {p.name}
                      </h3>
                      <p className="mb-4 font-syne text-sm font-semibold text-gold">{p.subtitle}</p>
                      <p className="mb-6 text-sm font-light leading-relaxed text-foreground/85 sm:text-base">
                        {p.summary}
                      </p>

                      {/* Metrics */}
                      <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-4 sm:grid-cols-4">
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-syne text-base font-extrabold text-gold sm:text-lg">
                              {m.value}
                            </div>
                            <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stack */}
                      <ul className="mb-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li key={s}>
                            <Badge variant="secondary" className="font-dm text-[11px] font-medium normal-case tracking-normal">
                              {s}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button size="sm" onClick={() => openCaseStudy(p.id)} className="px-5">
                        View Full Case Study
                        <ArrowRight />
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {i + 1} of {PROJECTS.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover accent bar */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-lt to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
              </Card>
            </li>
          ))}
        </ol>

        {/* Private portfolio banner */}
        <div className="reveal mt-14 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="max-w-xl text-sm font-light text-muted-foreground">
            Want to see private enterprise case studies, architectural blueprints, or client references?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="outline">
              <a href="#contact">
                Request Private Portfolio Access
                <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="ghost" className="text-success hover:bg-success/10 hover:text-success">
              <a
                href="https://wa.me/2349135775141?text=Hi%20Lotanna,%20I'd%20like%20to%20view%20the%20T.O.P%20portfolio%20and%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer noopener"
              >
                <MessageCircle />
                Direct WhatsApp Query
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
