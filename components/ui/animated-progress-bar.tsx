// components/ui/animated-progress-bar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

interface AnimatedProgressBarProps {
  value: number // valor atual da meta (ex: 450)
  max: number // meta total (ex: 500)
  className?: string
}

export function AnimatedProgressBar({ value, max, className = '' }: AnimatedProgressBarProps) {
  const targetProgress = Math.min(100, (value / max) * 100)
  const [displayProgress, setDisplayProgress] = useState(targetProgress)
  const animationRef = useRef<number | null>(null)
  const lastProgressRef = useRef(targetProgress)

  useEffect(() => {
    // Se o valor não mudou, não anima
    if (targetProgress === lastProgressRef.current) {
      return
    }

    const start = lastProgressRef.current
    const end = targetProgress
    const duration = 800 // ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const t = Math.min(elapsed / duration, 1)
      // Easing: easeOutQuart
      const ease = 1 - Math.pow(1 - t, 4)
      const current = start + (end - start) * ease
      setDisplayProgress(current)
      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        lastProgressRef.current = end
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetProgress])

  return (
    <div className={`w-full bg-secondary rounded-full h-2 overflow-hidden ${className}`}>
      <div className="bg-red-500 h-full rounded-full" style={{ width: `${displayProgress}%` }} />
    </div>
  )
}
