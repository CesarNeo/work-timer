'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { useCyclesContext } from '@/contexts/cycles'

import TableCellColumn from './components/table-cell-column'
import TableHeadColumn from './components/table-head-column'
import TaskStatus from './components/task-status'

function HistoryTemplate() {
  const { cycles } = useCyclesContext()

  return (
    <main className="flex flex-1 flex-col p-14">
      <h1 className="text-2xl font-bold text-gray-100">Meu histórico</h1>

      <div className="mt-8 flex-1 overflow-auto">
        <table className="w-full min-w-[37.5rem] border-collapse">
          <thead>
            <tr>
              <TableHeadColumn className="rounded-tl-lg pl-6">
                Tarefa
              </TableHeadColumn>
              <TableHeadColumn>Duração</TableHeadColumn>
              <TableHeadColumn>Inicio</TableHeadColumn>
              <TableHeadColumn className="rounded-tr-lg pr-6">
                Status
              </TableHeadColumn>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycles) => (
              <tr key={cycles.id}>
                <TableCellColumn className="w-1/2 pl-6">
                  {cycles.task}
                </TableCellColumn>
                <TableCellColumn>{cycles.minutesAmount}</TableCellColumn>
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
        </table>
      </div>
    </main>
  )
}

export default HistoryTemplate
