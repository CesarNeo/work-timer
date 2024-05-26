import type { ICycle } from '@/pages/home/types'

interface ICyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

enum CyclesActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  PAUSE_CYCLE = 'PAUSE_CYCLE',
}

type ICyclesActions = {
  type: keyof typeof CyclesActionTypes
  payload?: {
    newCycle: ICycle
  }
}

export type { ICyclesState, ICyclesActions }
export { CyclesActionTypes }
