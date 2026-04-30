import Spinner from '../../ui/Spinner'

import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'

export default function CabinTable() {
  const { cabins, isPending } = useCabins()
  const [searchParams] = useSearchParams()

  if (isPending) return <Spinner />

  const filterValue = searchParams.get('discount') || 'all'

  let filterCabin
  if (filterValue === 'all') filterCabin = cabins
  else if (filterValue === 'no-discount')
    filterCabin = cabins.filter(cabin => cabin.discount === 0)
  else if (filterValue === 'with-discount')
    filterCabin = cabins.filter(cabin => cabin.discount > 0)
  else filterCabin = cabins

  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  // const sortedCabins = filterCabin.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // )

  const sortedCabins = [...filterCabin].sort((a, b) => {
    const valueA = a[field]
    const valueB = b[field]

    if (typeof valueA === 'string') {
      return valueA.localeCompare(valueB) * modifier
    }

    return (valueA - valueB) * modifier
  })

  return (
    <Menus>
      <Table columns="minmax(60px, 0.6fr) 1.8fr 2fr 1fr 1fr auto">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}
