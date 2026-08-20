import { useState, useMemo } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { PROJECTS } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

const CATEGORIES = ['All Products', 'AI & Mobile', 'Fintech & Mobile', 'Healthcare & Web OS', 'Brand & Motion']

export default function Work() {
  const ref = useReveal()
  const { openCaseStudy, playSound } = useApp()
  const [activeCategory, setActiveCategory] = useState('All Products')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Products') return PROJECTS
    return PROJECTS.filter((p) => p.category.toLowerCase().includes(activeCategory.split(' ')[0].toLowerCase()))
  }, [activeCategory])

  return (
    <section id="work" ref={ref} className="scroll-mt-24 bg-surface2 py-24 lg:py-32 border-b border-border">
      <div className="container-page">

        {/* Section Header */}
        <header className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal">
            <p className="section-label mb-4">Selected Flagships</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Products we have<br /><span className="text-gold">engineered &amp; launched.</span>
            </h2>
          </div>
          <div className="reveal max-w-md">
            <p className="text-base font-light leading-relaxed text-subtle">
              Engineered, designed, and deployed in-house and for client partners.
              Real software live in production with measurable business metrics.
            </p>
          </div>
        </header>

        {/* Category Filter Pills */}
        <div className="reveal mb-12 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat)
                  playSound('click')
                }}
                className={`rounded-full px-4 py-2 font-syne text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gold text-obsidian shadow-md'
                    : 'border border-border bg-surface text-subtle hover:border-border2 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects List */}
        <ol className="flex flex-col gap-8">
          {filteredProjects.map((p, i) => (
            <li key={p.id} className="reveal">
              <article className="card-base card-hover group relative overflow-hidden bg-surface">
                <div className="grid gap-0 lg:grid-cols-12">

                  {/* Left Visual Panel */}
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
                        className="relative flex h-full flex-col items-center justify-center p-8 overflow-hidden"
                        style={{ background: p.gradient || '#111' }}
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-40 noise"
                        />
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
                          <span
                            className="font-syne text-4xl font-extrabold"
                            style={{ color: p.accentColor }}
                          >
                            {p.icon}
                          </span>
                        </div>
                        <span
                          className="relative mt-4 rounded-full border px-3.5 py-1 font-syne text-xs uppercase tracking-widest"
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

                    {/* Edge fade gradients */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 right-0 hidden w-16 lg:block pointer-events-none"
                      style={{ background: 'linear-gradient(to right, transparent, var(--bg-surface))' }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-12 lg:hidden pointer-events-none"
                      style={{ background: 'linear-gradient(to top, var(--bg-surface), transparent)' }}
                    />
                  </div>

                  {/* Right Content Panel */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
                    <div>
                      {/* Status & Category */}
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full animate-pulse-slow"
                            style={{ background: p.dot }}
                            aria-hidden="true"
                          />
                          <span className="text-xs uppercase tracking-widest text-subtle font-semibold">
                            {p.badge}
                          </span>
                        </div>
                        <span className="rounded-full border border-border px-3 py-0.5 text-xs text-muted">
                          {p.timeline} · {p.year}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3
                        className="display mb-1 text-ink transition-colors duration-300 group-hover:text-gold"
                        style={{ fontSize: 'clamp(26px, 3.2vw, 38px)' }}
                      >
                        {p.name}
                      </h3>
                      <p className="font-syne text-sm font-semibold text-gold mb-4">
                        {p.subtitle}
                      </p>

                      <p className="mb-6 text-sm sm:text-base font-light leading-relaxed text-ink2">
                        {p.summary}
                      </p>

                      {/* Key Performance Metrics */}
                      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-border py-4 bg-surface2/40 rounded-xl px-3">
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-syne text-base sm:text-lg font-extrabold text-gold">
                              {m.value}
                            </div>
                            <div className="mt-0.5 text-[10px] sm:text-[11px] leading-tight text-muted">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <ul className="mb-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-subtle transition-colors group-hover:border-gold/40"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom CTA to Open Case Study Modal */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => openCaseStudy(p.id)}
                        className="btn-gold !py-2.5 !px-5 !text-xs"
                      >
                        View Full Case Study <span className="arrow">→</span>
                      </button>

                      <span className="text-xs text-muted">
                        {i + 1} of {PROJECTS.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent glow bar */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-lt to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
              </article>
            </li>
          ))}
        </ol>

        {/* Portfolio Conversation Banner */}
        <div className="reveal mt-14 flex flex-col items-center gap-4 text-center rounded-2xl border border-border bg-surface p-8">
          <p className="text-sm font-light text-subtle max-w-xl">
            Want to see private enterprise case studies, architectural blueprints, or client references?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-outline">
              Request Private Portfolio Access <span className="arrow">→</span>
            </a>
            <a
              href="https://wa.me/2349135775141?text=Hi%20Lotanna,%20I'd%20like%20to%20view%20the%20T.O.P%20portfolio%20and%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost-dark"
            >
              Direct WhatsApp Query 💬
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
