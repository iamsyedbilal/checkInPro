import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteBooking } from '../../services/apiBooking'
import toast from 'react-hot-toast'

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deletingBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success('Booking successfully deleted')

      queryClient.invalidateQueries({
        queryKey: ['booking'],
      })
    },

    onError: err => toast.error(err.message),
  })

  return { isDeleting, deletingBooking }
}
