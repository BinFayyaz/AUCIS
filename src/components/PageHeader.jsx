import Aurora from './Aurora.jsx'
import PageRobot from './PageRobot.jsx'
import Reveal from './Reveal.jsx'

/**
 * Shared inner-page header. `robot="hover"` keeps the mascot floating beside
 * the copy; `robot="resting"` lays it on its right side on top of the accent
 * word; pass `robot={null}` for a header with no mascot.
 */
export default function PageHeader({ eyebrow, title, accent, intro, robot = 'hover' }) {
  const resting = robot === 'resting'
  const hovering = robot === 'hover'

  return (
    <section className="relative overflow-hidden border-b border-cream/5">
      <Aurora className="opacity-60" />
      <div className="container-page relative py-20 sm:py-24">
        <div className={hovering ? 'md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-10' : ''}>
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-sand/50" />
                {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-6xl">
                {title}{' '}
                {accent && (
                  <span
                    className={`relative inline-block ${
                      resting ? 'page-heading-accent--resting' : ''
                    }`}
                  >
                    <span className="text-gradient italic">{accent}</span>
                    {resting && (
                      <span className="page-robot-resting" aria-hidden="true">
                        <PageRobot pose="recumbent" />
                      </span>
                    )}
                  </span>
                )}
              </h1>
            </Reveal>
            {intro && (
              <Reveal delay={160}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/55">{intro}</p>
              </Reveal>
            )}
          </div>

          {hovering && (
            <div className="page-robot-slot" aria-hidden="true">
              <PageRobot />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
