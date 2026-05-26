import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { site } from '../config'
import { Countdown } from './Countdown'
import { HeroSection } from './HeroSection'
import {
  KolamAmbient,
  KolamCardCorners,
  KolamDivider,
} from './KolamBorder'
import { ScrollReveal } from './ScrollReveal'
import { ScrollCharacterStory } from './ScrollCharacterStory'
import { SectionReveal } from './SectionReveal'
import { VenueMap } from './VenueMap'

const calendarLocation = `${site.venue.name}, ${site.venue.addressLine}, ${site.venue.city}, ${site.venue.region}`

function googleCalendarLink(event: (typeof site.calendarEvents)[number]) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.startUtc}/${event.endUtc}`,
    details: event.description,
    location: calendarLocation,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function appleCalendarLink(event: (typeof site.calendarEvents)[number]) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nivedha Divakar Wedding//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@nivedha-divakar-wedding`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${calendarLocation}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}

function addCalendarLink(event: (typeof site.calendarEvents)[number]) {
  const isAppleDevice =
    /iPad|iPhone|iPod|Macintosh/.test(window.navigator.userAgent) ||
    window.navigator.platform.toLowerCase().includes('mac')

  if (isAppleDevice) {
    const link = document.createElement('a')
    link.href = appleCalendarLink(event)
    link.download = event.filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    return
  }

  window.open(googleCalendarLink(event), '_blank', 'noopener,noreferrer')
}

function addWeddingCalendar() {
  const [firstEvent] = site.calendarEvents

  if (firstEvent) {
    addCalendarLink(firstEvent)
  }
}

