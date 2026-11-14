import { useEffect, useRef, useState } from 'react'
import EagleMark from './EagleMark.jsx'

const MAX_DRIFT = 240

/**
 * The home-page eagle. It holds the reserved right-hand flight lane (the home
 * page keeps that gutter clear) and stays locked to the viewport: scrolling
 * down carries it down and noses it into the dive, scrolling up lifts it again.
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

      setDrift(Math.min(y * 0.5, MAX_DRIFT))

      if (Math.abs(delta) > 1) {
        setTilt(Math.max(-8, Math.min(8, delta * 0.3)))
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-[13vh] -z-10 hidden md:block">
      {/* aligned to the content container so the bird sits in its own lane */}
      <div className="mx-auto flex w-full max-w-6xl justify-end px-6 sm:px-8">
        <div
          className="transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(0, ${drift}px, 0)` }}
        >
          <div style={{ transform: `rotate(${tilt}deg)` }} className="transition-transform duration-300 ease-out">
            <EagleMark className="w-[clamp(210px,26vw,440px)] drop-shadow-[0_24px_60px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
