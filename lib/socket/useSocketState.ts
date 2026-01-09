// projetochat/lib/socket/useSocketState.ts
'use client'

import { useState, useEffect } from 'react'
import { getSocket } from './client'
import { FullState } from './types'

export const useSocketState = () => {
  const [fullState, setFullState] = useState<FullState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()

    const handleFullState = (data: FullState) => {
      setFullState(data)
      setIsLoading(false)
    }

    const handleConnect = () => {
      setIsConnected(true)
      setIsLoading(false)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      setIsLoading(true)
    }

    const handleError = (error: Error) => {
      console.error('Socket.IO Error:', error)
    }

    // Só adiciona listeners se ainda não tiverem sido adicionados
    // (por conta do singleton, evita duplicatas)
    socket.on('fullState', handleFullState)
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleError)

    // Força um pedido de estado inicial (opcional)
    socket.emit('getState') // se quiser implementar no worker

    return () => {
      socket.off('fullState', handleFullState)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleError)
    }
  }, [])

  return { fullState, isLoading, isConnected }
}
