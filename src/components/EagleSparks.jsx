import './EagleSparks.css'

const COLORS = ['#fff7e0', '#ffe08a', '#f5c518', '#e8edf5']

// Fixed seeds keep the effect stable across scroll-driven renders.
const SPARKS = Array.from({ length: 36 }, (_, i) => {
  const clockwise = i % 2 === 0 ? 1 : -1
  return {
    // golden angle spreads the orbit start points evenly around the bird
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
 * Stardust around the eagle.
 * - idle:    each spark spirals around the bird in its own random direction
 * - up:      the bird climbs, so the dust streams downward
 * - down:    the bird dives, so the dust streams upward
 */
export default function EagleSparks({ mode = 'idle' }) {
  return (
    <div aria-hidden="true" className={`eagle-sparks is-${mode}`}>
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          className={`eagle-spark ${spark.star ? 'eagle-spark-star' : ''}`}
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
