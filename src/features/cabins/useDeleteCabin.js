import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteCabin as deleteCabainApi } from '../../services/apiCabins'

export function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabainApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      toast.success('Cabin deleted successfully')
    },
    onError: error => {
      console.error('Error deleting cabin:', error)
      toast.error('Failed to delete cabin. Please try again.')
    },
  })

  return { isDeleting, deleteCabin }
}
