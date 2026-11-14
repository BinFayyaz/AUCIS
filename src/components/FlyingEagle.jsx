import { useEffect, useRef, useState } from 'react'
import EagleMark from './EagleMark.jsx'

const MAX_DRIFT = 260

/**
 * The home-page eagle: parked to the right of the AUCIS heading and fixed to
 * the viewport. Scrolling down carries it down (and noses it into the dive),
 * scrolling up carries it back up — and it keeps beating its wings throughout.
 */
export default function FlyingEagle() {
  const [drift, setDrift] = useState(0)
  const [tilt, setTilt] = useState(0)
  const lastY = useRef(0)
  const settle = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y

      setDrift(Math.min(y * 0.55, MAX_DRIFT))

      if (Math.abs(delta) > 1) {
        setTilt(Math.max(-9, Math.min(9, delta * 0.35)))
        window.clearTimeout(settle.current)
        settle.current = window.setTimeout(() => setTilt(0), 180)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(settle.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed -z-10 right-[1vw] top-[12vh] hidden select-none md:block"
    >
      <div
        className="transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(0, ${drift}px, 0)` }}
      >
        <div
          className="animate-floaty transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          <EagleMark className="w-[clamp(280px,30vw,520px)] opacity-90" />
        </div>
      </div>
    </div>
  )
}
