import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Services from '../components/Services.jsx'
import Work from '../components/Work.jsx'
import Process from '../components/Process.jsx'
import About from '../components/About.jsx'
import FAQ from '../components/FAQ.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Contact from '../components/Contact.jsx'

/**
 * Page order follows a persuasion arc:
 * promise → capability → proof → method → people → objections → action.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <About />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  )
}
