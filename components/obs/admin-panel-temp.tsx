// components/obs/admin-panel-temp.tsx

'use client'

import { useEffect, useState } from 'react'
import { setTargetVisibility } from '@/lib/api/targets'

type AdminTarget = {
  id: number
  name: string
  visible: boolean
  completed: boolean
}

export function AdminPanelTemp() {
  const [targets, setTargets] = useState<AdminTarget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('BACKEND URL:', process.env.NEXT_PUBLIC_BACKEND_URL)

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/targets`)
      .then((response) => response.json())
      .then((data) => setTargets(data))
      .catch((error) => {
        console.error('FETCH ERROR:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/targets`)
      .then((response) => response.json())
      .then((data) => setTargets(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-white">Loading admin panel…</div>
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded w-64">
      <h2 className="font-bold mb-2">Admin Panel (Temp)</h2>

      {targets.map((target) => (
        <label key={target.id} className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={target.visible}
            onChange={async (event) => {
              const newVisibleValue = event.target.checked
              await setTargetVisibility(target.id, newVisibleValue)

              setTargets((previousTargets) =>
                previousTargets.map((currentTarget) =>
                  currentTarget.id === target.id ? { ...currentTarget, visible: newVisibleValue } : currentTarget
                )
              )
            }}
          />
          #{target.name}
          {target.completed && ' (completed)'}
        </label>
      ))}
    </div>
  )
}
