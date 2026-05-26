import { useCallback, useEffect, useRef, useState } from 'react'
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

  const startBackgroundMusic = useCallback(() => {
    if (audioRef.current) return

    const audio = new Audio(site.audio.backgroundMusic)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    audio.play().catch(() => {
      audioRef.current = null
    })
  }, [])

  const fadeInBackgroundMusic = useCallback(() => {
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

  const pauseBackgroundMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) return

    if (audioFadeRef.current) {
      window.cancelAnimationFrame(audioFadeRef.current)
    }

    const startedAt = performance.now()
    const initialVolume = audio.volume
    const fadeOutDuration = 900

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / fadeOutDuration, 1)
      audio.volume = initialVolume * (1 - progress)

      if (progress < 1) {
        audioFadeRef.current = window.requestAnimationFrame(step)
        return
      }

      audio.pause()
      audio.volume = 0
      audioFadeRef.current = null
    }

    audioFadeRef.current = window.requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    if (!showInvitation) return

    const pauseAtPageEnd = () => {
      const { documentElement } = document
      const distanceToBottom =
        documentElement.scrollHeight - window.innerHeight - window.scrollY

      if (distanceToBottom <= 32) {
        pauseBackgroundMusic()
      }
    }

    pauseAtPageEnd()
    window.addEventListener('scroll', pauseAtPageEnd, { passive: true })
    window.addEventListener('resize', pauseAtPageEnd)

    return () => {
      window.removeEventListener('scroll', pauseAtPageEnd)
      window.removeEventListener('resize', pauseAtPageEnd)
    }
  }, [pauseBackgroundMusic, showInvitation])

  const handleSealClick = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    setOpening(true)
    startBackgroundMusic()
    const transitionStartDelay =
      envAnim.sealClickToFadeOutDelay +
      envAnim.flapOpeningDuration * 1000 -
      envAnim.fadeOutDuration * 450

    window.setTimeout(() => {
      setShowInvitation(true)
      fadeInBackgroundMusic()
    }, Math.max(0, transitionStartDelay - 350))
    window.setTimeout(() => {
      setShowEnvelope(false)
      setOpening(false)
    }, transitionStartDelay)
  }, [fadeInBackgroundMusic, startBackgroundMusic])

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
            initial={{ opacity: 0, y: 96, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.55,
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
