import { ArrowRight, Check, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { useApp } from '../hooks/useApp.js'
import { PROJECTS, SITE } from '../data/site.js'
import { Badge } from './ui/badge.jsx'
import { Button } from './ui/button.jsx'
import { Separator } from './ui/separator.jsx'
import { Dialog, DialogContent } from './ui/dialog.jsx'

export default function CaseStudyModal() {
  const { activeCaseStudy, closeCaseStudy, openCaseStudy, setBriefPreset, playSound } = useApp()

  if (!activeCaseStudy) return null

  const currentIndex = PROJECTS.findIndex((p) => p.id === activeCaseStudy.id)
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length]
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  const handleStartSimilar = () => {
    setBriefPreset({
      service: activeCaseStudy.category.includes('AI')
        ? 'AI App Development'
        : activeCaseStudy.category.includes('Brand')
          ? 'Branding & Visual Identity'
          : 'AI App Development',
      message: `Inquiry inspired by the ${activeCaseStudy.name} case study (${activeCaseStudy.subtitle}). We are looking to build a similar tier product.`,
    })
    closeCaseStudy()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) closeCaseStudy()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl overflow-hidden p-0"
        aria-describedby={undefined}
      >
        {/* Top control bar */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 animate-pulse-slow rounded-full"
              style={{ background: activeCaseStudy.accentColor }}
              aria-hidden="true"
            />
            <span className="section-label !text-[10px] !text-foreground">
              Case Study · {activeCaseStudy.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openCaseStudy(prevProject.id)}
              aria-label={`Previous case study: ${prevProject.name}`}
              title={`Previous: ${prevProject.name}`}
            >
              <ChevronLeft />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openCaseStudy(nextProject.id)}
              aria-label={`Next case study: ${nextProject.name}`}
              title={`Next: ${nextProject.name}`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight />
            </Button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-10">
          {/* Banner */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-border">
            {activeCaseStudy.image ? (
              <img
                src={activeCaseStudy.image}
                alt={`${activeCaseStudy.name} product visual`}
                className="h-64 w-full object-cover sm:h-80"
              />
            ) : (
              <div
                className="noise relative flex h-64 flex-col items-center justify-center p-6 text-center sm:h-80"
                style={{ background: activeCaseStudy.gradient || '#111' }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at center, ${activeCaseStudy.accentColor}25 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="relative mb-4 grid h-20 w-20 place-items-center rounded-2xl border shadow-xl"
                  style={{
                    borderColor: `${activeCaseStudy.accentColor}66`,
                    background: `${activeCaseStudy.accentColor}20`,
                  }}
                >
                  <span
                    className="font-syne text-3xl font-extrabold"
                    style={{ color: activeCaseStudy.accentColor }}
                  >
                    {activeCaseStudy.icon}
                  </span>
                </div>
                <span
                  className="relative rounded-full border px-4 py-1 font-syne text-xs uppercase tracking-widest"
                  style={{
                    borderColor: `${activeCaseStudy.accentColor}50`,
                    color: activeCaseStudy.accentColor,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}
                >
                  {activeCaseStudy.category}
                </span>
              </div>
            )}
          </div>

          {/* Title & meta */}
          <h2
            id="case-study-title"
            className="display mb-2 text-foreground"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {activeCaseStudy.name}
          </h2>
          <p className="mb-5 font-syne text-sm font-semibold text-gold sm:text-base">
            {activeCaseStudy.subtitle}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            <Badge variant="secondary">{activeCaseStudy.client}</Badge>
            <Badge variant="secondary">{activeCaseStudy.year}</Badge>
            <Badge variant="secondary">{activeCaseStudy.timeline}</Badge>
            <Badge variant="gold">{activeCaseStudy.badge}</Badge>
          </div>

          <p className="mb-8 text-base font-light leading-relaxed text-foreground/90">
            {activeCaseStudy.summary}
          </p>

          {/* Problem / Solution */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-destructive/25 bg-destructive/[0.05] p-5">
              <p className="mb-2 font-syne text-xs font-bold uppercase tracking-widest text-destructive">
                The Problem
              </p>
              <p className="text-sm font-light leading-relaxed text-foreground/85">
                {activeCaseStudy.problem}
              </p>
            </div>
            <div className="rounded-2xl border border-success/25 bg-success/[0.05] p-5">
              <p className="mb-2 font-syne text-xs font-bold uppercase tracking-widest text-success">
                The Solution
              </p>
              <p className="text-sm font-light leading-relaxed text-foreground/85">
                {activeCaseStudy.solution}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {activeCaseStudy.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-secondary/40 p-4 text-center"
              >
                <div className="font-syne text-xl font-extrabold text-gold">{m.value}</div>
                <div className="mt-1 font-syne text-[11px] font-bold uppercase tracking-wider text-foreground">
                  {m.label}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{m.desc}</div>
              </div>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Deliverables + Stack */}
          <div className="mb-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 font-syne text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Deliverables
              </p>
              <ul className="flex flex-col gap-2">
                {activeCaseStudy.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-syne text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Production Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {activeCaseStudy.stack.map((s) => (
                  <Badge key={s} variant="secondary" className="font-dm text-xs font-medium normal-case tracking-normal">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gold/30 bg-gold/[0.05] p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-syne text-base font-bold text-foreground">
                Want this caliber for your product?
              </p>
              <p className="text-xs text-muted-foreground">
                Fixed-scope proposals in under 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleStartSimilar} className="shrink-0">
                Start Something Similar
                <ArrowRight />
              </Button>
              <Button
                variant="outline"
                className="shrink-0 text-success hover:bg-success/10 hover:text-success"
                onClick={() => {
                  playSound('open')
                  window.open(SITE.whatsapp, '_blank', 'noreferrer,noopener')
                }}
              >
                <MessageCircle />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
