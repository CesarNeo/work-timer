import type { ITableRowsProps } from '../types'

function TableRow(props: ITableRowsProps) {
  return (
    <tr {...props} className="bg-gray-700 transition-all hover:bg-gray-600" />
  )
}

export default TableRow
