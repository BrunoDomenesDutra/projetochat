// projetochat/lib/socket/types.ts

export interface MetaState {
  id?: number
  active?: boolean
  name: string
  current: number
  goal: number
  completed?: boolean
  completed_at?: string | null
}

export interface FullState {
  global: { totalAmount: number }
  metas: MetaState[]
}
