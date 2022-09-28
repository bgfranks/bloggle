import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../ultils/trpc'
import { useState } from 'react'

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter()
  const { data, isLoading } = trpc.useQuery([
    'users.verify-otp',
    {
      hash,
    },
  ])

  if (isLoading) {
    return <p>Verifying...</p>
  }

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

  return <p>Redirecting...</p>
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>()
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true)
    },
  })

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath })
  }

  const hash = router.asPath.split('#token=')[1]

  if (hash) {
    return <VerifyToken hash={hash} />
  }

  return (
    <div className='form-container'>
      <form className='custom-form' onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Check your email</p>}
        <h1 className='form-header'>Login</h1>

        <input
          className='form-input'
          type='email'
          placeholder='jane.doe@example.com'
          {...register('email')}
        />
        <button className='btn w-[80%]'>Login</button>
        <Link href='/register'>
          <span className='text-white text-lg my-5 cursor-pointer hover:text-gray-200'>
            Register
          </span>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
