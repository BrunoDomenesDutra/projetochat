// components/obs/thematic-metas.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSocketState } from '@/lib/socket/useSocketState'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar'

export function ThematicMetas() {
  const { fullState } = useSocketState()
  const [hiddenMetaIds, setHiddenMetaIds] = useState<Set<number>>(() => {
    // Carrega metas escondidas do localStorage ao inicializar
    if (typeof window === 'undefined') return new Set()
    const stored = localStorage.getItem('hiddenThematicMetas')
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  // Sincroniza hiddenMetaIds com localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('hiddenThematicMetas', JSON.stringify(Array.from(hiddenMetaIds)))
  }, [hiddenMetaIds])

  useEffect(() => {
    if (!fullState) return

    // Detecta metas que foram concluídas AGORA (transition: null → string)
    const newlyCompleted = fullState.metas.filter(
      (meta) =>
        !meta.name.startsWith('geral_') &&
        meta.completed_at && // agora tem data
        !hiddenMetaIds.has(meta.id!) // e ainda não está marcada pra esconder
    )

    if (newlyCompleted.length > 0) {
      // Tempo total: celebrate-pulse (0.6s) + blink (4 * 0.5s = 2s) + margem
      const totalAnimationTime = 0.6 * 1000 + 2 * 1000 + 300 // ~2.9s

      const timeoutId = setTimeout(() => {
        setHiddenMetaIds((prev) => {
          const newSet = new Set(prev)
          newlyCompleted.forEach((meta) => {
            if (meta.id != null) newSet.add(meta.id)
          })
          return newSet
        })
      }, totalAnimationTime)

      return () => clearTimeout(timeoutId)
    }
  }, [fullState, hiddenMetaIds])

  if (!fullState) return null

  const thematicMetas = fullState.metas
    .filter((meta) => !meta.name.startsWith('geral_'))
    .filter((meta) => !hiddenMetaIds.has(meta.id!)) // 👈 esconde as concluídas
    .sort((a, b) => a.goal - b.goal)

  if (thematicMetas.length === 0) return null

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 w-3xl gap-4">
        {thematicMetas.map((meta) => {
          const isCompleted = !!meta.completed_at
          const bgColor = isCompleted ? 'bg-yellow-400/50' : 'bg-blue-400/40'
          const animateClass = isCompleted ? 'animate-celebrate-once animate-blink-then-fade' : ''

          return (
            <div key={meta.id} className={`p-4 rounded-lg ${bgColor} ${animateClass}`}>
              <div className="font-medium text-white mb-2">#{meta.name}</div>
              <ProgressBar value={meta.current} max={meta.goal} rightText={`$${meta.goal.toFixed(2)}`} />
            </div>
          )
        })}
      </div>
      {/* <pre>{JSON.stringify(thematicMetas, null, 2)}</pre> */}
    </div>
  )
}
