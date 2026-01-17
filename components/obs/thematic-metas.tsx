// components/obs/thematic-metas.tsx
'use client'

import { useSocketState } from '@/lib/socket/useSocketState'
import { useMemo } from 'react'
import { ProgressBar } from '../ui/progress-bar/progress-bar'
import { motion, AnimatePresence } from 'framer-motion'
import { targetVariants, transitions } from '../animations'

export function ThematicMetas() {
  const { snapshot, events } = useSocketState()

  const justCompletedIds = useMemo(() => {
    if (!events) return new Set<number>()
    return new Set(events.targetsCompleted.map((e) => e.id))
  }, [events])

  if (!snapshot) return null

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <AnimatePresence mode="popLayout">
        {snapshot.targets.map((target) => {
          const isJustCompleted = justCompletedIds.has(target.id)

          return (
            <motion.div
              key={target.id}
              variants={targetVariants}
              initial="initial"
              animate={isJustCompleted ? 'completed' : 'animate'}
              exit="exit"
              transition={isJustCompleted ? transitions.completed : transitions.smooth}
              layout
              className="bg-gray-800 rounded p-3 text-white"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">#{target.name}</span>
                <span>
                  {target.current} / {target.goal}
                </span>
              </div>

              <ProgressBar
                value={target.current}
                max={target.goal ?? 1}
                rightText={target.completed ? 'COMPLETED' : ''}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
