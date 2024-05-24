import { z } from 'zod'

const counterFormSchema = z.object({
  task: z.string().min(3, 'Informe uma tarefa.'),
  minutesAmount: z
    .number({
      coerce: true,
      required_error: 'A duração da tarefa é obrigatória',
    })
    .int()
    .positive('A duração da tarefa deve ser maior que 0.')
    .min(5, 'A duração da tarefa deve ser maior que 5 minutos.'),
})

export { counterFormSchema }
