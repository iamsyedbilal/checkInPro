import toast from 'react-hot-toast'
import { signup as signupApi } from '../../services/apiAuth'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: user => {
      console.log(user)
      toast.success(
        'Account created successfully! Please verify the new account from the users email address'
      )
    },
  })
  return { signup, isPending }
}
