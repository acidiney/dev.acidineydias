export const formateDate = (date) => {
  const locale = 'pt'
  return new Date(date).toLocaleString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
