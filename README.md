# T.O.P — Top One Percent · Flagship Studio & Engineering Lab

Award-winning UI/UX overhaul for **Top One Percent (T.O.P)** — an elite tech and media company headquartered in Abuja, Nigeria.
Built with **React 19**, **Vite**, **Tailwind CSS v4**, **React Router**, and a **shadcn/ui component system on Radix UI primitives** (Obsidian Editorial 2.0 design tokens).

> 📐 The redesign is driven by documented UI/UX research — Figma Community benchmarks
> (Untitled UI, shadcn/ui Figma Kit, Landify, Whitepace, Increasy, Positivus, Wall of Love)
> and 2026 shadcn marketing-page patterns. See [`docs/ui-ux-research.md`](docs/ui-ux-research.md).

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server with live preview (0.0.0.0:5173)
npm run dev

# Production build & verification
npm run build

# Render smoke test — SSR-renders the full page through the real component tree
npm run smoke

# Code health & linting (0 warnings, 0 errors)
npx oxlint
```

---

## 🧩 shadcn/ui + Radix Architecture

- **`src/components/ui/`** — 15 shadcn-style primitives built on Radix: `button` (CVA variants),
  `badge`, `card`, `input`, `textarea`, `label`, `separator`, `switch`, `checkbox`,
  `dialog` + `sheet`, `dropdown-menu`, `accordion`, `tabs`, `tooltip`, `progress`.
- **`src/lib/utils.js`** — `cn()` (clsx + tailwind-merge).
- **`src/index.css`** — Tailwind v4 `@theme inline` token architecture (shadcn v4 style):
  `--background/--primary/--ring/--radius…` mapped to the T.O.P brand — Obsidian Noir (dark,
  default) & Editorial Parchment (light) with signature gold as `primary`.
- Every dialog, menu, accordion, tab, and checkbox is now a Radix primitive: focus traps,
  `aria-*` semantics, keyboard navigation, and scroll-lock for free.

---

## 🏛️ Comprehensive UI/UX Upgrade Summary (2026 Studio Benchmarks)

This project has been upgraded into a category-defining flagship marketing site and digital operating system inspired by the world's most prestigious creative engineering studios (Locomotive, Pentagram, Clay, Studio Freight, Metalab, Bakken & Bæck).

### 1. 🎨 Dual-Theme Architecture (Obsidian Noir & Editorial Parchment)
- **Obsidian Dark (Signature Luxury)**: Deep charcoal and graphite layering, warm gold specular highlights, noise grain textures, and edge lighting.
- **Editorial Light (Architectural Paper)**: Crisp high-contrast typography, bone/parchment cards, and gold accents.
- Persisted in `localStorage`, reactive to OS preference, with smooth variable CSS transitions.

### 2. 💱 Dual-Currency Engine (₦ NGN & $ USD)
- Diaspora & international client support: toggle between **Nigerian Naira (₦)** and **US Dollars ($)** instantly across the entire site (Services, Calculator, Case Studies, Briefs).

### 3. 🧮 Interactive Scope & Cost Estimator (`ScopeCalculator.jsx`)
- Prospective clients can configure core services (Brand, Web, Mobile, Motion) and select specialized add-on modules (Custom AI pipelines, Database & Auth, Multi-Rail Payments, Design Systems, Priority Rush).
- Calculates real-time investment benchmarks and timeline estimates.
- **1-Click Transfer to Brief Form**: seamlessly injects the calculated scope and budget into the contact form and scrolls to it.

### 4. ⌘K Command Palette (`CommandPalette.jsx`)
- Global power-user keyboard shortcut (`⌘K` on Mac / `Ctrl+K` on Windows/Linux) or search icon click.
- Instant search and jump to any section, open case studies, switch currency, toggle theme, enable audio haptics, or launch WhatsApp.

### 5. 🔍 Deep Interactive Case Studies (`CaseStudyModal.jsx`)
- Full case study drawer modals for flagship productions:
  - **Glimms**: AI Aesthetic Intelligence & Personal Styling Engine (1.2s inference).
  - **nēro**: Sovereign Multi-Currency Wealth Platform with kobo-precision ledger.
  - **Nile Valley EMR**: Clinical Hospital Operating System (99.98% uptime, 65% faster triage).
  - **Vespera Atelier**: Kinetic Luxury Brand System & 3D Web Experience (+310% conversion).
- Includes strategic problem/solution analysis, verified performance metrics, production tech stacks, and direct brief triggers.

### 6. ⚖️ The T.O.P Advantage / Comparison Matrix (`Advantage.jsx`)
- Clear, high-conviction comparison matrix contrasting T.O.P's senior-only studio model against bloated traditional agencies, unpredictable solo freelancers, and overpriced legacy consultancies.

### 7. 🔊 Web Audio Synthesizer Micro-Haptics
- Non-intrusive synthesized UI audio feedback (sine blips for clicks, ascending chords for brief submission, melodic chimes for opening modals).
- Default muted / user-controlled with persistent memory.

### 8. 🕒 Live Abuja Studio Time & Capacity Radar
- Real-time Lagos/Abuja clock (`WAT / UTC+1`) in the top navigation and footer with live availability indicators ("🟢 2 Project Slots Open for Q3/Q4").

### 9. 📇 3D Perspective Tilt NFC Digital Card (`/card`)
- Dynamic 3D card tilt effect responsive to mouse movement.
- High-resolution downloadable QR code.
- 1-Click `.vcf` vCard contact file download.
- Direct WhatsApp chat and copyable credentials.
- Invoicing and payment rails drawer for swift corporate transfers.

### 10. 📝 Intelligent Brief Builder & 1-Click WhatsApp Direct
- Real-time client-side validation, currency-aware budget chips, character counter, and celebratory confetti animation upon completion.
- Direct **"Send via WhatsApp Direct"** button that automatically constructs an executive-formatted project brief and launches WhatsApp directly with Founder & CEO Lotanna Iwuanyanwu.

---

## 📂 Project Architecture

```
src/
  lib/
    utils.js            cn() — clsx + tailwind-merge (shadcn standard)
  context/
    context.js          React Context definition
    AppContext.jsx      Theme, currency, audio, case studies & state provider
  hooks/
    useApp.js           Clean consumer hook for global state
    useReveal.js        IntersectionObserver viewport reveal animations
    useScrollState.js   rAF-throttled scroll state, navbar hide/show & section spy
  data/
    site.js             Single source of truth for copy, pricing, metrics & projects
  components/
    ui/                 shadcn/ui primitives on Radix (button, badge, card, dialog,
                        sheet, dropdown-menu, accordion, tabs, tooltip, checkbox,
                        switch, input, textarea, label, separator, progress)
    Navbar.jsx          Sticky blur navbar — Radix dropdowns, Sheet mobile nav, tooltips
    CommandPalette.jsx  ⌘K Radix Dialog command menu with keyboard navigation
    Hero.jsx            Structured split hero + trust-stat strip under the CTAs
    Marquee.jsx         Kinetic capabilities marquee
    Services.jsx        Asymmetric bento grid of the four core departments
    ScopeCalculator.jsx Card/Checkbox/Tabs estimator with sticky live summary
    Work.jsx            Flagship showcase with Radix Tabs category filtering
    CaseStudyModal.jsx  Radix Dialog case study deep-dives with prev/next
    Advantage.jsx       Comparison matrix vs traditional agencies & freelancers
    Manifesto.jsx       Full-bleed dark editorial manifesto statement
    Proof.jsx           Animated count-up stats & verified client testimonials
    Process.jsx         4-stage engineering sprint stepper
    About.jsx           Origin, principles & founder spotlight
    FAQ.jsx             Searchable Radix Accordion with category tabs
    CTABanner.jsx       Dark obsidian CTA banner with live availability
    Contact.jsx         Validated brief builder (shadcn form primitives) + WhatsApp export
    Footer.jsx          Footer navigation, legal metadata & preferences bar
    StickyMobileCTA.jsx Thumb-friendly mobile bottom bar
  pages/
    Home.jsx            Complete persuasion funnel sequence
    Card.jsx            /card 3D digital business card with QR & vCard
  index.css             shadcn v4 token architecture + Obsidian/Parchment themes
  main.jsx              React 19 entry root
docs/
  ui-ux-research.md     Research findings & redesign rationale
scripts/
  smoke.jsx             SSR render smoke test (npm run smoke)
```

---

## 🏆 Copywriting & Conversion Principles
1. **High Conviction**: Replaced passive agency buzzwords with sharp, defensible, high-taste statements.
2. **Total Transparency**: Fixed pricing benchmarks in both NGN (₦) and USD ($) to eliminate price anxiety.
3. **Founder Architecture**: Highlights that 100% of the work is designed and coded by senior architects with zero junior pass-off.
4. **Guaranteed Turnarounds**: 24-hour brief reply guarantee with detailed written proposals.
