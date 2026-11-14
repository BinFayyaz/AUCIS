import { useEffect, useRef, useState } from 'react'
import './RobotPhoto.css'
import RobotSparks from './RobotSparks.jsx'

const MAX_DRIFT = 240
// Desktop mech glides left and right inside its reserved gutter.
const MAX_SWAY = 110
const MOBILE_MAX_SWAY = 12
const MOBILE_MAX_DRIFT = 110
// Leave room for the motor trail below the thrusters as well as the robot itself.
const FOOTER_GAP = 124
const TOP_SAFE = 88

/**
 * The home-page robot. On wide screens it holds the reserved right-hand lane;
 * on phones and small tablets it sits centred in the band above the hero.
 *
 * Scrolling carries it down, spools the thrusters up, weaves it left and right
 * across its lane, and streams energy motes the other way. As soon as the
 * footer rises into view it climbs back towards the top of the page, so it
 * never lands on the footer.
 */
export default function FlyingRobot() {
  const [drift, setDrift] = useState(0)
  const [sway, setSway] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [mode, setMode] = useState('idle')
  const [fade, setFade] = useState(1)
  const lastY = useRef(0)
  const settle = useRef(null)
  const laneRef = useRef(null)
  const robotRef = useRef(null)
  const base = useRef({ top: 0, bottom: 0 })

  useEffect(() => {
    // Only the fixed (md and up) lane can travel down the page; below that the
    // robot scrolls away with the hero.
    const inLane = () => window.matchMedia('(min-width: 768px)').matches

    const measure = () => {
      const lane = laneRef.current
      const robot = robotRef.current
      if (!lane || !robot) return
      const top = lane.getBoundingClientRect().top + robot.offsetTop
      base.current = { top, bottom: top + robot.offsetHeight }
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
      } else {
        // Phone: the small mech glides down inside its hero band as the page scrolls.
        next = Math.min(y * 0.35, MOBILE_MAX_DRIFT)
      }

      setDrift(next)
      // Slow sine sweep: the robot glides from one side of its gutter to the
      // other and back, without ever reaching the content column.
      setSway(Math.sin(y / 420) * (inLane() ? MAX_SWAY : MOBILE_MAX_SWAY))
      // On phones the robot has no side lane, so it turns into a faint companion
      // once the hero copy starts scrolling under it.
      setFade(inLane() ? 1 : Math.max(0.28, Math.min(1, 1 - (y - 140) / 420)))

      if (Math.abs(delta) > 1) {
        setTilt(Math.max(-8, Math.min(8, delta * 0.3)))
        // Scrolling down carries the robot down the page, and vice versa.
        setMode(delta > 0 ? 'down' : 'up')
        window.clearTimeout(settle.current)
        settle.current = window.setTimeout(() => {
          setTilt(0)
          setMode('idle')
        }, 260)
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
      className={`robot-flight pointer-events-none fixed inset-x-0 top-[5.5rem] z-20 transition-opacity duration-300 md:top-[13vh] ${
        mode === 'down' ? 'is-diving' : mode === 'up' ? 'is-climbing' : 'is-gliding'
      }`}
      style={{ opacity: fade }}
    >
      {/* aligned to the content container so the robot sits in its own lane */}
      <div className="mx-auto flex w-full max-w-6xl justify-end px-6 sm:px-8">
        <div
          ref={robotRef}
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translate3d(${sway}px, ${drift}px, 0)` }}
        >
          <div
            style={{ transform: `rotate(${tilt + sway * 0.05}deg)` }}
            className="transition-transform duration-300 ease-out"
          >
            <div className="relative">
              <img
                src="/aucis-android.png"
                alt=""
                className="robot-photo h-[clamp(130px,26vw,170px)] md:h-[clamp(240px,34vh,360px)]"
              />
              <RobotSparks mode={mode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
