// components/obs/admin-panel-temp.tsx

'use client'

import { useEffect, useState, useMemo } from 'react'
import { setTargetVisibility } from '@/lib/api/targets'
import { useSocketState } from '@/lib/socket/useSocketState'

type AdminTarget = {
  id: number
  name: string
  visible: boolean
  completed: boolean
  goal: number | null
  current: number
}

export function AdminPanelTemp() {
  const [allTargets, setAllTargets] = useState<AdminTarget[]>([])
  const [loading, setLoading] = useState(true)
  const { snapshot, isConnected } = useSocketState()

  // 🔹 Carrega TODOS os targets via HTTP (apenas uma vez)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/targets`)
      .then((response) => response.json())
      .then((data) => {
        setAllTargets(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('FETCH ERROR:', error)
        setLoading(false)
      })
  }, [])

  // 🔥 Deriva o estado final combinando allTargets + snapshot
  const targets = useMemo(() => {
    if (!snapshot) return allTargets

    const visibleIds = new Set(snapshot.targets.map((t) => t.id))

    return allTargets.map((target) => {
      const snapshotTarget = snapshot.targets.find((t) => t.id === target.id)

      return {
        ...target,
        visible: visibleIds.has(target.id),
        current: snapshotTarget?.current ?? target.current,
        completed: snapshotTarget?.completed ?? target.completed,
      }
    })
  }, [allTargets, snapshot])

  if (loading && targets.length === 0) {
    return <div className="text-white">Loading admin panel…</div>
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded w-64">
      <h2 className="font-bold mb-2">Admin Panel</h2>

      {!isConnected && <div className="text-yellow-500 text-xs mb-2">Reconectando...</div>}

      {targets.map((target) => (
        <label key={target.id} className="flex gap-2 items-center mb-1">
          <input
            type="checkbox"
            checked={target.visible}
            disabled={!isConnected}
            onChange={async (event) => {
              const newVisibleValue = event.target.checked

              try {
                await setTargetVisibility(target.id, newVisibleValue)
                // Socket.IO vai atualizar snapshot automaticamente
              } catch (error) {
                console.error('Failed to update visibility:', error)
              }
            }}
          />
          <span className="text-sm">
            #{target.name}
            {target.completed && ' ✓'}
            {target.visible && (
              <span className="text-xs text-gray-400 ml-1">
                ({target.current}/{target.goal ?? '?'})
              </span>
            )}
          </span>
        </label>
      ))}
    </div>
  )
}
