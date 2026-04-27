import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Spinner from '../../ui/Spinner'
import { useSetttings } from './useSettings'

export default function UpdateSettingForm() {
  const {
    isSetting,
    settings: {
      breakFastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength,
    },
  } = useSetttings()

  if (isSetting) return <Spinner />

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
        />
      </FormRow>
    </Form>
  )
}
