import { useId } from 'react'
import './EagleMark.css'

/** One feather blade pointing along +x from the origin, with a pointed tip. */
const FEATHER = 'M0 -13 C 46 -25 106 -21 155 -6 L 162 0 L 155 6 C 106 21 46 25 0 13 Z'

// Fan of wing feathers. Angles are degrees from +x; 180 points straight left,
// so smaller angles lift the feather up the wing. Later entries sit on top.
// A bald eagle's wing: brown coverts at the shoulder, near-black primaries.
const WING_FEATHERS = [
  { angle: 139, scale: 1.46, tone: 'primary' },
  { angle: 150, scale: 1.52, tone: 'primary' },
  { angle: 161, scale: 1.52, tone: 'brown' },
  { angle: 172, scale: 1.44, tone: 'brown' },
  { angle: 183, scale: 1.32, tone: 'brown' },
  { angle: 194, scale: 1.16, tone: 'brownDark' },
  { angle: 205, scale: 0.98, tone: 'brownDark' },
]

// The white tail fan.
const TAIL_FEATHERS = [
  { angle: 62, scale: 0.42, tone: 'white' },
  { angle: 76, scale: 0.5, tone: 'white' },
  { angle: 90, scale: 0.54, tone: 'whiteSoft' },
  { angle: 104, scale: 0.5, tone: 'white' },
  { angle: 118, scale: 0.42, tone: 'white' },
]

/**
 * Hand-drawn adult bald eagle: dark chocolate-brown body and wings, stark white
 * head and tail, bright yellow hooked beak, irises and talons.
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
      stroke="#150c06"
      strokeOpacity="0.45"
      strokeWidth="1.3"
      vectorEffect="non-scaling-stroke"
    />
  )

  return (
    <svg
      viewBox="0 0 600 440"
      className={`eagle-mark ${className}`}
      role="img"
      aria-label="Adult bald eagle with outstretched wings"
    >
      <defs>
        <linearGradient id={`${uid}-brown`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a9713f" />
          <stop offset="55%" stopColor="#6b4426" />
          <stop offset="100%" stopColor="#3d2716" />
        </linearGradient>
        <linearGradient id={`${uid}-brownDark`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7d5130" />
          <stop offset="50%" stopColor="#4a2c18" />
          <stop offset="100%" stopColor="#2a1a10" />
        </linearGradient>
        <linearGradient id={`${uid}-primary`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5c3a22" />
          <stop offset="45%" stopColor="#33200f" />
          <stop offset="100%" stopColor="#150c06" />
        </linearGradient>
        <linearGradient id={`${uid}-body`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#8a5a34" />
          <stop offset="45%" stopColor="#54341d" />
          <stop offset="100%" stopColor="#241408" />
        </linearGradient>
        <linearGradient id={`${uid}-white`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f2f4f7" />
          <stop offset="100%" stopColor="#c3cbd4" />
        </linearGradient>
        <linearGradient id={`${uid}-whiteSoft`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#f7f9fb" />
          <stop offset="100%" stopColor="#b6c0cb" />
        </linearGradient>
        <linearGradient id={`${uid}-yellow`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#ffe680" />
          <stop offset="55%" stopColor="#f5c518" />
          <stop offset="100%" stopColor="#c08a06" />
        </linearGradient>
        <radialGradient id={`${uid}-halo`}>
          <stop offset="0%" stopColor="#f3ede2" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#d9c9a8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#d9c9a8" stopOpacity="0" />
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
          <circle cx="6" cy="0" r="30" fill={fill('brownDark')} opacity="0.9" />
        </g>
      </g>
      <g className="eagle-wing eagle-wing-right">
        <g transform="translate(300 208) scale(-1 1)">
          {WING_FEATHERS.map((f, i) => feather(f, `r${i}`))}
          <circle cx="6" cy="0" r="30" fill={fill('brownDark')} opacity="0.9" />
        </g>
      </g>

      <g className="eagle-body">
        {/* white tail */}
        <g transform="translate(300 296)">
          {TAIL_FEATHERS.map((f, i) => feather(f, `t${i}`))}
        </g>

        {/* yellow legs and talons */}
        <g stroke="#f5c518" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M300 342 L282 370 M282 370 L276 380 M282 370 L287 381 M282 370 L293 376" />
          <path d="M300 342 L318 370 M318 370 L324 380 M318 370 L313 381 M318 370 L307 376" />
        </g>
        <g stroke="#a97e06" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7">
          <path d="M286 374 L282 382 M288 374 L291 383" />
          <path d="M314 374 L318 382 M312 374 L309 383" />
        </g>

        {/* chocolate-brown torso */}
        <path
          d="M300 150 C 338 156 354 200 350 252 C 346 302 326 344 300 360 C 274 344 254 302 250 252 C 246 200 262 156 300 150 Z"
          fill={fill('body')}
          stroke="#150c06"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d="M262 246 Q 300 268 338 246"
          fill="none"
          stroke="#a9713f"
          strokeOpacity="0.45"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M270 284 Q 300 302 330 284"
          fill="none"
          stroke="#a9713f"
          strokeOpacity="0.3"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* white head */}
        <circle cx="300" cy="148" r="31" fill={fill('white')} stroke="#9aa4b0" strokeOpacity="0.5" strokeWidth="1.6" />
        {/* feathery texture on the crown */}
        <path d="M282 128 Q 300 118 318 128" fill="none" stroke="#c3cbd4" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
        {/* brow ridges */}
        <path d="M274 138 Q 286 128 298 140" fill="none" stroke="#7a6a55" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M326 138 Q 314 128 302 140" fill="none" stroke="#7a6a55" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />

        {/* bright yellow irises with black pupils */}
        <circle cx="288" cy="150" r="7" fill={fill('yellow')} />
        <circle cx="312" cy="150" r="7" fill={fill('yellow')} />
        <circle cx="288" cy="150" r="3.2" fill="#0b0a08" />
        <circle cx="312" cy="150" r="3.2" fill="#0b0a08" />
        <circle cx="289.8" cy="147.8" r="1.2" fill="#ffffff" />
        <circle cx="313.8" cy="147.8" r="1.2" fill="#ffffff" />

        {/* hooked yellow beak */}
        <path
          d="M286 158 C 286 176 292 191 300 198 C 308 191 314 176 314 158 Z"
          fill={fill('yellow')}
          stroke="#8a5f05"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
        <path
          d="M300 198 C 304 200 305 205 300 207"
          fill="none"
          stroke="#8a5f05"
          strokeOpacity="0.75"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M292 170 H 308" stroke="#8a5f05" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}
