# T.O.P — Top One Percent · Flagship Studio & Engineering Lab

Award-winning UI/UX overhaul for **Top One Percent (T.O.P)** — an elite tech and media company headquartered in Abuja, Nigeria.
Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router**.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server with live preview (0.0.0.0:5173)
npm run dev

# Production build & verification
npm run build

# Code health & linting (0 warnings, 0 errors)
npx oxlint
```

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
    Navbar.jsx          Sticky navbar with studio clock, currency/theme controls & mobile sheet
    CommandPalette.jsx  ⌘K global command menu and quick actions
    Hero.jsx            High-conviction value proposition, stats ribbon & parallax visual
    Marquee.jsx         Kinetic capabilities marquee
    Services.jsx        Four core departments with deliverables checklist & pricing
    ScopeCalculator.jsx Interactive project scope & cost estimator
    Work.jsx            Flagship product showcase with category filtering
    CaseStudyModal.jsx  Detailed case study deep-dive overlays
    Advantage.jsx       Comparison matrix vs traditional agencies & freelancers
    Manifesto.jsx       Full-bleed dark editorial manifesto statement
    Proof.jsx           Animated count-up stats & verified client testimonials
    Process.jsx         4-stage engineering sprint methodology
    About.jsx           Origin, principles & founder spotlight
    FAQ.jsx             Instant searchable questions & category filters
    CTABanner.jsx       Dark obsidian CTA banner with live availability
    Contact.jsx         Multi-option brief builder with confetti & WhatsApp export
    Footer.jsx          Footer navigation, legal metadata & preferences bar
    StickyMobileCTA.jsx Thumb-friendly mobile bottom bar
  pages/
    Home.jsx            Complete persuasion funnel sequence
    Card.jsx            /card 3D digital business card with QR & vCard
  index.css             Tailwind v4 tokens, obsidian/parchment variables, custom scrollbars
  main.jsx              React 19 entry root
```

---

## 🏆 Copywriting & Conversion Principles
1. **High Conviction**: Replaced passive agency buzzwords with sharp, defensible, high-taste statements.
2. **Total Transparency**: Fixed pricing benchmarks in both NGN (₦) and USD ($) to eliminate price anxiety.
3. **Founder Architecture**: Highlights that 100% of the work is designed and coded by senior architects with zero junior pass-off.
4. **Guaranteed Turnarounds**: 24-hour brief reply guarantee with detailed written proposals.
