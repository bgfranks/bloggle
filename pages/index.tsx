import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../ultils/trpc'

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(['users.me'])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Home
