'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Input from '@/components/base/input'
import { useCyclesContext } from '@/contexts/cycles'

import type { ICounterFormData } from '../types'
import { counterFormSchema } from '../validation'

function CounterForm() {
  const { createNewCycle, hasActiveCycle } = useCyclesContext()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICounterFormData>({
    resolver: zodResolver(counterFormSchema),
  })

  const handleCreateTask = handleSubmit(({ task, minutesAmount }) => {
    createNewCycle({ task, minutesAmount })

    reset()
  })

  return (
    <form
      id="counter_form"
      className="flex w-full flex-wrap items-center justify-center gap-2 text-lg font-bold text-gray-100"
      onSubmit={handleCreateTask}
    >
      <label htmlFor="task">Vou trabalhar em</label>
      <Input
        {...register('task')}
        id="task"
        type="text"
        placeholder="Dê um nome para seu projeto"
        className="flex-1"
        error={errors.task?.message}
        disabled={hasActiveCycle}
      />

      <label htmlFor="minutesAmount">durante</label>
      <Input
        {...register('minutesAmount')}
        id="minutesAmount"
        type="number"
        placeholder="00"
        className="w-16"
        step={5}
        error={errors.minutesAmount?.message}
        disabled={hasActiveCycle}
      />

      <span>minutos.</span>
    </form>
  )
}

export default CounterForm
