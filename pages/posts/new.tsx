import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreatePostInput } from '../../schema/post.schema'
import { trpc } from '../../ultils/trpc'

export default function CreatePostPage() {
  const { handleSubmit, register } = useForm<CreatePostInput>()
  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['posts.create-post'], {
    onSuccess({ id }) {
      router.push(`/posts/${id}`)
    },
  })

  function onSubmit(values: CreatePostInput) {
    mutate(values)
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='custom-form'>
        {error && error.message}
        <h1 className='form-header'>Create Post</h1>
        <input
          className='form-input'
          type='text'
          placeholder='Your Post Title'
          {...register('title')}
        />
        <textarea
          className='form-textarea'
          placeholder='Your Post'
          {...register('body')}
        />
        <button className='btn w-[80%] mb-10'>Create Post</button>
      </form>
    </div>
  )
}
