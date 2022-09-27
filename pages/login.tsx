import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../ultils/trpc'
import { useState } from 'react'

export default function RegisterPage() {
  const { handleSubmit, register } = useForm()
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true)
    },
  })

  function onSubmit(values: CreateUserInput) {
    mutate(values)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>Check Your Email!</p>}
        <h1>Login</h1>
        <input
          type='email'
          placeholder='jane.doe@example.com'
          {...register('email')}
        />
        <button type='submit'>Login</button>
      </form>
      <Link href='/register'>Register</Link>
    </>
  )
}
