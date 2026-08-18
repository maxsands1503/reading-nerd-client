import { SignUp } from '../components/signUp'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to Reading Nerd</h1>
      <p className="mt-4 text-lg">
        The purpose of this app is to track your read books, TBR list and build online book clubs to find new recommendations
      </p>

      <section>
        <SignUp />
      </section>
    </div>
  )
}
