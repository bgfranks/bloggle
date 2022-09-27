import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../ultils/prisma'

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
    prisma,
  }
}

export type Context = ReturnType<typeof createContext>
