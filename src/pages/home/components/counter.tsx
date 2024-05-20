import type { ICounterProps } from '../types'

function Counter(props: ICounterProps) {
  return <span className="rounded-lg bg-gray-700 px-4 py-8" {...props} />
}

export default Counter
