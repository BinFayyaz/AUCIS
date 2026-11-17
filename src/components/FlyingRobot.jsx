import { useEffect, useRef, useState } from 'react'
import Robot3D from './Robot3D.jsx'
import RobotSparks from './RobotSparks.jsx'
import RobotThoughtBubble from './RobotThoughtBubble.jsx'
import { getJoinRobotTarget } from '../lib/joinSequence.js'
import { dampTowards, travelSpeed } from '../lib/robotFlight.js'
import { useRobotIdle, useWelcomeAnimation, IDLE_DURATIONS } from '../lib/robotIdle.js'
import './JoinRegistration.css'

// Fixed stations the robot walks to — it only ever stands on one of these
// spots, never at some point in between, and walks to the next one when the
// section it follows changes. Values are fractions of the viewport height.
const DESKTOP_STATIONS = [0.06, 0.24, 0.12, 0.3, 0.18]
const MOBILE_STATIONS = [0.02, 0.08, 0.04, 0.1]

const ROBOT_BOX =
  'relative h-[clamp(200px,44vw,250px)] w-[clamp(180px,40vw,225px)] md:h-[clamp(310px,30vw,400px)] md:w-[clamp(280px,26vw,350px)]'

// Phases where the form has swallowed the robot: it sits completely behind the
// overlay, so nothing of it may show while the reader fills the form in.
const BEHIND_FORM = ['returning', 'form', 'error']
// Phases where the panel is rising in front of the robot. Only the arms are
// drawn above the overlay, so the hands stay on the form while the rest of the
// body stays behind it.
const ARMS_OVER_FORM = ['hands-down', 'hands-up']
// The arm layer is mounted earlier than it is shown: it has to be created
// while the robot is still at 1:1 scale, otherwise the canvas measures itself
// against the enlarged box and comes out twice too big.
const ARMS_LAYER_MOUNTED = ['flying-bottom', 'enlarging', ...ARMS_OVER_FORM]
const BEHIND_OVERLAY = [
  ...ARMS_OVER_FORM,
  ...BEHIND_FORM,
  'flying-bottom',
  'enlarging',
  'flying-up',
]

/**
 * The home-page robot. On wide screens it holds the reserved right-hand lane;
 * on phones and small tablets it sits centred in the band above the hero.
 *
 * Scrolling walks it between fixed stations, one per section, alternating
 * sides — it never drifts continuously, and it keeps one size the whole way.
 *
 * When `joinPhase` is set (from the Join AUCIS sequence) the robot follows a
 * scripted animation: flying to center, enlarging, stretching arms down to
 * pull the registration form up, then slipping behind the form.
 */
