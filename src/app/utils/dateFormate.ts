const getFormatTimeAndDate = (dateObj: string) => {
  const date = new Date(dateObj)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  return `${year}-${month}-${day} at ${hours}:${minutes} ${ampm}`
}
export default getFormatTimeAndDate
