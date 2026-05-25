import { useId, type ReactNode } from 'react'

/**
 * Decorative kolam-inspired frame: dot-and-curve motifs typical of Tamil pulli kolam,
 * used as a border around invitation content.
 */
export function KolamFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative px-2 py-3 sm:px-4 sm:py-5 md:px-8 md:py-8">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg md:rounded-xl"
        aria-hidden
      >
        <KolamCorners />
        <KolamEdges />
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

function KolamCorners() {
  const stroke = 'currentColor'
  const cornerClass =
    'absolute h-16 w-16 text-gold-600/75 sm:h-20 sm:w-20 md:h-24 md:w-24'

  return (
    <>
      <svg className={`${cornerClass} left-0 top-0`} viewBox="0 0 64 64" fill="none">
        <path
          d="M4 60V4h56"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[8, 20, 32, 44].map((o) => (
          <circle key={o} cx={o} cy={o} r="2" className="fill-gold-500/90" />
        ))}
        <path
          d="M8 56 Q 20 40 32 32 T 56 8"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M12 52 Q 24 36 36 28"
          stroke={stroke}
          strokeWidth="0.9"
          fill="none"
          opacity="0.7"
        />
      </svg>
      <svg
        className={`${cornerClass} right-0 top-0 scale-x-[-1]`}
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M4 60V4h56"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[8, 20, 32, 44].map((o) => (
          <circle key={o} cx={o} cy={o} r="2" className="fill-gold-500/90" />
        ))}
        <path
          d="M8 56 Q 20 40 32 32 T 56 8"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M12 52 Q 24 36 36 28"
          stroke={stroke}
          strokeWidth="0.9"
          fill="none"
          opacity="0.7"
        />
      </svg>
      <svg
        className={`${cornerClass} bottom-0 left-0 scale-y-[-1]`}
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M4 60V4h56"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[8, 20, 32, 44].map((o) => (
          <circle key={o} cx={o} cy={o} r="2" className="fill-gold-500/90" />
        ))}
        <path
          d="M8 56 Q 20 40 32 32 T 56 8"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M12 52 Q 24 36 36 28"
          stroke={stroke}
          strokeWidth="0.9"
          fill="none"
          opacity="0.7"
        />
      </svg>
      <svg
        className={`${cornerClass} bottom-0 right-0 scale-[-1]`}
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M4 60V4h56"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[8, 20, 32, 44].map((o) => (
          <circle key={o} cx={o} cy={o} r="2" className="fill-gold-500/90" />
        ))}
        <path
          d="M8 56 Q 20 40 32 32 T 56 8"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M12 52 Q 24 36 36 28"
          stroke={stroke}
          strokeWidth="0.9"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </>
  )
}

function KolamEdges() {
  const uid = useId().replace(/:/g, '')
  const top = `kolam-top-${uid}`
  const bot = `kolam-bot-${uid}`
  const left = `kolam-left-${uid}`
  const right = `kolam-right-${uid}`

  return (
    <>
      <svg
        className="absolute left-16 right-16 top-0 h-10 text-gold-600/65 sm:left-20 sm:right-20 md:left-24 md:right-24"
        preserveAspectRatio="none"
        viewBox="0 0 400 40"
      >
        <defs>
          <pattern
            id={top}
            x="0"
            y="0"
            width="50"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="8" cy="20" r="2.2" className="fill-gold-500/85" />
            <circle cx="25" cy="20" r="2.2" className="fill-gold-500/85" />
            <circle cx="42" cy="20" r="2.2" className="fill-gold-500/85" />
            <path
              d="M0 20 Q12.5 8 25 20 T50 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M0 12 Q25 20 50 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${top})`} />
      </svg>
      <svg
        className="absolute bottom-0 left-16 right-16 h-10 text-gold-600/65 sm:left-20 sm:right-20 md:left-24 md:right-24"
        preserveAspectRatio="none"
        viewBox="0 0 400 40"
      >
        <defs>
          <pattern
            id={bot}
            x="0"
            y="0"
            width="50"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="8" cy="20" r="2.2" className="fill-gold-500/85" />
            <circle cx="25" cy="20" r="2.2" className="fill-gold-500/85" />
            <circle cx="42" cy="20" r="2.2" className="fill-gold-500/85" />
            <path
              d="M0 20 Q12.5 32 25 20 T50 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M0 28 Q25 20 50 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${bot})`} />
      </svg>
      <svg
        className="absolute bottom-16 left-0 top-16 w-10 text-gold-600/65 sm:bottom-20 sm:top-20 md:bottom-24 md:top-24"
        preserveAspectRatio="none"
        viewBox="0 0 40 400"
      >
        <defs>
          <pattern
            id={left}
            x="0"
            y="0"
            width="40"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="10" r="2.2" className="fill-gold-500/85" />
            <circle cx="20" cy="25" r="2.2" className="fill-gold-500/85" />
            <circle cx="20" cy="40" r="2.2" className="fill-gold-500/85" />
            <path
              d="M20 0 Q8 12.5 20 25 T20 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${left})`} />
      </svg>
      <svg
        className="absolute bottom-16 right-0 top-16 w-10 text-gold-600/65 sm:bottom-20 sm:top-20 md:bottom-24 md:top-24"
        preserveAspectRatio="none"
        viewBox="0 0 40 400"
      >
        <defs>
          <pattern
            id={right}
            x="0"
            y="0"
            width="40"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="10" r="2.2" className="fill-gold-500/85" />
            <circle cx="20" cy="25" r="2.2" className="fill-gold-500/85" />
            <circle cx="20" cy="40" r="2.2" className="fill-gold-500/85" />
            <path
              d="M20 0 Q32 12.5 20 25 T20 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${right})`} />
      </svg>
    </>
  )
}

