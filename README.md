# T.O.P — Top One Percent · Landing Site

Rebuilt UI/UX for the Top One Percent marketing site and digital card.
React 19 + Vite + Tailwind CSS v4 + React Router.

## Run it

```bash
cd top-site
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Structure

```
src/
  data/site.js          all copy + content in one place (single source of truth)
  hooks/
    useReveal.js        IntersectionObserver scroll reveals with auto-stagger
    useScrollState.js   rAF-throttled scroll state + active-section spy
  components/
    Navbar.jsx  Hero.jsx  Marquee.jsx  Services.jsx  Work.jsx
    Manifesto.jsx  Proof.jsx  Process.jsx  About.jsx
    FAQ.jsx  CTABanner.jsx  Contact.jsx  Footer.jsx  StickyMobileCTA.jsx
  pages/
    Home.jsx            section order = persuasion arc
    Card.jsx            /card digital business card
  index.css             design tokens + component layer
```

## What changed and why

### Round 2 — niche research pass (2025–26 agency-studio benchmarks)

Research covered award-winning creative-studio sites (Awwwards 2026 trends), AI-product-studio positioning (Succedo, Roro, AE Studio, A.Team, Winder.AI) and landing-page conversion data (social proof, CTA repetition, form friction, digital-card QR behaviour). What it changed:

- **Proof section (new).** The single biggest gap: the page had zero client voices while every conversion study ranks social proof top-3. `Proof.jsx` adds animated count-up stats (3 shipped, 4 disciplines, 24h reply, 100% senior-built) plus three testimonial cards. Quotes are **placeholders — replace with real client quotes before launch** (see Before you ship).
- **Manifesto section (new).** A dark, full-bleed editorial band — giant clipped "TOP ONE PERCENT" wordmark and a hoverable index of the four disciplines with price + timeline. Gives the page the signature "wow moment" 2026 studio sites use, and removes the redundant hero-image re-use that used to sit in About.
- **Hero**: giant faded `T.O.P.` monogram watermark, gold highlight on the key phrase, subtle scroll-linked parallax on the visual (rAF-throttled; off for touch and `prefers-reduced-motion`), `decoding="async"`.
- **Sticky mobile CTA.** Research: repeating the single primary CTA lifts conversion. A thumb-reachable bar appears after the hero on mobile and hides near the contact form so it never blocks it.
- **Service deep-links.** "Discuss this" on any service card (and the manifesto index) now pre-selects that service in the contact form via `sessionStorage` — one less field to think about.
- **Digital card (round 2).** Added a labelled QR block ("Scan to save") linking to the live card URL — the dynamic-card pattern; the QR is downloadable for print/NFC. vCard enriched with a mobile number and a note line.
- **FAQ**: two new objection-handlers — milestone payments, and what happens after a brief is sent (7 questions total).
- **Performance**: all six 1024² PNGs (~4.2 MB total) converted to WebP (~0.5 MB, −87%). Home JS bundle split by route: ~82 kB gz home, qrcode library isolated to the `/card` chunk.

### Round 1 — structural / UX
- **Page arc rebuilt**: promise → capability → proof → method → people → objections → action. Added two missing sections: **Process** (removes "what happens after I email?" anxiety) and **FAQ** (handles price, ownership, timeline, location objections before the form).
- **Hero rewritten around a value proposition.** "Built different. Built to last." is a slogan, not a headline — it's now demoted to the card/footer and the H1 states what you do and for whom. Research on hero sections consistently shows clear benefit headlines beating clever ones.
- **One primary CTA**, everywhere. "Start a Project" is the only gold button on the page; everything else is visually secondary.
- **Trust signals moved above the fold**: availability pill ("Taking 2 projects · Q3 2026"), live product bento, four proof stats, and a "reply within 24h" microcopy line next to the CTA.
- **Hover-gated content eliminated.** Service details, pricing and "Learn more" used to appear only on `:hover` — invisible on touch and to keyboard users. All content is now always visible; hover adds emphasis only.
- **Work cards gained metrics** so each project makes a claim instead of just describing itself.

### Interaction
- **Navbar**: condenses on scroll, hides on downward scroll, sliding active-section indicator driven by an IntersectionObserver, and a hairline reading-progress bar.
- **Mobile menu**: `max-h` transition replaced with a real sheet — body scroll lock, Escape to close, focus returned to the trigger, `aria-expanded`/`aria-controls` wired.
- **Marquee**: pauses on hover, edge fades, `sr-only` text equivalent, GPU-friendly `translate3d`.
- **FAQ** uses native `<details>` so keyboard and screen-reader behaviour is free.
- **Card page**: added the two things a digital card is actually for — **Save contact** (generates a real `.vcf`) and **Share** (Web Share API with clipboard fallback) — plus a toast in an `aria-live` region.

### Contact form (biggest UX debt)
- Real inline validation with human error messages, validate-on-blur then validate-on-change.
- Failed submit focuses the first invalid field instead of leaving the user hunting.
- `aria-invalid` / `aria-describedby` on every field, `role="alert"` on the failure state, `aria-live` status announcements.
- Added an optional **timeline** chip group, character counter, deselectable budget chips (`aria-pressed`), `autoComplete` and `inputMode` on every input.
- Success state confirms what happens next and offers a way back.

### Visual system
- Tokens consolidated into Tailwind v4 `@theme` — one gold accent, no ad-hoc hex values scattered in JSX.
- Buttons now have a gradient fill, soft accent glow, press state and hover arrow-nudge; 48px minimum target.
- Cards get layered shadow + 3px lift instead of a bare border colour change.
- Subtle grain, ambient radial light and editorial grid lines add depth without noise.
- Fluid type via `clamp()`, `text-wrap: balance` on headings, `pretty` on paragraphs.

### Accessibility & performance
- `prefers-reduced-motion` is fully honoured — all animation and reveals collapse to static.
- Skip-to-content link, visible `:focus-visible` rings, semantic landmarks (`<header>`, `<main>`, `<nav aria-label>`, `<ol>`/`<ul>` for lists).
- All decorative gradients and dots marked `aria-hidden`.
- Scroll listeners rAF-throttled; observers disconnect after reveal. Build is ~88 kB gzipped JS, 9 kB CSS.
- SEO/social meta, canonical URL, font preconnect in `index.html`.

## Before you ship

1. Replace `FORM_ENDPOINT` in `src/components/Contact.jsx` with your real Formspree ID.
2. Replace the placeholder quotes in `TESTIMONIALS` (`src/data/site.js`) with real, verified client testimonials — the section is built for them, don't ship the samples.
3. Confirm the social URLs in `src/data/site.js`.
4. If deploying to a static host, add an SPA rewrite so `/card` resolves.