export default function FlyingRobot({ joinPhase }) {
  const [mode, setMode] = useState('idle')
  const [fade, setFade] = useState(1)
  const lastY = useRef(0)
  // Scroll only sets a target; a requestAnimationFrame loop damps the robot
  // towards it. That keeps the walk smooth and frame-accurate instead of
  // lagging behind a long CSS transition on every scroll event.
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const motion = useRef({ speed: 0, distance: 0 })
  const settled = useRef(false)
  const settle = useRef(null)
  const laneRef = useRef(null)
  const robotRef = useRef(null)
  const base = useRef({ top: 0, bottom: 0 })
  const maxOffset = useRef(0)
  const joinPhaseRef = useRef(null)
  joinPhaseRef.current = joinPhase

  const [geometry, setGeometry] = useState(null)
  const isJoining = Boolean(joinPhase)
  const behindOverlay = BEHIND_OVERLAY.includes(joinPhase)
  const armsOverForm = ARMS_OVER_FORM.includes(joinPhase)
  const armsLayerMounted = ARMS_LAYER_MOUNTED.includes(joinPhase)
  const hiddenByForm = BEHIND_FORM.includes(joinPhase)

  // --- Idle + welcome animations ---
  const { shouldGreet, onGreetingComplete } = useWelcomeAnimation()
  const { idleAnimation, onAnimationComplete } = useRobotIdle({ enabled: !shouldGreet && !isJoining })
  const activeAnimation = shouldGreet ? 'greeting' : idleAnimation

  useEffect(() => {
    if (!activeAnimation) return
    const duration = (IDLE_DURATIONS[activeAnimation] || 5) * 1000
    const timer = setTimeout(() => {
      if (shouldGreet) onGreetingComplete()
      else onAnimationComplete()
    }, duration)
    return () => clearTimeout(timer)
  }, [activeAnimation, shouldGreet, onGreetingComplete, onAnimationComplete])

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

    const onScroll = () => {
      if (joinPhaseRef.current) return

      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y
      const wide = inLane()

      // The section the reader is on picks one fixed station: alternate sides,
      // a repeating vertical ladder. Nothing in between is ever a target.
      const sections = document.querySelectorAll('.home-page > section')
      let activeIndex = 0
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5) {
          activeIndex = i
        }
      }

      const nextLeft = activeIndex % 2 === 1
      const ladder = wide ? DESKTOP_STATIONS : MOBILE_STATIONS
      targetPos.current = {
        x: wide && nextLeft ? -maxOffset.current : 0,
        y: Math.round(ladder[activeIndex % ladder.length] * window.innerHeight),
      }

      setFade(wide ? 1 : Math.max(0.28, Math.min(1, 1 - (y - 140) / 420)))

      if (Math.abs(delta) > 1) {
        setMode(delta > 0 ? 'down' : 'up')
        window.clearTimeout(settle.current)
        settle.current = window.setTimeout(() => {
          setMode('idle')
        }, 300)
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

  // Frame-rate independent damping: the robot eases onto its station at a
  // walking pace, and its real travel drives the 3D gait, frame by frame.
  useEffect(() => {
    let frame = 0
    let prev = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.05, Math.max(0, (now - prev) / 1000))
      prev = now
      const pos = currentPos.current
      const goal = targetPos.current

      if (!settled.current) {
        pos.x = goal.x
        pos.y = goal.y
        settled.current = true
      }

      if (joinPhaseRef.current) {
        // The scripted join flight owns the transform; keep the feet still.
        pos.x = goal.x
        pos.y = goal.y
        motion.current.speed = 0
        motion.current.distance = 0
      } else {
        const fromX = pos.x
        const fromY = pos.y
        pos.x = dampTowards(pos.x, goal.x, dt, 3.2)
        pos.y = dampTowards(pos.y, goal.y, dt, 3.6)
        motion.current.speed = travelSpeed(fromX, fromY, pos.x, pos.y, dt)
        motion.current.distance = Math.hypot(pos.x - fromX, pos.y - fromY)
        if (robotRef.current) {
          robotRef.current.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`
        }
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
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
  let joinTransform = null
  if (isJoining && geometry) {
    const target = getJoinRobotTarget(joinPhase, geometry.viewport, geometry)
    joinTransform = `translate3d(${target.x - geometry.originX - geometry.width / 2}px, ${target.y - geometry.originY - geometry.height / 2}px, 0) scale(${target.scale})`
  }

  const externalPose = {
    // The arms stay stretched down while the panel rises, so the hands keep
    // their grip on the form instead of snapping back to the sides.
    'hands-down': 'hands-down',
    'hands-up': 'hands-down',
    error: 'dissatisfied',
    collecting: 'pulling',
    rolling: 'rolling',
    shrinking: 'rolling',
    holding: 'holding-scroll',
  }[joinPhase] || (isJoining ? 'attentive' : null)
  const opacity = isJoining ? (hiddenByForm ? 0 : 1) : fade

  return (
    <>
      <div
        ref={laneRef}
        aria-hidden="true"
        data-join-phase={joinPhase || 'idle'}
        data-pose={externalPose || 'idle'}
        data-animation={activeAnimation || 'none'}
        className={`robot-flight ${isJoining ? 'is-joining' : ''} ${behindOverlay ? 'is-behind-overlay' : ''} pointer-events-none fixed inset-x-0 top-[5.5rem] z-20 transition-opacity duration-300 md:top-[13vh] ${
          mode === 'down' ? 'is-diving' : mode === 'up' ? 'is-climbing' : 'is-gliding'
        }`}
        style={{ opacity }}
      >
        <div className="mx-auto flex w-full max-w-6xl justify-end px-6 sm:px-8">
          <div
            ref={robotRef}
            className={`md:pointer-events-auto md:cursor-pointer ${
              isJoining ? 'transition-transform duration-700 ease-in-out' : ''
            }`}
            style={joinTransform ? { transform: joinTransform } : undefined}
          >
            <div className={ROBOT_BOX}>
              <Robot3D
                externalPose={externalPose}
                motionRef={motion}
                idleAnimation={!isJoining ? activeAnimation : null}
              />
              <RobotSparks mode={mode} />
              {shouldGreet && <RobotThoughtBubble />}
            </div>
          </div>
        </div>
      </div>

      {/* Hands on the form: the same arms drawn over the overlay while the rest
          of the robot stays behind the rising panel. */}
      {armsLayerMounted && joinTransform && (
        <div className={`robot-arms-overlay ${armsOverForm ? 'is-visible' : ''}`} aria-hidden="true">
          <div className="mx-auto flex w-full max-w-6xl justify-end px-6 sm:px-8">
            <div
              className="transition-transform duration-700 ease-in-out"
              style={{ transform: joinTransform }}
            >
              <div className={ROBOT_BOX}>
                <Robot3D armsOnly externalPose={externalPose} motionRef={motion} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
