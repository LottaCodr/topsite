import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { useReveal } from '../hooks/useReveal.js'
import { SITE } from '../data/site.js'
import { useApp } from '../hooks/useApp.js'

const SERVICE_OPTIONS = [
  'Branding & Visual Identity',
  'AI App Development',
  'Kinetic Motion & 3D Animation',
  'Artworks & Illustration',
  'Full Multi-Disciplinary System',
  'Technical Architecture & Consulting',
]

const BUDGETS_NGN = ['Under ₦500,000', '₦500k – ₦1.5M', '₦1.5M – ₦5M', '₦5M – ₦15M', '₦15M+', "Let's Discuss"]
const BUDGETS_USD = ['Under $1,000', '$1,000 – $3,000', '$3,000 – $10,000', '$10,000 – $25,000', '$25k+', "Let's Discuss"]
const TIMELINES = ['Immediate Sprint (< 2 wks)', '1–2 Months', '2–4 Months', 'Flexible / Exploring']

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
}

const MAX_MESSAGE = 1500

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please provide your name or organization.'
  if (!form.email.trim()) errors.email = 'We need a valid email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Please check this email address format.'
  }
  if (!form.service) errors.service = 'Please select the closest discipline.'
  if (form.message.trim().length < 15) {
    errors.message = 'A few details (at least 15 characters) help us prepare an accurate estimate.'
  }
  return errors
}

