// components/obs/thematic-metas.tsx
import { useSocketState } from '@/lib/socket/useSocketState'
import { useEffect, useRef } from 'react'
import { ProgressBar } from '../ui/progress-bar/progress-bar'

export function ThematicMetas() {
  const { snapshot, events } = useSocketState()
  const refs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!events) return

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
