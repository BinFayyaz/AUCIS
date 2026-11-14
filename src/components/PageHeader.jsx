import Aurora from './Aurora.jsx'
import Reveal from './Reveal.jsx'

export default function PageHeader({ eyebrow, title, accent, intro }) {
  return (
    <section className="relative overflow-hidden border-b border-cream/5">
      <Aurora className="opacity-60" />
      <div className="container-page relative py-20 sm:py-24">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-sand/50" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-6xl">
            {title} {accent && <span className="text-gradient italic">{accent}</span>}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/55">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
