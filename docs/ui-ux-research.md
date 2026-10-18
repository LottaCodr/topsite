# T.O.P Landing Page: UI/UX Research & Redesign Rationale

> Research conducted Oct 2026 for the shadcn/ui + Radix UI redesign of the T.O.P flagship landing page.
> Sources: Figma Community kit analyses (dojo.design, diversekit.com, untitled-ui.com, createui.co,
> cssauthor.com), shadcn marketing-page guides (ruixen.com 2026 guide, shadcnblocks.com, shadcnstudio.com,
> shadcn-ui-blocks.com, blocks.serp.co), UXPin shadcn landing-page briefs, and freeCodeCamp's
> shadcn marketing page walkthrough.

---

## 1. Benchmark Sources (Figma Community & shadcn ecosystem)

| Source | Category | What we took from it |
|---|---|---|
| **Untitled UI** (280k+ users, industry standard) | Design system | Token architecture: variables-first, light/dark parity, auto-layout spacing scale (8px), accessible APCA-aware contrast |
| **shadcn/ui Figma Kit** ($119, official-parity kit) | Component parity | 1:1 mapping of design components to code components: every visual element on the page is a real `components/ui/*` primitive |
| **Landify** (100+ landing sections) | Section library | Canonical section ordering & responsive grids; sections designed to mix-and-match coherently |
| **Whitepace SaaS LP** (100k+ uses, Figma Community free) | B2B conversion | Feature-dense, pricing-forward structure; clean information hierarchy over decoration |
| **Increasy** (Figma Community free, "high-converting") | Conversion flow | Hero → proof → features → pricing → FAQ funnel; one job per section |
| **Positivus** (Figma Community free) | Agency personality | Bold, personality-forward agency layouts that break the "blue SaaS" sameness |
| **Wall of Love** (Figma Community free) | Social proof | Testimonial-led layouts; proof as a first-class section, not an afterthought |
| **25 Hero Sections / Sectionry starter packs** | Hero patterns | Six archetypes (structured, centered, split, editorial, with-screenshot, minimal); structured + split convert best for technical/enterprise audiences |
| **ruixen.com shadcn marketing guide (2026)** | shadcn page architecture | Bento-grid services, trusted-clients strip directly under hero, three-tier pricing, "put logos under the hero, not the footer" |
| **shadcnblocks Landing 4/18** | Enterprise pages | Sticky mega-nav + progress affordance; rhythm alternation between dense info blocks and full-bleed visual breaks |

## 2. Key Research Findings

### F1: Section order is a funnel, not a list
The high-conversion consensus flow: **Hero → Social proof → Features (bento) → Interactive
proof (calculator) → Work → Comparison → Process → Testimonials → FAQ → CTA → Footer.**
Each section has exactly one job (UXPin, freeCodeCamp, ruixen).

### F2: Social proof belongs directly under the hero
"The biggest mistake on shadcn landing pages: putting the customer logo strip in the footer.
Visitor lands → sees value prop → sees proof → trust threshold cleared → keeps scrolling."
(ruixen 2026). Social-proof heroes that pack stats + quotes into the first fold out-convert
plain centered heroes (shadcn-ui-blocks).

### F3: Hero copy constraints
Headline 6–14 words stating the *outcome*; subheadline 15–35 words; primary CTA 3–4 words
with an action verb + value ("Start Your Brief", never "Submit"); secondary CTA for the
explorer persona (landing-page-design skill, UXPin briefs).

### F4: Bento grids are the 2025–2026 feature-section standard
"Bento grids use varying card sizes (some large, some small) to create visual hierarchy
within a feature grid… the 2025-2026 design trend that's here to stay" (blocks.serp.co).
Asymmetric tiles = each tile is a *moment*, not a spec row (ruixen). 3–6 tiles, mixed spans.

### F5: Pricing/estimator transparency converts
Pricing tables with clear anchors and an interactive element beat static tables for
service businesses (Whitepace, Landify). Sticky summary panel + live total + "transfer to
form" reduces friction between estimate and contact (our calculator → brief handoff).

### F6: Component parity & accessibility
Untitled UI / shadcn kit parity means design tokens map 1:1 to code. Radix primitives give
focus traps, typeahead, arrow-key navigation, `aria-*` wiring, and scroll-lock for free:
exactly the things hand-rolled dialogs and menus usually get wrong. Touch targets ≥ 44px; verify at
375 / 768 / 1024 / 1440 px (UXPin brief).

### F7: Motion with restraint
Scroll-reveal on entry (once, unobserved after), hover micro-interactions, count-up stats,
marquee for 12+ items only, plus a `prefers-reduced-motion` escape hatch for all of it.

## 3. Audit of the Previous Build

**Strengths kept:** dual-currency engine, scope calculator → brief handoff, ⌘K palette,
case-study deep dives, strong copy, reveal-on-scroll system.

**Problems fixed in this redesign:**

