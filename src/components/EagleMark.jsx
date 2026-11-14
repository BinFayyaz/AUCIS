const CENTER_X = 240
const SHOULDER_Y = 206

// One wing: long, thin feathers swept up and outward from the shoulder,
// so the silhouette reads as a wing rather than a radial fan.
const WING = [
  { angle: -66, len: 138, width: 13 },
  { angle: -55, len: 162, width: 14 },
  { angle: -44, len: 182, width: 15 },
  { angle: -33, len: 196, width: 15 },
  { angle: -22, len: 200, width: 14 },
  { angle: -11, len: 194, width: 13 },
]

function bladePath(len, width) {
  return `M0 ${-width} C ${len * 0.38} ${-width * 0.9} ${len * 0.78} ${-width * 0.42} ${len} 0 C ${len * 0.78} ${width * 0.34} ${len * 0.38} ${width * 0.72} 0 ${width} Z`
}

/**
 * AUCIS emblem — an eagle seen from below, wings spread.
 * Slow wing beat, shimmering gradient, orbiting rings.
 */
export default function EagleMark({ className = '' }) {
  return (
    <svg viewBox="0 0 480 380" className={className} role="img" aria-label="AUCIS eagle emblem">
      <defs>
        <linearGradient id="aucisWing" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#415A77" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#D4C4A8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F4F1DE" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="aucisBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F1DE" />
          <stop offset="60%" stopColor="#D4C4A8" />
          <stop offset="100%" stopColor="#778D7A" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="aucisCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4C4A8" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#415A77" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0D1B2A" stopOpacity="0" />
        </radialGradient>
        <filter id="aucisGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* halo + rings */}
      <circle cx={CENTER_X} cy="180" r="160" fill="url(#aucisCore)" className="animate-pulse-glow" />
      <g opacity="0.45">
        <circle
          cx={CENTER_X}
          cy="180"
          r="140"
          fill="none"
          stroke="#D4C4A8"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="2 14"
          className="animate-spin-slow"
          style={{ transformOrigin: `${CENTER_X}px 180px`, transformBox: 'fill-box' }}
        />
        <circle
          cx={CENTER_X}
          cy="180"
          r="174"
          fill="none"
          stroke="#778D7A"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="1 24"
          className="animate-spin-slower"
          style={{ transformOrigin: `${CENTER_X}px 180px`, transformBox: 'fill-box' }}
        />
      </g>

      <g filter="url(#aucisGlow)">
        <g
          className="animate-wing-beat"
          style={{ transformOrigin: `${CENTER_X}px ${SHOULDER_Y}px`, transformBox: 'fill-box' }}
        >
          {[1, -1].map((side) => (
            <g
              key={side}
              transform={`translate(${CENTER_X + side * 7} ${SHOULDER_Y}) scale(${side} 1)`}
            >
              {/* leading edge of the wing */}
              <path
                d="M0 -6 C 60 -34 128 -74 186 -122 C 150 -60 96 -14 8 20 Z"
                fill="url(#aucisWing)"
                fillOpacity="0.55"
              />
              {WING.map((feather, i) => (
                <path
                  key={i}
                  d={bladePath(feather.len, feather.width)}
                  transform={`rotate(${feather.angle})`}
                  fill="url(#aucisWing)"
                  fillOpacity={0.92 - i * 0.07}
                  stroke="#F4F1DE"
                  strokeOpacity="0.2"
                  strokeWidth="0.8"
                />
              ))}
            </g>
          ))}
        </g>

        {/* body, head, beak */}
        <path
          d={`M${CENTER_X} 186 C ${CENTER_X + 12} 208 ${CENTER_X + 11} 252 ${CENTER_X} 292 C ${CENTER_X - 11} 252 ${CENTER_X - 12} 208 ${CENTER_X} 186 Z`}
          fill="url(#aucisBody)"
        />
        <path
          d={`M${CENTER_X - 15} 176 C ${CENTER_X - 15} 156 ${CENTER_X + 15} 156 ${CENTER_X + 15} 176 Z`}
          fill="#F4F1DE"
        />
        <path
          d={`M${CENTER_X - 13} 173 L ${CENTER_X} 199 L ${CENTER_X + 13} 173 Z`}
          fill="#D4C4A8"
        />
      </g>
    </svg>
  )
}
