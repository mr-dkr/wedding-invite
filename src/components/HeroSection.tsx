import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../config'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  const bgUrl = site.hero.image
  const { reception, muhurtham } = site.wedding

  return (
    <header
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex-col overflow-hidden"
    >
      {/* Full-bleed cover */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <img
          src={bgUrl}
          alt=""
          className="absolute left-1/2 top-1/2 h-[105%] min-h-full w-[105%] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          draggable={false}
        />
      </motion.div>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-stone-950/60 via-stone-900/30 to-stone-950/72"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_25%,transparent_0%,rgba(15,10,8,0.24)_70%)]"
        aria-hidden
      />

      {/* Top center: names + details (details sit a bit higher, close under names) */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-14 text-center text-white md:pt-16 lg:pt-20"
        style={{ y: contentY }}
      >
        <motion.p
          className="font-cormorant text-xs uppercase tracking-[0.4em] text-amber-100/90 md:text-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {site.hero.tagline}
        </motion.p>

        <div className="mt-5 md:mt-6">
          <motion.h1
            className="mt-1.5 font-display text-4xl font-semibold leading-tight tracking-tight drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            {site.couple.bride}
          </motion.h1>
        </div>

        <motion.p
          className="font-cormorant my-3 text-xl text-amber-200/95 md:my-4 md:text-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.52 }}
        >
          &
        </motion.p>

        <div>
          <motion.h1
            className="mt-1.5 font-display text-4xl font-semibold leading-tight tracking-tight drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {site.couple.groom}
          </motion.h1>
        </div>

        {/* Date lines — tighter to names, visually “higher” on the hero */}
        <motion.div
          className="mx-auto mt-6 max-w-lg space-y-2 font-display text-sm leading-snug text-amber-50/95 md:mt-8 md:space-y-2.5 md:text-base lg:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.68 }}
        >
          <p>
            <span className="text-gold-300">{reception.label}</span>
            {' · '}
            {reception.dateDisplay}
            {' · '}
            {reception.timeDisplay}
          </p>
          <p>
            <span className="text-gold-300">{muhurtham.label}</span>
            {' · '}
            {muhurtham.dateDisplay}
            {' · '}
            {muhurtham.timeDisplay}
          </p>
        </motion.div>
      </motion.div>

      <div className="min-h-0 flex-1" aria-hidden />

      {/* Scroll cue — bottom */}
      <motion.div
        className="relative z-10 mx-auto flex flex-col items-center gap-1 pb-10 text-amber-100/90 md:pb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] md:text-xs">
          {site.translations.scrollText}
        </span>
        <motion.div
          aria-hidden
          className="flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            className="text-amber-200 drop-shadow-md"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </header>
  )
}
