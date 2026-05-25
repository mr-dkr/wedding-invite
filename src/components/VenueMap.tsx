import { site } from '../config'

export function VenueMap({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gold-300/40 bg-stone-100 shadow-lg ${className}`}
    >
      <iframe
        title={`Map: ${site.venue.name}`}
        src={site.venue.mapsEmbedUrl}
        className="h-[min(55vh,420px)] w-full min-h-[280px] border-0 grayscale-[0.15]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
