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

  const handleSealClick = useCallback(() => {
    if (openedRef.current) return
    openedRef.current = true
    setOpening(true)
    const paperRevealDelayMs = envAnim.paperRevealDelay * 1000
    const paperRevealDurationMs = envAnim.paperRevealDuration * 1000
    const invitationRevealDelay =
      paperRevealDelayMs + paperRevealDurationMs * 0.68
    const envelopeExitDelay = paperRevealDelayMs + paperRevealDurationMs + 120

    window.setTimeout(() => {
      setShowInvitation(true)
    }, invitationRevealDelay)
    window.setTimeout(() => {
      setShowEnvelope(false)
      setOpening(false)
    }, envelopeExitDelay)
  }, [])

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
