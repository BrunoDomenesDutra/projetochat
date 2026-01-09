// components/obs/thematic-metas.tsx
'use client'

import { useSocketState } from '@/lib/socket/useSocketState'
import { ProgressBar } from '../ui/progress-bar/progress-bar'

export function ThematicMetas() {
  const { fullState, isLoading, isConnected } = useSocketState()

  const thematicMetas =
    fullState?.metas.filter((meta) => !meta.name.startsWith('geral_')).sort((a, b) => a.goal - b.goal) || []

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white">Metas Especiais</h2>
      </div>

      {thematicMetas.map((meta) => (
        <div key={meta.name} className="p-4 rounded-lg bg-blue-400/40">
          <div className="font-medium text-white mb-2">#{meta.name}</div>
          <ProgressBar value={meta.current} max={meta.goal} rightText={`$${meta.goal.toFixed(2)}`} />
        </div>
      ))}

      {!isConnected && <div className="mt-2 text-center text-yellow-500 text-xs">Reconectando...</div>}
    </div>
  )
}
