import { formatDistance, parseISO } from 'date-fns'

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const formatDistanceFromNow = dateStr =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In')

export const getToday = function (options = {}) {
  const today = new Date()

  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999)
  else today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}
