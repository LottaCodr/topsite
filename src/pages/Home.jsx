import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Services from '../components/Services.jsx'
import Work from '../components/Work.jsx'
import Manifesto from '../components/Manifesto.jsx'
import Proof from '../components/Proof.jsx'
import Process from '../components/Process.jsx'
import About from '../components/About.jsx'
import FAQ from '../components/FAQ.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Contact from '../components/Contact.jsx'

/**
 * Page order follows a persuasion arc:
 * promise → capability → proof → standard → client proof → method → people → objections → action.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
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
