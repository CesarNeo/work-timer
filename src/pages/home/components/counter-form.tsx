'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Input from '@/components/base/input'

import type { ICounterFormData } from '../types'
import { counterFormSchema } from '../validation'

function CounterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICounterFormData>({
    resolver: zodResolver(counterFormSchema),
  })

  const handleCreateTask = handleSubmit((data) => {
    console.log('🚀 ~ handleCreateTask ~ formData:', data)
  })

  return (
    <form
      id="counter_form"
      className="flex w-full flex-wrap items-center justify-center gap-2 text-lg font-bold text-gray-100"
      onSubmit={handleCreateTask}
    >
      <label htmlFor="task">Vou trabalhar em</label>
      <Input
        id="task"
        type="text"
        placeholder="Dê um nome para seu projeto"
        className="flex-1"
        {...register('task')}
        error={errors.task?.message}
      />

      <label htmlFor="minutesAmount">durante</label>
      <Input
        id="minutesAmount"
        type="number"
        placeholder="00"
        className="w-16"
        step={5}
        {...register('minutesAmount')}
        error={errors.minutesAmount?.message}
      />

      <span>minutos.</span>
    </form>
  )
}

export default CounterForm
