import { cn } from '@/utils/cn'

import type { ITableCellColumnProps } from '../types'

function TableCellColumn({ className, ...props }: ITableCellColumnProps) {
  return (
    <td
      {...props}
      className={cn(
        'border-t-4 border-gray-800 bg-gray-700 p-4 text-sm',
        className,
      )}
    />
  )
}

export default TableCellColumn
