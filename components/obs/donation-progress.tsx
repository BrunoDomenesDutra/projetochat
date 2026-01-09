// components/obs/donation-progress.tsx
'use client'

import { useSocketState } from '@/lib/socket/useSocketState'
import { AnimatedProgressBar } from '@/components/ui/animated-progress-bar'

export function DonationProgress() {
  const { fullState, isLoading, isConnected } = useSocketState()

  if (isLoading || !fullState) {
    return (
      <div className="flex items-center justify-center h-full text-white bg-black bg-opacity-50">
        <p>Carregando...</p>
      </div>
    )
  }

  const total = fullState.global.totalAmount
  let currentGoal = 500
  let reachedGoals = 0

  const generalMetas = fullState.metas.filter((meta) => meta.name.startsWith('geral_')).sort((a, b) => a.goal - b.goal)

  for (const meta of generalMetas) {
    if (total >= meta.goal) {
      currentGoal = meta.goal
      reachedGoals++
    } else {
      currentGoal = meta.goal
      break
    }
  }

  if (reachedGoals === generalMetas.length && generalMetas.length > 0) {
    const lastGoal = generalMetas[generalMetas.length - 1].goal
    currentGoal = lastGoal + 500
  }

  const progress = Math.min(100, (total / currentGoal) * 100)

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-blue-400 bg-opacity-40 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Meta da Stream</h1>
        <p className="text-black text-lg">Total: ${total.toFixed(2)}</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-white text-sm">
            <span className="font-medium">GERAL</span>
            <span>
              ${total.toFixed(2)} / ${currentGoal.toFixed(2)} ({progress.toFixed(1)}%)
            </span>
          </div>
          <AnimatedProgressBar value={total} max={currentGoal} />
        </div>
      </div>

      {!isConnected && <div className="mt-4 text-center text-yellow-500 text-sm">Reconectando...</div>}
    </div>
  )
}
