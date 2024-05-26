'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { useCyclesContext } from '@/contexts/cycles'

import type { ITableBodyProps } from '../types'
import TableCellColumn from './table-cell-column'
import TaskStatus from './task-status'

function TableBody({ currentPage, ...props }: ITableBodyProps) {
  const { cycles } = useCyclesContext()

  const totalCyclesSliced = cycles.slice(
    (currentPage - 1) * 10,
    currentPage * 10,
  )

  return (
    <tbody {...props}>
      {totalCyclesSliced.map((cycles) => (
        <tr key={cycles.id}>
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
          <TableCellColumn className="pr-6">
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
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
