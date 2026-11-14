import { useEffect, useRef, useState } from 'react'
import Robot3D from './Robot3D.jsx'
import RobotSparks from './RobotSparks.jsx'
import { getJoinRobotTarget } from '../lib/joinSequence.js'
import './JoinRegistration.css'

const MAX_DRIFT = 240
const MAX_SWAY = 110
const MOBILE_MAX_SWAY = 12
const MOBILE_MAX_DRIFT = 110
const FOOTER_GAP = 124
const TOP_SAFE = 88

/**
 * The home-page robot. On wide screens it holds the reserved right-hand lane;
 * on phones and small tablets it sits centred in the band above the hero.
 *
 * Scrolling carries it down, weaves it left and right within its blank lane,
 * and streams energy motes the other way. The robot alternates sides with
 * each section — right on even sections, left on odd — so it diagonally flies
 * across as the reader moves between sections.
 *
 * When `joinPhase` is set (from the Join AUCIS sequence) the robot follows a
 * scripted animation: flying to center, enlarging, stretching arms down to
 * pull the registration form up, then returning to the right side.
 */
export default function FlyingRobot({ joinPhase }) {
  const [drift, setDrift] = useState(0)
  const [sway, setSway] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [mode, setMode] = useState('idle')
  const [fade, setFade] = useState(1)
  const [onLeft, setOnLeft] = useState(false)
  const lastY = useRef(0)
  const settle = useRef(null)
  const laneRef = useRef(null)
  const robotRef = useRef(null)
  const base = useRef({ top: 0, bottom: 0 })
  const maxOffset = useRef(0)
  const swaySpace = useRef(MAX_SWAY)
  const joinPhaseRef = useRef(null)
  joinPhaseRef.current = joinPhase

  const [geometry, setGeometry] = useState(null)
  const isJoining = Boolean(joinPhase)

  useEffect(() => {
    const inLane = () => window.matchMedia('(min-width: 768px)').matches

    const measure = () => {
      const lane = laneRef.current
      const robot = robotRef.current
      if (!lane || !robot) return
      const top = lane.getBoundingClientRect().top + robot.offsetTop
      base.current = { top, bottom: top + robot.offsetHeight }
      setGeometry({
        originX: robot.offsetLeft,
        originY: top,
        width: robot.offsetWidth,
        height: robot.offsetHeight,
        viewport: { width: window.innerWidth, height: window.innerHeight },
      })

      const containerEl = lane.firstElementChild
      if (containerEl) {
        const styles = getComputedStyle(containerEl)
        const padL = parseFloat(styles.paddingLeft)
        const padR = parseFloat(styles.paddingRight)
        maxOffset.current = containerEl.clientWidth - padL - padR - robot.offsetWidth
      }
    }

    const measureSwaySpace = () => {
      const robot = robotRef.current
      if (!robot) return
      const pageContainer = document.querySelector('.home-page .container-page')
      if (pageContainer) {
        const styles = getComputedStyle(pageContainer)
        const padL = parseFloat(styles.paddingLeft)
        const padR = parseFloat(styles.paddingRight)
        const lanePadding = Math.max(padL, padR)
        swaySpace.current = Math.max(0, Math.min(MAX_SWAY, lanePadding - robot.offsetWidth))
      }
    }

    const onScroll = () => {
      if (joinPhaseRef.current) return

      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y

      let next = 0

      if (inLane()) {
        next = Math.min(y * 0.5, MAX_DRIFT)
        const footer = document.querySelector('footer')
        if (footer) {
          const room = footer.getBoundingClientRect().top - base.current.bottom - FOOTER_GAP
          next = Math.min(next, room)
        }
        next = Math.max(next, TOP_SAFE - base.current.top)
      } else {
        next = Math.min(y * 0.35, MOBILE_MAX_DRIFT)
      }

      setDrift(next)
      const dynamicMaxSway = swaySpace.current
      setSway(Math.sin(y / 420) * (inLane() ? dynamicMaxSway : MOBILE_MAX_SWAY))
      setFade(inLane() ? 1 : Math.max(0.28, Math.min(1, 1 - (y - 140) / 420)))

      const sections = document.querySelectorAll('.home-page > section')
      let activeIndex = 0
      let changed = false
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          activeIndex = i
        }
      }
      setOnLeft((prev) => {
        if (prev !== (activeIndex % 2 === 1)) {
          changed = true
        }
        return activeIndex % 2 === 1
      })

      if (changed) measureSwaySpace()

      if (Math.abs(delta) > 1) {
        setTilt(Math.max(-8, Math.min(8, delta * 0.3)))
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
      measureSwaySpace()
      onScroll()
    }

    measure()
    measureSwaySpace()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Locking page scroll can remove the scrollbar and shift the lane. Keep
    // the untransformed origin in sync, including Canvas size changes.
    const observer = new ResizeObserver(measure)
    if (laneRef.current?.firstElementChild) observer.observe(laneRef.current.firstElementChild)
    if (robotRef.current) observer.observe(robotRef.current)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(settle.current)
    }
  }, [])

  // Refresh scroll state when the join sequence ends.
  useEffect(() => {
    if (!joinPhase) {
      const onScroll = () => window.dispatchEvent(new Event('scroll'))
      onScroll()
    }
  }, [joinPhase])

  // Targets use the viewport and the untransformed origin, not the robot's
  // animated bounds. Resizing cannot accumulate translation or change lanes.
  let transform = `translate3d(${sway + (onLeft ? -maxOffset.current : 0)}px, ${drift}px, 0)`
  if (isJoining && geometry) {
    const target = getJoinRobotTarget(joinPhase, geometry.viewport, geometry)
    transform = `translate3d(${target.x - geometry.originX - geometry.width / 2}px, ${target.y - geometry.originY - geometry.height / 2}px, 0) scale(${target.scale})`
  }

  const externalPose = {
    'hands-down': 'hands-down',
    error: 'dissatisfied',
    collecting: 'pulling',
    rolling: 'rolling',
    shrinking: 'rolling',
    holding: 'holding-scroll',
  }[joinPhase] || (isJoining ? 'attentive' : null)
  const tiltRotation = isJoining ? 0 : tilt + sway * 0.05
  const opacity = isJoining ? 1 : fade

  return (
    <div
      ref={laneRef}
      aria-hidden="true"
      data-join-phase={joinPhase || 'idle'}
      data-pose={externalPose || 'idle'}
      className={`robot-flight ${isJoining ? 'is-joining' : ''} pointer-events-none fixed inset-x-0 top-[5.5rem] z-20 transition-opacity duration-300 md:top-[13vh] ${
        mode === 'down' ? 'is-diving' : mode === 'up' ? 'is-climbing' : 'is-gliding'
      }`}
      style={{ opacity }}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-end px-6 sm:px-8">
        <div
          ref={robotRef}
          className="md:pointer-events-auto md:cursor-pointer transition-transform duration-700 ease-in-out"
          style={{ transform }}
        >
          <div
            style={{ transform: `rotate(${tiltRotation}deg)` }}
            className="transition-transform duration-300 ease-out"
          >
            <div className="relative h-[clamp(200px,44vw,250px)] w-[clamp(180px,40vw,225px)] md:h-[clamp(310px,42vh,400px)] md:w-[clamp(280px,26vw,350px)]">
              <Robot3D externalPose={externalPose} />
              <RobotSparks mode={mode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
