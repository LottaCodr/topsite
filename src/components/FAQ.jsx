import { useState, useMemo } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { FAQS, SITE } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

const CATEGORIES = ['All Categories', 'Pricing & Budget', 'Process & Timelines', 'Team & Quality', 'Global & Remote', 'IP & Ownership', 'Payments & Milestones', 'Tech Stack & Standards']

export default function FAQ() {
  const ref = useReveal()
  const [openIndex, setOpenIndex] = useState(0)
  const [selectedCat, setSelectedCat] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')
  const { playSound } = useApp()

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCat = selectedCat === 'All Categories' || f.category === selectedCat
      const matchQuery =
        searchQuery === '' ||
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
  }, [selectedCat, searchQuery])

  return (
    <section id="faq" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32 border-b border-border">
      <div className="container-page">

        {/* Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:gap-16">
          <header className="reveal lg:col-span-5">
            <p className="section-label mb-4">Direct Answers</p>
            <h2 className="display mb-5 text-ink" style={{ fontSize: 'clamp(30px,4.2vw,48px)' }}>
              Everything answered<br />before you <span className="text-gold">ask.</span>
            </h2>
            <p className="text-base font-light leading-relaxed text-subtle mb-6">
              Have a specialized enterprise inquiry or custom timeline requirement?{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold font-semibold underline underline-offset-4 hover:text-gold-dk"
              >
                Email Lotanna directly
              </a>{' '}
              — we reply in under 24 hours.
            </p>

            {/* Live Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="field !pl-10 !text-sm"
              />
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>
          </header>

          {/* Right Column: Category Filters & Accordions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Category Filter Chips */}
            <div className="reveal flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 5).map((cat) => {
                const isActive = selectedCat === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCat(cat)
                      playSound('click')
                    }}
                    className={`rounded-full px-3 py-1 font-syne text-[11px] font-bold transition-all ${
                      isActive
                        ? 'bg-gold text-obsidian shadow'
                        : 'border border-border bg-surface2 text-subtle hover:border-border2 hover:text-ink'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Accordion List */}
            <ul className="divide-y divide-border border-y border-border">
              {filteredFaqs.length === 0 ? (
                <li className="py-8 text-center text-sm text-muted">
                  No questions match &ldquo;{searchQuery}&rdquo;. Try another term or email us.
                </li>
              ) : (
                filteredFaqs.map((f, i) => {
                  const isOpen = openIndex === i
                  return (
                    <li key={f.q} className="reveal py-2">
                      <details
                        open={isOpen}
                        onToggle={(e) => {
                          if (e.currentTarget.open) {
                            setOpenIndex(i)
                            playSound('click')
                          }
                        }}
                        className="group"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                          <span className="font-syne text-base sm:text-lg font-bold text-ink transition-colors group-hover:text-gold">
                            {f.q}
                          </span>
                          <span
                            aria-hidden="true"
                            className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface2 transition-colors group-open:border-gold group-open:bg-gold/10"
                          >
                            <span className="text-gold font-bold text-xs">
                              {isOpen ? '—' : '+'}
                            </span>
                          </span>
                        </summary>
                        <p className="max-w-2xl pb-6 pr-6 sm:pr-10 text-sm sm:text-base font-light leading-relaxed text-subtle">
                          {f.a}
                        </p>
                      </details>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
