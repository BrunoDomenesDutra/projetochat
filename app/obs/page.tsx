// app/obs/page.tsx
'use client'

import { useState } from 'react'
import { ThematicMetas } from '@/components/obs/thematic-metas'
import { AdminPanelTemp } from '@/components/obs/admin-panel-temp'

export default function ObsDonationPage() {
  const [visibleTargets, setVisibleTargets] = useState<number[]>([])

  return (
    <div className="flex gap-6 p-4">
      <ThematicMetas />
      <AdminPanelTemp />
    </div>
  )
}
