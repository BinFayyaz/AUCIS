import { useId } from 'react'
import './EagleMark.css'

/**
 * Front-facing adult bald eagle: chocolate-brown wings and body, stark white
 * head, chest and tail, bright yellow beak and talons. Vector only, with the
 * wings split out so they can beat independently.
 */
export default function EagleMark({ className = '' }) {
  const uid = useId().replace(/:/g, '')
  const url = (name) => `url(#${uid}-${name})`
  const shadow = url('shadow')

  return (
    <svg
      viewBox="0 0 1000 750"
      className={`eagle-mark ${className}`}
      role="img"
      aria-label="Front-facing bald eagle with outstretched wings"
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#513221" />
          <stop offset="45%" stopColor="#362116" />
          <stop offset="100%" stopColor="#170d09" />
        </linearGradient>
        <linearGradient id={`${uid}-wing`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3825" />
          <stop offset="45%" stopColor="#3a2318" />
          <stop offset="100%" stopColor="#160c08" />
        </linearGradient>
        <linearGradient id={`${uid}-head`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f2f2f2" />
          <stop offset="100%" stopColor="#d5d5d5" />
        </linearGradient>
        <linearGradient id={`${uid}-yellow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe45c" />
          <stop offset="50%" stopColor="#e4ad17" />
          <stop offset="100%" stopColor="#b87500" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor="#ffe9b8" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#ffcf7a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
          <feOffset dy="10" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse className="eagle-glow" cx="500" cy="340" rx="330" ry="270" fill={url('glow')} />

      {/* left wing */}
      <g className="eagle-wing eagle-wing-left">
        <path
          d="M455 330 C390 285 315 235 225 215 C155 200 95 215 55 245 C115 250 165 270 215 300 C150 290 95 305 55 335 C135 375 220 405 310 415 C370 420 425 395 465 355 Z"
          fill={url('wing')}
          filter={shadow}
        />
        <g fill="none" stroke="#765039" strokeWidth="9" opacity="0.38">
          <path d="M80 250 C175 260 290 310 420 360" />
          <path d="M70 295 C175 305 290 345 410 375" />
          <path d="M70 335 C175 350 285 380 390 395" />
        </g>
        <path d="M55 245 Q25 220 20 245 Q35 270 75 270 Z" fill="#24150e" />
      </g>

      {/* right wing */}
      <g className="eagle-wing eagle-wing-right">
        <path
          d="M545 330 C610 285 685 235 775 215 C845 200 905 215 945 245 C885 250 835 270 785 300 C850 290 905 305 945 335 C865 375 780 405 690 415 C630 420 575 395 535 355 Z"
          fill={url('wing')}
          filter={shadow}
        />
        <g fill="none" stroke="#765039" strokeWidth="9" opacity="0.38">
          <path d="M920 250 C825 260 710 310 580 360" />
          <path d="M930 295 C825 305 710 345 590 375" />
          <path d="M930 335 C825 350 715 380 610 395" />
        </g>
        <path d="M945 245 Q975 220 980 245 Q965 270 925 270 Z" fill="#24150e" />
      </g>

      <g className="eagle-body">
        {/* torso */}
        <path
          d="M410 300 C425 250 455 220 500 215 C545 220 575 250 590 300 C610 390 585 485 500 550 C415 485 390 390 410 300 Z"
          fill={url('body')}
          filter={shadow}
        />
        <g fill="none" stroke="#704832" strokeWidth="8" opacity="0.38">
          <path d="M425 350 Q500 385 575 350" />
          <path d="M420 385 Q500 420 580 385" />
          <path d="M425 420 Q500 455 575 420" />
          <path d="M445 455 Q500 485 555 455" />
        </g>

        {/* white tail */}
        <g fill={url('head')}>
          <path d="M430 490 L370 615 Q425 595 475 520 Z" />
          <path d="M465 500 L440 650 Q500 625 500 515 Z" />
          <path d="M535 500 L560 650 Q500 625 500 515 Z" />
          <path d="M570 490 L630 615 Q575 595 525 520 Z" />
        </g>

        {/* white chest */}
        <path
          d="M420 285 Q430 225 500 215 Q570 225 580 285 L565 345 Q500 380 435 345 Z"
          fill={url('head')}
        />

        {/* head */}
        <path
          d="M405 155 C405 100 445 65 500 60 C555 65 595 100 595 155 C595 205 560 245 500 255 C440 245 405 205 405 155 Z"
          fill={url('head')}
          filter={shadow}
        />
        <g fill="none" stroke="#c7c7c7" strokeWidth="5" opacity="0.65">
          <path d="M425 175 Q445 210 470 225" />
          <path d="M435 190 Q455 220 480 235" />
          <path d="M575 175 Q555 210 530 225" />
          <path d="M565 190 Q545 220 520 235" />
        </g>

        {/* eyes */}
        <ellipse cx="455" cy="140" rx="15" ry="17" fill="#e4ae18" />
        <ellipse cx="455" cy="141" rx="8" ry="11" fill="#111" />
        <circle cx="458" cy="137" r="3" fill="#fff" />
        <ellipse cx="545" cy="140" rx="15" ry="17" fill="#e4ae18" />
        <ellipse cx="545" cy="141" rx="8" ry="11" fill="#111" />
        <circle cx="548" cy="137" r="3" fill="#fff" />

        {/* beak */}
        <path d="M500 145 L475 160 L500 195 L525 160 Z" fill={url('yellow')} />
        <path d="M475 160 Q500 170 525 160 L510 205 Q500 220 490 205 Z" fill="#c28400" />
        <path d="M500 158 L500 202" stroke="#a56d00" strokeWidth="4" />

        {/* legs */}
        <path d="M455 485 L455 555" stroke={url('yellow')} strokeWidth="14" strokeLinecap="round" />
        <path d="M545 485 L545 555" stroke={url('yellow')} strokeWidth="14" strokeLinecap="round" />

        {/* talons */}
        <g fill="none" stroke="#e1aa16" strokeWidth="9" strokeLinecap="round">
          <path d="M455 550 Q425 570 405 550" />
          <path d="M455 552 Q440 580 420 570" />
          <path d="M455 552 Q455 580 440 580" />
          <path d="M545 550 Q575 570 595 550" />
          <path d="M545 552 Q560 580 580 570" />
          <path d="M545 552 Q545 580 560 580" />
        </g>
      </g>
    </svg>
  )
}
