import { cn } from '@/utils/cn'

import type { IButtonProps } from './types'

function Button({ className, type = 'button', ...props }: IButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-lg p-4 font-bold text-gray-100 transition-all disabled:cursor-not-allowed disabled:opacity-70',
        className,
      )}
    />
  )
}

export default Button
