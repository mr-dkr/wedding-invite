import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { site } from '../config'

type MotionValue = ReturnType<typeof useTransform>

const confettiColors = [
  '#f59e0b',
  '#dc2626',
  '#e11d48',
  '#7c3aed',
  '#16a34a',
  '#fef3c7',
]

function CelebrationBurst({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => {
        const side = index % 3
        const startX = side === 0 ? 12 : side === 1 ? 88 : 50
        const endX = (index * 37) % 100
        const endY = 8 + ((index * 19) % 70)

        return {
          id: index,
          color: confettiColors[index % confettiColors.length],
          delay: (index % 12) * 0.025,
          startX,
          startY: side === 2 ? 72 : 88,
          endX,
          endY,
          rotate: (index % 2 === 0 ? 1 : -1) * (180 + index * 23),
          width: 6 + (index % 4) * 2,
          height: 10 + (index % 3) * 4,
        }
      }),
    [],
  )

  if (!active) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gold-100/15 via-transparent to-rose-100/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute rounded-full shadow-sm"
          style={{
            backgroundColor: piece.color,
            left: `${piece.startX}%`,
            top: `${piece.startY}%`,
            width: piece.width,
            height: piece.height,
          }}
          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1, 0.9],
            x: `${piece.endX - piece.startX}vw`,
            y: `${piece.endY - piece.startY}vh`,
            rotate: piece.rotate,
          }}
          transition={{
            duration: 1.8,
            delay: piece.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  )
}

function Character({
  src,
  opacity,
  x,
  y,
  scale,
  className = '',
}: {
  src: string
  opacity: MotionValue
  x: MotionValue
  y?: MotionValue
  scale?: MotionValue
  className?: string
}) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      className={`absolute bottom-0 left-1/2 w-auto max-w-[92vw] -translate-x-1/2 select-none object-contain drop-shadow-2xl ${className}`.trim()}
      draggable={false}
      loading="lazy"
      decoding="async"
      style={{ opacity, x, y, scale }}
    />
  )
}

export function ScrollCharacterStory() {
  const { scrollYProgress } = useScroll()
  const s = site.scrollStory
  const [celebrating, setCelebrating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const hasCelebratedRef = useRef(false)
  const celebrationTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const handleMediaChange = () => setIsMobile(mediaQuery.matches)

    handleMediaChange()
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)

      if (celebrationTimerRef.current) {
        window.clearTimeout(celebrationTimerRef.current)
      }
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.68) {
      hasCelebratedRef.current = false
    }

    if (latest < 0.755 || hasCelebratedRef.current) return

    hasCelebratedRef.current = true
    setCelebrating(true)

    window.navigator.vibrate?.([80, 40, 120])

    const popper = new Audio(s.celebrationSound)
    popper.volume = 0.55
    popper.play().catch(() => {
      // Browsers can block audio if the page has not received user interaction.
    })

    if (celebrationTimerRef.current) {
      window.clearTimeout(celebrationTimerRef.current)
    }
    celebrationTimerRef.current = window.setTimeout(() => {
      setCelebrating(false)
      celebrationTimerRef.current = null
    }, 2500)
  })

  const approachOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.06, 0.5, 0.505],
    [0, 1, 1, 0],
  )
  const brideApproachX = useTransform(
    scrollYProgress,
    [0.04, 0.3, 0.5],
    isMobile ? ['-58vw', '-40vw', '-36vw'] : ['-42vw', '-24vw', '-16vw'],
  )
  const groomApproachX = useTransform(
    scrollYProgress,
    [0.04, 0.3, 0.5],
    isMobile ? ['56vw', '6vw', '-10vw'] : ['20vw', '10vw', '8vw'],
  )
  const approachY = useTransform(scrollYProgress, [0.04, 0.5], ['4vh', '4vh'])
  const approachScale = useTransform(scrollYProgress, [0.04, 0.5], [0.82, 0.9])
  const groomApproachScale = useTransform(scrollYProgress, [0.04, 0.5], [0.72, 0.8])

  const garlandOpacity = useTransform(
    scrollYProgress,
    [0.505, 0.51, 0.75, 0.755],
    [0, 1, 1, 0],
  )
  const garlandX = useTransform(
    scrollYProgress,
    [0.505, 0.75],
    isMobile ? ['-22vw', '-22vw'] : ['-12vw', '-12vw'],
  )
  const garlandY = useTransform(scrollYProgress, [0.505, 0.75], ['8vh', '8vh'])
  const garlandScale = useTransform(scrollYProgress, [0.505, 0.75], [0.82, 0.86])

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.755, 0.76, 1],
    [0, 1, 1],
  )
  const finalX = useTransform(
    scrollYProgress,
    [0.755, 1],
    isMobile ? ['-22vw', '-22vw'] : ['-12vw', '-12vw'],
  )
  const finalY = useTransform(scrollYProgress, [0.755, 1], ['8vh', '8vh'])
  const finalScale = useTransform(scrollYProgress, [0.755, 1], [0.84, 0.9])
  const backdropOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.08, 0.98, 1],
    [0, 1, 1, 0.75],
  )

  return (
    <>
      <CelebrationBurst active={celebrating} />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[2] h-[24vh] min-h-36 overflow-hidden sm:h-[32vh] md:h-[42vh]"
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-cream-50/70 via-cream-50/30 to-transparent backdrop-blur-[1.5px]"
          style={{ opacity: backdropOpacity }}
        />
        <div className="relative mx-auto h-full max-w-7xl">
          <Character
            src={s.brideApproach}
            opacity={approachOpacity}
            x={brideApproachX}
            y={approachY}
            scale={approachScale}
            className="h-[92%] sm:h-[94%]"
          />
          <Character
            src={s.groomApproach}
            opacity={approachOpacity}
            x={groomApproachX}
            y={approachY}
            scale={groomApproachScale}
            className="h-[90%] sm:h-[92%]"
          />
          <Character
            src={s.garlandMoment}
            opacity={garlandOpacity}
            x={garlandX}
            y={garlandY}
            scale={garlandScale}
            className="h-full"
          />
          <Character
            src={s.finalMoment}
            opacity={finalOpacity}
            x={finalX}
            y={finalY}
            scale={finalScale}
            className="h-full"
          />
        </div>
      </div>
    </>
  )
}
