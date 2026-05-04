import { getToday } from '../utils/helper'
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

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('booking')
    .select('*, cabins(*),guests(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching bookings:', error)
    throw new Error('Failed to fetch bookings')
  }

  return data
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('booking')
    .update(obj)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }
  return data
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('booking').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }

  return data
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('booking')
    .select('created_at, totalPrice, extraPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('booking')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('booking')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at')

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }
  return data
}
