'use client'

import { Ban, Pause, Play } from 'lucide-react'

import Button from '@/components/base/button'
import { useCyclesContext } from '@/contexts/cycles'

function ButtonCountdownActions() {
  const { currentCycle, interruptCycle, pauseCycle } = useCyclesContext()

  if (!currentCycle) {
    return (
      <Button
        form="counter_form"
        type="submit"
        className="bg-green-500 enabled:hover:bg-green-700"
      >
        <Play className="size-6" />
        Começar
      </Button>
    )
  }

  return (
    <div className="flex w-full gap-3">
      <Button
        className="bg-red-500 enabled:hover:bg-red-700"
        onClick={interruptCycle}
      >
        <Ban className="size-6" />
        Interromper
      </Button>
      <Button
        className="bg-yellow-500 text-gray-700 enabled:hover:bg-yellow-700"
        onClick={pauseCycle}
      >
        <Pause className="size-6" />
        Pausar
      </Button>
    </div>
  )
}

export default ButtonCountdownActions
