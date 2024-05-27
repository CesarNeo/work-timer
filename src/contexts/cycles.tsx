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
import { toast } from 'sonner'

import { LocalStorageCycles } from '@/localstorage/cycles'
import { ReducerActions } from '@/reducers/cycles/actions'
import { cyclesReducer } from '@/reducers/cycles/reducer'
import type { ICyclesState } from '@/reducers/cycles/types'
import type { ICycle } from '@/templates/home/types'

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
  deleteCycle: (cycleId: string) => void
}

const CyclesContext = createContext({} as ICyclesContext)

const defaultCyclesState: ICyclesState = {
  cycles: [] as ICycle[],
  activeCycleId: null,
}

function CyclesProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatchCycles] = useReducer(
    cyclesReducer,
    defaultCyclesState,
    LocalStorageCycles.getCyclesState,
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
    () => dispatchCycles(ReducerActions.finishCycle()),
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

  const interruptCycle = useCallback(
    () => dispatchCycles(ReducerActions.interruptCycle()),
    [],
  )
  const pauseCycle = useCallback(
    () => dispatchCycles(ReducerActions.pauseCycle()),
    [],
  )
  const deleteCycle = useCallback(
    (cycleId: string) => {
      if (cycleId === activeCycleId) {
        return toast.error('Você não pode deletar um ciclo em andamento')
      }

      dispatchCycles(ReducerActions.deleteCycle(cycleId))
    },
    [activeCycleId],
  )

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

      dispatchCycles(ReducerActions.createNewCycle(newCycle))
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
        deleteCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

function useCyclesContext() {
  const context = useContext(CyclesContext)

  if (!context) {
    throw new Error('useCyclesContext must be used within CyclesProvider')
  }

  return context
}

export { CyclesProvider, useCyclesContext }
