type IGetTimerProps = {
  time?: number
  isHours: boolean
  amountSecondsPassed: number
}

export function getTimer({
  time,
  isHours = false,
  amountSecondsPassed,
}: IGetTimerProps) {
  if (!time) {
    return { hours: '00', minutes: '00', seconds: '00', totalSeconds: 0 }
  }

  const totalSeconds = isHours ? time * 3600 : time * 60

  const currentSeconds = totalSeconds - amountSecondsPassed
  const hoursAmount = Math.floor(currentSeconds / 3600)
  const minutesAmount = Math.floor(
    isHours ? currentSeconds / 60 - hoursAmount * 60 : currentSeconds / 60,
  )
  const secondsAmount = currentSeconds % 60
  const hours = String(hoursAmount).padStart(2, '0')
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  return { hours, minutes, seconds, totalSeconds }
}
