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
    case CyclesActionTypes.CREATE_NEW_CYCLE:
      if (!action.payload?.newCycle) {
        return state
      }

      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case CyclesActionTypes.INTERRUPT_CYCLE:
      return {
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

    case CyclesActionTypes.FINISH_CYCLE:
      return {
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
    default:
      return state
  }
}
