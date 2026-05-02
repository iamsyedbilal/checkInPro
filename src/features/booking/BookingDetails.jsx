import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import { useBooking } from './useBooking'
import Spinner from '../../ui/Spinner'
import ButtonText from '../../ui/ButtonText'
import { useNavigate } from 'react-router-dom'

import { useMoveBack } from '../../hooks/useMoveBack'
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2'
import { useCheckout } from '../checkin/useCheckOut'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import { useDeleteBooking } from './useDeleteBooking'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetails() {
  // const booking = {}
  // const status = 'checked-in'

  const moveBack = useMoveBack()
  const { booking, isPending } = useBooking()
  const { checkout, isCheckingOut } = useCheckout()
  const navigate = useNavigate()
  const { deletingBooking, isDeleting } = useDeleteBooking()

  if (isPending) return <Spinner />

  const { status, id } = booking

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {status === 'unconfirmed' && (
        <Button
          icon={<HiArrowDownOnSquare />}
          onClick={() => navigate(`/checkin/${id}`)}
        >
          Check In
        </Button>
      )}

      {status === 'checked-in' && (
        <Button
          icon={<HiArrowUpOnSquare />}
          onClick={() => checkout(id)}
          disabled={isCheckingOut}
        >
          Check Out
        </Button>
      )}

      <Modal>
        <Modal.Open opens="delete">
          <Button variation="danger">Delete Booking</Button>
        </Modal.Open>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() =>
              deletingBooking(id, {
                onSettled: () => navigate(-1),
              })
            }
          />
        </Modal.Window>
      </Modal>

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetails
