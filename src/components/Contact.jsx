import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { SITE } from '../data/site.js'

const SERVICE_OPTIONS = [
  'Branding & Identity', 'AI App Development', 'Motion & Animation',
  'Artworks & Illustration', 'Full Service (Multiple)', 'Not sure yet',
]
const BUDGETS = ['Under ₦500,000', '₦500k – ₦1.5M', '₦1.5M – ₦5M', '₦5M+', "Let's discuss"]
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', 'Exploring']

const EMPTY = { name: '', email: '', company: '', service: '', budget: '', timeline: '', message: '' }
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
const MAX_MESSAGE = 1200

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please tell us your name.'
  if (!form.email.trim()) errors.email = 'We need an email to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = 'That email address looks incomplete.'
  if (!form.service) errors.service = 'Pick the closest service — you can change it later.'
  if (form.message.trim().length < 20) errors.message = 'A sentence or two helps us reply usefully (20 characters minimum).'
  return errors
}

export default function Contact() {
  const ref = useReveal()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])))
    if (Object.keys(found).length) {
      // Move the user to the first problem instead of leaving them hunting
      const first = formRef.current?.querySelector('[aria-invalid="true"]')
      first?.focus({ preventScroll: false })
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('bad response')
      setStatus('sent')
      setForm(EMPTY)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  const charsLeft = MAX_MESSAGE - form.message.length

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 bg-surface py-24 lg:py-32">
      <div className="container-page">

        <div className="mb-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="section-label mb-4">Contact</p>
            <h2 className="display text-ink" style={{ fontSize: 'clamp(30px,4.6vw,52px)' }}>
              Let us begin<br />a <span className="text-gold">conversation.</span>
            </h2>
          </div>
          <div className="reveal flex flex-col justify-end gap-5">
            <p className="text-[17px] font-light leading-relaxed text-subtle">
              Every engagement starts with a brief. Tell us what you are building and
              where the gap is — we will tell you exactly how T.O.P closes it.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-slow" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="text-gold underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li className="text-subtle">Replies within 24 hours</li>
              <li className="text-subtle">{SITE.location} · WAT</li>
            </ul>
          </div>
        </div>

        <div className="reveal card-base p-5 sm:p-8 lg:p-12">
          {/* Live region so status changes are announced, not just shown */}
          <p aria-live="polite" className="sr-only">
            {status === 'sending' ? 'Sending your brief.' : status === 'sent' ? 'Brief sent successfully.' : ''}
          </p>

          {status === 'sent' ? (
            <div className="py-14 text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-gold/30 bg-gold/10 text-2xl text-gold">
                ✓
              </div>
              <h3 className="mb-3 font-syne text-2xl font-bold text-ink">Brief received.</h3>
              <p className="mx-auto mb-8 max-w-sm text-[15px] font-light text-subtle">
                Thank you. We read every brief personally and will be in touch within
                24 hours — check your inbox, including spam, for a reply from {SITE.email}.
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="btn-outline">
                Send another brief
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              <Field label="Full name" name="name" required error={showError('name')}>
                <input
                  id="name" name="name" type="text" autoComplete="name"
                  value={form.name} onChange={onChange} onBlur={onBlur}
                  aria-invalid={showError('name') ? 'true' : undefined}
                  aria-describedby={showError('name') ? 'name-err' : undefined}
                  placeholder="Your name" className="field"
                />
              </Field>

              <Field label="Email address" name="email" required error={showError('email')}>
                <input
                  id="email" name="email" type="email" inputMode="email" autoComplete="email"
                  value={form.email} onChange={onChange} onBlur={onBlur}
                  aria-invalid={showError('email') ? 'true' : undefined}
                  aria-describedby={showError('email') ? 'email-err' : undefined}
                  placeholder="you@company.com" className="field"
                />
              </Field>

              <Field label="Company / organisation" name="company" hint="Optional">
                <input
                  id="company" name="company" type="text" autoComplete="organization"
                  value={form.company} onChange={onChange}
                  placeholder="Company name" className="field"
                />
              </Field>

              <Field label="Service of interest" name="service" required error={showError('service')}>
                <div className="relative">
                  <select
                    id="service" name="service" value={form.service}
                    onChange={onChange} onBlur={onBlur}
                    aria-invalid={showError('service') ? 'true' : undefined}
                    aria-describedby={showError('service') ? 'service-err' : undefined}
                    className="field cursor-pointer appearance-none pr-11"
                    style={{ color: form.service ? 'var(--color-ink)' : 'rgba(107,104,96,.55)' }}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-subtle">▾</span>
                </div>
              </Field>

              <div className="lg:col-span-2">
                <Legend label="Budget range" hint="Optional — helps us scope honestly" />
                <ChipGroup
                  name="budget" options={BUDGETS} value={form.budget}
                  onSelect={(v) => set('budget', v === form.budget ? '' : v)}
                />
              </div>

              <div className="lg:col-span-2">
                <Legend label="Ideal timeline" hint="Optional" />
                <ChipGroup
                  name="timeline" options={TIMELINES} value={form.timeline}
                  onSelect={(v) => set('timeline', v === form.timeline ? '' : v)}
                />
              </div>

              <div className="lg:col-span-2">
                <Field label="Tell us about your project" name="message" required error={showError('message')}>
                  <textarea
                    id="message" name="message" rows={5} maxLength={MAX_MESSAGE}
                    value={form.message} onChange={onChange} onBlur={onBlur}
                    aria-invalid={showError('message') ? 'true' : undefined}
                    aria-describedby={`message-count${showError('message') ? ' message-err' : ''}`}
                    placeholder="What are you building? What is the gap you need closed?"
                    className="field resize-y"
                  />
                </Field>
                <p id="message-count" className={`mt-2 text-right text-xs ${charsLeft < 100 ? 'text-gold-dk' : 'text-subtle'}`}>
                  {charsLeft} characters left
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 lg:col-span-2 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === 'sending'} className="btn-gold disabled:cursor-not-allowed disabled:opacity-60">
                  {status === 'sending' ? (
                    <>
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>Send the brief <span className="arrow" aria-hidden="true">→</span></>
                  )}
                </button>

                <p className="text-xs font-light text-subtle">
                  We reply within 24 hours. Your details are never shared.
                </p>
              </div>

              {status === 'error' && (
                <div role="alert" className="lg:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Something went wrong sending the form. Please email us directly at{' '}
                  <a href={`mailto:${SITE.email}`} className="font-medium underline">{SITE.email}</a>.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ bits */

function Field({ label, name, required, hint, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-center gap-2 section-label !text-[10px] !text-ink2">
        {label}
        {required ? <span className="text-gold" aria-hidden="true">*</span> : null}
        {hint ? <span className="font-dm text-[10px] font-normal normal-case tracking-normal text-subtle">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-err`} className="text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  )
}

function Legend({ label, hint }) {
  return (
    <p className="mb-3 flex items-center gap-2 section-label !text-[10px] !text-ink2">
      {label}
      {hint ? <span className="font-dm text-[10px] font-normal normal-case tracking-normal text-subtle">{hint}</span> : null}
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
            className={`rounded-full border px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-[13px] transition-all duration-200 ${
              selected
                ? 'border-gold bg-gold/10 text-gold-dk'
                : 'border-border text-subtle hover:border-border2 hover:text-ink2'
            }`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}
