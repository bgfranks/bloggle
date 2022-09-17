import { createReactQueryHooks } from '@trpc/react'
import { appRouter } from '../server/route/appRouter'

export const trpc = createReactQueryHooks<appRouter>()
