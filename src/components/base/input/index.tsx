import { cn } from '@/utils/cn'

import type { IInputProps } from './types'

function Input({ className, ...props }: IInputProps) {
  return (
    <input
      {...props}
      className={cn(
        'h-10 border-b border-gray-500 bg-transparent px-2 text-lg font-bold text-gray-100 outline-none placeholder:text-gray-500 focus:border-green-500',
        className,
      )}
    />
  )
}

export default Input
