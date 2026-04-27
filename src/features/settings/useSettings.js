import { useQuery } from '@tanstack/react-query'
import { getSettings } from '../../services/apiSettings'

export function useSetttings() {
  const {
    isPending: isSetting,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  return { isSetting, error, settings }
}
