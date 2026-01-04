// components/obs/thematic-metas.tsx
'use client'

import { useEffect, useState } from 'react'
import { getSocket } from '@/lib/socket/client'
import { AnimatedProgressBar } from '@/components/ui/animated-progress-bar'

interface MetaState {
  name: string
  current: number
  goal: number
}

interface FullState {
  global: { totalAmount: number }
  metas: MetaState[]
}

export function ThematicMetas() {
  const [fullState, setFullState] = useState<FullState | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()

    const handleFullState = (FullState: FullState) => {
      setFullState(FullState)
    }

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on('fullState', handleFullState)
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('fullState', handleFullState)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [])

  if (!fullState) {
    return (
      <div className="flex items-center justify-center h-full text-white bg-black bg-opacity-50">
        <p>Carregando metas...</p>
      </div>
    )
  }

  // ✅ Filtra só metas temáticas (não começam com "geral_")
  const thematicMetas = fullState.metas.filter((meta) => !meta.name.startsWith('geral_'))

  if (thematicMetas.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-blue-400 bg-opacity-40 rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white">Metas Especiais</h2>
      </div>

      <div className="space-y-4">
        {thematicMetas.map((meta) => {
          const progress = Math.min(100, (meta.current / meta.goal) * 100)
          return (
            <div key={meta.name} className="space-y-2">
              <div className="flex justify-between text-white text-sm">
                <span className="font-medium">#{meta.name}</span>
                <span>
                  ${meta.current.toFixed(2)} / ${meta.goal.toFixed(2)} ({progress.toFixed(1)}%)
                </span>
              </div>
              <AnimatedProgressBar value={meta.current} max={meta.goal} />
            </div>
          )
        })}
      </div>

      {!isConnected && <div className="mt-2 text-center text-yellow-500 text-xs">Reconectando...</div>}
    </div>
  )
}
