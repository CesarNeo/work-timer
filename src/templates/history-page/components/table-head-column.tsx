import { cn } from '@/utils/cn'

import type { ITableHeadColumnProps } from '../types'

function TableHeadColumn({ className, ...props }: ITableHeadColumnProps) {
  return (
    <th
      {...props}
      className={cn(
        'bg-gray-600 p-4 text-left text-sm text-gray-100',
        className,
      )}
    />
  )
}

export default TableHeadColumn
