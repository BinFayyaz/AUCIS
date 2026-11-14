import { useId } from 'react'
import './RobotMark.css'

/**
 * AUCIS mascot: a hovering humanoid mech.
 * Dark navy armour with steel edges, sand trim and a teal visor / reactor glow.
 * Vector only, with the arms and thrusters split out so they move independently.
 */
export default function RobotMark({ className = '' }) {
  const uid = useId().replace(/:/g, '')
  const url = (name) => `url(#${uid}-${name})`
  const shadow = url('shadow')

  return (
    <svg
      viewBox="0 0 1000 750"
      className={`robot-mark ${className}`}
      role="img"
      aria-label="Hovering futuristic robot with a glowing visor and reactor core"
    >
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7d94ac" />
          <stop offset="42%" stopColor="#415a77" />
          <stop offset="100%" stopColor="#16212f" />
        </linearGradient>
        <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f657e" />
          <stop offset="50%" stopColor="#2a3a50" />
          <stop offset="100%" stopColor="#101a27" />
        </linearGradient>
        <linearGradient id={`${uid}-helm`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#94aabd" />
          <stop offset="38%" stopColor="#4b6480" />
          <stop offset="100%" stopColor="#172433" />
        </linearGradient>
        <linearGradient id={`${uid}-sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2e6cc" />
          <stop offset="55%" stopColor="#d4c4a8" />
          <stop offset="100%" stopColor="#9c8564" />
        </linearGradient>
        <linearGradient id={`${uid}-teal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcfff7" />
          <stop offset="50%" stopColor="#6ff0d6" />
          <stop offset="100%" stopColor="#1aa892" />
        </linearGradient>
        <radialGradient id={`${uid}-core`}>
          <stop offset="0%" stopColor="#f6fffc" />
          <stop offset="42%" stopColor="#8ff5dd" />
          <stop offset="100%" stopColor="#0f8f7c" stopOpacity="0.18" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor="#7ff0d6" stopOpacity="0.3" />
          <stop offset="55%" stopColor="#38c8b0" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#38c8b0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-jet`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="38%" stopColor="#7ff0d6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2fd8b8" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
          <feOffset dy="10" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.32" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-neon`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`${uid}-visor-clip`}>
          <path d="M452 162 L500 149 L548 162 L538 192 L500 203 L462 192 Z" />
        </clipPath>
      </defs>

      <ellipse className="robot-glow" cx="500" cy="370" rx="330" ry="275" fill={url('glow')} />
      <ellipse cx="500" cy="666" rx="150" ry="50" fill={url('glow')} opacity="0.6" />

      <g className="robot-body">
        {/* thrusters */}
        <g className="robot-jets">
          <g className="robot-jet robot-jet-left">
            <path
              d="M424 618 C410 654 408 684 424 718 C434 690 446 664 462 638 L468 618 Z"
              fill={url('jet')}
            />
            <path
              d="M436 618 C428 644 428 664 438 684 C446 664 452 646 458 630 Z"
              fill="#ffffff"
              opacity="0.5"
            />
          </g>
          <g className="robot-jet robot-jet-right">
            <path
              d="M576 618 C590 654 592 684 576 718 C566 690 554 664 538 638 L532 618 Z"
              fill={url('jet')}
            />
            <path
              d="M564 618 C572 644 572 664 562 684 C554 664 548 646 542 630 Z"
              fill="#ffffff"
              opacity="0.5"
            />
          </g>
        </g>

        {/* arms */}
        <g className="robot-arm robot-arm-left">
          <path
            d="M356 402 L322 448 L300 512 L336 532 L366 494 L382 434 Z"
            fill={url('plate')}
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.32"
          />
          <path
            d="M302 512 L268 560 L258 616 L298 632 L328 588 L336 532 Z"
            fill={url('metal')}
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.28"
          />
          <path
            d="M262 614 L300 628 L306 660 L288 688 L254 680 L246 644 Z"
            fill={url('plate')}
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.28"
          />
          <circle cx="332" cy="524" r="13" fill="#0f1a27" stroke="#d4c4a8" strokeWidth="3" strokeOpacity="0.65" />
          <circle cx="276" cy="650" r="4" fill="#7ff0d6" />
          <circle cx="294" cy="640" r="4" fill="#7ff0d6" opacity="0.65" />
        </g>
        <g className="robot-arm robot-arm-right">
          <path
            d="M644 402 L678 448 L700 512 L664 532 L634 494 L618 434 Z"
            fill={url('plate')}
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.32"
          />
          <path
            d="M698 512 L732 560 L742 616 L702 632 L672 588 L664 532 Z"
            fill={url('metal')}
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.28"
          />
          <path
            d="M738 614 L700 628 L694 660 L712 688 L746 680 L754 644 Z"
            fill={url('plate')}
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.28"
          />
          <circle cx="668" cy="524" r="13" fill="#0f1a27" stroke="#d4c4a8" strokeWidth="3" strokeOpacity="0.65" />
          <circle cx="724" cy="650" r="4" fill="#7ff0d6" />
          <circle cx="706" cy="640" r="4" fill="#7ff0d6" opacity="0.65" />
        </g>

        {/* torso */}
        <path
          d="M430 296 L570 296 L606 344 L622 430 L584 502 L500 542 L416 502 L378 430 L394 344 Z"
          fill={url('metal')}
          filter={shadow}
        />
        <path
          d="M452 316 L548 316 L574 352 L586 424 L552 478 L500 508 L448 478 L414 424 L426 352 Z"
          fill={url('plate')}
        />
        <path
          d="M452 300 L500 286 L548 300 L540 318 L460 318 Z"
          fill="#93a8bb"
          opacity="0.85"
        />
        <g stroke="#9fb4c6" strokeWidth="5" strokeLinecap="round" opacity="0.28">
          <path d="M432 356 L458 356" />
          <path d="M430 376 L458 376" />
          <path d="M432 396 L458 396" />
          <path d="M542 356 L568 356" />
          <path d="M542 376 L570 376" />
          <path d="M542 396 L568 396" />
        </g>
        <path d="M470 470 L500 486 L530 470" fill="none" stroke="#d4c4a8" strokeWidth="4" opacity="0.55" />

        {/* reactor core */}
        <circle cx="500" cy="392" r="54" fill="none" stroke="#6ff0d6" strokeWidth="3" strokeOpacity="0.32" />
        <circle className="robot-core" cx="500" cy="392" r="38" fill={url('core')} filter={`url(#${uid}-neon)`} />
        <circle cx="500" cy="392" r="13" fill="#f6fffc" opacity="0.92" />
        <g fill="#d4c4a8" opacity="0.75">
          <rect x="494" y="330" width="12" height="16" rx="3" />
          <rect x="494" y="438" width="12" height="16" rx="3" />
          <rect x="436" y="386" width="16" height="12" rx="3" />
          <rect x="548" y="386" width="16" height="12" rx="3" />
        </g>

        {/* hips + hover engine */}
        <path
          d="M440 506 L560 506 L578 566 L548 606 L452 606 L422 566 Z"
          fill={url('metal')}
          filter={shadow}
        />
        <path d="M456 536 L544 536" stroke="#0d1b2a" strokeWidth="7" opacity="0.55" />
        <ellipse
          className="robot-ring"
          cx="500"
          cy="620"
          rx="96"
          ry="24"
          fill="none"
          stroke={url('teal')}
          strokeWidth="6"
          strokeOpacity="0.8"
        />
        <ellipse cx="500" cy="620" rx="60" ry="14" fill="none" stroke="#6ff0d6" strokeWidth="3" strokeOpacity="0.35" />
        <path d="M414 588 L472 588 L462 626 L424 626 Z" fill="#101a27" stroke="#8fa6ba" strokeWidth="3" strokeOpacity="0.3" />
        <path d="M586 588 L528 588 L538 626 L576 626 Z" fill="#101a27" stroke="#8fa6ba" strokeWidth="3" strokeOpacity="0.3" />

        {/* shoulder armour */}
        <g filter={shadow}>
          <path
            d="M424 300 L352 318 L306 372 L318 424 L372 448 L412 402 L430 344 Z"
            fill={url('helm')}
          />
          <path
            d="M576 300 L648 318 L694 372 L682 424 L628 448 L588 402 L570 344 Z"
            fill={url('helm')}
          />
          <path d="M356 316 L340 282 L328 322 Z" fill={url('sand')} />
          <path d="M644 316 L660 282 L672 322 Z" fill={url('sand')} />
          <path
            d="M368 330 L330 378 L338 412 L378 424"
            fill="none"
            stroke="#d4c4a8"
            strokeWidth="4"
            opacity="0.4"
          />
          <path
            d="M632 330 L670 378 L662 412 L622 424"
            fill="none"
            stroke="#d4c4a8"
            strokeWidth="4"
            opacity="0.4"
          />
          <circle cx="330" cy="380" r="5" fill="#7ff0d6" />
          <circle cx="670" cy="380" r="5" fill="#7ff0d6" />
        </g>

        {/* neck */}
        <path d="M468 244 L532 244 L526 292 L474 292 Z" fill="#1b263b" stroke="#8fa6ba" strokeWidth="3" strokeOpacity="0.25" />
        <path d="M474 266 L526 266" stroke="#0d1b2a" strokeWidth="6" opacity="0.6" />

        {/* head */}
        <g className="robot-head">
          <path
            d="M500 86 C545 86 572 112 572 158 L566 214 L500 246 L434 214 L428 158 C428 112 455 86 500 86 Z"
            fill={url('helm')}
            filter={shadow}
          />
          <path
            d="M462 104 C480 94 520 94 538 104 L528 122 C512 116 488 116 472 122 Z"
            fill="#b7c7d4"
            opacity="0.55"
          />
          <path d="M486 90 L500 44 L514 90 Z" fill={url('sand')} />
          <path d="M500 44 L500 18" stroke="#9fb4c6" strokeWidth="4" />
          <circle className="robot-beacon" cx="500" cy="13" r="7" fill={url('teal')} />

          {/* ear pods */}
          <path d="M434 156 L404 170 L408 212 L434 206 Z" fill={url('metal')} stroke="#8fa6ba" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M566 156 L596 170 L592 212 L566 206 Z" fill={url('metal')} stroke="#8fa6ba" strokeWidth="3" strokeOpacity="0.3" />
          <circle cx="417" cy="190" r="5" fill="#7ff0d6" />
          <circle cx="583" cy="190" r="5" fill="#7ff0d6" />

          {/* visor */}
          <path
            d="M440 152 L500 136 L560 152 L546 202 L500 218 L454 202 Z"
            fill="#0c1520"
            stroke="#8fa6ba"
            strokeWidth="3"
            strokeOpacity="0.4"
          />
          <path className="robot-visor" d="M452 162 L500 149 L548 162 L538 192 L500 203 L462 192 Z" fill={url('teal')} filter={`url(#${uid}-neon)`} />
          <g clipPath={`url(#${uid}-visor-clip)`}>
            <rect className="robot-scan" x="440" y="150" width="120" height="7" fill="#ffffff" opacity="0.7" />
          </g>

          {/* jaw */}
          <path d="M472 214 L500 230 L528 214 L520 242 L500 252 L480 242 Z" fill={url('metal')} />
          <g stroke="#0d1b2a" strokeWidth="4" opacity="0.6" strokeLinecap="round">
            <path d="M488 228 L512 228" />
            <path d="M490 238 L510 238" />
          </g>
          <path d="M448 206 L466 226" stroke="#d4c4a8" strokeWidth="3" opacity="0.45" />
          <path d="M552 206 L534 226" stroke="#d4c4a8" strokeWidth="3" opacity="0.45" />
        </g>
      </g>
    </svg>
  )
}
