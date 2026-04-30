import supabase from './supabase'

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('booking')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' }
    )

  if (filter !== null) query = query.eq(filter.field, filter.value)

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    })

  if (page) {
    const from = (page - 1) * 10
    const to = from + 10 - 1
    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching bookings:', error)
    throw new Error('Failed to fetch bookings')
  }

  return { data, count }
}
