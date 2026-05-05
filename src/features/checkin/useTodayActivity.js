import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBooking'

export function useTodayActivity() {
  const { data: activities = [], isPending } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  })
  return { activities, isPending }
}
