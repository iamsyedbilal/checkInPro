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

export async function createCabin(cabinData, id) {
  const hasImage =
    typeof cabinData.image === 'string' &&
    cabinData.image.startsWith(supabaseUrl)

  const imageName = `${Math.random()}-${cabinData.image?.name}`.replaceAll(
    '/',
    ''
  )

  const imagePath = hasImage
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create/edit cabin
  let query = supabase.from('cabins')

  // A) CREATE
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }])

  // B) Edit
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.error('Error creating cabin:', error)
    throw new Error('Failed to create cabin')
  }

  if (hasImage) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabinData.image)

  //  Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    if (!id) {
      await supabase.from('cabins').delete().eq('id', data.id)
    }
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
