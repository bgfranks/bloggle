import { NextApiRequest, NextApiResponse } from 'next'

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  return {
    res,
    req,
  }
}

export type Context = ReturnType<typeof createContext>
