export const SITE = {
  name: 'Top One Percent',
  short: 'T.O.P',
  email: 'toponepercent@zohomail.com',
  emailDisplay: 'toponepercent...',
  phone: '+2349135775141',
  location: 'Abuja, Nigeria',
  founded: '2024',
  tagline: 'Built different. Built to last.',
  url: 'https://topone.co',
}

export const NAV_LINKS = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const SERVICES = [
  {
    num: '01',
    name: 'Branding & Identity',
    from: '₦500,000',
    timeline: '3–5 weeks',
    desc: 'Brand strategy, visual identity systems, typography, colour — every decision that determines how a company is perceived before it says a word.',
    items: ['Brand Strategy', 'Visual Identity', 'Design Systems', 'Brand Guidelines'],
  },
  {
    num: '02',
    name: 'AI App Development',
    from: '₦2,500,000',
    timeline: '8–16 weeks',
    desc: 'Web, mobile and AI-powered products built for scale. From concept to deployment — we architect, design and ship.',
    items: ['Web Applications', 'Mobile (React Native)', 'AI Integration', 'API Development'],
  },
  {
    num: '03',
    name: 'Motion & Animation',
    from: '₦350,000',
    timeline: '2–4 weeks',
    desc: 'Brand films, kinetic identity and social content. Motion that makes people feel the brand before they read a single line of copy.',
    items: ['Brand Films', 'Kinetic Typography', 'Social Content', 'Product Animation'],
  },
  {
    num: '04',
    name: 'Artworks & Illustration',
    from: '₦200,000',
    timeline: '1–3 weeks',
    desc: 'Original works, campaign art and illustration systems. Art with commercial intent — created to be used, not merely admired.',
    items: ['Campaign Illustration', 'Brand Art', 'Original Works', 'Art Direction'],
  },
]

export const PROJECTS = [
  {
    name: 'Glimms',
    type: 'AI Styling App',
    status: 'In Development',
    dot: '#8FB800',
    year: '2024',
    desc: 'An AI-powered personal aesthetic intelligence app. Upload a photo — Glimms builds your outfit from the wardrobe you already own and elevates your style through machine learning.',
    metrics: [
      ['1.2s', 'Avg. outfit generation'],
      ['4', 'Model pipeline stages'],
    ],
    stack: ['React Native', 'FastAPI', 'Claude API', 'Expo'],
  },
  {
    name: 'nēro',
    type: 'Personal Finance App',
    status: 'Beta',
    dot: '#B8924A',
    year: '2024',
    desc: 'A personal finance platform built for the Nigerian market. Kobo-precision accounting, intelligent spending insight, and a design language that makes financial clarity feel premium.',
    metrics: [
      ['100%', 'Kobo-accurate ledger'],
      ['3', 'Payment rails integrated'],
    ],
    stack: ['Flutter', 'Node.js', 'Supabase', 'Flutterwave'],
  },
  {
    name: 'Nile Valley EMR',
    type: 'Hospital Management System',
    status: 'Active',
    dot: '#2B8A72',
    year: '2024',
    desc: 'A complete electronic medical records and hospital operations system for Nile Valley Mother & Child Hospital — patient management, clinical workflows and AI-assisted documentation.',
    metrics: [
      ['24/7', 'Live in production'],
      ['6', 'Clinical modules'],
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript'],
  },
]

export const PROCESS = [
  { num: '01', name: 'Brief', dur: 'Day 1–3', desc: 'You tell us what you are building and where the gap is. We pressure-test the goal before anyone opens a design file.' },
  { num: '02', name: 'Direction', dur: 'Week 1–2', desc: 'Strategy, references and a single agreed direction. No mood-board theatre, no ten-option lottery.' },
  { num: '03', name: 'Build', dur: 'Week 2–10', desc: 'Design and engineering run together, with a working link you can open at any point. Weekly checkpoints.' },
  { num: '04', name: 'Handover', dur: 'Final week', desc: 'Files, systems, documentation and a walkthrough. You own everything, and it is built to be maintained.' },
]

export const BELIEFS = [
  'The work should be able to defend itself without us in the room.',
  'Being based in Abuja is a strategic advantage, not a limitation.',
  'Taste and technology are not opposites. The best work requires both.',
  'Top one percent is not a claim. It is a daily commitment.',
]

export const FAQS = [
  { q: 'How quickly can you start?', a: 'Most engagements begin within one to two weeks of the brief being agreed. Motion and illustration work can often start sooner.' },
  { q: 'Do you work with clients outside Nigeria?', a: 'Yes. We are Abuja-based and work across time zones — most collaboration happens asynchronously with a weekly live checkpoint.' },
  { q: 'What does a project cost?', a: 'Branding starts at ₦500,000, product builds at ₦2,500,000. Every quote is fixed-scope, written down, and agreed before work begins.' },
  { q: 'Who actually does the work?', a: 'A small senior team. The people you meet in the first call are the people building your project — no handoff to juniors.' },
  { q: 'Do we own the work at the end?', a: 'Completely. Source files, repositories, design systems and documentation transfer to you at handover.' },
]

export const SOCIALS = [
  { label: 'Instagram', handle: '@toponepercent', href: 'https://instagram.com/toponepercent' },
  { label: 'X / Twitter', handle: '@topone_co', href: 'https://x.com/topone_co' },
  { label: 'LinkedIn', handle: '/company/topone', href: 'https://linkedin.com/company/topone' },
]

export const FOOTER_LINKS = {
  Services: [
    { label: 'Branding & Identity', href: '#services' },
    { label: 'AI App Development', href: '#services' },
    { label: 'Motion & Animation', href: '#services' },
    { label: 'Artworks & Illustration', href: '#services' },
  ],
  Products: [
    { label: 'Glimms', href: '#work' },
    { label: 'nēro', href: '#work' },
    { label: 'Nile Valley EMR', href: '#work' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
    { label: 'Digital Card', href: '/card', internal: true },
  ],
}
