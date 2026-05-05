import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
} from 'framer-motion'
import createGlobe from 'cobe'

/* ─────────────────────────────────────────────────────────────────────────────
 * DATA
 * ──────────────────────────────────────────────────────────────────────────── */
const PHOTO = '/images/julian-1.avif'
const PHOTO_BW = '/images/julian-x.jpg'
const PHOTO_YAKK = '/images/yakk-press.jpg'
const LOGO = '/images/sharpei-logo.svg'

const HERO_PHOTOS = [
  '/images/julian-1.avif',
  '/images/akka.jpeg',
  '/images/forbes-30u30.jpg',
  '/images/julian-google.jpeg',
]

const EXPERIENCE = [
  {
    n: '04', company: 'Sharpei', title: 'Co-Founder & CSO',
    period: '2023 — Now', location: 'New York, NY',
    body: 'AI infrastructure for equipment lenders. Our intelligent automation layer helps lenders attract and process 3× more applications on top of existing systems, while vendors offer instant leasing and financing at checkout.',
    tags: ['AI', 'FinTech', 'Embedded Finance', '+$2M raised'],
    current: true, kicker: 'AI infrastructure', logoSrc: '/images/sharpei-logo.svg', logoMode: 'svg',
  },
  {
    n: '03', company: 'Tetuan Valley', title: 'Startup School Mentor',
    period: '2025 — Now', location: 'Madrid · Remote',
    body: 'Mentoring early-stage founders through Tetuan Valley\'s pre-seed program — go-to-market, sales motion, fundraising narrative.',
    tags: ['Mentorship', 'GTM'], kicker: 'Mentor',
    logoSrc: '/images/tetuan-logo.png', logoMode: 'png',
  },
  {
    n: '02', company: 'Yakk', title: 'Co-Founder',
    period: '2020 — 2023', location: 'Madrid',
    body: 'B2B Electronics and vehicle leasing and asset management platform.',
    tags: ['Circular Economy', 'Marketplace', 'Exit'],
    kicker: 'Own less, live more.',
    logoSrc: '/images/Yakk.webp', logoMode: 'png', accent: '#22c55e',
  },
  {
    n: '01', company: 'Lanzadera', title: 'Entrepreneur in Residence',
    period: '2021 — 2022', location: 'Valencia',
    body: 'Two years inside Lanzadera — through the Start program and into the Traction phase with Yakk.',
    tags: ['Acceleration'], kicker: 'Acceleration',
    logoSrc: '/images/Lanzadera%20Logo.jpg', logoMode: 'png', accent: '#ff7a00',
  },
]

const PRESS = [
  {
    outlet: 'Forbes',
    date: '2024',
    headline: '30 Under 30 Europe — Retail & Ecommerce',
    quote: 'Featured as the youngest founder on the Forbes 30 Under 30 Europe Retail & Ecommerce list.',
    href: 'https://www.forbes.com/profile/sharpei/',
    image: '/images/forbes-30u30.jpg',
    accent: 'Honors',
  },
  {
    outlet: 'Podcast',
    date: '2024',
    headline: 'On the entrepreneurial journey',
    quote: 'A long-form conversation about building Yakk and Sharpei — lessons as a young founder navigating Madrid to New York.',
    href: 'https://youtu.be/7y89DAvPcC8?si=t72v7slfj4hpo_K1',
    accent: 'Interview',
  },
  {
    outlet: 'Autónomos & Emprendedor',
    date: '2022',
    headline: 'The launch of Yakk — a platform that lets companies rent everything they need',
    quote: 'A feature on the first version of my first startup, Yakk — built when I was 19 years old.',
    href: 'https://www.autonomosyemprendedor.es/articulo/tu-historia/emprendedores-lanzan-plataforma-que-permite-empresas-alquilar-todo-que-necesitan/20220527163018026839.html',
    accent: 'Yakk',
  },
  {
    outlet: 'Akka',
    date: '2024',
    headline: 'Sharpei wins the first Akka pitch competition',
    quote: 'Akka — a startup investment community and fund — selected Sharpei as the winner of its inaugural pitch competition.',
    href: 'https://es.linkedin.com/posts/akka-spain_sharpei-se-convierte-en-la-primera-startup-activity-7271795776152817665-xEvT',
    accent: 'Award',
  },
  {
    outlet: 'Web Summit',
    date: '2024',
    headline: 'Pitching Sharpei on the Web Summit Startup Competition main stage',
    quote: 'Selected to pitch Sharpei as part of Web Summit\'s Impact Startups, competing on the main stage in Lisbon.',
    href: 'https://www.youtube.com/watch?app=desktop&v=KCjq95jd9Ck',
    accent: 'Pitch',
  },
]

