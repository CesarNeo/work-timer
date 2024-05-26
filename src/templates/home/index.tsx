import ButtonCountdownActions from './components/button-countdown-actions'
import Countdown from './components/countdown'
import CounterForm from './components/counter-form'

function HomeTemplate() {
  return (
    <main className="flex flex-1 flex-col items-center p-14">
      <div className="flex h-full w-10/12 flex-col items-center justify-center gap-14">
        <CounterForm />

        <Countdown />

        <ButtonCountdownActions />
      </div>
    </main>
  )
}

export default HomeTemplate
