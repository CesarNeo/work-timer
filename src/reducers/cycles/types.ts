import type { ICycle } from '@/templates/home/types'

interface ICyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

enum CyclesActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  PAUSE_CYCLE = 'PAUSE_CYCLE',
  DELETE_CYCLE = 'DELETE_CYCLE',
}

type ICyclesActions = {
  type: keyof typeof CyclesActionTypes
  payload?: {
    newCycle?: ICycle
    cycleId?: string
  }
}

export type { ICyclesState, ICyclesActions }
export { CyclesActionTypes }
