// components/obs/thematic-metas.tsx
'use client'

import { useSocketState } from '@/lib/socket/useSocketState'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar'

export function ThematicMetas() {
  const { snapshot } = useSocketState()

  if (!snapshot) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {snapshot.targets.map((target) => (
        <div key={target.id} className="bg-gray-800 rounded p-3 text-white">
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
