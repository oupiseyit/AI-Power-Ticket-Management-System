import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSession } from './lib/auth-client.ts'
import LoginPage from './pages/LoginPage.tsx'
import NavBar from './components/NavBar.tsx'

function ProtectedLayout() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-sm text-gray-500">Loading…</span>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}

function AuthRedirect() {
  const { data: session, isPending } = useSession()

  if (isPending) return null
  if (session) return <Navigate to="/tickets" replace />
  return <LoginPage />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRedirect />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navigate to="/tickets" replace />} />
          <Route path="/tickets" element={<div>Tickets — coming in Phase 3</div>} />
          <Route path="/tickets/:id" element={<div>Ticket detail — coming in Phase 3</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
