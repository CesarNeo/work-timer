'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import Input from '@/components/base/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/base/select'
import { useCyclesContext } from '@/contexts/cycles'

import type { ICounterFormData } from '../types'
import { counterFormSchema } from '../validation'

function CounterForm() {
  const { createNewCycle, hasActiveCycle } = useCyclesContext()

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICounterFormData>({
    resolver: zodResolver(counterFormSchema),
  })

  const handleCreateTask = handleSubmit(({ task, timeAmount, timeUnit }) => {
    createNewCycle({ task, timeAmount, timeUnit })

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

      <label htmlFor="timeAmount">durante</label>
      <Input
        {...register('timeAmount')}
        id="timeAmount"
        type="number"
        placeholder="00"
        className="w-16"
        // step={5}
        error={errors.timeAmount?.message}
        disabled={hasActiveCycle}
      />

      <Controller
        control={control}
        name="timeUnit"
        render={({ field: { onChange, value, ...rest } }) => (
          <Select {...rest} onValueChange={onChange} value={value}>
            <SelectTrigger className="max-w-40">
              <SelectValue placeholder="Selecione o tempo" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="hours">Horas</SelectItem>
              <SelectItem value="minutes">Minutos</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </form>
  )
}

export default CounterForm
