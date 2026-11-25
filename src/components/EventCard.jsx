import Icon from './Icon.jsx'

const formatDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function EventCard({ event, past = false }) {
  return (
    <article className="surface surface-hover group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-cream/10 bg-gradient-to-br from-depth via-navy to-ink">
        {event.poster ? (
          <img
            src={event.poster}
            alt={`${event.title} poster`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Icon name="calendar" size={34} className="text-cream/20" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-cream/15 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cream/70 backdrop-blur">
          {formatDate(event.date)}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl leading-snug">{event.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-xs text-cream/45">
          <Icon name="pin" size={14} />
          {event.venue}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-cream/55">{event.description}</p>

        {!past && event.registerUrl && (
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-6 w-full text-[13px]"
          >
            Register
            <Icon name="arrowUpRight" size={15} />
          </a>
        )}
      </div>
    </article>
  )
}
