import './RobotSparks.css'

const COLORS = ['#eafff9', '#8ff0d9', '#5cd6c0', '#dfe9ff']

// Fixed seeds keep the effect stable across scroll-driven renders.
const SPARKS = Array.from({ length: 18 }, (_, i) => {
  const clockwise = i % 2 === 0 ? 1 : -1
  return {
    // golden angle spreads the orbit start points evenly around the robot
    angle: (i * 137.5) % 360,
    radius: 54 + ((i * 31) % 96),
    size: i % 5 === 0 ? 6 : 2.5 + (i % 3),
    drift: ((i * 43) % 110) - 55,
    // mix of half and full turns in both directions = random spiral paths
    turn: clockwise * (i % 3 === 0 ? 720 : 360),
    duration: 3.6 + ((i * 17) % 26) / 10,
    delay: -((i * 31) % 48) / 10,
    star: i % 4 === 0,
    color: COLORS[i % COLORS.length],
  }
})

/**
 * Energy motes around the robot.
 * - idle:    each mote spirals around the mech in its own random direction
 * - up:      the robot climbs, so the motes stream downward
 * - down:    the robot drops, so the motes stream upward
 */
export default function RobotSparks({ mode = 'idle' }) {
  return (
    <div aria-hidden="true" className={`robot-sparks is-${mode}`}>
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          className={`robot-spark ${spark.star ? 'robot-spark-star' : ''}`}
          style={{
            width: spark.size,
            height: spark.size,
            '--spark-color': spark.color,
            '--spark-a': `${spark.angle}deg`,
            '--spark-turn': `${spark.turn}deg`,
            '--spark-r': `${spark.radius}px`,
            '--spark-x0': `${spark.drift * 0.25}px`,
            '--spark-x1': `${spark.drift}px`,
            '--spark-duration': `${spark.duration}s`,
            '--spark-delay': `${spark.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
