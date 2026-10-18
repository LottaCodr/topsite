import { useMemo, useState } from 'react'
import { MessageCircleQuestion, Search } from 'lucide-react'
import { FAQS, SITE } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'
import { useReveal } from '../hooks/useReveal.js'
import { Button } from './ui/button.jsx'
import { Input } from './ui/input.jsx'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs.jsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion.jsx'

const CATEGORIES = ['All', ...Array.from(new Set(FAQS.map((f) => f.category)))]

export default function FAQ() {
  const ref = useReveal()
  const { playSound } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.filter((f) => {
      const inCategory = category === 'All' || f.category === category
      const inQuery =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      return inCategory && inQuery
    })
  }, [query, category])

  return (
    <section id="faq" ref={ref} className="scroll-mt-24 border-b border-border py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Header column */}
          <div className="reveal lg:col-span-4">
            <p className="section-label mb-4">Direct Answers</p>
            <h2 className="display mb-5 text-foreground" style={{ fontSize: 'clamp(30px,4.2vw,48px)' }}>
              Questions, <span className="text-gold">answered.</span>
            </h2>
            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Pricing, process, ownership, and payments — the things agencies usually
              hide in fine print. We put them on the page.
            </p>
            <Button asChild variant="outline">
              <a href="#contact" onClick={() => playSound('open')}>
                Ask Something Else
                <MessageCircleQuestion />
              </a>
            </Button>
          </div>

          {/* Accordion column */}
          <div className="reveal lg:col-span-8">
            {/* Search + category filter */}
            <div className="mb-8 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions — pricing, IP, timelines…"
                  aria-label="Search frequently asked questions"
                  className="pl-10"
                />
              </div>

              <Tabs
                value={category}
                onValueChange={(v) => {
                  setCategory(v)
                  playSound('click')
                }}
                className="gap-0"
                aria-label="Filter questions by category"
              >
                <TabsList className="flex-wrap justify-start">
                  {CATEGORIES.map((c) => (
                    <TabsTrigger key={c} value={c}>
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {filtered.length > 0 ? (
              <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
                {filtered.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger>
                      <span className="pr-2">
                        <span className="mr-3 font-mono text-xs text-gold" aria-hidden="true">
                          {f.category.split(' ')[0]}
                        </span>
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <p className="mb-2 font-syne font-bold text-foreground">No matching questions.</p>
                <p className="mb-5 text-sm text-muted-foreground">
                  We reply to every direct inquiry in under 24 hours — ask us anything.
                </p>
                <Button asChild size="sm">
                  <a href={`mailto:${SITE.email}`}>Email the Studio</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
