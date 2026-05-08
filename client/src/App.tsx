import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

type HealthStatus = 'loading' | 'ok' | 'error'

function HealthBanner() {
  const [status, setStatus] = useState<HealthStatus>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setStatus('ok')
        setMessage(data.message)
      })
      .catch(() => {
        setStatus('error')
        setMessage('Could not reach the server')
      })
  }, [])

  const styles: Record<HealthStatus, string> = {
    loading: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    ok: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
  }

  const icons: Record<HealthStatus, string> = {
    loading: '⏳',
    ok: '✅',
    error: '❌',
  }

  return (
    <div className={`border rounded-md px-4 py-3 text-sm font-medium ${styles[status]}`}>
      {icons[status]}&nbsp;
      {status === 'loading' ? 'Checking server…' : message}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">AI Ticket Management</h1>
        <HealthBanner />
        <Routes>
          <Route path="/" element={<Navigate to="/tickets" replace />} />
          <Route path="/login" element={<div className="mt-6">Login — coming in Phase 2</div>} />
          <Route path="/tickets" element={<div className="mt-6">Tickets — coming in Phase 3</div>} />
          <Route path="/tickets/:id" element={<div className="mt-6">Ticket detail — coming in Phase 3</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
