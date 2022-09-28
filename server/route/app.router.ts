import { createRouter } from '../createRouter'
import { userRouter } from './user.router'

export const AppRouter = createRouter().merge('users.', userRouter)

export type AppRouter = typeof AppRouter
