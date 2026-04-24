import supabase from './supabase'

// Fetch cabins from the 'cabins' table in Supabase

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Error fetching cabins:', error)
    throw new Error('Failed to fetch cabins')
  }

  return data
}