const COMMUNITIES = [
  { name: 'ELFA', logoSrc: '/images/ELFA%20logo.png' },
  { name: 'NEFA', logoSrc: '/images/NEFA%20logo.png' },
  { name: 'Nova Talent', logoSrc: '/images/nova-logo.svg' },
  { name: 'Sigma Squared', logoSrc: '/images/sigma%20Squared%20logo.svg' },
  { name: 'Google for Startups', logoSrc: '/images/Google_for_Startups_logo.svg.png' },
  { name: 'Draper University' },
  { name: 'Lanzadera', logoSrc: '/images/Lanzadera%20Logo.jpg' },
  { name: 'Tetuan Valley', logoSrc: '/images/tetuan-logo.png' },
  { name: 'Forbes 30U30', logoSrc: '/images/Forbes%2030%20Under%2030%20logo.jpeg' },
]
const FOCUS = ['FinTech', 'Embedded Finance', 'AI Infrastructure', 'Circular Economy', 'GTM']
const CITIES = [
  { name: 'Madrid', coords: [40.4168, -3.7038], tag: 'Origin', years: 'Born' },
  { name: 'Lancaster', coords: [54.0466, -2.8007], tag: 'Studied', years: 'BSc CS' },
  { name: 'Valencia', coords: [39.4699, -0.3763], tag: 'Lanzadera', years: '2021—22' },
  { name: 'San Francisco', coords: [37.7749, -122.4194], tag: 'Founded Sharpei', years: 'Bay Area' },
  { name: 'New York', coords: [40.7128, -74.006], tag: 'Now', years: '2023—' },
]
const LANGUAGES = [
  { l: 'Español', level: 'Native' }, { l: 'English', level: 'Native' }, { l: 'Deutsch', level: 'Working' },
]
const EDUCATION = [
  { school: 'Lancaster University', detail: 'BSc Computer Science', meta: 'United Kingdom' },
  { school: 'ThePowerMBA', detail: 'Business Expert Program', meta: 'Finisher' },
]

/* ─────────────────────────────────────────────────────────────────────────────
 * APP
 * ──────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <ProgressBar progress={progress} />
      <Spotlight />
      <Nav />
      <Hero />
      <TickerBand />
      <Journey />
      <Atlas />
      <Press />
      <Arsenal />
      <Footer />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Cursor spotlight — soft violet light follows mouse
 * ──────────────────────────────────────────────────────────────────────────── */
