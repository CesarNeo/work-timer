import { forwardRef } from 'react'

import { cn } from '@/utils/cn'

import type { IInputProps } from './types'

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, error, ...props }, ref) => {
    const hasError = Boolean(error)

    return (
      <div className={cn('relative', className)}>
        <input
          {...props}
          ref={ref}
          data-error={hasError}
          className="h-10 w-full border-b border-gray-500 bg-transparent px-2 text-lg font-bold text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-green-500 data-[error=true]:border-red-400"
        />

        {hasError && (
          <span className="absolute -bottom-6 left-0 text-nowrap text-xs font-normal text-red-400">
            {error}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
