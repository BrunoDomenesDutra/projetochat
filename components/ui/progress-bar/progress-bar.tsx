// components/ui/progress-bar/progress-bar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

export type ProgressBarProps = {
  value: number
  max: number
  rightText: string
  className?: string
}

export function ProgressBar({ value, max, rightText, className = '' }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(value, max))
  const targetPercentage = max > 0 ? (safeValue / max) * 100 : 0

  const [displayedPercentage, setDisplayedPercentage] = useState(targetPercentage)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const startPercentage = displayedPercentage
    const endPercentage = targetPercentage
    const duration = 1200
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = startPercentage + (endPercentage - startPercentage) * easeOut
      setDisplayedPercentage(current)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    if (startPercentage !== endPercentage) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetPercentage])

  const formattedPercentage = Math.round(displayedPercentage)

  return (
    <div className={`relative h-8 bg-gray-700 rounded overflow-hidden ${className}`}>
      {/* Barra de progresso com transição suave */}
      <div
        className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-1200 ease-out"
        style={{ width: `${targetPercentage}%` }}
      />

      <div className="absolute inset-0 flex justify-between items-center px-2 text-white text-sm font-medium">
        <span>{formattedPercentage}%</span>
        <span>{rightText}</span>
      </div>
    </div>
  )
}
