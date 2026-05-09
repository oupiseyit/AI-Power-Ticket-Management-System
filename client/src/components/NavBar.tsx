import { useNavigate } from 'react-router-dom'
import { signOut, useSession } from '../lib/auth-client.ts'

export default function NavBar() {
  const { data: session } = useSession()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <nav
      className="px-6 py-3 flex items-center justify-between border-b"
      style={{
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'rgba(255, 255, 255, 0.07)',
      }}
    >
      <span className="font-semibold text-white tracking-tight">
        AI Ticket Management
      </span>

      <div className="flex items-center gap-5">
        <span className="text-sm text-glass-secondary hidden sm:block">
          {session?.user.email}
        </span>
        <button
          onClick={handleSignOut}
          className="text-sm text-glass-accent hover:text-glass-accentDark transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}
