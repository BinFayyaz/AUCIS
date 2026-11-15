import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import TeamCard from '../components/TeamCard.jsx'
import HierarchyChart from '../components/HierarchyChart.jsx'
import Icon from '../components/Icon.jsx'
import { coreRoles, executiveBody, supervisors } from '../data/site.js'

function Group({ label, description, people, delay = 0 }) {
  return (
    <section className="container-page py-10 first:pt-16">
      {description && <div className="sr-only">{description}</div>}
      <Reveal delay={delay}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl">{label}</h2>
          <span className="text-[11px] uppercase tracking-[0.24em] text-cream/35">
            {people.length} {people.length === 1 ? 'member' : 'members'}
          </span>
        </div>
        <div className="rule mt-5" />
      </Reveal>

      {people.length === 0 ? (
        <Reveal delay={delay + 80}>
          <div className="surface mt-6 flex items-center gap-4 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/10 bg-white/[0.03] text-sand/70">
              <Icon name="users" size={18} />
            </span>
            <p className="text-sm text-cream/50">Names will be announced here soon.</p>
          </div>
        </Reveal>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person, i) => (
            <Reveal key={person.name + person.role} delay={delay + 80 + i * 70}>
              <TeamCard person={person} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

export default function Team() {
  return (
    <>
      <PageHeader
        eyebrow="The people"
        title="A team of"
        accent="students."
        intro="The society is run by students, guided by faculty. Photos and short bios are on the way."
        robot="resting"
      />

      <div className="pb-14">
        <HierarchyChart />

        <Group
          label="Supervisors"
          description="Faculty supervisors guiding the society."
          people={supervisors}
        />
        <Group
          label="Executive Body"
          description="The students leading AUCIS."
          people={executiveBody}
          delay={60}
        />
        <Group label="Core Roles" description="The core team." people={coreRoles} delay={60} />

        <div className="container-page pt-8">
          <Reveal>
            <div className="surface flex flex-wrap items-center justify-between gap-4 p-6">
              <p className="text-sm text-cream/55">
                More members are joining the team — this page will grow with them.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-sand/70">
                <Icon name="plus" size={14} />
                Adding soon
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
