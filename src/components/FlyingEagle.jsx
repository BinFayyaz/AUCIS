import { useEffect, useRef, useState } from 'react'
import EagleMark from './EagleMark.jsx'
import EagleSparks from './EagleSparks.jsx'

const MAX_DRIFT = 240
const MAX_SWAY = 26
const FOOTER_GAP = 28
const TOP_SAFE = 88

/**
 * The home-page eagle. On wide screens it holds the reserved right-hand lane;
 * on phones and small tablets it sits centred in the band above the hero.
 *
 * Scrolling carries it down and noses it into the dive, weaves it left and
 * right across its lane, and shakes sparks loose behind it. As soon as the
 * footer rises into view it climbs back towards the top of the page, so it
 * never lands on the footer.
 */
export default function FlyingEagle() {
  const [drift, setDrift] = useState(0)
  const [sway, setSway] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [moving, setMoving] = useState(false)
  const lastY = useRef(0)
  const settle = useRef(null)
  const laneRef = useRef(null)
  const birdRef = useRef(null)
  const base = useRef({ top: 0, bottom: 0 })

  useEffect(() => {
    // Only the fixed (md and up) lane can travel down the page; below that the
    // bird scrolls away with the hero.
    const inLane = () => window.matchMedia('(min-width: 768px)').matches

    const measure = () => {
      const lane = laneRef.current
      const bird = birdRef.current
      if (!lane || !bird) return
      const top = lane.getBoundingClientRect().top + bird.offsetTop
      base.current = { top, bottom: top + bird.offsetHeight }
    }

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y

      let next = 0

      if (inLane()) {
        next = Math.min(y * 0.5, MAX_DRIFT)

        // Give way to the footer instead of overlapping it.
        const footer = document.querySelector('footer')
        if (footer) {
          const room = footer.getBoundingClientRect().top - base.current.bottom - FOOTER_GAP
          next = Math.min(next, room)
        }
        next = Math.max(next, TOP_SAFE - base.current.top)
      }

      setDrift(next)
      setSway(Math.sin(y / 240) * MAX_SWAY)

      if (Math.abs(delta) > 1) {
        setTilt(Math.max(-8, Math.min(8, delta * 0.3)))
        setMoving(true)
        window.clearTimeout(settle.current)
        settle.current = window.setTimeout(() => {
          setTilt(0)
          setMoving(false)
        }, 220)
      }
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(settle.current)
    }
  }, [])

  return (
    <div
      ref={laneRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-20 -z-10 md:fixed md:top-[13vh]"
    >
      {/* aligned to the content container so the bird sits in its own lane */}
      <div className="mx-auto flex w-full max-w-6xl justify-center px-6 sm:px-8 md:justify-end">
        <div
          ref={birdRef}
          className="transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${sway}px, ${drift}px, 0)` }}
        >
          <div
            style={{ transform: `rotate(${tilt + sway * 0.3}deg)` }}
            className="transition-transform duration-300 ease-out"
          >
            <div className="relative">
              <EagleSparks moving={moving} className="inset-x-[6%] bottom-0 top-1/3" />
              <EagleMark className="w-[clamp(170px,44vw,260px)] drop-shadow-[0_24px_60px_rgba(0,0,0,0.5)] md:w-[clamp(210px,26vw,440px)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
