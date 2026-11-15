/**
 * Shared flight maths for the mascot.
 *
 * Scroll handlers only set a target; a requestAnimationFrame loop damps the
 * robot onto it. Doing the easing per frame (instead of a CSS transition that
 * restarts on every scroll event) keeps the flight smooth at any frame rate
 * and lets the 3D model know how fast it is actually travelling.
 */

/** Frame-rate independent ease of `value` towards `goal`. */
export function dampTowards(value, goal, delta, stiffness = 11) {
  return value + (goal - value) * (1 - Math.exp(-stiffness * delta))
}

/** The distance the robot really covered this frame, per second. */
export function travelSpeed(fromX, fromY, toX, toY, delta) {
  return delta > 0 ? Math.hypot(toX - fromX, toY - fromY) / delta : 0
}
