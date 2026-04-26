import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Textarea from '../../ui/TextArea'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import { createCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm()

  const { errors } = formState

  const queryClient = useQueryClient()

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: error => {
      console.error('Error creating cabin:', error)
      toast.error('Failed to create cabin. Please try again.')
    },
  })

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] })
    console.log(data)
  }

  // function onError(errors) {
  //   console.error('Validation errors:', errors)
  //   toast.error('Please fix the validation errors before submitting.')
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register('name', {
            required: 'Cabin name is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
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
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
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
          disabled={isCreating}
          id="discount"
          defaultValue={0}
          {...register('discount', {
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
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'Description is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Extra information for staff"
        error={errors?.extraInfo?.message}
      >
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variant="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
