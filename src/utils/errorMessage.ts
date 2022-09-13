export default function errorMessage(message: string, error: string[]) {
  function virgula(index: number) {
    if (index !== 0) return ','
    else return ''
  }

  const toSend = error.reduce(
    (acc, curr, index) => acc + `${virgula(index)} ${curr}`,
    message
  )

  return toSend
}
