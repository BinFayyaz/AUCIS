import { useEffect, useRef, useState } from 'react'

/** Counts from 0 up to `value` with an ease-out curve when scrolled into view. */
export default function CountUp({ value }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    const element = countRef.current
    if (!element) return

    let frameId
    const duration = 1600
    const startAnimation = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value)
        return
      }

      const startTime = performance.now()
      const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const easedProgress = 1 - (1 - progress) ** 3
        setCount(Math.floor(value * easedProgress))

        if (progress < 1) {
          frameId = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    if (!('IntersectionObserver' in window)) {
      startAnimation()
      return () => cancelAnimationFrame(frameId)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          startAnimation()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [value])

  return (
    <span ref={countRef} aria-label={`${value}+`}>
      {count}+
    </span>
  )
}
