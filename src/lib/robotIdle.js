import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_IDLE_TIMEOUT = 10 // seconds
const WELCOME_THRESHOLD = 30 * 60 * 1000 // 30 minutes in ms
const STORAGE_KEY = 'aucis_last_visit'

const IDLE_ANIMATIONS = ['apple-juggle', 'twirl', 'stretch', 'look-around', 'bounce', 'clap']

/** Duration of each idle / greeting animation, in seconds. */
export const IDLE_DURATIONS = {
  'apple-juggle': 10,
  twirl: 4.5,
  greeting: 3.5,
  stretch: 4,
  'look-around': 4,
  bounce: 4,
  clap: 4,
}

/** Read the configurable idle timeout (env var IDLE_TIMEOUT, in seconds). */
function getIdleTimeout() {
  const raw = import.meta.env.IDLE_TIMEOUT
  const parsed = parseInt(raw, 10)
  return parsed && parsed > 0 ? parsed : DEFAULT_IDLE_TIMEOUT
}

/**
 * Tracks user activity and, after `idle_timeout` seconds of inactivity,
 * picks a random idle animation for the robot to perform.  When the animation
 * finishes the caller calls `onAnimationComplete` and the timer restarts.
 */
export function useRobotIdle({ enabled = true }) {
  const [idleAnimation, setIdleAnimation] = useState(null)
  const timerRef = useRef(null)

  const scheduleIdle = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const anim = IDLE_ANIMATIONS[Math.floor(Math.random() * IDLE_ANIMATIONS.length)]
      setIdleAnimation(anim)
    }, getIdleTimeout() * 1000)
  }, [])

  const onAnimationComplete = useCallback(() => {
    setIdleAnimation(null)
    scheduleIdle()
  }, [scheduleIdle])

  useEffect(() => {
    if (!enabled) {
      setIdleAnimation(null)
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    const onActivity = () => {
      setIdleAnimation(null)
      scheduleIdle()
    }
    const events = ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart']
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }))
    scheduleIdle()
    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [enabled, scheduleIdle])

  return { idleAnimation, onAnimationComplete }
}

/**
 * On mount, checks localStorage for the last visit time.  If the user has been
 * away for more than 30 minutes (or this is their first visit), returns
 * `shouldGreet = true` so the robot can play its welcome animation.
 * Always stores the current visit time.
 */
export function useWelcomeAnimation() {
  const [shouldGreet, setShouldGreet] = useState(false)

  useEffect(() => {
    const now = Date.now()
    const last = localStorage.getItem(STORAGE_KEY)
    localStorage.setItem(STORAGE_KEY, String(now))

    if (!last || now - parseInt(last, 10) >= WELCOME_THRESHOLD) {
      setShouldGreet(true)
    }
  }, [])

  const onGreetingComplete = useCallback(() => setShouldGreet(false), [])

  return { shouldGreet, onGreetingComplete }
}
