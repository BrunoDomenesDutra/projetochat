// components/obs/donation-progress.tsx
'use client'

import { useEffect, useState } from 'react'
import { getSocket } from '@/lib/socket/client'
import { SimpleProgressBar } from '../ui/progress-bar/simple-progress-bar'

interface MetaState {
  name: string
  current: number
  goal: number
}

interface FullState {
  global: { totalAmount: number }
  metas: MetaState[]
}

export function DonationProgress() {
  const [fullState, setFullState] = useState<FullState | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()
    const handleFullState = (data: FullState) => {
      setFullState(data)
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
      <div className="flex items-center justify-center h-20 text-white bg-black bg-opacity-50">
        <p>Carregando...</p>
      </div>
    )
  }

  // 🔁 Encontra a PRÓXIMA meta geral a ser alcançada
  const total = fullState.global.totalAmount
  let currentGoal = 500 // meta inicial padrão
  let reachedGoals = 0

  // Supõe que as metas gerais estão ordenadas por valor (500, 1000, 1500, ...)
  const generalMetas = fullState.metas.filter((meta) => meta.name.startsWith('geral_')).sort((a, b) => a.goal - b.goal)

  // Calcula quantas metas já foram atingidas
  for (const meta of generalMetas) {
    if (total >= meta.goal) {
      currentGoal = meta.goal
      reachedGoals++
    } else {
      currentGoal = meta.goal
      break
    }
  }

  // Se todas forem atingidas, cria a próxima meta (ex: última + 500)
  if (reachedGoals === generalMetas.length && generalMetas.length > 0) {
    const lastGoal = generalMetas[generalMetas.length - 1].goal
    currentGoal = lastGoal + 500 // ou o incremento que você quiser
  }

  // Define o rótulo da meta (você pode personalizar isso)
  const metaLabel = `META ${currentGoal}`

  return (
    <div className="w-full max-w-2xl mx-auto p-2">
      <SimpleProgressBar
        value={total}
        max={currentGoal}
        label={metaLabel}
        currentAmount={total}
        currency="R$" // Ajuste conforme necessário
      />
      {!isConnected && <div className="mt-2 text-center text-yellow-500 text-xs">Reconectando...</div>}
    </div>
  )
}
