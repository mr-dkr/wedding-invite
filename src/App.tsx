import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Envelope } from './components/Envelope'
import { Invitation } from './components/Invitation'
import { site } from './config'

const { animations: envAnim } = site.envelope

export default function App() {
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [opening, setOpening] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const openedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioFadeRef = useRef<number | null>(null)

  const startKettiMelam = useCallback(() => {
    if (audioRef.current) return

    const audio = new Audio(site.audio.kettiMelam)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    audio.play().catch(() => {
      audioRef.current = null
    })
  }, [])

  const fadeInKettiMelam = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audioFadeRef.current) {
      window.cancelAnimationFrame(audioFadeRef.current)
    }

    const startedAt = performance.now()
    const targetVolume = site.audio.volume

    const step = (now: number) => {
      const progress = Math.min(
        (now - startedAt) / site.audio.fadeInDuration,
        1,
      )
      audio.volume = targetVolume * progress

      if (progress < 1) {
        audioFadeRef.current = window.requestAnimationFrame(step)
        return
      }

      audioFadeRef.current = null
    }

    audioFadeRef.current = window.requestAnimationFrame(step)
  }, [])

  const handleSealClick = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    setOpening(true)
    startKettiMelam()
    const transitionStartDelay =
      envAnim.sealClickToFadeOutDelay +
      envAnim.flapOpeningDuration * 1000 -
      envAnim.fadeOutDuration * 450

    window.setTimeout(() => {
      setShowInvitation(true)
      fadeInKettiMelam()
    }, Math.max(0, transitionStartDelay - 150))
    window.setTimeout(() => {
      setShowEnvelope(false)
      setOpening(false)
    }, transitionStartDelay)
  }, [fadeInKettiMelam, startKettiMelam])

  const handleEnvelopeExitComplete = useCallback(() => {
    openedRef.current = false
  }, [])

  return (
    <div className="relative min-h-screen">
      {!showInvitation && !opening && (
        <div className="sr-only" aria-live="polite">
          Invitation hidden until envelope opens.
        </div>
      )}

      <div id="invitation-root">
        {showInvitation && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 56, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Invitation />
          </motion.div>
        )}
      </div>

      <Envelope
        open={showEnvelope}
        opening={opening}
        onSealClick={handleSealClick}
        onExitComplete={handleEnvelopeExitComplete}
      />
    </div>
  )
}
