import { useAuth0 } from '@auth0/auth0-react'
import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const { error, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const location = useLocation()
  const loginStarted = useRef(false)

  useEffect(() => {
    if (isLoading || isAuthenticated || error || loginStarted.current) return

    loginStarted.current = true
    void loginWithRedirect({
      appState: { returnTo: location.href },
    }).catch(() => {
      loginStarted.current = false
    })
  }, [error, isAuthenticated, isLoading, location.href, loginWithRedirect])

  if (isLoading || (!isAuthenticated && !error)) {
    return <main className="p-8">Checking your session...</main>
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Authentication failed</h1>
        <p className="mt-2">{error.message}</p>
        <button
          className="mt-4"
          onClick={() => {
            loginStarted.current = true
            void loginWithRedirect({
              appState: { returnTo: location.href },
            })
          }}
        >
          Try again
        </button>
      </main>
    )
  }

  return <Outlet />
}
