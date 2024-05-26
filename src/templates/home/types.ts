import type { ComponentProps } from 'react'
import type { z } from 'zod'

import type { counterFormSchema } from './validation'

type ICounterProps = ComponentProps<'span'>
type ICounterFormData = z.infer<typeof counterFormSchema>

type ICycle = {
  id: string
  task: string
  timeAmount: number
  timeUnit: 'minutes' | 'hours'
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
  pausedDate?: Date
}

export type { ICounterProps, ICounterFormData, ICycle }
