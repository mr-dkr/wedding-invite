import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionReveal({ children, className = '', id }: SectionRevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px', amount: 0.08 }}
      variants={{
        hidden: { opacity: 0, y: 44 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduce ? 0 : 0.62,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.section>
  )
}
