import { Check, Minus } from 'lucide-react'
import { COMPARISON } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { Badge } from './ui/badge.jsx'
import { Card, CardContent } from './ui/card.jsx'

const COLUMNS = [
  { key: 'top', label: 'T.O.P Studio', highlight: true },
  { key: 'agency', label: 'Traditional Agency' },
  { key: 'freelance', label: 'Solo Freelancer' },
  { key: 'consultancy', label: 'Legacy Consultancy' },
]

export default function Advantage() {
  const ref = useReveal()

  return (
    <section id="advantage" ref={ref} className="scroll-mt-24 border-b border-border py-24 lg:py-32">
      <div className="container-page">
        {/* Header */}
        <div className="reveal mb-14 max-w-2xl">
          <p className="section-label mb-4">The T.O.P Advantage</p>
          <h2 className="display text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
            Why elite teams pick us over{' '}
            <span className="text-gold">agencies &amp; consultancies.</span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground">
            An honest, line-by-line comparison of who actually does the work, how fast it ships,
            and who owns it when it's done.
          </p>
        </div>

        {/* Desktop table */}
        <div className="reveal hidden overflow-hidden rounded-2xl border border-border lg:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-secondary/60">
                <th className="w-[16%] px-5 py-4 font-syne text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Dimension
                </th>
                {COLUMNS.map((c) => (
                  <th
                    key={c.key}
                    className={`px-5 py-4 font-syne text-xs font-bold uppercase tracking-widest ${
                      c.highlight
                        ? 'bg-gold/10 text-gold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {c.label}
                      {c.highlight && <Badge variant="gold">Recommended</Badge>}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? 'bg-secondary/25' : ''}>
                  <th className="border-t border-border px-5 py-4 align-top font-syne text-[13px] font-bold text-foreground">
                    {row.feature}
                  </th>
                  {COLUMNS.map((c) => (
                    <td
                      key={c.key}
                      className={`border-t border-border px-5 py-4 align-top leading-relaxed ${
                        c.highlight
                          ? 'bg-gold/[0.06] font-medium text-foreground'
                          : 'font-light text-muted-foreground'
                      }`}
                    >
                      <span className="flex items-start gap-2">
                        {c.highlight ? (
                          <Check className="mt-1 size-3.5 shrink-0 text-gold" aria-hidden="true" />
                        ) : (
                          <Minus className="mt-1 size-3.5 shrink-0 opacity-50" aria-hidden="true" />
                        )}
                        {row[c.key]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {COMPARISON.map((row) => (
            <Card key={row.feature} className="reveal gap-4 py-5">
              <CardContent className="px-5">
                <p className="mb-3 font-syne text-sm font-bold text-foreground">{row.feature}</p>
                <div className="mb-3 rounded-xl border border-gold/30 bg-gold/[0.06] p-3.5">
                  <p className="mb-1 flex items-center gap-1.5 font-syne text-[11px] font-bold uppercase tracking-widest text-gold">
                    <Check className="size-3.5" /> T.O.P Studio
                  </p>
                  <p className="text-xs leading-relaxed text-foreground">{row.top}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {[
                    ['Traditional Agency', row.agency],
                    ['Solo Freelancer', row.freelance],
                    ['Legacy Consultancy', row.consultancy],
                  ].map(([label, text]) => (
                    <li key={label} className="flex items-start gap-2 text-xs font-light text-muted-foreground">
                      <Minus className="mt-0.5 size-3.5 shrink-0 opacity-50" />
                      <span>
                        <span className="font-syne font-bold text-foreground/70">{label}:</span>{' '}
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
