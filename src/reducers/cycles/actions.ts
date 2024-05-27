import type { ICycle } from '@/templates/home/types'

import { CyclesActionTypes } from './types'

const ReducerActions = {
  createNewCycle: (newCycle: ICycle) => {
    return {
      type: CyclesActionTypes.CREATE_NEW_CYCLE,
      payload: { newCycle },
    }
  },
  interruptCycle: () => {
    return { type: CyclesActionTypes.INTERRUPT_CYCLE }
  },
  finishCycle: () => {
    return { type: CyclesActionTypes.FINISH_CYCLE }
  },
  pauseCycle: () => {
    return { type: CyclesActionTypes.PAUSE_CYCLE }
  },
  deleteCycle: (cycleId: string) => {
    return {
      type: CyclesActionTypes.DELETE_CYCLE,
      payload: { cycleId },
    }
  },
}

export { ReducerActions }
