import { useState, useMemo } from 'react'
import { ArrowDownToLine, CircleCheck, Clock, Package, Timer } from 'lucide-react'
import { useApp } from '../hooks/useApp.js'
import { CALCULATOR_DATA } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import { cn } from '../lib/utils.js'
import { Badge } from './ui/badge.jsx'
import { Button } from './ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx'
import { Checkbox } from './ui/checkbox.jsx'
import { Label } from './ui/label.jsx'
import { Progress } from './ui/progress.jsx'
import { Separator } from './ui/separator.jsx'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs.jsx'

export default function ScopeCalculator() {
  const ref = useReveal()
  const { currency, setCurrency, formatPrice, setBriefPreset, playSound } = useApp()

  const [selectedServiceId, setSelectedServiceId] = useState(CALCULATOR_DATA.services[1].id)
  const [selectedAddonIds, setSelectedAddonIds] = useState(['ai', 'auth_db'])

  const selectedService = useMemo(
    () => CALCULATOR_DATA.services.find((s) => s.id === selectedServiceId) || CALCULATOR_DATA.services[0],
    [selectedServiceId]
  )

  const selectedAddons = useMemo(
    () => CALCULATOR_DATA.addons.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  )

  const toggleAddon = (id) => {
    playSound('click')
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const totals = useMemo(() => {
    let totalNGN = selectedService.baseNGN
    let totalUSD = selectedService.baseUSD
    let totalWeeks = selectedService.weeks

    selectedAddons.forEach((addon) => {
      totalNGN += addon.costNGN
      totalUSD += addon.costUSD
      totalWeeks += addon.weeks
    })

    return {
      ngn: totalNGN,
      usd: totalUSD,
      weeks: Math.max(2, totalWeeks),
    }
  }, [selectedService, selectedAddons])

  const handleApplyScope = () => {
    playSound('success')
    const addonNames = selectedAddons.map((a) => a.name).join(', ')
    const estimatedCost = formatPrice(totals.ngn, totals.usd)

    setBriefPreset({
      service: selectedService.name,
      budget: currency === 'USD' ? `$${totals.usd.toLocaleString()}` : `₦${totals.ngn.toLocaleString()}`,
      message: `Project Estimate Configured via Estimator:\n- Core: ${selectedService.name}\n- Add-ons: ${addonNames || 'None'}\n- Estimated Scope: ${estimatedCost} (${totals.weeks} Weeks)`,
    })

    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="calculator" ref={ref} className="scroll-mt-24 border-y border-border bg-secondary/30 py-24 lg:py-32">
      <div className="container-page">
        {/* Section Header */}
        <div className="reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Interactive Estimator</p>
            <h2 className="display text-foreground" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Configure your scope.
              <br />
              See transparent <span className="text-gold">pricing.</span>
            </h2>
          </div>
          <Tabs
            value={currency}
            onValueChange={(v) => {
              setCurrency(v)
              playSound('click')
            }}
            aria-label="Display currency"
          >
            <TabsList>
              <TabsTrigger value="NGN">₦ NGN</TabsTrigger>
              <TabsTrigger value="USD">$ USD</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls */}
          <div className="reveal flex flex-col gap-8 lg:col-span-7">
            {/* Step 1 */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="outline" className="gap-1.5 text-gold">
                  <Package className="size-3" />
                  Step 01
                </Badge>
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select primary foundation
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CALCULATOR_DATA.services.map((s) => {
                  const isSelected = selectedServiceId === s.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(s.id)
                        playSound('click')
                      }}
                      aria-pressed={isSelected}
                      className={cn(
                        'cursor-pointer rounded-2xl border bg-card p-5 text-left shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                        isSelected
                          ? 'border-gold bg-gold/[0.07] shadow-[0_0_0_1px_var(--color-gold)]'
                          : 'border-border hover:border-border hover:bg-accent/40'
                      )}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="font-syne text-base font-bold text-foreground">{s.name}</p>
                        {isSelected && (
                          <CircleCheck className="size-5 shrink-0 text-gold" aria-label="Selected" />
                        )}
                      </div>
                      <p className="mb-3 text-xs font-light leading-relaxed text-muted-foreground">{s.desc}</p>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-gold">{formatPrice(s.baseNGN, s.baseUSD)}</span>
                        <span className="flex items-center gap-1 font-normal text-muted-foreground">
                          <Clock className="size-3" />~{s.weeks} wks
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="outline" className="gap-1.5 text-gold">
                  <Timer className="size-3" />
                  Step 02
                </Badge>
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Specialized modules
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {CALCULATOR_DATA.addons.map((a) => {
                  const isChecked = selectedAddonIds.includes(a.id)
                  return (
                    <Label
                      key={a.id}
                      htmlFor={`addon-${a.id}`}
                      className={cn(
                        'flex cursor-pointer items-center justify-between gap-4 rounded-xl border bg-card p-4 normal-case tracking-normal transition-all duration-200 has-[[data-state=checked]]:border-gold has-[[data-state=checked]]:bg-gold/[0.07]',
                        !isChecked && 'hover:bg-accent/40'
                      )}
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <Checkbox
                          id={`addon-${a.id}`}
                          checked={isChecked}
                          onCheckedChange={() => toggleAddon(a.id)}
                          className="mt-0.5"
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-syne text-sm font-bold text-foreground">
                            {a.name}
                          </span>
                          <span className="mt-0.5 block text-xs font-light leading-tight text-muted-foreground">
                            {a.desc}
                          </span>
                        </span>
                      </span>
                      <span className="ml-auto shrink-0 text-right">
                        <span className="block font-syne text-xs font-bold text-foreground">
                          +{formatPrice(a.costNGN, a.costUSD)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {a.weeks > 0 ? `+${a.weeks}w` : a.weeks < 0 ? `${a.weeks}w` : '0w'}
                        </span>
                      </span>
                    </Label>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sticky summary */}
          <div className="reveal lg:col-span-5">
            <Card className="sticky top-28 border-gold/30 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <p className="section-label !text-[10px]">Estimate Breakdown</p>
                <CardTitle className="text-2xl">Scope Summary</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="font-medium text-muted-foreground">Core foundation:</span>
                    <span className="text-right font-syne font-bold text-foreground">
                      {selectedService.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-muted-foreground">Add-on modules:</span>
                    <span className="font-syne font-bold text-foreground">
                      {selectedAddons.length} selected
                    </span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <ul className="my-1 flex flex-col gap-1.5 border-l border-gold/40 pl-3 text-xs text-muted-foreground">
                      {selectedAddons.map((ad) => (
                        <li key={ad.id} className="flex justify-between gap-2">
                          <span>{ad.name}</span>
                          <span className="shrink-0 font-syne text-gold">
                            {formatPrice(ad.costNGN, ad.costUSD)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex justify-between">
                    <span className="font-medium text-muted-foreground">Estimated timeline:</span>
                    <span className="font-syne font-bold text-gold">~{totals.weeks} weeks</span>
                  </div>
                </div>

                <Progress
                  value={Math.min(100, (selectedAddons.length / CALCULATOR_DATA.addons.length) * 100)}
                  aria-label="Add-on coverage"
                  className="h-1.5"
                />

                <Separator />

                {/* Total */}
                <div className="rounded-2xl border border-border bg-secondary/50 p-5 text-center">
                  <p className="mb-1 font-syne text-xs uppercase tracking-widest text-muted-foreground">
                    Total Estimated Investment
                  </p>
                  <div className="font-syne text-3xl font-extrabold text-gold sm:text-4xl">
                    {formatPrice(totals.ngn, totals.usd)}
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Fixed-scope quote guarantee · Zero billable-hour surprises
                  </p>
                </div>

                <Button size="lg" className="w-full" onClick={handleApplyScope}>
                  <ArrowDownToLine />
                  Transfer Scope to Brief
                </Button>

                <p className="text-center text-xs font-light text-muted-foreground">
                  Injects this configuration directly into the inquiry form below for review.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
