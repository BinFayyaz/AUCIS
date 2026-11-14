import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { objectives, pillars } from '../data/site.js'

const blocks = [
  {
    label: 'Mission',
    icon: 'target',
    text: 'To turn curious students into capable builders — by giving them the tools, the practice and the community they need to create technology that matters.',
  },
  {
    label: 'Vision',
    icon: 'eye',
    text: 'An Air University Kamra where every student, whatever their discipline, has the confidence to design, build and ship software — and the ambition to compete at the national level.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the society"
        title="More than a club."
        accent="A workshop floor."
        intro="AUCIS exists to make technical skill a normal part of student life at Air University Kamra — not something a few people happen to have."
      />

      {/* Mission / Vision */}
      <section className="container-page grid gap-4 py-16 md:grid-cols-2">
        {blocks.map((block, i) => (
          <Reveal key={block.label} delay={i * 100}>
            <div className="surface surface-hover h-full p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/10 bg-white/[0.03] text-sand/80">
                <Icon name={block.icon} size={18} />
              </span>
              <h2 className="mt-6 text-2xl">{block.label}</h2>
              <p className="mt-3 text-base leading-relaxed text-cream/55">{block.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Objectives */}
      <section className="relative border-y border-cream/5 bg-navy/25 py-20">
        <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-sand/50" />
              Objectives
            </span>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
              What we set out to <span className="italic text-sand/90">do</span>.
            </h2>
          </Reveal>
          <ul className="space-y-1">
            {objectives.map((objective, i) => (
              <Reveal key={objective} delay={i * 70}>
                <li className="flex items-start gap-4 border-b border-cream/8 py-4">
                  <span className="mt-1 font-display text-sm text-sand/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-relaxed text-cream/65">{objective}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What AUCIS does */}
      <section className="container-page py-20">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-sand/50" />
            What we do
          </span>
          <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Four things happen every semester.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <article className="surface surface-hover group relative h-full overflow-hidden p-8">
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sage/10 blur-2xl transition duration-700 group-hover:bg-sand/20" />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/10 bg-white/[0.03] text-sand/80">
                    <Icon name={pillar.icon} size={18} />
                  </span>
                  <h3 className="text-2xl">{pillar.title}</h3>
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-cream/55">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why it exists */}
      <section className="container-page pb-24">
        <Reveal>
          <div className="surface relative overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-steel/25 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="eyebrow">
                  <span className="h-px w-8 bg-sand/50" />
                  Why it exists
                </span>
                <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
                  Degrees teach theory. Practice needs a room full of people.
                </h2>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-cream/55">
                <p>
                  Students arrive with ambition and leave with a transcript — often without a
                  single project they can point to. The gap is not talent. It is practice, feedback
                  and someone to build alongside.
                </p>
                <p>
                  AUCIS is that room. A place where a first-year and a final-year student work on
                  the same problem, where a failed build is a normal Tuesday, and where the work you
                  do outside class is taken as seriously as the work inside it.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
