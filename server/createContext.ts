import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwt } from '../ultils/jwt'
import { prisma } from '../ultils/prisma'

interface CtxUser {
  id: string
  email: string
  name: string
  iat: string
  exp: number
}

function getUserFromReq(req: NextApiRequest) {
  const token = req.cookies.token

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      return verified
    } catch (e) {
      return null
    }
  }

  return null
}

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const user = getUserFromReq(req)

  return {
    res,
    req,
    prisma,
    user,
  }
}

export type Context = ReturnType<typeof createContext>
