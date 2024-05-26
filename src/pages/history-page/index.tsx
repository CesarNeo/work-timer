import Pagination from './components/pagination'
import TableBody from './components/table-body'
import TableHeadColumn from './components/table-head-column'
import type { IHistoryPageParams } from './types'

function HistoryTemplate({ searchParams: { page } }: IHistoryPageParams) {
  const currentPage = Number(page) || 1

  return (
    <main className="flex flex-1 flex-col overflow-hidden p-14">
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
              <TableHeadColumn>Status</TableHeadColumn>
              <TableHeadColumn className="rounded-tr-lg pr-6"></TableHeadColumn>
            </tr>
          </thead>

          <TableBody currentPage={currentPage} />
        </table>
      </div>

      <Pagination currentPage={currentPage} />
    </main>
  )
}

export default HistoryTemplate
