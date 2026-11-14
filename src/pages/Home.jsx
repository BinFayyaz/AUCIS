import { Link } from 'react-router-dom'
import Aurora from '../components/Aurora.jsx'
import FlyingEagle from '../components/FlyingEagle.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { pillars, site, upcomingEvents } from '../data/site.js'

const quickLinks = [
  {
    to: '/about',
    title: 'About AUCIS',
    text: 'Our mission, vision and the work we do across campus.',
    icon: 'compass',
  },
  {
    to: '/team',
    title: 'Meet the Team',
    text: 'The students and supervisors behind the society.',
    icon: 'users',
  },
  {
    to: '/events',
    title: 'Events',
    text: 'Workshops, competitions and showcases — upcoming and past.',
    icon: 'calendar',
  },
  {
    to: '/join',
    title: 'Join Us',
    text: 'Who can join, member benefits and the application form.',
    icon: 'plus',
  },
  {
    to: '/contact',
    title: 'Contact',
    text: 'Reach the executive body or find us on campus.',
    icon: 'mail',
  },
]

export default function Home() {
  const nextEvent = upcomingEvents[0]

  return (
    <div className="home-page relative">
      <FlyingEagle />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Aurora />
        <div className="container-page relative pb-24 pt-40 sm:pt-44 md:pt-16 lg:pb-28 lg:pt-20">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-sand/50" />
                {site.campus}
              </span>
            </Reveal>

            <Reveal delay={90}>
              <div className="mt-6 flex items-center gap-3 sm:gap-5">
                <h1 className="text-[clamp(3.1rem,10vw,6.5rem)] leading-[0.92] tracking-[0.01em]">
                  <span className="text-gradient">AUCIS</span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 font-display text-2xl italic text-cream/70 sm:text-3xl">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={230}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-cream/55">{site.intro}</p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/join" className="btn-primary">
                  Join AUCIS
                  <Icon name="arrowRight" size={16} />
                </Link>
                <Link to="/events" className="btn-ghost">
                  Explore events
                </Link>
              </div>
            </Reveal>

            <Reveal delay={370}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-cream/35">
                {pillars.map((pillar) => (
                  <span key={pillar.title} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-sand/70" />
                    {pillar.title}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative border-y border-cream/5 bg-navy/25">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-sand/50" />
              Who we are
            </span>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
              A society for people who <span className="italic text-sand/90">build</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-cream/55">
              AUCIS brings together students from every department at Air University Kamra who want
              to do more than attend lectures. We run workshops that end in working projects,
              competitions that test what you know, and talks that show where the field is going.
              Whether you are writing your first line of code or shipping your tenth project, there
              is a place for you here.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/55">
              Everything we do is member-led — built by students, for students, and reviewed by our
              faculty supervisors.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Upcoming event highlight */}
      <section className="container-page py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">
                <span className="h-px w-8 bg-sand/50" />
                Upcoming
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl">Next on the calendar</h2>
            </div>
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 text-[13px] text-cream/60 transition hover:text-cream"
            >
              All events
              <Icon name="arrowRight" size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {nextEvent ? (
            <div className="surface mt-8 grid gap-8 p-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="aspect-[16/10] overflow-hidden rounded-xl border border-cream/10 bg-gradient-to-br from-depth via-navy to-ink">
                {nextEvent.poster ? (
                  <img
                    src={nextEvent.poster}
                    alt={`${nextEvent.title} poster`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center">
                    <Icon name="calendar" size={34} className="text-cream/20" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-sand/75">
                  {new Date(nextEvent.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <h3 className="mt-3 text-2xl leading-snug sm:text-3xl">{nextEvent.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs text-cream/45">
                  <Icon name="pin" size={14} />
                  {nextEvent.venue}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream/55">{nextEvent.description}</p>
                {nextEvent.registerUrl && (
                  <a
                    href={nextEvent.registerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary mt-6 text-[13px]"
                  >
                    Register
                    <Icon name="arrowUpRight" size={15} />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="surface mt-8 overflow-hidden">
              <div className="relative grid gap-6 p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-cream/10 bg-white/[0.03]">
                  <Icon name="calendar" size={24} className="text-sand/70" />
                </div>
                <div>
                  <h3 className="text-2xl">No event on the calendar yet</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/50">
                    Our first event is being planned. Announcements will appear here — follow the
                    society or check back soon.
                  </p>
                </div>
              </div>
              <div className="rule" />
              <div className="grid gap-px bg-cream/5 sm:grid-cols-3">
                {pillars.slice(0, 3).map((pillar) => (
                  <div key={pillar.title} className="bg-ink/60 px-8 py-6">
                    <p className="flex items-center gap-2 text-sm text-cream/80">
                      <Icon name={pillar.icon} size={16} className="text-sand/80" />
                      {pillar.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </section>

      {/* Quick links */}
      <section className="container-page pb-24">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Find your way around</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, i) => (
            <Reveal key={link.to} delay={i * 70}>
              <Link
                to={link.to}
                className="surface surface-hover group flex h-full flex-col justify-between p-6"
              >
                <div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/10 bg-white/[0.03] text-sand/80 transition group-hover:border-sand/40">
                    <Icon name={link.icon} size={17} />
                  </span>
                  <h3 className="mt-5 text-xl">{link.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/50">{link.text}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-cream/40 transition group-hover:text-cream/80">
                  Open
                  <Icon name="arrowRight" size={14} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
