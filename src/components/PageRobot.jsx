import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Robot3D from './Robot3D.jsx'
import RobotSparks from './RobotSparks.jsx'
import { dampTowards, travelSpeed } from '../lib/robotFlight.js'
import './PageRobot.css'

// The mascot trails the scroll exactly like the home-page robot: the scroll
// only sets a target, a rAF loop damps onto it, and the robot's real travel
// speed drives the leg gait.
const NAV_SAFE = 80 // the robot keeps its box clear of the fixed navigation
// Fixed stations (below the navigation) the mascot walks between once it is
// flying: it stops on one of these, never halfway towards the next.
const STATION_STEPS = [40, 190, 100, 240]
const FOOTER_GAP = 96
const FADE_START = 160
const FADE_SPAN = 420
const MIN_OPACITY = 0.4 // ghosted once it is over page content
const LIFT_BLEND = 240
const STIFFNESS = 5 // a walking pace rather than a snap

/** The node's box in document coordinates, measured as it is rendered. */
function documentBox(node) {
  const rect = node.getBoundingClientRect()
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  }
}

/**
 * The mascot on the inner pages. `pose="recumbent"` starts it lying on its left
 * side on top of a heading word; the moment the reader scrolls it lifts off and
 * flies the rest of the page the way the home-page robot does.
 */
export default function PageRobot({ pose = 'upright', className = '' }) {
  const resting = pose === 'recumbent'
  const hostRef = useRef(null)
  const layerRef = useRef(null)
  const anchor = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const motion = useRef({ speed: 0, distance: 0 })
  const lastY = useRef(0)
  const settle = useRef(null)
  const [flying, setFlying] = useState(false)
  const [mode, setMode] = useState('idle')
  const [tilt, setTilt] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    const layer = layerRef.current
    if (!host || !layer) return

    let ready = false
    let dead = false

    // Scroll and resize only move the target; the loop below eases onto it.
    const update = () => {
      const box = anchor.current
      if (!box) return

      const y = window.scrollY
      // Once the mascot reaches the top of the viewport it holds station there
      // and drifts with the scroll, exactly like the home-page robot.
      const stationTop = Math.min(box.y, NAV_SAFE)
      const liftAt = Math.max(0, box.y - stationTop)
      const past = Math.max(0, y - liftAt)
      const blend = Math.min(1, past / LIFT_BLEND)
      const laneX = window.innerWidth - box.width - (window.innerWidth < 768 ? 12 : 24)

      // One fixed station per band of scrolling, along the right-hand edge.
      const band = Math.floor(past / Math.max(360, window.innerHeight * 0.6))
      const stationY = NAV_SAFE + STATION_STEPS[band % STATION_STEPS.length]

      let nextY = past > 0 ? stationY : box.y - y
      const footer = document.querySelector('footer')
      if (footer) {
        nextY = Math.max(0, Math.min(nextY, footer.getBoundingClientRect().top - box.height - FOOTER_GAP))
      }

      target.current = {
        x: box.x + (laneX - box.x) * blend,
        y: nextY,
      }

      // Before lift-off the mascot stays glued to its word, so it never trails
      // away from the heading it is resting on.
      if (past === 0) {
        current.current.x = target.current.x
        current.current.y = target.current.y
      }

      // It wakes up (and rolls upright) a moment after the reader starts
      // scrolling, so the resting pose is still readable at the top.
      setFlying(past > 30)
      layer.style.opacity = String(
        Math.max(MIN_OPACITY, 1 - Math.max(0, y - FADE_START) / FADE_SPAN),
      )

      const delta = y - lastY.current
      lastY.current = y
      if (Math.abs(delta) > 1) {
        setTilt(Math.max(-7, Math.min(7, delta * 0.28)))
        setMode(delta > 0 ? 'down' : 'up')
        window.clearTimeout(settle.current)
        settle.current = window.setTimeout(() => {
          setTilt(0)
          setMode('idle')
        }, 260)
      }
    }

    const measure = () => {
      if (dead) return
      const box = documentBox(host)
      anchor.current = box
      layer.style.width = `${box.width}px`
      layer.style.height = `${box.height}px`
      if (!ready) {
        current.current = { x: box.x, y: box.y }
        ready = true
        layer.classList.add('is-ready')
      }
      update()
    }

    let frame = 0
    let prev = performance.now()
    const tick = (now) => {
      const delta = Math.min(0.05, Math.max(0, (now - prev) / 1000))
      prev = now
      const pos = current.current
      const goal = target.current
      const fromX = pos.x
      const fromY = pos.y
      pos.x = dampTowards(pos.x, goal.x, delta, STIFFNESS)
      pos.y = dampTowards(pos.y, goal.y, delta, STIFFNESS)
      motion.current.speed = travelSpeed(fromX, fromY, pos.x, pos.y, delta)
      motion.current.distance = Math.hypot(pos.x - fromX, pos.y - fromY)
      layer.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    measure()
    // The heading reveals itself while it scrolls into place, so follow it
    // until the reveal animation has finished.
    const remeasures = [300, 700, 1100, 1500].map((ms) => window.setTimeout(measure, ms))

    const onScroll = () => update()
    const onResize = () => measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    frame = requestAnimationFrame(tick)
    if (document.fonts) document.fonts.ready.then(measure).catch(() => {})

    return () => {
      dead = true
      remeasures.forEach((id) => window.clearTimeout(id))
      window.clearTimeout(settle.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={hostRef} className={`page-robot ${className}`} aria-hidden="true" />
      {createPortal(
        <div ref={layerRef} className="page-robot-layer" aria-hidden="true">
          <div className="page-robot-tilt" style={{ transform: `rotate(${tilt}deg)` }}>
            <Robot3D pose={resting && !flying ? 'recumbent' : 'upright'} motionRef={motion} />
            <RobotSparks mode={mode} />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
