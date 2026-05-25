import { motion, useScroll, useTransform } from 'framer-motion'
import { site } from '../config'

function Character({
  src,
  alt,
  opacity,
  x,
  scale,
  className = '',
}: {
  src: string
  alt: string
  opacity: ReturnType<typeof useTransform>
  x: ReturnType<typeof useTransform>
  scale?: ReturnType<typeof useTransform>
  className?: string
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute bottom-0 max-h-full w-auto select-none object-contain drop-shadow-2xl ${className}`.trim()}
      draggable={false}
      loading="lazy"
      decoding="async"
      style={{ opacity, x, scale }}
    />
  )
}

export function ScrollCharacterStory() {
  const { scrollYProgress } = useScroll()
  const s = site.scrollStory

  const approachOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.14, 0.25, 0.31],
    [0, 1, 1, 0],
  )
  const brideApproachX = useTransform(
    scrollYProgress,
    [0.08, 0.31],
    ['-58vw', '46vw'],
  )
  const groomApproachX = useTransform(
    scrollYProgress,
    [0.08, 0.31],
    ['58vw', '-46vw'],
  )

  const standOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.34, 0.45, 0.52],
    [0, 1, 1, 0],
  )
  const brideStandX = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.52],
    ['-44vw', '-16vw', '-11vw'],
  )
  const groomStandX = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.52],
    ['44vw', '16vw', '11vw'],
  )

  const garlandOpacity = useTransform(
    scrollYProgress,
    [0.49, 0.56, 0.69, 0.76],
    [0, 1, 1, 0],
  )
  const garlandX = useTransform(scrollYProgress, [0.49, 0.76], ['6vw', '0vw'])
  const garlandScale = useTransform(scrollYProgress, [0.49, 0.76], [0.9, 1])

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.8, 0.96, 1],
    [0, 1, 1, 0],
  )
  const finalX = useTransform(scrollYProgress, [0.72, 1], ['-4vw', '0vw'])
  const finalScale = useTransform(scrollYProgress, [0.72, 1], [0.92, 1.04])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[2] hidden h-[42vh] overflow-hidden sm:block md:h-[50vh]"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        <Character
          src={s.brideApproach}
          alt=""
          opacity={approachOpacity}
          x={brideApproachX}
          className="left-1/2 h-[96%] -translate-x-1/2"
        />
        <Character
          src={s.groomApproach}
          alt=""
          opacity={approachOpacity}
          x={groomApproachX}
          className="left-1/2 h-[96%] -translate-x-1/2"
        />
        <Character
          src={s.brideStand}
          alt=""
          opacity={standOpacity}
          x={brideStandX}
          className="left-1/2 h-full -translate-x-1/2"
        />
        <Character
          src={s.groomStand}
          alt=""
          opacity={standOpacity}
          x={groomStandX}
          className="left-1/2 h-full -translate-x-1/2"
        />
        <Character
          src={s.garlandMoment}
          alt=""
          opacity={garlandOpacity}
          x={garlandX}
          scale={garlandScale}
          className="left-1/2 h-full -translate-x-1/2"
        />
        <Character
          src={s.finalMoment}
          alt=""
          opacity={finalOpacity}
          x={finalX}
          scale={finalScale}
          className="left-1/2 h-full -translate-x-1/2"
        />
      </div>
    </div>
  )
}
