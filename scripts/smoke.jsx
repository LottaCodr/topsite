import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html class="dark"><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
})

const g = globalThis
g.window = dom.window
g.document = dom.window.document
Object.defineProperty(g, 'navigator', { value: dom.window.navigator, configurable: true })
g.HTMLElement = dom.window.HTMLElement
g.Element = dom.window.Element
g.Node = dom.window.Node
g.SVGElement = dom.window.SVGElement
g.getComputedStyle = dom.window.getComputedStyle
g.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16)
g.cancelAnimationFrame = (id) => clearTimeout(id)
g.IntersectionObserver = class {
  constructor(cb) { this.cb = cb }
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!g.window.matchMedia) {
  g.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })
}
g.matchMedia = g.window.matchMedia
// node provides its own global performance (jsdom impl recurses)
g.localStorage = dom.window.localStorage
g.CustomEvent = dom.window.CustomEvent
g.Event = dom.window.Event
g.MutationObserver = dom.window.MutationObserver
g.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }

async function main() {
  const React = await import('react')
  const { renderToString } = await import('react-dom/server')

  // 1) App shell (Navbar with Radix menus/sheet/tooltips, Footer, overlays)
  const { default: App } = await import('../src/App.jsx')
  const shellHtml = renderToString(React.createElement(App))
  console.log('APP SHELL RENDER OK — length:', shellHtml.length)

  // 2) Full Home page sections
  const { AppProvider } = await import('../src/context/AppContext.jsx')
  const { default: Home } = await import('../src/pages/Home.jsx')
  const homeHtml = renderToString(
    React.createElement(AppProvider, null, React.createElement(Home))
  )
  console.log('HOME RENDER OK — length:', homeHtml.length)

  // 3) Case study modal + command palette (closed-state render through provider)
  const { default: CaseStudyModal } = await import('../src/components/CaseStudyModal.jsx')
  const { default: CommandPalette } = await import('../src/components/CommandPalette.jsx')
  const overlayHtml = renderToString(
    React.createElement(AppProvider, null, React.createElement(CaseStudyModal), React.createElement(CommandPalette))
  )
  console.log('OVERLAYS RENDER OK — length:', overlayHtml.length)

  // Content assertions
  const assertions = [
    ['hero headline', 'outgrown their'],
    ['hero trust strip', 'Brief Turnaround Guarantee'],
    ['bento services', 'AI &amp; High-Performance'],
    ['estimator CTA', 'Transfer Scope to Brief'],
    ['work filter tab', 'Healthcare &amp; Web OS'],
    ['comparison table', 'Legacy Consultancy'],
    ['manifesto', 'technical co-founders'],
    ['process step', 'Dual-Track Build Sprint'],
    ['faq accordion', 'accordion-trigger'],
    ['contact form', 'Submit Project Brief'],
    ['shadcn button', 'data-slot="button"'],
    ['shadcn card', 'data-slot="card"'],
    ['shadcn badge', 'data-slot="badge"'],
    ['radix tabs', 'data-slot="tabs-list"'],
    ['radix checkbox', 'data-slot="checkbox"'],
  ]
  let failures = 0
  for (const [label, needle] of assertions) {
    const found = homeHtml.includes(needle)
    if (!found) failures++
    console.log(`${found ? 'PASS' : 'FAIL'}  ${label} (${needle})`)
  }
  if (failures > 0) {
    console.error(`\n${failures} assertion(s) failed`)
    process.exit(1)
  }
  console.log('\nALL SMOKE ASSERTIONS PASSED')
}
main().catch((err) => { console.error(err); process.exit(1) })
