import { useAuth0 } from '@auth0/auth0-react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginCallback,
})

function LoginCallback() {
  const { error, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const navigate = Route.useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      void navigate({ to: '/dashboard', replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return <main className="p-8">Completing sign in...</main>
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">We couldn't complete sign in</h1>
        <p className="mt-2">{error.message}</p>
        <button
          className="mt-4"
          onClick={() =>
            void loginWithRedirect({ appState: { returnTo: '/dashboard' } })
          }
        >
          Try again
        </button>
      </main>
    )
  }

  if (isAuthenticated) {
    return <main className="p-8">Redirecting...</main>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <button
        className="mt-4"
        onClick={() =>
          void loginWithRedirect({ appState: { returnTo: '/dashboard' } })
        }
      >
        Continue to Auth0
      </button>
    </main>
  )
}
