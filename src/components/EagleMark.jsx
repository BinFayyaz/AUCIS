import { useId } from 'react'
import './EagleMark.css'

const EAGLE_IMAGE = '/eagle-realistic.png'

/** Transparent cutout of the supplied eagle, with separately animated wings. */
export default function EagleMark({ className = '' }) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 1024 576"
      className={`eagle-realistic ${className}`}
      role="img"
      aria-label="Bald eagle with outstretched wings"
    >
      <defs>
        <clipPath id={`${id}-left`}>
          <path d="M0 0 H472 V328 H0 Z" />
        </clipPath>
        <clipPath id={`${id}-right`}>
          <path d="M538 0 H1024 V328 H538 Z" />
        </clipPath>
        <clipPath id={`${id}-body`}>
          <path d="M450 178 H571 V328 H1024 V576 H0 V328 H450 Z" />
        </clipPath>
      </defs>

      <g className="eagle-wing eagle-wing-left" clipPath={`url(#${id}-left)`}>
        <image href={EAGLE_IMAGE} width="1024" height="576" />
      </g>
      <g className="eagle-wing eagle-wing-right" clipPath={`url(#${id}-right)`}>
        <image href={EAGLE_IMAGE} width="1024" height="576" />
      </g>
      <image
        href={EAGLE_IMAGE}
        width="1024"
        height="576"
        clipPath={`url(#${id}-body)`}
      />
    </svg>
  )
}
