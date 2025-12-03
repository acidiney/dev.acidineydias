export const formateDate = (date: Date) => {
  const locale = 'pt'
  return new Date(date).toLocaleString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
