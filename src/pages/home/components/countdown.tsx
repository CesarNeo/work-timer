'use client'

import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCyclesContext } from '@/contexts/cycles'
import { getTimer } from '@/utils/get-timer'

import Counter from './counter'
import CounterSeparator from './counter-separator'

function Countdown() {
  const {
    currentCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    updateAmountSecondsPassed,
  } = useCyclesContext()

  const isHours = currentCycle?.timeUnit === 'hours'

  const { hours, minutes, seconds, totalSeconds } = getTimer({
    time: currentCycle?.timeAmount,
    isHours,
    amountSecondsPassed,
  })

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout

    if (currentCycle) {
      cycleInterval = setInterval(() => {
        const cycleDifferenceInSeconds = differenceInSeconds(
          new Date(),
          currentCycle.startDate,
        )

        if (cycleDifferenceInSeconds >= totalSeconds) {
          markCurrentCycleAsFinished()
          updateAmountSecondsPassed(0)
          clearInterval(cycleInterval)
          return
        }

        updateAmountSecondsPassed(cycleDifferenceInSeconds)
      }, 1000)
    }

    return () => clearInterval(cycleInterval)
  }, [
    activeCycleId,
    currentCycle,
    markCurrentCycleAsFinished,
    totalSeconds,
    updateAmountSecondsPassed,
  ])

  return (
    <div className="flex gap-4 font-roboto-mono text-8xl text-gray-100">
      <Counter>{hours[0]}</Counter>
      <Counter>{hours[1]}</Counter>

      <CounterSeparator />

      <Counter>{minutes[0]}</Counter>
      <Counter>{minutes[1]}</Counter>

      <CounterSeparator />

      <Counter>{seconds[0]}</Counter>
      <Counter>{seconds[1]}</Counter>
    </div>
  )
}

export default Countdown
