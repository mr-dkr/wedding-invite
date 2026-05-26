import { site } from '../config'

export function VenueMap({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gold-300/40 bg-stone-100 shadow-lg ${className}`}
    >
      <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-2xl border border-gold-200/80 bg-cream-50/95 px-4 py-3 shadow-xl backdrop-blur-sm md:left-6 md:top-6 md:px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-700">
          Venue
        </p>
        <p className="mt-1 font-display text-xl text-stone-900">{site.venue.name}</p>
        <p className="mt-1 text-sm text-stone-600">
          {site.venue.addressLine}, {site.venue.city}
        </p>
      </div>
      <iframe
        title={`Map: ${site.venue.name}`}
        src={site.venue.mapsEmbedUrl}
        className="h-[min(55vh,420px)] min-h-[280px] w-full border-0 grayscale-[0.12] sepia-[0.08]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
