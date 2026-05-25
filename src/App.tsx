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
    window.setTimeout(() => {
      setShowInvitation(true)
    }, envAnim.sealClickToFadeOutDelay)
    window.setTimeout(() => {
      setShowEnvelope(false)
      setOpening(false)
    },
      envAnim.sealClickToFadeOutDelay +
        envAnim.flapOpeningDuration * 1000 +
        400,
    )
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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
