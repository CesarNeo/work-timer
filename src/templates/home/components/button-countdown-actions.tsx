'use client'

import { Ban, Pause, Play } from 'lucide-react'

import { useCyclesContext } from '@/contexts/cycles'

function ButtonCountdownActions() {
  const { currentCycle, interruptCycle, pauseCycle } = useCyclesContext()

  if (!currentCycle) {
    return (
      <button
        form="counter_form"
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 p-4 font-bold text-gray-100 transition-all enabled:hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Play className="size-6" />
        Começar
      </button>
    )
  }

  return (
    <div className="flex w-full gap-3">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 p-4 font-bold text-gray-100 transition-all enabled:hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        onClick={interruptCycle}
      >
        <Ban className="size-6" />
        Interromper
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-500 p-4 font-bold text-gray-700 transition-all enabled:hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-70"
        onClick={pauseCycle}
      >
        <Pause className="size-6" />
        Pausar
      </button>
    </div>
  )
}

export default ButtonCountdownActions
