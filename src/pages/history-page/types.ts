import type { ComponentProps } from 'react'

type ITaskStatusColor = 'yellow' | 'green' | 'red'
type ITableHeadColumnProps = ComponentProps<'th'>
type ITableCellColumnProps = ComponentProps<'td'>
type ITaskStatusProps = ComponentProps<'span'> & {
  statusColor: ITaskStatusColor
}

export type {
  ITableHeadColumnProps,
  ITableCellColumnProps,
  ITaskStatusProps,
  ITaskStatusColor,
}
