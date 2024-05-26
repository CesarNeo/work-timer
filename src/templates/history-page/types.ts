import type { ComponentProps } from 'react'

type ITaskStatusColor = 'yellow' | 'green' | 'red'
type ITableHeadColumnProps = ComponentProps<'th'>
type ITableCellColumnProps = ComponentProps<'td'>
type ITaskStatusProps = ComponentProps<'span'> & {
  statusColor: ITaskStatusColor
}
type ITableBodyProps = ComponentProps<'tbody'> & {
  currentPage: number
}

type ITableRowsProps = ComponentProps<'tr'>

type IPaginationProps = ComponentProps<'nav'> & {
  currentPage: number
}

type IHistoryPageParams = {
  searchParams: {
    page: string
  }
}

export type {
  ITableHeadColumnProps,
  ITableCellColumnProps,
  ITaskStatusProps,
  ITaskStatusColor,
  IHistoryPageParams,
  ITableRowsProps,
  ITableBodyProps,
  IPaginationProps,
}
