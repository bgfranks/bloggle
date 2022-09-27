import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../ultils/trpc'

export default function RegisterPage() {
  const { handleSubmit, register } = useForm()
  const router = useRouter()
  // const { mutate, error } = trpc.useMutation(['users.register-user'], {
  //   onSuccess: () => {
  //     router.push('/login')
  //   },
  // })

  // function onSubmit(values: CreateUserInput) {
  //   mutate(values)
  // }

  return (
    <>
      <form>
        {/* {error && error.message} */}
        <h1>Login</h1>
        <input
          type='email'
          placeholder='jane.doe@example.com'
          {...register('email')}
        />
        <button type='submit'>Register</button>
      </form>
      <Link href='/register'>Register</Link>
    </>
  )
}