function Spotlight() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const leave = () => { x.set(-500); y.set(-500) }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  const bg = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(11,46,63,0.06), transparent 60%)`
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * NAV
 * ──────────────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-smoke/70 bg-paper/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 font-mono text-[12px] uppercase tracking-[0.18em]">
        <a href="#top" data-magnet className="flex items-center gap-2 text-ink transition-colors hover:text-violet">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-violet opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
          </span>
          <span className="whitespace-nowrap font-serif text-base normal-case tracking-tight">Julián Azofra</span>
        </a>
        <nav className="flex items-center gap-7">
          <NavLink href="#journey">Journey</NavLink>
          <NavLink href="#atlas">Atlas</NavLink>
          <NavLink href="#press">Press</NavLink>
          <NavLink href="#arsenal">Arsenal</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
      </div>
    </motion.header>
  )
}
function NavLink({ href, children }) {
  return (
    <a href={href} data-magnet className="group relative inline-flex items-center gap-1 text-ink/70 transition-colors hover:text-violet">
      <span className="opacity-50 transition-opacity group-hover:opacity-100">→</span>
      <span>{children}</span>
    </a>
  )
}

function ProgressBar({ progress }) {
  const width = useMotionTemplate`${useTransform(progress, (v) => v * 100)}%`
  return <motion.div style={{ width }} className="fixed left-0 top-0 z-[60] h-[2px] bg-violet" aria-hidden />
}

/* ─────────────────────────────────────────────────────────────────────────────
 * HERO — photo + cinematic typography
 * ──────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-12">
      {/* Animated mesh gradient */}
      <div className="pointer-events-none absolute inset-0 mesh" />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(11,46,63,0.18), transparent)' }}
      />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-[1600px] px-6 pt-4 md:pt-8">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT — typography */}
          <motion.div style={{ y: yText }} className="relative z-10 col-span-12 md:col-span-7">
            <h1 className="font-sans font-bold tracking-tightest text-ink">
              <MaskLine delay={0.05} className="block text-[16vw] leading-[0.92] md:text-[10.5vw]">Julián</MaskLine>
              <MaskLine delay={0.18} className="block text-[16vw] leading-[0.92] md:text-[10.5vw]"><span className="italic">Azofra.</span></MaskLine>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-10 max-w-xl"
            >
              <p className="font-sans text-2xl font-medium leading-tight text-ink md:text-3xl">
                2X Entrepreneur, <span className="grad-text font-semibold">GTM &amp; Innovation Specialist</span>.
              </p>
            </motion.div>

            {/* Stats chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 1 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Chip label="Raised"><Counter to={2} suffix="M" prefix="+$" /></Chip>
              <Chip label="Forbes 30U30"><span className="font-serif italic">Youngest</span></Chip>
              <Chip label="HQ">New York</Chip>
            </motion.div>
          </motion.div>

          {/* RIGHT — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ y: yPhoto }}
            className="relative col-span-12 mt-6 md:col-span-5 md:mt-0"
          >
            <div className="relative">
              {/* Decorative violet halo */}
              <motion.div
                aria-hidden
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full opacity-40 blur-2xl"
                style={{ background: 'conic-gradient(from 0deg, rgba(11,46,63,0.25), rgba(6,25,35,0.05), rgba(45,92,110,0.25), rgba(11,46,63,0.25))' }}
              />
              <motion.div style={{ scale: photoScale }} className="relative photo-frame overflow-hidden rounded-[6px] bg-bone">
                <HeroPhotoCarousel />
                {/* Tag badge over photo */}
                <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-paper/85 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                  Founder · CSO
                </div>
                <div className="absolute bottom-3 right-3 z-10 rounded-full bg-ink/85 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-paper backdrop-blur">
                  Forbes 30U30
                </div>
              </motion.div>

              {/* Floating side card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                className="absolute -left-6 bottom-10 hidden w-44 rounded-[6px] border border-smoke bg-paper/90 p-3 shadow-xl backdrop-blur md:block"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/50">Now</div>
                <div className="mt-1 font-serif text-sm leading-tight">Building Sharpei AI in <span className="italic">New York</span></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60"
        >
          <span>Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="inline-block h-6 w-px bg-ink/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function HeroPhotoCarousel() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_PHOTOS.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden">
      {HERO_PHOTOS.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt="Julián Azofra"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.04 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {HERO_PHOTOS.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === idx ? 'w-6 bg-paper' : 'w-1.5 bg-paper/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function Chip({ label, children }) {
  return (
    <div className="group relative overflow-hidden rounded-full border border-smoke bg-paper/60 px-4 py-2 backdrop-blur transition-colors hover:border-violet/60">
      <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
        <span>{label}</span>
        <span className="text-ink/30">·</span>
        <span className="text-ink">{children}</span>
      </div>
    </div>
  )
}

function MaskLine({ children, delay = 0, className = '' }) {
  return (
    <span className="mask block">
      <motion.span
        initial={{ y: '110%', rotate: 4 }} animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.2, 0.7, 0.2, 1] }}
        className={`block ${className}`}
      >{children}</motion.span>
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Animated counter
 * ──────────────────────────────────────────────────────────────────────────── */
function Counter({ to, prefix = '', suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return <span ref={ref}>{prefix}{val < 1 ? val.toFixed(1) : Math.round(val)}{suffix}</span>
}

/* ─────────────────────────────────────────────────────────────────────────────
 * TICKER BAND
 * ──────────────────────────────────────────────────────────────────────────── */
function TickerBand() {
  const items = [
    'Forbes 30 Under 30', 'Co-Founder · Sharpei AI', 'AI Infrastructure',
    'New York · Madrid', 'Embedded Finance', 'Circular Economy',
  ]
  const row = [...items, ...items]
  return (
    <section aria-hidden className="relative flex items-center overflow-hidden border-y border-smoke bg-paper py-5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        className="flex flex-none items-center gap-12 whitespace-nowrap pr-12"
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-3xl tracking-tightest md:text-5xl">
            <span className={i % 2 === 0 ? 'italic' : ''}>{it}</span>
            <span className="text-violet">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * MANIFESTO — scroll-linked word reveal
 * ──────────────────────────────────────────────────────────────────────────── */
function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const text =
    'Sharpei is the AI infrastructure for equipment lenders. We help lenders attract and process 3× more applications on top of existing systems — while their vendors offer instant leasing and financing at checkout. Complexity, removed.'
  const words = text.split(' ')
  return (
    <section ref={ref} className="relative mx-auto max-w-[1600px] px-6 py-32 md:py-44">
      <div className="mb-10 flex items-baseline justify-between border-b border-smoke pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
        <span>[ 00 / Manifesto ]</span><span>The thesis</span>
      </div>
      <p className="font-serif text-[6vw] leading-[1.04] tracking-tightest md:text-[3.6vw]">
        {words.map((w, i) => {
          const start = i / words.length
          const end = start + 1.6 / words.length
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1])
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const color = useTransform(scrollYProgress, [start, end], ['rgb(10,10,18)', w.includes('Sharpei') || w.includes('removed.') ? 'rgb(89,71,255)' : 'rgb(10,10,18)'])
          return (
            <motion.span key={i} style={{ opacity, color }} className="inline-block">
              {w}&nbsp;
            </motion.span>
          )
        })}
      </p>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * SHOWCASE — press / image grid
 * ──────────────────────────────────────────────────────────────────────────── */
function Showcase() {
  return (
    <section id="showcase" className="relative mx-auto max-w-[1600px] px-6 py-24 md:py-36">
      <SectionHead idx="01" title="In Press" subtitle="Selected coverage" />

      <div className="mt-14 grid grid-cols-12 gap-3">
        {/* Big photo with editorial overlay */}
        <TiltTile className="col-span-12 row-span-2 md:col-span-7" delay={0}>
          <div className="absolute inset-0 overflow-hidden rounded-[6px]">
            <motion.img
              src={PHOTO} alt="Julián Azofra"
              initial={{ scale: 1.05 }} whileInView={{ scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          </div>
          <div className="relative flex h-full min-h-[520px] flex-col justify-between p-2 md:min-h-[640px]">
            <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-paper/80">
              <span>[ COVER ]</span>
              <span>NYC · 2026</span>
            </div>
            <div className="text-paper">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/70">Forbes Europe · Retail &amp; Ecommerce · 2024</div>
              <h3 className="mt-2 font-sans text-4xl font-bold leading-[0.95] tracking-tightest md:text-6xl">
                <span className="italic">Youngest</span> on the list.
              </h3>
              <p className="mt-3 max-w-md font-sans text-sm text-paper/80 md:text-base">
                Recognised on the Forbes 30 Under 30 Europe Retail &amp; Ecommerce list in 2024 — the youngest founder featured.
              </p>
            </div>
          </div>
        </TiltTile>

        {/* Stat tiles column */}
        <div className="col-span-12 grid grid-cols-2 gap-3 md:col-span-5 md:grid-rows-2">
          <TiltTile className="col-span-2 md:col-span-2" delay={0.05}>
            <TileHeader badge="STAT" k="A" />
            <div className="mt-3 flex items-end gap-3">
              <div className="font-serif text-[18vw] leading-[0.85] tracking-tightest text-violet md:text-[7.5vw]">
                <Counter to={2} prefix="+$" suffix="M" />
              </div>
              <div className="pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">raised<br />pre-seed</div>
            </div>
            <p className="mt-2 font-sans text-sm text-ink/70">Capital deployed into Sharpei AI to build the embedded equipment finance layer.</p>
          </TiltTile>

          <TiltTile className="col-span-1" delay={0.1}>
            <TileHeader badge="LIFT" k="B" />
            <div className="mt-3 font-serif text-[20vw] leading-[0.85] tracking-tightest md:text-[5vw]">
              <Counter to={3} suffix="×" />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">application<br />conversion</p>
          </TiltTile>

          <TiltTile className="col-span-1 bg-ink text-paper" delay={0.15} dark>
            <TileHeader badge="SHARPEI" k="C" dark />
            <img src={LOGO} alt="Sharpei" className="mt-4 h-6 w-auto opacity-90" />
            <p className="mt-3 font-sans text-sm text-paper/80">AI infrastructure for equipment lenders. Built in NYC.</p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" /> gosharpei.com
            </div>
          </TiltTile>
        </div>

        {/* Press strip */}
        <TiltTile className="col-span-12" delay={0.2}>
          <TileHeader badge="MENTIONS" k="D" />
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-4">
            {[
              ['Forbes', '30 Under 30 Europe · 2024'],
              ['Slush 100', 'Top European startup'],
              ['El Referente', 'Promising founder'],
              ['Best Enterprise', 'Solution award'],
            ].map(([t, s]) => (
              <div key={t} className="flex items-baseline justify-between gap-3 border-t border-smoke pt-3 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0">
                <span className="font-serif text-2xl leading-tight">{t}</span>
                <span className="text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">{s}</span>
              </div>
            ))}
          </div>
        </TiltTile>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * TILT TILE — 3D hover tilt + shine sweep
 * ──────────────────────────────────────────────────────────────────────────── */
function TiltTile({ children, className = '', delay = 0, dark = false }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [5, -5]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(x, [0, 1], [-5, 5]), { stiffness: 200, damping: 18 })
  const px = useTransform(x, [0, 1], ['0%', '100%'])
  const py = useTransform(y, [0, 1], ['0%', '100%'])
  const shineBg = useMotionTemplate`radial-gradient(360px circle at ${px} ${py}, ${dark ? 'rgba(126,112,255,0.18)' : 'rgba(89,71,255,0.10)'}, transparent 55%)`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { x.set(0.5); y.set(0.5) }

  const base = dark
    ? 'border border-ink/10 bg-ink text-paper'
    : 'border border-smoke bg-paper'

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 130, damping: 20, delay }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={`group relative overflow-hidden rounded-[8px] p-6 md:p-8 ${base} ${className}`}
    >
      <Crosshair className="left-2 top-2" dark={dark} />
      <Crosshair className="right-2 top-2" dark={dark} />
      <Crosshair className="left-2 bottom-2" dark={dark} />
      <Crosshair className="right-2 bottom-2" dark={dark} />
      <motion.div aria-hidden style={{ background: shineBg }} className="pointer-events-none absolute inset-0" />
      <div className="relative h-full" style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  )
}

function TileHeader({ badge, k, dark = false }) {
  return (
    <div className={`flex items-center justify-between border-b pb-3 font-mono text-[10px] uppercase tracking-[0.22em] ${dark ? 'border-paper/10 text-paper/60' : 'border-smoke text-ink/60'}`}>
      <span className="flex items-center gap-2">
        <span className="text-violet">{k}</span>
        <span className={dark ? 'text-paper/30' : 'text-ink/40'}>/</span>
        <span>{badge}</span>
      </span>
      <span className={dark ? 'text-paper/40' : 'text-ink/40'}>●</span>
    </div>
  )
}

function Crosshair({ className = '', dark = false }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute h-2 w-2 ${className}`}>
      <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${dark ? 'bg-paper/20' : 'bg-ink/15'}`} />
      <span className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 ${dark ? 'bg-paper/20' : 'bg-ink/15'}`} />
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * JOURNEY — vertical scroll → horizontal pin (21st.dev image-scroll style)
 * ──────────────────────────────────────────────────────────────────────────── */
