import { useId } from 'react'
import './EagleMark.css'

/** A single feather blade pointing along +x from the origin. */
const FEATHER = 'M0 -14 C 48 -22 108 -17 162 0 C 108 17 48 22 0 14 Z'

// Fan of wing feathers. Angles are degrees from +x; 180 points straight left,
// so smaller angles lift the feather up the wing. Later entries sit on top.
const WING_FEATHERS = [
  { angle: 139, scale: 1.42, tone: 'teal' },
  { angle: 150, scale: 1.5, tone: 'teal' },
  { angle: 161, scale: 1.5, tone: 'violet' },
  { angle: 172, scale: 1.44, tone: 'violet' },
  { angle: 183, scale: 1.32, tone: 'amber' },
  { angle: 194, scale: 1.16, tone: 'amber' },
  { angle: 205, scale: 0.98, tone: 'gold' },
]

const TAIL_FEATHERS = [
  { angle: 60, scale: 0.42, tone: 'teal' },
  { angle: 75, scale: 0.5, tone: 'violet' },
  { angle: 90, scale: 0.54, tone: 'violet' },
  { angle: 105, scale: 0.5, tone: 'violet' },
  { angle: 120, scale: 0.42, tone: 'teal' },
]

const CREST_FEATHERS = [
  { angle: -108, scale: 0.17, tone: 'gold' },
  { angle: -90, scale: 0.22, tone: 'amber' },
  { angle: -72, scale: 0.17, tone: 'gold' },
]

/**
 * Hand-drawn, full-colour AUCIS eagle: gold head, violet chest, teal-and-amber
 * wings. Purely vector, so its wings can beat independently.
 */
export default function EagleMark({ className = '' }) {
  const uid = useId().replace(/:/g, '')
  const fill = (tone) => `url(#${uid}-${tone})`

  const feather = (f, key) => (
    <path
      key={key}
      d={FEATHER}
      fill={fill(f.tone)}
      transform={`rotate(${f.angle}) scale(${f.scale})`}
      stroke="#0b1020"
      strokeOpacity="0.3"
      strokeWidth="1.4"
      vectorEffect="non-scaling-stroke"
    />
  )

  return (
    <svg
      viewBox="0 0 600 440"
      className={`eagle-mark ${className}`}
      role="img"
      aria-label="The AUCIS eagle with outstretched wings"
    >
      <defs>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="52%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id={`${uid}-amber`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id={`${uid}-violet`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id={`${uid}-teal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cffafe" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id={`${uid}-body`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#8b8ff5" />
          <stop offset="45%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id={`${uid}-head`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id={`${uid}-halo`}>
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        className="eagle-halo"
        cx="300"
        cy="210"
        rx="252"
        ry="136"
        fill={`url(#${uid}-halo)`}
      />

      {/* wings — mirrored fans, each on its own pivot so they can beat */}
      <g className="eagle-wing eagle-wing-left">
        <g transform="translate(300 208)">
          {WING_FEATHERS.map((f, i) => feather(f, `l${i}`))}
          <circle cx="4" cy="0" r="30" fill={fill('gold')} opacity="0.55" />
        </g>
      </g>
      <g className="eagle-wing eagle-wing-right">
        <g transform="translate(300 208) scale(-1 1)">
          {WING_FEATHERS.map((f, i) => feather(f, `r${i}`))}
          <circle cx="4" cy="0" r="30" fill={fill('gold')} opacity="0.55" />
        </g>
      </g>

      <g className="eagle-body">
        {/* tail */}
        <g transform="translate(300 296)">
          {TAIL_FEATHERS.map((f, i) => feather(f, `t${i}`))}
        </g>

        {/* crest */}
        <g transform="translate(300 126)">
          {CREST_FEATHERS.map((f, i) => feather(f, `c${i}`))}
        </g>

        {/* torso */}
        <path
          d="M300 150 C 338 156 354 200 350 252 C 346 302 326 344 300 374 C 274 344 254 302 250 252 C 246 200 262 156 300 150 Z"
          fill={fill('body')}
          stroke="#0b1020"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <path
          d="M262 248 Q 300 272 338 248"
          fill="none"
          stroke="#c7d2fe"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M270 288 Q 300 306 330 288"
          fill="none"
          stroke="#c7d2fe"
          strokeOpacity="0.3"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M280 322 Q 300 334 320 322"
          fill="none"
          stroke="#c7d2fe"
          strokeOpacity="0.22"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* head */}
        <circle cx="300" cy="150" r="30" fill={fill('head')} stroke="#0b1020" strokeOpacity="0.3" strokeWidth="2" />
        <path
          d="M272 138 Q 285 126 299 140"
          fill="none"
          stroke="#7c2d12"
          strokeOpacity="0.75"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M328 138 Q 315 126 301 140"
          fill="none"
          stroke="#7c2d12"
          strokeOpacity="0.75"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="287" cy="149" rx="5" ry="6" fill="#0b1020" />
        <ellipse cx="313" cy="149" rx="5" ry="6" fill="#0b1020" />
        <circle cx="288.6" cy="147" r="1.7" fill="#ffffff" />
        <circle cx="314.6" cy="147" r="1.7" fill="#ffffff" />

        {/* beak */}
        <path d="M286 162 H 314 L 300 194 Z" fill={fill('amber')} stroke="#7c2d12" strokeOpacity="0.45" strokeWidth="1.6" />
        <path d="M293 172 H 307" stroke="#7c2d12" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
