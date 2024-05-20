import { Play } from 'lucide-react'

import Input from '@/components/base/input'

import Counter from './components/counter'

function HomeTemplate() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-14">
        <form
          id="counter_form"
          action=""
          className="flex w-full flex-wrap items-center justify-center gap-2 text-lg font-bold text-gray-100"
        >
          <label htmlFor="task">Vou trabalhar em</label>
          <Input
            id="task"
            type="text"
            placeholder="Dê um nome para seu projeto"
            className="flex-1"
          />

          <label htmlFor="minutesAmount">durante</label>
          <Input
            id="minutesAmount"
            type="number"
            placeholder="00"
            className="w-16"
            step={5}
            min={5}
          />

          <span>minutos.</span>
        </form>

        <div className="flex gap-4 font-roboto-mono text-9xl text-gray-100">
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
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 p-4 font-bold text-gray-100 transition-all enabled:hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Play className="size-6" />
          Começar
        </button>
      </div>
    </main>
  )
}

export default HomeTemplate
