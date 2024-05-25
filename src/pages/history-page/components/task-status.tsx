import { cn } from '@/utils/cn'

import type { ITaskStatusProps } from '../types'

function TaskStatus({ className, statusColor, ...props }: ITaskStatusProps) {
  return (
    <span
      {...props}
      data-status={statusColor}
      className={cn(
        'flex items-center gap-2 before:size-2 before:rounded-full data-[status="green"]:before:bg-green-500 data-[status="red"]:before:bg-red-500 data-[status="yellow"]:before:bg-yellow-500',
        className,
      )}
    />
  )
}

export default TaskStatus
