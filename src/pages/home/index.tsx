import { Play } from 'lucide-react'

import Counter from './components/counter'
import CounterForm from './components/counter-form'

function HomeTemplate() {
  return (
    <main className="flex flex-1 flex-col items-center p-14">
      <div className="flex h-full w-full flex-col items-center gap-14">
        <CounterForm />

        <div className="flex gap-4 font-roboto-mono text-[12.5rem] leading-[12.5rem] text-gray-100">
          <Counter>0</Counter>
          <Counter>0</Counter>
          <span className="flex w-16 justify-center overflow-hidden rounded-lg px-4 py-8 text-green-500">
            :
          </span>
          <Counter>0</Counter>
          <Counter>0</Counter>
        </div>

        <button
          form="counter_form"
          type="submit"
          className="flex w-10/12 items-center justify-center gap-2 rounded-lg bg-green-500 p-4 font-bold text-gray-100 transition-all enabled:hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Play className="size-6" />
          Começar
        </button>
      </div>
    </main>
  )
}

export default HomeTemplate
