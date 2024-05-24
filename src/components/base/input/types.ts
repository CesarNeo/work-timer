import type { ComponentProps } from 'react'

type IInputProps = ComponentProps<'input'> & {
  error?: string
}

export type { IInputProps }
