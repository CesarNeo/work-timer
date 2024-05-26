import type { ICycle } from '@/pages/home/types'

import { CyclesActionTypes } from './types'

function createNewCycleAction(newCycle: ICycle) {
  return {
    type: CyclesActionTypes.CREATE_NEW_CYCLE,
    payload: { newCycle },
  }
}

function interruptCycleAction() {
  return { type: CyclesActionTypes.INTERRUPT_CYCLE }
}

function finishCycleAction() {
  return { type: CyclesActionTypes.FINISH_CYCLE }
}

function pauseCycleAction() {
  return { type: CyclesActionTypes.PAUSE_CYCLE }
}

export {
  createNewCycleAction,
  interruptCycleAction,
  finishCycleAction,
  pauseCycleAction,
}
