import Row from '../ui/Row'
import Heading from '../ui/Heading'
import BookingTable from '../features/booking/BookingTable'
import BookingTableOperation from '../features/booking/BookingTableOperation'

export default function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOperation />
      </Row>
      <BookingTable />
    </>
  )
}
