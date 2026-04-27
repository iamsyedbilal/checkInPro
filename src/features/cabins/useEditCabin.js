import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useEditCabin() {
  const queryClient = useQueryClient()
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabinData, id }) => createCabin(cabinData, id),
    onSuccess: () => {
      toast.success('Cabin updated successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: error => {
      console.error('Error creating cabin:', error)
      toast.error('Failed to create cabin. Please try again.')
    },
  })

  return { isEditing, editCabin }
}
