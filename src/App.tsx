import { RouterProvider } from '@tanstack/react-router'
import { useState } from 'react'
import { Auth0Wrapper, useAuth0Context } from './auth/auth0'
import { getRouter } from './router'

function InnerApp() {
  const auth = useAuth0Context()
  const [router] = useState(getRouter)

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <Auth0Wrapper>
      <InnerApp />
    </Auth0Wrapper>
  )
}

export default App
