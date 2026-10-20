export const formatTimeFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp)

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  })
}