function Journey() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Layout: card width 33vw on md, gap 24, with 3 cards centered at start
  const cardW = vw >= 768 ? Math.min(440, vw * 0.3) : Math.min(320, vw * 0.78)
  const gap = vw >= 768 ? 24 : 16
  // Total scroll distance for the horizontal track
  const totalCards = EXPERIENCE.length
  const trackWidth = totalCards * cardW + (totalCards - 1) * gap
  // Translation distance: from showing 3 centered to showing the last 3 centered
  // We center the first card at start, last card at end
  const startOffset = vw / 2 - cardW / 2
  const endOffset = vw / 2 - cardW / 2 - (trackWidth - cardW)
  const translation = startOffset - endOffset // positive distance to translate

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [startOffset, endOffset])
  const xSmooth = useSpring(x, { stiffness: 80, damping: 22, mass: 0.6 })

  // Active card index from progress
  const [active, setActive] = useState(0)
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.round(v * (totalCards - 1))
      setActive(Math.min(Math.max(idx, 0), totalCards - 1))
    })
    return () => unsub()
  }, [scrollYProgress, totalCards])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative"
      style={{ height: `${(totalCards + 1) * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Header strip */}
        <div className="mx-auto w-full max-w-[1600px] px-6">
          <h2 className="font-sans text-[12vw] font-bold leading-[0.92] tracking-tightest md:text-[8vw]">
            <MaskLine className="block">The Journey.</MaskLine>
          </h2>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-12 flex-1">
          <motion.div
            ref={trackRef}
            style={{ x: xSmooth, gap: `${gap}px`, width: `${trackWidth}px` }}
            className="flex h-full items-center"
          >
            {EXPERIENCE.map((item, i) => (
              <ExperienceCard
                key={item.company}
                item={item}
                index={i}
                active={i === active}
                width={cardW}
              />
            ))}
          </motion.div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-paper to-transparent" />
        </div>

        {/* Bottom progress bar + dots */}
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-8">
          <div className="relative h-px w-full overflow-hidden bg-smoke">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="absolute inset-0 bg-violet"
            />
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {EXPERIENCE.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-violet' : 'w-2 bg-ink/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ item, index, active, width }) {
  const accent = item.accent || '#5947FF'
  return (
    <motion.article
      animate={{ scale: active ? 1 : 0.94, opacity: active ? 1 : 0.5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      className={`relative flex flex-none flex-col overflow-hidden rounded-[10px] border transition-colors ${
        active ? 'border-violet/50 shadow-[0_30px_60px_-30px_rgba(89,71,255,0.4)]' : 'border-smoke'
      } bg-paper`}
      style={{ width, aspectRatio: '4 / 5' }}
    >
      {/* Logo / brand panel */}
      <div className="relative h-[58%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 55%), radial-gradient(circle at 80% 80%, ${accent}22, transparent 55%), linear-gradient(135deg, #FAFAFB, #F0EFF5)`,
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(${accent}40 1px, transparent 1px)`,
            backgroundSize: '14px 14px',
          }}
        />

        {/* Logo render */}
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <Logo item={item} accent={accent} />
        </div>

        {/* Period badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink backdrop-blur">
          <span style={{ color: accent }}>{item.n}</span>
          <span className="text-ink/30">/</span>
          <span>{item.period}</span>
        </div>
        {item.current && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-violet px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-paper opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper" />
            </span>
            Now
          </div>
        )}

        {/* Location bottom */}
        <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
          {item.location}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between border-t border-smoke p-5 md:p-6">
        <div>
          <h3 className="font-sans text-2xl font-bold leading-[1] tracking-tightest md:text-3xl">{item.company}</h3>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">{item.title}</div>
          <p className="mt-3 line-clamp-3 font-sans text-[13px] leading-relaxed text-ink/70 md:text-sm">
            {item.body}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-smoke bg-bone/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function Logo({ item, accent }) {
  if (item.logoMode === 'svg' && item.logoSrc) {
    // For Sharpei wordmark (white svg) we recolor via mask
    if (item.company === 'Sharpei') {
      return (
        <div
          className="h-12 w-full max-w-[200px]"
          style={{
            backgroundColor: '#0A0A12',
            WebkitMaskImage: `url(${item.logoSrc})`,
            maskImage: `url(${item.logoSrc})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      )
    }
    return <img src={item.logoSrc} alt={item.company} className="h-14 w-auto max-w-[220px] object-contain" />
  }
  if (item.logoMode === 'png' && item.logoSrc) {
    return <img src={item.logoSrc} alt={item.company} className="h-16 w-auto max-w-[200px] object-contain" />
  }
  if (item.logoMode === 'mark') {
    return (
      <div className="text-center">
        <div className="font-sans text-[120px] font-bold leading-[0.85] tracking-tightest text-ink" style={{ color: accent }}>
          {item.logoText}
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
          {item.company}
        </div>
      </div>
    )
  }
  // 'word' — large wordmark
  return (
    <div className="text-center">
      <div
        className="font-sans text-5xl font-bold leading-[0.9] tracking-tightest md:text-6xl"
        style={{ color: accent }}
      >
        {item.logoText}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ATLAS — interactive 3D globe with city pins
 * ──────────────────────────────────────────────────────────────────────────── */
function Atlas() {
  return (
    <section id="atlas" className="relative mx-auto max-w-[1600px] px-6 py-12 md:py-16">
      <SectionHead idx="A" title="On the Map" subtitle="Cities, lived" />
      <div className="mt-10 grid grid-cols-12 items-center gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-7">
          <Globe />
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="font-sans text-base leading-relaxed text-ink/70 md:text-[17px]">
            From Madrid to New York, via Lancaster, Valencia, and the Bay Area. A map of the places I&apos;ve lived, and the entrepreneurs and friends I met along the way who shaped my journey.
          </p>
          <ul className="mt-8 grid gap-4">
            {CITIES.map((c, i) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 border-t border-smoke pt-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-2xl font-bold tracking-tightest">{c.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">{c.tag}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet">{c.years}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Globe() {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)

  useEffect(() => {
    if (!canvasRef.current) return
    let phi = 0
    let rafId = 0
    let width = canvasRef.current.offsetWidth || 600

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [0.85, 0.92, 1.0],
      markerColor: [0.25, 0.65, 1.0],
      glowColor: [0.3, 0.55, 0.75],
      markers: CITIES.map((c) => ({ location: c.coords, size: 0.08 })),
    })

    const tick = () => {
      if (!pointerInteracting.current) phi += 0.004
      const w = canvasRef.current?.offsetWidth || width
      if (w !== width) width = w
      globe.update({
        phi: phi + pointerInteractionMovement.current,
        theta: 0.3,
        width: width * 2,
        height: width * 2,
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    })

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
    }
  }, [])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6%] rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #0f3548 0%, #061923 70%, #03101a 100%)',
          boxShadow: '0 50px 100px -30px rgba(11,46,63,0.55)',
        }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta / 200
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta / 100
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
          position: 'relative',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * PRESS — In the news (real headlines)
 * ──────────────────────────────────────────────────────────────────────────── */
function Press() {
  return (
    <section id="press" className="relative mx-auto max-w-[1600px] px-6 py-12 md:py-16">
      <SectionHead idx="02" title="In Press" subtitle="Headlines & coverage" />

      <div className="mt-8 grid grid-cols-12 gap-3">
        {PRESS.map((p, i) => (
          <PressCard key={p.outlet + i} item={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function PressCard({ item, index }) {
  // Big card = first; rest medium
  const isHero = index === 0
  const cls = isHero
    ? 'col-span-12 md:col-span-6 md:row-span-2 bg-ink text-paper'
    : 'col-span-12 md:col-span-3'

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      data-magnet
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 130, damping: 20, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[8px] border p-6 transition-colors md:p-8 ${cls} ${
        isHero ? 'border-ink/10 min-h-[420px] md:min-h-[560px]' : 'border-smoke bg-paper hover:border-violet/40'
      }`}
    >
      {isHero && item.image && (
        <>
          <img
            src={item.image}
            alt={item.headline}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        </>
      )}
      <div className={`relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] ${isHero ? 'text-paper/80' : 'text-ink/60'}`}>
        <span className="flex items-center gap-2">
          <span className="text-violet">●</span>
          <span>{item.outlet}</span>
        </span>
        <span>{item.date}</span>
      </div>

      <div className="relative my-8">
        <h3 className={`font-sans font-semibold leading-[1.05] tracking-tightest ${isHero ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
          {item.headline}
        </h3>
        <p className={`mt-4 font-sans text-sm leading-relaxed md:text-base ${isHero ? 'text-paper/80' : 'text-ink/70'}`}>
          {item.quote}
        </p>
      </div>

      <div className={`relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] ${isHero ? 'text-paper/80' : 'text-ink/60'}`}>
        <span className="flex items-center gap-2">
          <span className={isHero ? 'text-paper' : 'text-violet'}>{item.accent}</span>
        </span>
        <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
          Read <span aria-hidden>↗</span>
        </span>
      </div>
    </motion.a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ARSENAL — Bento with 3D tilt
 * ──────────────────────────────────────────────────────────────────────────── */
function Arsenal() {
  return (
    <section id="arsenal" className="relative mx-auto max-w-[1600px] px-6 py-12 md:py-16">
      <SectionHead idx="03" title="The Arsenal" subtitle="Stack · Signals · Signatures" />

      <div className="mt-8 grid grid-cols-12 gap-3">
        {/* Hero — Sharpei */}
        <TiltTile className="col-span-12 row-span-2 md:col-span-7 bg-ink text-paper" delay={0} dark>
          <TileHeader badge="NOW BUILDING" k="01" dark />
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="mt-5">
              <img src={LOGO} alt="Sharpei" className="h-7 w-auto opacity-95" />
              <h3 className="mt-6 font-sans text-4xl font-bold leading-[0.95] tracking-tightest md:text-7xl">
                The AI infrastructure for{' '}
                <span className="grad-text italic">equipment finance.</span>
              </h3>
            </div>
          </div>
        </TiltTile>

        {/* Forbes */}
        <TiltTile className="col-span-12 md:col-span-5" delay={0.05}>
          <TileHeader badge="HONORS" k="02" />
          <div className="mt-3 flex items-center gap-4">
            <div className="font-serif text-7xl leading-none tracking-tightest text-violet md:text-8xl"><Counter to={30} /></div>
            <div>
              <div className="font-serif text-2xl italic leading-tight md:text-3xl">Under 30</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">Forbes Europe · Retail &amp; Ecommerce · 2024</div>
            </div>
          </div>
          <div className="mt-4 font-sans text-sm text-ink/70">Listed as the youngest founder on the European Retail list in 2024.</div>
        </TiltTile>

        {/* Languages */}
        <TiltTile className="col-span-12 md:col-span-3" delay={0.1}>
          <TileHeader badge="LANGS" k="03" />
          <ul className="mt-3 space-y-2 font-serif">
            {LANGUAGES.map((l) => (
              <li key={l.l} className="flex items-baseline justify-between">
                <span className="text-2xl">{l.l}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">{l.level}</span>
              </li>
            ))}
          </ul>
        </TiltTile>

        {/* Education */}
        <TiltTile className="col-span-12 md:col-span-5" delay={0.15}>
          <TileHeader badge="EDU" k="04" />
          <div className="mt-3 grid gap-3">
            {EDUCATION.map((e, i) => (
              <div key={e.school} className={`flex items-baseline justify-between gap-4 ${i === 0 ? '' : 'border-t border-smoke pt-3'}`}>
                <div>
                  <div className="font-serif text-2xl leading-tight">{e.school}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">{e.detail}</div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">{e.meta}</div>
              </div>
            ))}
          </div>
        </TiltTile>

        {/* Focus */}
        <TiltTile className="col-span-12 md:col-span-4" delay={0.2}>
          <TileHeader badge="FOCUS" k="05" />
          <div className="mt-3 flex flex-wrap gap-2">
            {FOCUS.map((f) => (
              <span key={f}
                className="rounded-full border border-smoke bg-bone/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-violet hover:bg-violet/10 hover:text-violet">
                {f}
              </span>
            ))}
          </div>
        </TiltTile>

        {/* Communities */}
        <TiltTile className="col-span-12 md:col-span-5" delay={0.3}>
          <TileHeader badge="COMMUNITIES" k="06" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {COMMUNITIES.map((c) => (
              <div
                key={c.name}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-[6px] border border-smoke bg-bone/40 p-3 transition-colors hover:border-violet/40 hover:bg-violet/5"
              >
                {c.logoSrc ? (
                  <img
                    src={c.logoSrc}
                    alt={c.name}
                    className="h-8 w-auto max-w-full object-contain"
                  />
                ) : (
                  <div className="font-serif text-xl leading-none tracking-tightest text-ink/80">
                    {c.name}
                  </div>
                )}
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60">
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </TiltTile>
      </div>
    </section>
  )
}

function KV({ k, children }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">{k}</div>
      <div className="mt-1 font-serif text-xl tracking-tight">{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Section header
 * ──────────────────────────────────────────────────────────────────────────── */
function SectionHead({ idx, title, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <div>
      <h2 ref={ref} className="font-sans text-[12vw] font-bold leading-[0.92] tracking-tightest md:text-[7.6vw]">
        {title.split(' ').map((w, i) => (
          <span key={i} className="mask">
            <motion.span
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              className={`inline-block ${i === 1 ? 'italic text-violet' : ''}`}
            >{w}&nbsp;</motion.span>
          </span>
        ))}
      </h2>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
 * FOOTER
 * ──────────────────────────────────────────────────────────────────────────── */
function Footer() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, amount: 0.2 })
  return (
    <footer id="contact" className="relative mt-12 overflow-hidden border-t border-smoke bg-ink px-6 pb-10 pt-12 text-paper md:pt-16">
      {/* mesh */}
      <div className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(circle at 20% 0%, rgba(11,46,63,0.35), transparent 40%), radial-gradient(circle at 90% 80%, rgba(6,25,35,0.4), transparent 45%)',
        }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        <h2 ref={headRef} className="font-sans text-[10vw] font-bold leading-[0.95] tracking-tightest md:text-[6.4vw]">
          <span className="block mask">
            <motion.span
              initial={{ y: '110%' }} animate={headInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="block"
            >Building with people</motion.span>
          </span>
          <span className="block mask">
            <motion.span
              initial={{ y: '110%' }} animate={headInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 1.1, delay: 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="block"
            >who make <span className="italic grad-text">things happen.</span></motion.span>
          </span>
        </h2>

        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-xl font-sans text-base leading-relaxed text-paper/70 md:text-[17px]">
              For partnerships, Sharpei, or anything you&apos;re building, LinkedIn is where I&apos;m most responsive.
            </p>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-paper/70 md:text-[17px]">
              If you&apos;re an entrepreneur (starting or exiting), an investor, a builder, a dreamer, or just someone who thinks we should meet — reach out. I&apos;m always up for a good conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="https://www.linkedin.com/in/julian-azofra/">
                <span>LinkedIn</span><span aria-hidden>→</span>
              </MagneticButton>
              <MagneticButton href="https://www.gosharpei.com/" variant="ghost">
                <span>gosharpei.com</span><span aria-hidden>↗</span>
              </MagneticButton>
              <MagneticButton href="mailto:Julian.azobeg@gmail.com" variant="ghost">
                <span>Julian.azobeg@gmail.com</span><span aria-hidden>↗</span>
              </MagneticButton>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
              <FootMeta k="Based" v="New York" />
              <FootMeta k="Origin" v="Madrid" />
              <FootMeta k="Status" v="Building" />
              <FootMeta k="Open to" v="Conversations" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Julián Azofra · Portfolio v1.0</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-violet opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
            </span>
            Live · Last build {new Date().toISOString().slice(0, 10)}
          </span>
          <span>Built with Claude Code</span>
        </div>
      </div>
    </footer>
  )
}

function FootMeta({ k, v }) {
  return (
    <div className="border-t border-paper/10 pt-2">
      <div className="text-paper/40">{k}</div>
      <div className="mt-1 font-serif text-xl normal-case tracking-tight text-paper">{v}</div>
    </div>
  )
}

function MagneticButton({ href, children, variant = 'solid' }) {
  const ref = useRef(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3); y.set((e.clientY - cy) * 0.4)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const base = 'relative inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors'
  const styles = variant === 'solid'
    ? 'bg-violet text-paper hover:bg-glow'
    : 'border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink'

  return (
    <motion.a
      ref={ref} href={href} target="_blank" rel="noreferrer" data-magnet
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x: sx, y: sy }} className={`${base} ${styles}`}
    >
      <motion.span style={{ x: useTransform(sx, (v) => v * 0.4), y: useTransform(sy, (v) => v * 0.4) }} className="flex items-center gap-3">
        {children}
      </motion.span>
    </motion.a>
  )
}
