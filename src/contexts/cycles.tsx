'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'

import type { ICycle } from '@/pages/home/types'
import {
  createNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '@/reducers/cycles/actions'
import { cyclesReducer } from '@/reducers/cycles/reducer'

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
}

const CyclesContext = createContext({} as ICyclesContext)

function CyclesProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [] as ICycle[],
    activeCycleId: null,
  })

  const [amountSecondsPassedState, setAmountSecondsPassedState] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const currentCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const hasActiveCycle = Boolean(currentCycle)

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

  const createNewCycle = useCallback(
    ({ task, minutesAmount }: Omit<ICycle, 'id' | 'startDate'>) => {
      const cycleId = crypto.randomUUID()

      const newCycle: ICycle = {
        id: cycleId,
        task,
        minutesAmount,
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
