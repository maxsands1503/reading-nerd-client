import { useAuth0 } from '@auth0/auth0-react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'primereact/button'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { logout, user } = useAuth0()

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4">
        Welcome{user?.name || user?.email ? `, ${user.name ?? user.email}` : ''}
        .
      </p>
      <Button
        className="mt-6"
        label="Log out"
        onClick={() =>
          void logout({
            logoutParams: { returnTo: window.location.origin },
          })
        }
      />
    </main>
  )
}
