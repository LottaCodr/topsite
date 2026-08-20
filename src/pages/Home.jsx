import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Services from '../components/Services.jsx'
import ScopeCalculator from '../components/ScopeCalculator.jsx'
import Work from '../components/Work.jsx'
import Advantage from '../components/Advantage.jsx'
import Manifesto from '../components/Manifesto.jsx'
import Proof from '../components/Proof.jsx'
import Process from '../components/Process.jsx'
import About from '../components/About.jsx'
import FAQ from '../components/FAQ.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Contact from '../components/Contact.jsx'

/**
 * 2026 Category-Dominance Persuasion Architecture:
 * 1. Hero: Conviction positioning, real-time availability & trust stats
 * 2. Marquee: Kinetic rhythm & discipline index
 * 3. Services: Core capabilities, deliverables & pricing
 * 4. Estimator: Interactive scope & transparent price calculator
 * 5. Work: Flagship productions & interactive case studies
 * 6. Advantage: Comparison matrix against traditional agencies & consultancies
 * 7. Manifesto: Full-bleed obsidian statement & standard
 * 8. Proof: Animated verified metrics & client testimonials
 * 9. Process: 4-stage engineering sprint methodology
 * 10. About: Philosophy & founder-led senior architecture
 * 11. FAQ: Searchable instant answers
 * 12. CTA Banner: Direct invitation
 * 13. Contact: High-precision brief builder with direct WhatsApp dispatch
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <ScopeCalculator />
      <Work />
      <Advantage />
      <Manifesto />
      <Proof />
      <Process />
      <About />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  )
}
