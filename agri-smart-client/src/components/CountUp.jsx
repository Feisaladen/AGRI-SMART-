import { useEffect, useState } from 'react'

const CountUp = ({ value = 0, duration = 900 }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reducedMotion ? 0 : duration
    const start = performance.now()
    let frame

    const tick = (now) => {
      const progress = total === 0 ? 1 : Math.min((now - start) / total, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(Number(value) * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return <>{display.toLocaleString()}</>
}

export default CountUp
