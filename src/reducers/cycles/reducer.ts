import { LocalStorageCycles } from '@/localstorage/cycles'

import {
  CyclesActionTypes,
  type ICyclesActions,
  type ICyclesState,
} from './types'

export function cyclesReducer(
  state: ICyclesState,
  action: ICyclesActions,
): ICyclesState {
  switch (action.type) {
    case CyclesActionTypes.CREATE_NEW_CYCLE: {
      if (!action.payload?.newCycle) {
        return state
      }

      const newState = {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

      LocalStorageCycles.saveCyclesState(newState)
      return newState
    }
    case CyclesActionTypes.INTERRUPT_CYCLE: {
      const newState = {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedDate: new Date(),
            }
          }

          return cycle
        }),
        activeCycleId: null,
      }

      LocalStorageCycles.saveCyclesState(newState)
      return newState
    }
    case CyclesActionTypes.FINISH_CYCLE: {
      const newState = {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: new Date(),
            }
          }

          return cycle
        }),
        activeCycleId: null,
      }

      LocalStorageCycles.saveCyclesState(newState)
      return newState
    }
    case CyclesActionTypes.PAUSE_CYCLE: {
      const newState = {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              pausedDate: new Date(),
            }
          }

          return cycle
        }),
      }

      LocalStorageCycles.saveCyclesState(newState)
      return newState
    }
    case CyclesActionTypes.DELETE_CYCLE: {
      const newState = {
        ...state,
        cycles: state.cycles.filter(
          (cycle) => cycle.id !== action.payload?.cycleId,
        ),
      }

      LocalStorageCycles.saveCyclesState(newState)
      return newState
    }
    default:
      LocalStorageCycles.saveCyclesState(state)
      return state
  }
}
