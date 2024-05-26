import HistoryTemplate from '@/pages/history-page'
import type { IHistoryPageParams } from '@/pages/history-page/types'

function HistoryPage({ searchParams }: IHistoryPageParams) {
  return <HistoryTemplate searchParams={searchParams} />
}

export default HistoryPage