| # | Problem | Research-backed fix |
|---|---|---|
| 1 | Hand-rolled dialogs/palette (`if (!open) return null`): no focus trap, no `aria-modal` semantics, no portal, manual Escape handling | Radix `Dialog`: portaled, focus-trapped, scroll-locked, ESC/overlay dismiss |
| 2 | Emoji icons (☀️ 🌙 🔊) render inconsistently across platforms and read as unstyled | `lucide-react` icon set on shadcn icon-Buttons with Tooltips |
| 3 | Social proof (stats, testimonials) buried mid-page | Trust-stat strip directly under hero CTAs (F2); testimonial cards promoted |
| 4 | One-off CSS classes (`.btn-gold`, `.field`): no variants, no systematic states, drift between sections | shadcn CVA component library: Button/Badge/Card/Input… with consistent variants, sizes, focus rings |
| 5 | Hand-rolled toggles/checkboxes without a11y semantics (calculator add-ons) | Radix `Checkbox`/`Switch`: keyboard-operable, screen-reader correct |
| 6 | FAQ accordion + work filter hand-rolled | Radix `Accordion` (animated height, proper `aria-expanded`) and `Tabs` |
| 7 | Currency/theme switching hidden behind unlabeled buttons | Radix `DropdownMenu` with labeled, checkable items |
| 8 | Mobile menu: fixed div without focus trap or Radix-grade dismissal | Radix `Sheet` (Dialog variant) |
| 9 | Uniform card rows for services: no hierarchy | Bento grid with deliberate spans (F4) |
| 10 | No design-token layer: colors hardcoded across files | Tailwind v4 `@theme inline` token architecture (shadcn v4 style) with brand-mapped `--primary`, `--ring`, `--radius` |

## 4. Design System: "Obsidian Editorial 2.0"

- **Tokens:** shadcn CSS-variable architecture (`--background`, `--primary`, `--ring`…) expressed
  through Tailwind v4 `@theme inline`; `.dark` class variant.
- **Brand mapping:** Obsidian Noir (dark, default) & Editorial Parchment (light) retained;
  signature gold becomes `primary` (dark-on-gold foreground ≈ 6.3–8:1 contrast, WCAG AA+).
- **Type:** Syne (display, `--font-display`) + DM Sans (body, `--font-sans`), tight -0.025em tracking.
- **Radius scale:** `--radius: 0.75rem` → sm/md/lg/xl derived; pill badges for meta.
- **Spacing:** 8px grid, section rhythm `py-24 lg:py-32`, container `max-w-7xl`.
- **Components:** 14 shadcn/Radix primitives in `src/components/ui/` (button, badge, card, input,
  textarea, label, separator, switch, checkbox, dialog+sheet, dropdown-menu, accordion, tabs,
  tooltip, progress).

## 5. Final Page Architecture (as built)

1. **Navbar**: sticky blur header, scroll `Progress` bar, `DropdownMenu` currency + preferences,
   `Tooltip` icon actions, `Sheet` mobile nav, studio clock.
2. **Hero**: structured split hero: availability `Badge`, 12-word outcome headline, dual CTA
   (`Button` primary/outline), **trust-stat strip under the CTAs (F2)**, parallax product visual
   with floating proof chips.
3. **Marquee**: capability ticker (12+ items → marquee justified per ruixen).
4. **Services**: asymmetric **bento grid** (F4) with price/timeline badges, deliverable
   checklists, per-tile "Add to brief".
5. **Scope Estimator**: Card-based two-step configurator, Radix `Checkbox` add-ons,
   `Tabs` currency segmented control, sticky summary with live total + brief handoff (F5).
6. **Work**: `Tabs` category filter, alternating case-study rows, Dialog deep-dives.
7. **Advantage**: comparison table (T.O.P column highlighted) with mobile card fallback.
8. **Manifesto**: full-bleed obsidian visual break (F1 rhythm).
9. **Proof**: count-up stats + testimonial cards with metric badges.
10. **Process**: 4-stage stepper timeline.
11. **About**: founder spotlight + beliefs.
12. **FAQ**: searchable Radix `Accordion` with category `Tabs`.
13. **CTA banner**: obsidian band, restated core CTA.
14. **Contact**: validated brief builder on shadcn form primitives, confetti, WhatsApp export.
15. **Footer**: sitemap columns, preference controls, studio clock.
16. **Overlays**: `Dialog` command palette (⌘K), `Dialog` case studies, sticky mobile CTA.

## 6. Verification Checklist

- [x] `npm run build`: production build clean
- [x] `npx oxlint`: 0 errors / 0 warnings
- [x] Radix a11y: focus traps, `aria-*`, keyboard nav on all dialogs/menus/accordions/tabs
- [x] 44px touch targets on all interactive controls
- [x] `prefers-reduced-motion` honored (reveals, parallax, marquee)
- [x] Light + dark theme parity via tokens; currency toggle site-wide
