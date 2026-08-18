import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getContext } from './integrations/tanstack-query/root-provider'
import type { Auth0ContextType } from './auth/auth0'

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context: {
      ...context,
      // RouterProvider supplies the live Auth0 value before routes are rendered.
      auth: undefined as unknown as Auth0ContextType,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
