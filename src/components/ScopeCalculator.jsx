import { useState, useMemo } from 'react'
import { useApp } from '../hooks/useApp.js'
import { CALCULATOR_DATA } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'

export default function ScopeCalculator() {
  const ref = useReveal()
  const { currency, toggleCurrency, formatPrice, setBriefPreset, playSound } = useApp()

  const [selectedServiceId, setSelectedServiceId] = useState(CALCULATOR_DATA.services[1].id) // default to webapp
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
    <section id="calculator" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32 border-y border-border">
      <div className="container-page">

        {/* Section Header */}
        <div className="reveal mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Interactive Estimator</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Configure your scope.<br />See transparent <span className="text-gold">pricing.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface2 p-1">
              <span className="px-3 text-xs font-syne font-bold text-muted">Currency:</span>
              <button
                onClick={() => { if (currency !== 'NGN') toggleCurrency(); playSound('click') }}
                className={`rounded-full px-3 py-1 text-xs font-syne font-bold transition-all ${
                  currency === 'NGN' ? 'bg-gold text-obsidian shadow' : 'text-subtle hover:text-ink'
                }`}
              >
                ₦ NGN
              </button>
              <button
                onClick={() => { if (currency !== 'USD') toggleCurrency(); playSound('click') }}
                className={`rounded-full px-3 py-1 text-xs font-syne font-bold transition-all ${
                  currency === 'USD' ? 'bg-gold text-obsidian shadow' : 'text-subtle hover:text-ink'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Estimator Interface */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls Column (Left) */}
          <div className="reveal lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Select Service */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-gold">
                  Step 01 · Select Primary Foundation
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
                      className={`card-base p-5 text-left transition-all relative overflow-hidden ${
                        isSelected
                          ? '!border-gold bg-gold/10 shadow-lg ring-1 ring-gold/50'
                          : 'hover:border-border2 bg-surface2'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 text-gold font-bold text-xs">✓ Active</span>
                      )}
                      <p className="font-syne text-base font-bold text-ink mb-1">{s.name}</p>
                      <p className="text-xs text-subtle font-light mb-3 leading-relaxed">{s.desc}</p>
                      <div className="flex items-center justify-between text-xs font-bold text-gold">
                        <span>{formatPrice(s.baseNGN, s.baseUSD)}</span>
                        <span className="text-muted font-normal">~{s.weeks} wks</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Add-On Capabilities */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-gold">
                  Step 02 · Select Specialized Modules
                </span>
                <span className="text-xs text-muted">Toggle add-ons</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {CALCULATOR_DATA.addons.map((a) => {
                  const isChecked = selectedAddonIds.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                        isChecked
                          ? 'border-gold bg-gold/10 text-ink shadow-sm'
                          : 'border-border bg-surface2 text-subtle hover:border-border2'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors ${
                            isChecked ? 'border-gold bg-gold text-obsidian font-bold text-xs' : 'border-border'
                          }`}
                        >
                          {isChecked ? '✓' : ''}
                        </div>
                        <div className="min-w-0">
                          <p className={`font-syne text-sm font-bold truncate ${isChecked ? 'text-gold-lt' : 'text-ink'}`}>
                            {a.name}
                          </p>
                          <p className="text-xs text-muted leading-tight mt-0.5 truncate sm:text-clip">
                            {a.desc}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0 text-right">
                        <span className="block font-syne text-xs font-bold text-ink">
                          +{formatPrice(a.costNGN, a.costUSD)}
                        </span>
                        <span className="text-[10px] text-muted">
                          {a.weeks > 0 ? `+${a.weeks}w` : a.weeks < 0 ? `${a.weeks}w` : '0w'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card (Right) */}
          <div className="reveal lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-gold/30 bg-surface2 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(184,146,74,0.18) 0%, transparent 70%)' }}
              />

              <p className="section-label mb-2 !text-xs">Estimate Breakdown</p>
              <h3 className="font-syne text-2xl font-bold text-ink mb-6">
                Scope Summary
              </h3>

              <div className="flex flex-col gap-4 border-b border-border pb-6 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-subtle font-medium">Core Foundation:</span>
                  <span className="font-syne font-bold text-ink text-right">{selectedService.name}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-subtle font-medium">Add-on Modules:</span>
                  <span className="font-syne font-bold text-ink">
                    {selectedAddons.length} Selected
                  </span>
                </div>

                {selectedAddons.length > 0 && (
                  <ul className="flex flex-col gap-1.5 pl-2 text-xs text-muted border-l border-gold/40 my-1">
                    {selectedAddons.map((ad) => (
                      <li key={ad.id} className="flex justify-between">
                        <span>• {ad.name}</span>
                        <span className="font-syne text-gold-lt">{formatPrice(ad.costNGN, ad.costUSD)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-subtle font-medium">Estimated Timeline:</span>
                  <span className="font-syne font-bold text-gold">~{totals.weeks} Weeks Sprints</span>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="mb-6 rounded-2xl bg-surface p-5 border border-border text-center">
                <p className="text-xs uppercase tracking-widest text-muted mb-1 font-syne">
                  Total Estimated Investment
                </p>
                <div className="font-syne text-3xl sm:text-4xl font-extrabold text-gold">
                  {formatPrice(totals.ngn, totals.usd)}
                </div>
                <p className="text-[11px] text-muted mt-1">
                  Fixed-scope quote guarantee · Zero billable hour surprises
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyScope}
                className="btn-gold w-full text-center"
              >
                Transfer Scope to Brief Form <span className="arrow">↓</span>
              </button>

              <p className="mt-3 text-center text-xs text-subtle font-light">
                Transfers this configuration directly into the inquiry form below for review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
