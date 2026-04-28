import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting } from '../../services/apiSettings'
import toast from 'react-hot-toast'

export function useEditSetting() {
  const queryClient = useQueryClient()
  const { isPending: isUpdating, mutate: editSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting updated successfully')
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onError: error => {
      console.error('Error update setting:', error)
      toast.error('Failed to update setting. Please try again.')
    },
  })

  return { isUpdating, editSetting }
}
