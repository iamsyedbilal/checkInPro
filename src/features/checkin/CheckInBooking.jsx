import styled from 'styled-components'
import BookingDataBox from '../booking/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../booking/useBooking'
import Spinner from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import { useCheckIn } from './useCheckIn'
import CheckBox from '../../ui/CheckBox'
import { formatCurrency } from '../../utils/helper'
import { useSetttings } from '../settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const moveBack = useMoveBack()

  // const booking = {}
  const { booking, isPending } = useBooking()
  const { checkin, isCheckingIn } = useCheckIn()
  const { settings } = useSetttings()
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking])
  if (isPending || isCheckingIn) return <Spinner />

  const { id, guests, totalPrice, numGuests, numNights, hasBreakfast } = booking

  const optionalBreakfastPrice = settings.breakFastPrice * numNights * numGuests

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId: id,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else {
      checkin({
        bookingId: id,
      })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(add => !add)
              setConfirmPaid(false)
            }}
            id="breakfast"
          >
            Want to add breakfast for{' '}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {formatCurrency(totalPrice)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          {isCheckingIn ? 'Checking in...' : `Check in booking #${id}`}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
