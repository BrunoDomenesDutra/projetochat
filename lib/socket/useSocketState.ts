// projetochat/lib/socket/useSocketState.ts
'use client'

import { useEffect, useState } from 'react'
import { getSocket } from './client'
import { AnimatablePayload, Snapshot } from './types'

export const useSocketState = () => {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [events, setEvents] = useState<AnimatablePayload['events'] | null>(null)
  const [meta, setMeta] = useState<AnimatablePayload['meta'] | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const socket = getSocket()

    const handleState = (payload: AnimatablePayload) => {
      setSnapshot(payload.snapshot)
      setEvents(payload.events)
      setMeta(payload.meta)
      setIsLoading(false)
    }

    socket.on('state', handleState)
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.off('state', handleState)
    }
  }, [])

  return {
    snapshot,
    events,
    meta,
    isConnected,
    isLoading,
  }
}