export function Invitation() {
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpPhone, setRsvpPhone] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<
    'idle' | 'submitting' | 'sent' | 'error'
  >('idle')

  const handleRsvpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!site.rsvp.sheetSubmitUrl) {
      setRsvpStatus('error')
      return
    }

    setRsvpStatus('submitting')

    try {
      const formData = new FormData()
      formData.append('name', rsvpName.trim())
      formData.append('phone', rsvpPhone.trim())

      await fetch(site.rsvp.sheetSubmitUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })

      setRsvpName('')
      setRsvpPhone('')
      setRsvpStatus('sent')
    } catch {
      setRsvpStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen text-stone-800">
      {/* Full-page invitation texture (kolam / pattern PNG) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.16] mix-blend-multiply md:opacity-[0.13]"
        style={{
          backgroundImage: `url(${site.invitation.backgroundImage})`,
        }}
      />
      <KolamAmbient />
      <ScrollCharacterStory />

      <div className="relative z-[1]">
        <HeroSection />

        <KolamDivider />

        <SectionReveal className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
          <ScrollReveal direction="up">
            <p className="font-display text-2xl leading-relaxed text-stone-800 md:text-3xl">
              {site.translations.welcome}
            </p>
          </ScrollReveal>
        </SectionReveal>

        <KolamDivider />

        <SectionReveal>
          <Countdown />
        </SectionReveal>

        <KolamDivider />

        <SectionReveal className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12">
            <ScrollReveal
              direction="right"
              className="relative overflow-hidden rounded-3xl border border-gold-300/45 shadow-xl"
            >
              <KolamCardCorners className="z-10 opacity-90" />
              <motion.img
                src={site.venue.image}
                alt={site.venue.name}
                className="relative z-0 aspect-[4/3] w-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.45 }}
              />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.08}>
              <div>
                <h2 className="font-display text-3xl text-stone-900 md:text-4xl">
                  {site.venue.name}
                </h2>
                <p className="mt-4 leading-relaxed text-stone-600">
                  {site.venue.description}
                </p>
                <address className="mt-6 not-italic text-stone-700">
                  <p className="font-medium">{site.venue.addressLine}</p>
                  <p>
                    {site.venue.city}
                    {', '}
                    {site.venue.region}
                  </p>
                </address>
                <motion.a
                  href={site.venue.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-gold-400 bg-gold-50 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-gold-800 transition hover:bg-gold-100 hover:shadow-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {site.translations.getDirections}
                </motion.a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" className="mt-12 md:mt-14" delay={0.1}>
            <h3 className="mb-4 text-center font-display text-2xl text-stone-900 md:text-3xl">
              {site.translations.mapHeading}
            </h3>
            <VenueMap />
          </ScrollReveal>
        </SectionReveal>

        <KolamDivider />

        <SectionReveal className="relative overflow-hidden bg-cream-100/75 py-16 md:py-24">
          <ScrollReveal direction="up" className="mx-auto max-w-6xl px-6">
            <h2 className="text-center font-display text-3xl text-stone-900 md:text-4xl">
              Moments we cherish
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-stone-600">
              A glimpse of the celebration ahead
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-6 md:grid-cols-3 md:gap-10">
            {site.featuredSections.map((s, i) => (
              <ScrollReveal
                key={s.id}
                direction={i % 3 === 1 ? 'scale' : i % 3 === 0 ? 'up' : 'left'}
                delay={0.07 * i}
              >
                <motion.article
                  className="group relative overflow-hidden rounded-2xl border border-gold-300/30 bg-white/95 shadow-md"
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <KolamCardCorners />
                  <div className="relative z-[1] aspect-video overflow-hidden">
                    <motion.img
                      src={s.image}
                      alt=""
                      className={`h-full w-full object-cover ${s.imagePositionClass}`}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="relative z-[1] p-6">
                    <h3 className="font-display text-2xl text-stone-900">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      {s.description}
                    </p>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </SectionReveal>

        <KolamDivider />

        <SectionReveal className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <ScrollReveal direction="down">
            <h2 className="text-center font-display text-3xl text-stone-900 md:text-4xl">
              Order of the events
            </h2>
          </ScrollReveal>
          <ul className="mt-12 space-y-8 md:space-y-10">
            {site.eventSchedule.map((ev, i) => (
              <ScrollReveal
                key={ev.id}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={0.05 * i}
              >
                <motion.li className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gold-300/40 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:gap-8 md:p-8">
                  <KolamCardCorners className="opacity-80" />
                  <div className="relative z-[1] flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-8">
                    <motion.img
                      src={ev.image}
                      alt=""
                      className="h-20 w-24 rounded-xl object-cover object-center shadow-sm md:h-16 md:w-16"
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="min-w-0 shrink-0 font-display text-lg text-gold-700 md:min-w-[10rem] md:text-xl">
                      {ev.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-stone-900 md:text-2xl">
                        {ev.title}
                      </h3>
                      <p className="mt-1 text-stone-600">{ev.description}</p>
                    </div>
                  </div>
                </motion.li>
              </ScrollReveal>
            ))}
          </ul>
        </SectionReveal>

        <KolamDivider className="!h-10 !py-1" />

        <SectionReveal className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
          <ScrollReveal direction="up">
            <div className="relative overflow-hidden rounded-3xl border border-gold-300/45 bg-white/90 px-6 py-10 shadow-lg backdrop-blur-sm md:px-10">
              <KolamCardCorners className="opacity-70" />
              <div className="relative z-[1]">
                <p className="font-cormorant text-sm font-semibold uppercase tracking-[0.35em] text-gold-700">
                  {site.rsvp.heading}
                </p>
                <h2 className="mt-3 font-display text-3xl text-stone-900 md:text-4xl">
                  Join us in celebration
                </h2>
                <p className="mx-auto mt-4 max-w-xl leading-relaxed text-stone-600">
                  {site.rsvp.message}
                </p>
                <form
                  className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left"
                  onSubmit={handleRsvpSubmit}
                >
                  <label className="text-sm font-medium text-stone-700">
                    Name
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(event) => setRsvpName(event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-gold-300/60 bg-white px-4 py-3 text-stone-800 shadow-sm outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-200/50"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="text-sm font-medium text-stone-700">
                    Phone number
                    <input
                      type="tel"
                      value={rsvpPhone}
                      onChange={(event) => setRsvpPhone(event.target.value)}
                      required
                      className="mt-2 w-full rounded-2xl border border-gold-300/60 bg-white px-4 py-3 text-stone-800 shadow-sm outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-200/50"
                      placeholder="Your phone number"
                    />
                  </label>
                  <motion.button
                    type="submit"
                    disabled={rsvpStatus === 'submitting'}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-full border-2 border-gold-400 bg-gold-50 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-gold-800 transition hover:bg-gold-100 hover:shadow-lg"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {rsvpStatus === 'submitting' ? 'Sending...' : 'Send RSVP'}
                  </motion.button>
                </form>
                {rsvpStatus === 'sent' && (
                  <p className="mt-4 text-sm font-medium text-emerald-700">
                    RSVP sent. Thank you!
                  </p>
                )}
                {rsvpStatus === 'error' && (
                  <p className="mt-4 text-sm font-medium text-red-700">
                    RSVP sheet is not connected yet. Please use WhatsApp for now.
                  </p>
                )}
                <motion.a
                  href={site.rsvp.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto mt-4 inline-flex w-full max-w-xl items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-50 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-emerald-800 transition hover:bg-emerald-100 hover:shadow-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  WhatsApp me
                </motion.a>
                <motion.button
                  type="button"
                  onClick={addWeddingCalendar}
                  className="mx-auto mt-4 inline-flex w-full max-w-xl items-center justify-center rounded-full border-2 border-gold-400 bg-gold-50 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-gold-800 transition hover:bg-gold-100 hover:shadow-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to your calendar
                </motion.button>
                <p className="mt-6 text-sm text-stone-500">
                  RSVP details will be saved to our wedding sheet · WhatsApp{' '}
                  {site.rsvp.phoneDisplay}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </SectionReveal>

        <KolamDivider className="!h-10 !py-1" />

        <SectionReveal>
          <footer className="relative overflow-hidden border-t border-gold-300/35 bg-cream-50/95 py-12 text-center">
            <KolamCardCorners className="opacity-50" />
            <div className="relative z-[1]">
              <p className="font-cormorant text-lg text-stone-700">
                {site.translations.withLove}
              </p>
              <p
                className="mt-4 text-sm text-stone-500"
                dangerouslySetInnerHTML={{
                  __html: site.translations.copyright,
                }}
              />
            </div>
          </footer>
        </SectionReveal>
      </div>
    </div>
  )
}
