const SHOULDER_X = 240
const SHOULDER_Y = 214

// Primary flight feathers: swept up and outward from the shoulder, each one a
// separate blade so the silhouette reads as a raptor's wing, not a fan.
const FEATHERS = [
  { angle: -76, length: 118, width: 11 },
  { angle: -65, length: 150, width: 12 },
  { angle: -54, length: 176, width: 13 },
  { angle: -43, length: 194, width: 13 },
  { angle: -32, length: 202, width: 12 },
  { angle: -21, length: 194, width: 11 },
  { angle: -11, length: 168, width: 10 },
]

function bladePath({ length, width }) {
  const w = width
  return `M0 ${-w / 2} C ${length * 0.34} ${-w * 0.62} ${length * 0.78} ${-w * 0.32} ${length} 0 C ${
    length * 0.78
  } ${w * 0.3} ${length * 0.36} ${w * 0.56} 0 ${w / 2} Z`
}

/** One wing, drawn in a frame anchored at the shoulder. Mirrored for the other side. */
function Wing({ mirror }) {
  return (
    <g transform={`translate(${SHOULDER_X} ${SHOULDER_Y})${mirror ? ' scale(-1 1)' : ''}`}>
      <g>
        {/* wing beat: a slow, visible arc around the shoulder */}
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-8 0 0; 7 0 0; -8 0 0"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          dur="4.4s"
          repeatCount="indefinite"
        />
        <path
          d="M0 -12 C 46 -56 104 -84 150 -94 C 110 -46 60 -12 6 20 Z"
          fill="url(#eagleWing)"
          fillOpacity="0.45"
        />
        {FEATHERS.map((feather, i) => (
          <path
            key={feather.angle}
            d={bladePath(feather)}
            transform={`rotate(${feather.angle})`}
            fill="url(#eagleWing)"
            fillOpacity={0.96 - i * 0.055}
            stroke="#0D1B2A"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        ))}
      </g>
    </g>
  )
}

/**
 * AUCIS emblem — an eagle in flight: hooked beak, spread primaries, fanned tail.
 * The wings beat continuously (SMIL, so it keeps moving regardless of the
 * page's reduced-motion CSS) and the whole bird drifts on a slow thermal.
 */
export default function EagleMark({ className = '' }) {
  return (
    <svg viewBox="0 0 480 400" className={className} role="img" aria-label="AUCIS eagle emblem">
      <defs>
        <linearGradient id="eagleWing" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#5C738C" />
          <stop offset="45%" stopColor="#D4C4A8" />
          <stop offset="100%" stopColor="#F4F1DE" />
        </linearGradient>
        <linearGradient id="eagleBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F1DE" />
          <stop offset="55%" stopColor="#D4C4A8" />
          <stop offset="100%" stopColor="#8FA394" />
        </linearGradient>
        <filter id="eagleGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#eagleGlow)">
        <g>
          {/* slow rise and fall, like riding a thermal */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -12; 0 0"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            dur="4.4s"
            repeatCount="indefinite"
          />

          <Wing />
          <Wing mirror />

          {/* fanned tail */}
          <path
            d={`M${SHOULDER_X} 248 C ${SHOULDER_X - 20} 272 ${SHOULDER_X - 27} 294 ${
              SHOULDER_X - 30
            } 308 L ${SHOULDER_X} 292 L ${SHOULDER_X + 30} 308 C ${
              SHOULDER_X + 27
            } 294 ${SHOULDER_X + 20} 272 ${SHOULDER_X} 248 Z`}
            fill="url(#eagleBody)"
            fillOpacity="0.85"
          />

          {/* body */}
          <path
            d={`M${SHOULDER_X} 166 C ${SHOULDER_X + 16} 192 ${SHOULDER_X + 19} 232 ${
              SHOULDER_X
            } 270 C ${SHOULDER_X - 19} 232 ${SHOULDER_X - 16} 192 ${SHOULDER_X} 166 Z`}
            fill="url(#eagleBody)"
          />

          {/* head */}
          <circle cx={SHOULDER_X} cy="154" r="18" fill="url(#eagleBody)" />

          {/* hooked beak, facing left */}
          <path
            d={`M${SHOULDER_X - 13} 145 C ${SHOULDER_X - 26} 143 ${SHOULDER_X - 38} 149 ${
              SHOULDER_X - 46
            } 157 C ${SHOULDER_X - 40} 159 ${SHOULDER_X - 34} 162 ${SHOULDER_X - 30} 166 C ${
              SHOULDER_X - 34
            } 166 ${SHOULDER_X - 37} 168 ${SHOULDER_X - 39} 171 C ${SHOULDER_X - 30} 170 ${
              SHOULDER_X - 22
            } 165 ${SHOULDER_X - 16} 159 C ${SHOULDER_X - 12} 154 ${SHOULDER_X - 13} 149 ${
              SHOULDER_X - 13
            } 145 Z`}
            fill="#D4C4A8"
          />

          {/* eye + brow */}
          <circle cx={SHOULDER_X + 4} cy="149" r="2.6" fill="#0D1B2A" />
          <path
            d={`M${SHOULDER_X - 5} 143 C ${SHOULDER_X + 3} 139 ${SHOULDER_X + 11} 141 ${
              SHOULDER_X + 14
            } 146`}
            stroke="#0D1B2A"
            strokeOpacity="0.4"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}
