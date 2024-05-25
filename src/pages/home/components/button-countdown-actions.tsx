'use client'

import { Ban, Play } from 'lucide-react'

import { useCyclesContext } from '@/contexts/cycles'

function ButtonCountdownActions() {
  const { currentCycle, interruptCycle } = useCyclesContext()

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
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 p-4 font-bold text-gray-100 transition-all enabled:hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
      onClick={interruptCycle}
    >
      <Ban className="size-6" />
      Interromper
    </button>
  )
}

export default ButtonCountdownActions
