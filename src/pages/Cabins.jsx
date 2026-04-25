import Row from '../ui/Row'
import Heading from '../ui/Heading'
import CabinTable from '../features/cabins/CabinTable'

export default function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
        <p>filter and sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  )
}
