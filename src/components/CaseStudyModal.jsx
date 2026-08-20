import { useEffect } from 'react'
import { useApp } from '../hooks/useApp.js'
import { PROJECTS } from '../data/site.js'

export default function CaseStudyModal() {
  const { activeCaseStudy, closeCaseStudy, openCaseStudy, setBriefPreset } = useApp()

  useEffect(() => {
    if (!activeCaseStudy) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeCaseStudy()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [activeCaseStudy, closeCaseStudy])

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-3 sm:p-6 backdrop-blur-md"
      onClick={closeCaseStudy}
    >
      <div
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-surface shadow-2xl"
        style={{ animation: 'fadeUp 0.3s var(--ease-out-expo) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface2 px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full animate-pulse-slow"
              style={{ background: activeCaseStudy.accentColor }}
            />
            <span className="section-label !text-[10px] !text-ink">
              Case Study · {activeCaseStudy.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openCaseStudy(prevProject.id)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-subtle hover:text-ink hover:border-gold"
              title={`Previous: ${prevProject.name}`}
            >
              ← Prev
            </button>
            <button
              onClick={() => openCaseStudy(nextProject.id)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-subtle hover:text-ink hover:border-gold"
              title={`Next: ${nextProject.name}`}
            >
              Next →
            </button>
            <button
              onClick={closeCaseStudy}
              className="ml-2 grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-subtle hover:border-gold hover:text-ink"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-10">
          {/* Hero Banner Visual */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface2">
            {activeCaseStudy.image ? (
              <img
                src={activeCaseStudy.image}
                alt={activeCaseStudy.name}
                className="h-64 sm:h-80 w-full object-cover"
              />
            ) : (
              <div
                className="relative flex h-64 sm:h-80 flex-col items-center justify-center p-6 text-center"
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
                  className="relative grid h-20 w-20 place-items-center rounded-2xl border mb-4 shadow-xl"
                  style={{
                    borderColor: `${activeCaseStudy.accentColor}66`,
                    background: `${activeCaseStudy.accentColor}20`,
                  }}
                >
                  <span className="font-syne text-4xl font-extrabold" style={{ color: activeCaseStudy.accentColor }}>
                    {activeCaseStudy.icon || '✦'}
                  </span>
                </div>
                <p className="font-syne text-2xl font-bold text-bone">{activeCaseStudy.name}</p>
                <p className="text-sm text-muted">{activeCaseStudy.subtitle}</p>
              </div>
            )}
          </div>

          {/* Title and Metadata */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border pb-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-border px-3 py-0.5 text-xs text-subtle font-medium">
                  {activeCaseStudy.client}
                </span>
                <span className="rounded-full border border-border px-3 py-0.5 text-xs text-subtle font-medium">
                  {activeCaseStudy.timeline}
                </span>
                <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-xs text-gold font-bold">
                  {activeCaseStudy.badge}
                </span>
              </div>
              <h2 id="case-study-title" className="display text-3xl sm:text-4xl text-ink">
                {activeCaseStudy.name}
              </h2>
              <p className="text-base text-gold mt-1 font-syne font-semibold">
                {activeCaseStudy.subtitle}
              </p>
            </div>

            <button onClick={handleStartSimilar} className="btn-gold shrink-0">
              Build Something Similar <span className="arrow">→</span>
            </button>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h3 className="section-label mb-3">Executive Summary</h3>
            <p className="text-base sm:text-lg font-light leading-relaxed text-ink2">
              {activeCaseStudy.summary}
            </p>
          </div>

          {/* Problem vs Solution Split */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface2 p-6">
              <h4 className="font-syne text-sm font-bold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                <span>✕</span> The Core Bottleneck
              </h4>
              <p className="text-sm font-light leading-relaxed text-subtle">
                {activeCaseStudy.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <h4 className="font-syne text-sm font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                <span>✓</span> The T.O.P Architectural Solution
              </h4>
              <p className="text-sm font-light leading-relaxed text-ink2">
                {activeCaseStudy.solution}
              </p>
            </div>
          </div>

          {/* Verified Metrics Grid */}
          <div className="mb-10">
            <h3 className="section-label mb-4">Measurable Business Impact</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {activeCaseStudy.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border bg-surface2 p-4 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="font-syne text-2xl sm:text-3xl font-extrabold text-gold">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs font-bold text-ink">{m.label}</div>
                  <div className="mt-1 text-[11px] text-muted leading-tight">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & Stack */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-border pt-8 mb-8">
            <div>
              <h3 className="section-label mb-3">Shipped Deliverables</h3>
              <ul className="flex flex-col gap-2">
                {activeCaseStudy.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs sm:text-sm text-ink2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="section-label mb-3">Production Tech Stack</h3>
              <ul className="flex flex-wrap gap-2">
                {activeCaseStudy.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs font-medium text-subtle"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="rounded-2xl border border-gold/30 bg-surface2 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-syne text-lg font-bold text-ink">
                Ready to engineer your category-defining product?
              </p>
              <p className="text-xs text-subtle mt-1">
                Direct founder architecture · Fixed scope · Weekly production checkpoints
              </p>
            </div>
            <button onClick={handleStartSimilar} className="btn-gold w-full sm:w-auto">
              Initiate Project Brief <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
