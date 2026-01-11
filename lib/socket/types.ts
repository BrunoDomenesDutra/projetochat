// projetochat/lib/socket/types.ts

export interface TargetSnapshot {
  id: number
  name: string
  goal: number | null
  current: number
  completed: boolean
}

export interface IncentiveSnapshot {
  id: number
  name: string
  trigger: number
  unlocked: boolean
  unlockedAt?: string | null
}

export interface Snapshot {
  total: number
  targets: TargetSnapshot[]
  incentives: IncentiveSnapshot[]
}

export interface AnimatableEvents {
  targetsCompleted: {
    id: number
    name: string
    completedAt: string
  }[]
  incentivesUnlocked: {
    id: number
    name: string
    unlockedAt: string
  }[]
}

export interface AnimatablePayload {
  snapshot: Snapshot
  events: AnimatableEvents
  meta: {
    reason: 'initial_state' | 'donation_processed'
    emittedAt: string
  }
}
