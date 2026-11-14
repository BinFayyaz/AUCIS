const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

export default function TeamCard({ person }) {
  return (
    <article className="surface surface-hover group relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sage/10 blur-2xl transition duration-700 group-hover:bg-sand/20" />
      <div className="relative flex items-start gap-4">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-cream/15"
          />
        ) : (
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sand/25 via-steel/30 to-sage/25 ring-1 ring-cream/15">
            <span className="font-display text-lg tracking-widest text-cream/85">
              {initials(person.name)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-xl leading-tight">{person.name}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-sand/75">{person.role}</p>
        </div>
      </div>
      {person.note && (
        <p className="relative mt-5 text-sm leading-relaxed text-cream/50">{person.note}</p>
      )}
    </article>
  )
}
