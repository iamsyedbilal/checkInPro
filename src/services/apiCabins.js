import supabase, { supabaseUrl } from './supabase'

// Fetch cabins from the 'cabins' table in Supabase

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Error fetching cabins:', error)
    throw new Error('Failed to fetch cabins')
  }

  return data
}

export async function createCabin(cabinData) {
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    '/',
    ''
  )

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabinData, image: imagePath }])

  if (error) {
    console.error('Error creating cabin:', error)
    throw new Error('Failed to create cabin')
  }

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabinData.image)

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.error(storageError)
    throw new Error('Cabin could not be created')
  }

  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error('Error deleting cabin:', error)
    throw new Error('Failed to delete cabin')
  }

  return true
}
