'use client'

import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCyclesContext } from '@/contexts/cycles'

import Counter from './counter'

function Countdown() {
  const {
    currentCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    updateAmountSecondsPassed,
  } = useCyclesContext()

  const totalSeconds = currentCycle ? currentCycle.minutesAmount * 60 : 0
  const currentSeconds = currentCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  console.log('🚀 ~ Countdown ~ minutes:', minutes)
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout
    console.log('🚀 ~ useEffect ~ currentCycle:', currentCycle)

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
        console.log('aqui')
      }, 1000)
    }

    return () => {
      clearInterval(cycleInterval)
    }
  }, [
    activeCycleId,
    currentCycle,
    markCurrentCycleAsFinished,
    totalSeconds,
    updateAmountSecondsPassed,
  ])
  return (
    <div className="flex gap-4 font-roboto-mono text-[12.5rem] leading-[12.5rem] text-gray-100">
      <Counter>{minutes[0]}</Counter>
      <Counter>{minutes[1]}</Counter>
      <span className="flex w-16 justify-center overflow-hidden rounded-lg px-4 py-8 text-green-500">
        :
      </span>
      <Counter>{seconds[0]}</Counter>
      <Counter>{seconds[1]}</Counter>
    </div>
  )
}

export default Countdown
