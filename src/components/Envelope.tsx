import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../config'
import { KolamCardCorners, KolamDivider } from './KolamBorder'

type EnvelopeProps = {
  open: boolean
  opening: boolean
  onSealClick: () => void
  onExitComplete: () => void
}

const a = site.envelope.animations

export function Envelope({
  open,
  opening,
  onSealClick,
  onExitComplete,
}: EnvelopeProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 px-6"
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: 1,
            y: opening ? -48 : 0,
            scale: opening ? a.containerScaleOnOpen : 1,
          }}
          exit={{
            opacity: 0,
            y: '-110vh',
            transition: {
              duration: a.fadeOutDuration + 0.35,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          transition={{
            opacity: { duration: a.initialFadeInDuration, ease: 'easeOut' },
            y: {
              duration: a.containerScaleDuration,
              ease: [0.22, 1, 0.36, 1],
            },
            scale: {
              duration: a.containerScaleDuration,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <KolamDivider className="!h-9 !py-0" />
          <div
            className="relative mb-8 max-w-md rounded-xl px-5 py-6 text-center ring-1 ring-gold-500/20"
            style={{ perspective: '1000px' }}
          >
            <KolamCardCorners className="opacity-50" />
            <div className="relative z-[1]">
              <p className="font-cormorant text-sm font-medium uppercase tracking-[0.35em] text-stone-600">
                You&apos;re Invited
              </p>
              <p className="mt-3 font-display text-2xl text-stone-800 md:text-3xl">
                To celebrate our special day
              </p>
              <img
                src={site.couple.monogramLogo}
                alt="Nivedha and Divakar"
                className="mx-auto mt-6 h-24 w-auto object-contain md:h-36"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <KolamDivider className="!h-9 !py-0" />

          <div className="relative flex justify-center" style={{ perspective: '1200px' }}>
            <div
              className="relative h-[220px] w-[min(100vw-3rem,300px)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Pocket */}
              <div className="absolute inset-x-0 bottom-0 top-[32%] rounded-b-2xl border-2 border-gold-300/80 bg-cream-50 shadow-2xl shadow-stone-900/10" />

              {/* Letter peek */}
              <motion.div
                className="absolute inset-x-6 bottom-4 top-[28%] rounded-lg border border-gold-300/40 bg-white/90 shadow-inner"
                initial={{ y: 8, opacity: 0.85 }}
                animate={{ y: opening ? -18 : 8, opacity: opening ? 1 : 0.85 }}
                transition={{
                  duration: a.flapOpeningDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* Top flap */}
              <motion.div
                className="absolute inset-x-0 top-0 z-10 h-[45%] origin-bottom rounded-t-2xl border-2 border-b-0 border-gold-300/80 bg-gradient-to-b from-cream-50 to-cream-200 shadow-md"
                style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }}
                animate={{ rotateX: opening ? -178 : 0 }}
                transition={{
                  duration: a.flapOpeningDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* Wax seal */}
              <motion.button
                type="button"
                aria-label="Open invitation"
                className="absolute left-1/2 top-[36%] z-20 flex h-16 w-16 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-4 border-amber-100/90 shadow-lg outline-none ring-gold-400/30 focus-visible:ring-4"
                style={{ backgroundColor: site.envelope.sealColor }}
                whileHover={{
                  y: -a.hoverLiftDistance,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  scale: opening ? 0.85 : 1,
                  opacity: opening ? 0 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onClick={onSealClick}
              >
                <img
                  src={site.envelope.sealLogo}
                  alt=""
                  className="h-full w-full rounded-full object-contain"
                />
              </motion.button>
            </div>
          </div>

          <p className="mt-10 font-sans text-sm text-stone-600/90">
            Click the seal
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
