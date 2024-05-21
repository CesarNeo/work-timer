import TableCellColumn from './components/table-cell-column'
import TableHeadColumn from './components/table-head-column'
import TaskStatus from './components/task-status'

function HistoryTemplate() {
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
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <TableCellColumn className="w-1/2 pl-6">
                  Tarefa 1
                </TableCellColumn>
                <TableCellColumn>1:30</TableCellColumn>
                <TableCellColumn>10:00</TableCellColumn>
                <TableCellColumn className="pr-6">
                  <TaskStatus statusColor="yellow">Concluído</TaskStatus>
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
