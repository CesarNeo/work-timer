import type { ICyclesState } from '@/reducers/cycles/types'
import type { ICycle } from '@/templates/home/types'

const LocalStorageCycles = {
  getCyclesState: (initialState: ICyclesState): ICyclesState => {
    if (typeof window === 'undefined') {
      return initialState
    }

    const cyclesState = localStorage.getItem('@ignite-timer:cycles-state')

    if (!cyclesState) {
      return initialState
    }

    const parsedCyclesState = JSON.parse(cyclesState)

    return {
      ...parsedCyclesState,
      cycles: parsedCyclesState.cycles.map((cycle: ICycle) => ({
        ...cycle,
        startDate: new Date(cycle.startDate),
        finishedDate: cycle.finishedDate ? new Date(cycle.finishedDate) : null,
        interruptedDate: cycle.interruptedDate
          ? new Date(cycle.interruptedDate)
          : null,
        pausedDate: cycle.pausedDate ? new Date(cycle.pausedDate) : null,
      })),
    }
  },

  saveCyclesState: (cyclesState: ICyclesState) => {
    localStorage.setItem(
      '@ignite-timer:cycles-state',
      JSON.stringify(cyclesState),
    )
  },
}

export { LocalStorageCycles }
