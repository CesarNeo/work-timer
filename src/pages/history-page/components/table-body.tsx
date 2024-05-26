'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Trash } from 'lucide-react'

import { useCyclesContext } from '@/contexts/cycles'

import type { ITableBodyProps } from '../types'
import TableCellColumn from './table-cell-column'
import TableRow from './table-row'
import TaskStatus from './task-status'

function TableBody({ currentPage, ...props }: ITableBodyProps) {
  const { cycles, deleteCycle } = useCyclesContext()

  const cyclesSliced = cycles.slice((currentPage - 1) * 10, currentPage * 10)

  return (
    <tbody {...props}>
      {cyclesSliced.map((cycles) => (
        <TableRow key={cycles.id}>
          <TableCellColumn className="w-1/2 pl-6">
            {cycles.task}
          </TableCellColumn>
          <TableCellColumn>
            {cycles.timeAmount} {cycles.timeUnit === 'hours' ? 'Hrs' : 'Min'}
          </TableCellColumn>
          <TableCellColumn>
            {formatDistanceToNow(cycles.startDate, {
              addSuffix: true,
              locale: ptBR,
            })}
          </TableCellColumn>
          <TableCellColumn>
            {cycles.finishedDate && (
              <TaskStatus statusColor="green">Concluído</TaskStatus>
            )}

            {cycles.interruptedDate && (
              <TaskStatus statusColor="red">Interrompido</TaskStatus>
            )}

            {!cycles.finishedDate && !cycles.interruptedDate && (
              <TaskStatus statusColor="yellow">Em andamento</TaskStatus>
            )}
          </TableCellColumn>
          <TableCellColumn className="pr-6">
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded transition-colors hover:bg-red-300 hover:text-red-800"
              onClick={() => deleteCycle(cycles.id)}
            >
              <Trash className="size-5" />
            </button>
          </TableCellColumn>
        </TableRow>
      ))}
    </tbody>
  )
}

export default TableBody
