import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import EventCard from '../components/EventCard.jsx'
import Icon from '../components/Icon.jsx'
import { pastEvents, upcomingEvents } from '../data/site.js'

function EmptyState({ title, text }) {
  return (
    <Reveal>
      <div className="surface mt-6 grid gap-5 p-8 sm:grid-cols-[auto_1fr] sm:items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-cream/10 bg-white/[0.03]">
          <Icon name="calendar" size={22} className="text-sand/70" />
        </span>
        <div>
          <h3 className="text-xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/50">{text}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Events() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Things we"
        accent="build together."
        intro="Workshops, competitions, tech talks and showcases. Everything the society runs lives here."
      />

      <section className="container-page py-16">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl">Upcoming</h2>
            <span className="text-[11px] uppercase tracking-[0.24em] text-cream/35">
              {upcomingEvents.length} scheduled
            </span>
          </div>
          <div className="rule mt-5" />
        </Reveal>

        {upcomingEvents.length === 0 ? (
          <EmptyState
            title="Nothing scheduled yet"
            text="The first AUCIS event is still being planned. Announcements will be posted here as soon as dates are confirmed."
          />
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 70}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl">Past events</h2>
            <span className="text-[11px] uppercase tracking-[0.24em] text-cream/35">
              {pastEvents.length} archived
            </span>
          </div>
          <div className="rule mt-5" />
        </Reveal>

        {pastEvents.length === 0 ? (
          <EmptyState
            title="No past events yet"
            text="Once the society has held its first event, the record will appear here — posters, dates, venues and all."
          />
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event, i) => (
              <Reveal key={event.title} delay={i * 70}>
                <EventCard event={event} past />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
