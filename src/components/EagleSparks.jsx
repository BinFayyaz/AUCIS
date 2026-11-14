import './EagleSparks.css'

// Fixed seeds keep the continuous trail stable through scroll-driven renders.
const SPARKS = Array.from({ length: 40 }, (_, i) => ({
  x: ((i * 11) % 29) - 14,
  y: ((i * 7) % 13) - 6,
  size: i % 4 === 0 ? 5 + (i % 3) : 2.5 + (i % 3) * 0.5,
  dx: ((i * 37) % 105) - 52,
  dy: 40 + ((i * 19) % 45),
  duration: 2.6 + ((i * 11) % 18) / 10,
  delay: -((i * 23) % 42) / 10,
  star: i % 4 === 0,
  cool: i % 3 === 0,
}))

/** Bright, tiny stars and embers emitted from the tail, including while idle. */
export default function EagleSparks({ moving = false }) {
  return (
    <div aria-hidden="true" className={`eagle-sparks ${moving ? 'is-moving' : ''}`}>
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          className={`eagle-spark ${spark.star ? 'eagle-spark-star' : ''}`}
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            '--spark-x': `${spark.dx}px`,
            '--spark-y': `${spark.dy}px`,
            '--spark-color': spark.cool ? '#bfe8ff' : '#fff0c4',
            '--spark-duration': `${spark.duration}s`,
            '--spark-delay': `${spark.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
