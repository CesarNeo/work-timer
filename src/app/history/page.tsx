import HistoryTemplate from '@/templates/history-page'
import type { IHistoryPageParams } from '@/templates/history-page/types'

function HistoryPage({ searchParams }: IHistoryPageParams) {
  return <HistoryTemplate searchParams={searchParams} />
}

export default HistoryPage
