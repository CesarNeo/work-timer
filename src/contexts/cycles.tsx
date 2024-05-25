'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import type { ICycle } from '@/pages/home/types'

interface ICyclesContext {
  cycles: ICycle[]
  currentCycle: ICycle | undefined
  activeCycleId: string | null
  hasActiveCycle: boolean
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  updateCycle: (cycle: ICycle) => void
  updateActiveCycleId: (id: string) => void
  interruptCycle: () => void
  updateAmountSecondsPassed: (seconds: number) => void
  resetAmountSecondsPassed: () => void
}

const CyclesContext = createContext({} as ICyclesContext)

function CyclesProvider({ children }: { children: ReactNode }) {
  const [cyclesState, setCyclesState] = useState<ICycle[]>([])
  const [activeCycleIdState, setActiveCycleIdState] = useState<string | null>(
    null,
  )
  const [amountSecondsPassedState, setAmountSecondsPassedState] = useState(0)

  const currentCycle = cyclesState.find(
    (cycle) => cycle.id === activeCycleIdState,
  )
  const hasActiveCycle = Boolean(currentCycle)

  const markCurrentCycleAsFinished = useCallback(() => {
    setCyclesState((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === activeCycleIdState) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }

        return cycle
      }),
    )
  }, [activeCycleIdState])

  const updateCycle = useCallback((cycle: ICycle) => {
    setCyclesState((cycles) => [...cycles, cycle])
  }, [])

  const updateActiveCycleId = useCallback((id: string) => {
    setActiveCycleIdState(id)
  }, [])

  const updateAmountSecondsPassed = useCallback((seconds: number) => {
    setAmountSecondsPassedState(seconds)
  }, [])

  const resetAmountSecondsPassed = useCallback(() => {
    updateAmountSecondsPassed(0)
  }, [updateAmountSecondsPassed])

  const interruptCycle = useCallback(() => {
    setCyclesState((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === activeCycleIdState) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      }),
    )

    setActiveCycleIdState(null)
    resetAmountSecondsPassed()
  }, [activeCycleIdState, resetAmountSecondsPassed])

  return (
    <CyclesContext.Provider
      value={{
        cycles: cyclesState,
        currentCycle,
        hasActiveCycle,
        activeCycleId: activeCycleIdState,
        amountSecondsPassed: amountSecondsPassedState,
        markCurrentCycleAsFinished,
        updateCycle,
        updateActiveCycleId,
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
