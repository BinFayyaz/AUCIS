const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  left: `${6 + ((i * 31) % 88)}%`,
  bottom: `${6 + ((i * 17) % 46)}%`,
  size: `${1.4 + (i % 3) * 0.7}px`,
  dx: -5 - ((i * 13) % 20),
  dy: 9 + ((i * 7) % 24),
  duration: `${3 + ((i * 11) % 24) / 10}s`,
  delay: `-${((i * 37) % 45) / 10}s`,
  peak: 0.3 + ((i * 29) % 45) / 100,
}))

/**
 * Tiny star-like sparks shed from behind the eagle. They keep drifting while
 * the page is still, and stream out further while it is being scrolled.
 */
export default function EagleSparks({ moving = false, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`eagle-sparks pointer-events-none absolute ${moving ? 'is-moving' : ''} ${className}`}
    >
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          className="eagle-spark absolute rounded-full bg-cream"
          style={{
            left: spark.left,
            bottom: spark.bottom,
            width: spark.size,
            height: spark.size,
            '--spark-x': `${spark.dx}px`,
            '--spark-y': `${spark.dy}px`,
            '--spark-peak': spark.peak,
            '--spark-duration': spark.duration,
            '--spark-delay': spark.delay,
          }}
        />
      ))}
    </div>
  )
}
