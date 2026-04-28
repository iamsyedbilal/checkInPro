import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Spinner from '../../ui/Spinner'
import { useSetttings } from './useSettings'
import { useEditSetting } from './useEditSettings'

export default function UpdateSettingForm() {
  const { isSetting, settings } = useSetttings()

  console.log(settings)

  const { editSetting, isUpdating } = useEditSetting()

  if (isSetting) return <Spinner />

  function handleUpdate(e, field) {
    const { value } = e.target

    if (!value) return

    editSetting({ [field]: Number(value) })
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={settings.minBookingLength}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={settings.maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={settings.maxGuestPerBooking}
          onBlur={e => handleUpdate(e, 'maxGuestPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={settings.breakFastPrice}
          onBlur={e => handleUpdate(e, 'breakFastPrice')}
        />
      </FormRow>
    </Form>
  )
}