export default function Contact() {
  const ref = useReveal()
  const { currency, briefPreset, playSound } = useApp()

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  const activeBudgets = currency === 'USD' ? BUDGETS_USD : BUDGETS_NGN

  // Listen to presets from Calculator, Services, or Case Studies
  useEffect(() => {
    if (briefPreset) {
      setForm((prev) => ({
        ...prev,
        service: briefPreset.service || prev.service,
        budget: briefPreset.budget || prev.budget,
        message: briefPreset.message || prev.message,
      }))
    }
  }, [briefPreset])

  const set = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }))
    if (touched[name]) setErrors(validate({ ...form, [name]: value }))
  }

  const onChange = (e) => set(e.target.name, e.target.value)

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(form))
  }

  const showError = (k) => (touched[k] || status === 'error') && errors[k]
  const charsLeft = MAX_MESSAGE - form.message.length

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8924A', '#D8B775', '#FAF7F2', '#2B8A72'],
      })
    } catch {
      /* ignore */
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    setTouched({
      name: true,
      email: true,
      service: true,
      message: true,
    })

    if (Object.keys(errs).length > 0) {
      playSound('click')
      return
    }

    setStatus('sending')
    playSound('open')

    // Simulate reliable dispatch / submission
    try {
      await new Promise((res) => setTimeout(res, 900))
      setStatus('sent')
      playSound('success')
      triggerConfetti()
    } catch {
      setStatus('error')
    }
  }

  const handleWhatsAppDirect = () => {
    playSound('open')
    const text = `*New Project Brief for T.O.P*\n\n` +
      `*Name:* ${form.name || 'Not specified'}\n` +
      `*Company:* ${form.company || 'Not specified'}\n` +
      `*Email:* ${form.email || 'Not specified'}\n` +
      `*Phone/WA:* ${form.phone || 'Not specified'}\n` +
      `*Service:* ${form.service || 'General Inquiry'}\n` +
      `*Budget:* ${form.budget || 'Not specified'}\n` +
      `*Timeline:* ${form.timeline || 'Not specified'}\n\n` +
      `*Scope Details:*\n${form.message || 'Ready to discuss project scope.'}`

    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/2349135775141?text=${encoded}`, '_blank', 'noreferrer,noopener')
  }

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32">
      <div className="container-page">

        {/* Section Header */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="section-label mb-4">Direct Briefing</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Let us engineer<br />your <span className="text-gold">breakthrough.</span>
            </h2>
          </div>

          <div className="reveal flex flex-col justify-end gap-5">
            <p className="text-base sm:text-lg font-light leading-relaxed text-subtle">
              Every engagement starts with an honest brief. Tell us what you are building,
              your timeline, and where the bottleneck is. You will receive a written fixed-scope
              proposal and architectural roadmap within 24 hours.
            </p>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-ink font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-slow" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="text-gold underline-offset-4 hover:underline">
                  {SITE.emailDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2 text-ink font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-slow" aria-hidden="true" />
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  WhatsApp Direct
                </a>
              </li>
              <li className="text-muted font-mono">{SITE.location} · WAT (UTC+1)</li>
            </ul>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="reveal card-base p-6 sm:p-10 lg:p-12 shadow-2xl bg-surface2">
          {/* Confirmation Message State */}
          {status === 'sent' ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-gold/40 bg-gold/15 text-3xl text-gold shadow-lg">
                ✓
              </div>
              <h3 className="mb-3 font-syne text-2xl sm:text-3xl font-bold text-ink">
                Brief Received by Senior Team
              </h3>
              <p className="mx-auto mb-8 max-w-md text-sm sm:text-base font-light text-subtle leading-relaxed">
                Thank you. Lotanna and our senior leads review every incoming brief personally.
                Expect a response with timeline and fixed-scope options within 24 hours to{' '}
                <strong className="text-ink">{form.email || 'your email'}</strong>.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY)
                    setStatus('idle')
                  }}
                  className="btn-outline"
                >
                  Submit Another Project Brief
                </button>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-gold"
                >
                  Follow up on WhatsApp 💬
                </a>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Name */}
              <Field label="Your Full Name" name="name" required error={showError('name')}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={showError('name') ? 'true' : undefined}
                  placeholder="e.g. Adeola Williams"
                  className="field"
                />
              </Field>

              {/* Work Email */}
              <Field label="Work Email Address" name="email" required error={showError('email')}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={showError('email') ? 'true' : undefined}
                  placeholder="adeola@company.com"
                  className="field"
                />
              </Field>

              {/* Company */}
              <Field label="Company / Product Name" name="company" hint="Optional">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={onChange}
                  placeholder="e.g. Acme Tech Inc."
                  className="field"
                />
              </Field>

              {/* Phone / WhatsApp */}
              <Field label="Phone / WhatsApp Number" name="phone" hint="For quick briefing call">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+234 800 000 0000"
                  className="field"
                />
              </Field>

              {/* Service Selection */}
              <div className="lg:col-span-2">
                <Field label="Primary Discipline of Interest" name="service" required error={showError('service')}>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={showError('service') ? 'true' : undefined}
                      className="field cursor-pointer appearance-none pr-11"
                    >
                      <option value="">Select a discipline...</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">
                      ▾
                    </span>
                  </div>
                </Field>
              </div>

              {/* Budget Range Chips */}
              <div className="lg:col-span-2">
                <Legend
                  label={`Estimated Investment Range (${currency})`}
                  hint="Fixed-scope quotes based on your choice"
                />
                <ChipGroup
                  name="budget"
                  options={activeBudgets}
                  value={form.budget}
                  onSelect={(v) => set('budget', v === form.budget ? '' : v)}
                />
              </div>

              {/* Timeline Chips */}
              <div className="lg:col-span-2">
                <Legend label="Target Launch Velocity" hint="When do you need to go live?" />
                <ChipGroup
                  name="timeline"
                  options={TIMELINES}
                  value={form.timeline}
                  onSelect={(v) => set('timeline', v === form.timeline ? '' : v)}
                />
              </div>

              {/* Project Message / Scope */}
              <div className="lg:col-span-2">
                <Field label="Project Scope &amp; Strategic Goals" name="message" required error={showError('message')}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={MAX_MESSAGE}
                    value={form.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={showError('message') ? 'true' : undefined}
                    placeholder="Tell us what you are building, your current bottleneck, and what winning looks like for this launch..."
                    className="field resize-y"
                  />
                </Field>
                <div className="mt-2 flex items-center justify-between text-xs text-muted">
                  <span>Founder-led confidentiality guaranteed</span>
                  <span className={charsLeft < 100 ? 'text-gold font-bold' : ''}>
                    {charsLeft} characters left
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold disabled:cursor-not-allowed disabled:opacity-60 flex-1 sm:flex-initial"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting Brief…
                    </>
                  ) : (
                    <>
                      Submit Project Brief <span className="arrow">→</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="btn-outline flex-1 sm:flex-initial"
                >
                  Send Direct via WhatsApp 💬
                </button>

                <p className="text-xs font-light text-muted sm:ml-auto">
                  ⚡ 24h reply guarantee. Zero junior pass-offs.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}

function Field({ label, name, required, hint, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-center gap-2 section-label !text-[11px] !text-ink">
        {label}
        {required && <span className="text-gold" aria-hidden="true">*</span>}
        {hint && <span className="font-dm text-[10px] font-normal normal-case tracking-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  )
}

function Legend({ label, hint }) {
  return (
    <p className="mb-3 flex items-center gap-2 section-label !text-[11px] !text-ink">
      {label}
      {hint && <span className="font-dm text-[10px] font-normal normal-case tracking-normal text-muted">{hint}</span>}
    </p>
  )
}

function ChipGroup({ name, options, value, onSelect }) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = value === o
        return (
          <button
            key={o}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(o)}
            className={`rounded-full border px-3.5 py-2 text-xs font-syne font-semibold transition-all ${
              selected
                ? 'border-gold bg-gold/15 text-gold-lt shadow-sm ring-1 ring-gold/40'
                : 'border-border bg-surface text-subtle hover:border-border2 hover:text-ink'
            }`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}
