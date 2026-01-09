// projetochat/lib/socket/types.ts

export interface MetaState {
  id?: number
  name: string
  current: number
  goal: number
}

export interface FullState {
  global: { totalAmount: number }
  metas: MetaState[]
}