/** Full-area kolam dot-and-curve texture — absolute within a relative parent. */
export function KolamAmbient() {
  const uid = useId().replace(/:/g, '')
  const pid = `kolam-ambient-${uid}`

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute left-1/2 top-0 h-full min-h-[100dvh] w-full min-w-full -translate-x-1/2 opacity-[0.055] text-amber-800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={pid}
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="2" className="fill-gold-600/80" />
            <circle cx="60" cy="12" r="2" className="fill-gold-600/80" />
            <circle cx="108" cy="12" r="2" className="fill-gold-600/80" />
            <circle cx="12" cy="60" r="2" className="fill-gold-600/80" />
            <circle cx="60" cy="60" r="2.5" className="fill-gold-500/90" />
            <circle cx="108" cy="60" r="2" className="fill-gold-600/80" />
            <circle cx="12" cy="108" r="2" className="fill-gold-600/80" />
            <circle cx="60" cy="108" r="2" className="fill-gold-600/80" />
            <circle cx="108" cy="108" r="2" className="fill-gold-600/80" />
            <path
              d="M0 60 Q30 30 60 60 T120 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              opacity="0.65"
            />
            <path
              d="M60 0 Q90 30 60 60 T60 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.5"
            />
            <path
              d="M0 12 Q60 60 120 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100/75 via-transparent to-cream-200/65" />
    </div>
  )
}

/** Horizontal kolam rule between sections — blends with page scroll. */
export function KolamDivider({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const mid = `kolam-divider-${uid}`

  return (
    <div
      className={`relative z-[1] flex h-14 w-full items-center justify-center py-2 ${className}`}
      role="presentation"
      aria-hidden
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
      <svg
        className="mx-3 h-10 w-[min(100%,420px)] shrink text-gold-600/70 sm:mx-6"
        viewBox="0 0 420 40"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id={mid}
            x="0"
            y="0"
            width="42"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="8" cy="20" r="1.8" className="fill-gold-500/90" />
            <circle cx="21" cy="20" r="1.8" className="fill-gold-500/90" />
            <circle cx="34" cy="20" r="1.8" className="fill-gold-500/90" />
            <path
              d="M0 20 Q10.5 10 21 20 T42 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.75"
            />
          </pattern>
        </defs>
        <rect x="0" y="8" width="420" height="24" fill={`url(#${mid})`} />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
    </div>
  )
}

/** Small pulli-style corners for cards and panels. */
export function KolamCardCorners({ className = '' }: { className?: string }) {
  const stroke = 'currentColor'
  const corner =
    'absolute h-7 w-7 text-gold-600/55 sm:h-8 sm:w-8'

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-visible rounded-[inherit] ${className}`}
      aria-hidden
    >
      <svg className={`${corner} left-0 top-0`} viewBox="0 0 28 28" fill="none">
        <path d="M2 26V2h24" stroke={stroke} strokeWidth="1.2" />
        <circle cx="8" cy="8" r="1.5" className="fill-gold-500/85" />
        <path
          d="M4 22 Q 10 12 16 8"
          stroke={stroke}
          strokeWidth="0.85"
          fill="none"
          opacity="0.75"
        />
      </svg>
      <svg
        className={`${corner} right-0 top-0 scale-x-[-1]`}
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M2 26V2h24" stroke={stroke} strokeWidth="1.2" />
        <circle cx="8" cy="8" r="1.5" className="fill-gold-500/85" />
        <path
          d="M4 22 Q 10 12 16 8"
          stroke={stroke}
          strokeWidth="0.85"
          fill="none"
          opacity="0.75"
        />
      </svg>
      <svg
        className={`${corner} bottom-0 left-0 scale-y-[-1]`}
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M2 26V2h24" stroke={stroke} strokeWidth="1.2" />
        <circle cx="8" cy="8" r="1.5" className="fill-gold-500/85" />
        <path
          d="M4 22 Q 10 12 16 8"
          stroke={stroke}
          strokeWidth="0.85"
          fill="none"
          opacity="0.75"
        />
      </svg>
      <svg
        className={`${corner} bottom-0 right-0 scale-[-1]`}
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M2 26V2h24" stroke={stroke} strokeWidth="1.2" />
        <circle cx="8" cy="8" r="1.5" className="fill-gold-500/85" />
        <path
          d="M4 22 Q 10 12 16 8"
          stroke={stroke}
          strokeWidth="0.85"
          fill="none"
          opacity="0.75"
        />
      </svg>
    </div>
  )
}
