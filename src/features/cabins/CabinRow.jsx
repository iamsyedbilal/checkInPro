import styled from 'styled-components'
import { formatCurrency } from '../../utils/helper'
import { deleteCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

export default function CabinRow({ cabin }) {
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      toast.success('Cabin deleted successfully')
    },
    onError: error => {
      console.error('Error deleting cabin:', error)
      toast.error('Failed to delete cabin. Please try again.')
    },
  })

  const {
    id: cabinId,
    name,
    image,
    regularPrice,
    discount,
    maxCapacity,
  } = cabin
  return (
    <TableRow>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity} people</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}%</Discount>
      <div>
        <button onClick={() => mutate(cabinId)} disabled={isPending}>
          Delete
        </button>
      </div>
    </TableRow>
  )
}
