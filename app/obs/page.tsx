// app/obs/page.tsx
'use client'

import { ThematicMetas } from '@/components/obs/thematic-metas'
import { useEffect } from 'react'

export default function ObsDonationPage() {
  // useEffect(() => {
  //   // Remove fundo branco para OBS (fundo transparente)
  //   document.body.classList.add('bg-transparent')
  //   document.documentElement.classList.add('bg-transparent')
  //   return () => {
  //     document.body.classList.remove('bg-transparent')
  //     document.documentElement.classList.remove('bg-transparent')
  //   }
  // }, [])

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-transparent p-4">
      <ThematicMetas />
    </div>
  )
}
