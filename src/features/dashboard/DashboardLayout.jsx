import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import Spinner from '../../ui/Spinner'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

export default function DashboardLayout() {
  const { bookings, isPending: isLoading1 } = useRecentBookings()
  const { isPending: isLoading2, confirmedStays, numDays } = useRecentStays()

  if (isLoading1 || isLoading2) return <Spinner />

  console.log(bookings)

  return (
    <StyledDashboardLayout>
      <div>stat</div>
      <div>activity</div>
      <div>duration</div>
      <div>sale</div>
    </StyledDashboardLayout>
  )
}
