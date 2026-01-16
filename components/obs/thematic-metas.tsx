// components/obs/thematic-metas.tsx
'use client'

import { useSocketState } from '@/lib/socket/useSocketState'
import { useEffect, useRef } from 'react'
import { usePrevious } from '@/lib/hooks/usePrevious'
import { ProgressBar } from '../ui/progress-bar/progress-bar'

export function ThematicMetas() {
  const { snapshot, events } = useSocketState()
  const refs = useRef<Record<number, HTMLDivElement | null>>({})

  // ✅ Obtém IDs do snapshot anterior
  const previousSnapshot = usePrevious(snapshot)

  // 🔥 Detecta e anima targets que APARECERAM
  useEffect(() => {
    if (!snapshot || !previousSnapshot) return

    const currentIds = new Set(snapshot.targets.map((t) => t.id))
    const previousIds = new Set(previousSnapshot.targets.map((t) => t.id))
    const newIds = [...currentIds].filter((id) => !previousIds.has(id))

    // Sincroniza com sistema externo (DOM)
    newIds.forEach((id) => {
      const element = refs.current[id]
      if (!element) return

      element.classList.add('meta-appear-anim')
      setTimeout(() => {
        element.classList.remove('meta-appear-anim')
      }, 600)
    })
  }, [snapshot, previousSnapshot])

  // 🔥 Anima targets completados
  useEffect(() => {
    if (!events) return

    // Sincroniza com sistema externo (DOM)
    events.targetsCompleted.forEach((completedTargetEvent) => {
      const targetElement = refs.current[completedTargetEvent.id]
      if (!targetElement) return

      targetElement.classList.add('meta-completed-anim')
      setTimeout(() => {
        targetElement.classList.remove('meta-completed-anim')
      }, 1500)
    })
  }, [events])

  if (!snapshot) return null

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {snapshot.targets.map((target) => (
        <div
          key={target.id}
          ref={(el) => {
            refs.current[target.id] = el
          }}
          className="bg-gray-800 rounded p-3 text-white"
        >
          <div className="flex justify-between mb-2">
            <span className="font-semibold">#{target.name}</span>
            <span>
              {target.current} / {target.goal}
            </span>
          </div>

          <ProgressBar value={target.current} max={target.goal ?? 1} rightText={target.completed ? 'COMPLETED' : ''} />
        </div>
      ))}
    </div>
  )
}
