import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
  const queryClient = useQueryClient()

  const { isPending: isCreating, mutate: creatingCabin } = useMutation({
    mutationFn: cabinData => createCabin(cabinData),
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: error => {
      console.error('Error creating cabin:', error)
      toast.error('Failed to create cabin. Please try again.')
    },
  })

  return { isCreating, creatingCabin }
}
