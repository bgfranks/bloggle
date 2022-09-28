import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../ultils/trpc'

export default function RegisterPage() {
  const { handleSubmit, register } = useForm()
  const router = useRouter()
  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      router.push('/login')
    },
  })

  function onSubmit(values: CreateUserInput) {
    mutate(values)
  }

  return (
    <div className='form-container'>
      <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1 className='form-header'>Register</h1>
        <input
          className='form-input'
          type='email'
          placeholder='jane.doe@example.com'
          {...register('email')}
        />
        <input
          className='form-input'
          type='text'
          placeholder='Jane Doe'
          {...register('name')}
        />
        <button className='btn w-[80%]' type='submit'>
          Register
        </button>
        <Link className='' href='/login'>
          <span className='text-white text-lg my-5 cursor-pointer hover:text-gray-200'>
            Login
          </span>
        </Link>
      </form>
    </div>
  )
}
