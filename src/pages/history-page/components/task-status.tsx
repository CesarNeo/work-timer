import { cn } from '@/utils/cn'

import type { ITaskStatusProps } from '../types'

function TaskStatus({ className, statusColor, ...props }: ITaskStatusProps) {
  return (
    <span
      {...props}
      className={cn(
        'flex items-center gap-2 before:size-2 before:rounded-full',
        `before:bg-${statusColor}-500`,
        className,
      )}
    />
  )
}

export default TaskStatus
