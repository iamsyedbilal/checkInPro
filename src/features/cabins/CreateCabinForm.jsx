import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Textarea from '../../ui/TextArea'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'

import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit

  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })

  const { errors } = formState

  const { isCreating, creatingCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) {
      editCabin(
        { cabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset()
            onClose?.()
          },
        }
      )
    } else {
      creatingCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            // console.log(data)
            reset()
            onClose?.()
          },
        }
      )
    }
  }

  // function onError(errors) {
  //   console.error('Validation errors:', errors)
  //   toast.error('Please fix the validation errors before submitting.')
  // }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register('name', {
            required: 'Cabin name is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            valueAsNumber: true,
            required: 'Maximum capacity is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            valueAsNumber: true,
            required: 'Regular price is required',
            min: {
              value: 0,
              message: 'Price cannot be negative',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register('discount', {
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Discount cannot be negative',
            },
            max: {
              value: 100,
              message: 'Discount cannot be more than 100',
            },
            validate: value =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'Description is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin image" error={errors?.extraInfo?.message}>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variant="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
