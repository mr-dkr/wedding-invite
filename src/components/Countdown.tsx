import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { site } from '../config'
import { KolamCardCorners } from './KolamBorder'
import { ScrollReveal } from './ScrollReveal'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function Countdown() {
  const target = new Date(site.wedding.targetISO).getTime()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const blocks = [
    { label: 'Days', value: pad(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ]

  return (
    <div className="relative overflow-hidden rounded-xl border-y border-gold-300/45 bg-cream-50/95 py-16 md:py-24">
      <KolamCardCorners className="opacity-[0.35]" />
      <div className="relative z-[1] mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal direction="up">
          <p className="font-display text-3xl text-stone-800 md:text-4xl">
            {site.translations.countdown}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-gold-600">
            {site.translations.countdownSubtitle}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {blocks.map((b, i) => (
            <ScrollReveal key={b.label} direction="up" delay={0.06 * i}>
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-gold-300/50 bg-white/75 px-4 py-6 shadow-sm backdrop-blur-sm"
                whileHover={{
                  y: -4,
                  boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
                }}
                transition={{ duration: 0.25 }}
              >
                <KolamCardCorners className="opacity-40" />
                <div className="relative z-[1]">
                  <div className="font-display text-4xl tabular-nums text-stone-900 md:text-5xl">
                    {b.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-widest text-stone-500">
                    {b.label}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
