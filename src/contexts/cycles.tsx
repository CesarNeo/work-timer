'use client'

import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'

import { getCyclesStateFromLocalStorage } from '@/localstorage/cycles'
import type { ICycle } from '@/pages/home/types'
import {
  createNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
  pauseCycleAction,
} from '@/reducers/cycles/actions'
import { cyclesReducer } from '@/reducers/cycles/reducer'
import type { ICyclesState } from '@/reducers/cycles/types'

interface ICyclesContext {
  cycles: ICycle[]
  currentCycle: ICycle | undefined
  activeCycleId: string | null
  hasActiveCycle: boolean
  amountSecondsPassed: number
  createNewCycle: (cycle: Omit<ICycle, 'id' | 'startDate'>) => void
  markCurrentCycleAsFinished: () => void
  interruptCycle: () => void
  updateAmountSecondsPassed: (seconds: number) => void
  resetAmountSecondsPassed: () => void
  pauseCycle: () => void
}

const CyclesContext = createContext({} as ICyclesContext)

const defaultCyclesState: ICyclesState = {
  cycles: [] as ICycle[],
  activeCycleId: null,
}

function CyclesProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    defaultCyclesState,
    getCyclesStateFromLocalStorage,
  )
  const { cycles, activeCycleId } = cyclesState
  const currentCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const hasActiveCycle = Boolean(currentCycle)

  const [amountSecondsPassedState, setAmountSecondsPassedState] = useState(
    () => {
      if (hasActiveCycle && currentCycle) {
        return differenceInSeconds(new Date(), currentCycle.startDate)
      }

      return 0
    },
  )

  const markCurrentCycleAsFinished = useCallback(
    () => dispatch(finishCycleAction()),
    [],
  )

  const updateAmountSecondsPassed = useCallback(
    (seconds: number) => setAmountSecondsPassedState(seconds),
    [],
  )

  const resetAmountSecondsPassed = useCallback(
    () => updateAmountSecondsPassed(0),
    [updateAmountSecondsPassed],
  )

  const interruptCycle = useCallback(() => dispatch(interruptCycleAction()), [])
  const pauseCycle = useCallback(() => dispatch(pauseCycleAction()), [])

  const createNewCycle = useCallback(
    ({ task, timeAmount, timeUnit }: Omit<ICycle, 'id' | 'startDate'>) => {
      const cycleId = crypto.randomUUID()

      const newCycle: ICycle = {
        id: cycleId,
        task,
        timeAmount,
        timeUnit,
        startDate: new Date(),
      }

      dispatch(createNewCycleAction(newCycle))
      resetAmountSecondsPassed()
    },
    [resetAmountSecondsPassed],
  )

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        currentCycle,
        hasActiveCycle,
        activeCycleId,
        amountSecondsPassed: amountSecondsPassedState,
        createNewCycle,
        markCurrentCycleAsFinished,
        interruptCycle,
        updateAmountSecondsPassed,
        resetAmountSecondsPassed,
        pauseCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

const useCyclesContext = () => {
  const context = useContext(CyclesContext)

  if (!context) {
    throw new Error('useCyclesContext must be used within CyclesProvider')
  }

  return context
}

export { CyclesProvider, useCyclesContext }
