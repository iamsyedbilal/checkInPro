import supabase from './supabase'

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new Error('Setting could not be loaded')
  }

  return data
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1) // this row has only one row and we only need to update it
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Setting could not be loaded')
  }

  return data
}
