import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale'

const makeVariants = (direction: ScrollRevealDirection): Variants => {
  const distance = 48
  switch (direction) {
    case 'left':
      return {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0 },
      }
    case 'right':
      return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 },
      }
    case 'down':
      return {
        hidden: { opacity: 0, y: -distance * 0.55 },
        visible: { opacity: 1, y: 0 },
      }
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1 },
      }
    case 'up':
    default:
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      }
  }
}

const staticVariants: Variants = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1 },
}

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  direction?: ScrollRevealDirection
  delay?: number
  duration?: number
  /** Default true: animate in once (smooth). Set false to replay when scrolling back. */
  once?: boolean
  amount?: number | 'some' | 'all'
} & Omit<HTMLMotionProps<'div'>, 'children' | 'initial' | 'animate' | 'variants'>

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.52,
  once = true,
  amount = 0.18,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const isInView = useInView(ref, {
    amount,
    margin: '0px 0px -10% 0px',
    once,
  })

  const variants = reduce ? staticVariants : makeVariants(direction)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
