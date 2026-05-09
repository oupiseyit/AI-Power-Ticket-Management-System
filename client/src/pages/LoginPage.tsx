import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from '../lib/auth-client.ts'

const schema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError('')
    const result = await signIn.email(values)
    if (result.error) {
      setServerError(result.error.message ?? 'Invalid email or password')
      return
    }
    navigate('/tickets', { replace: true })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(56,189,248,0.13) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 15%, rgba(139,92,246,0.09) 0%, transparent 55%),
          radial-gradient(ellipse at 60% 90%, rgba(20,184,166,0.07) 0%, transparent 55%),
          #0f172a
        `,
      }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl px-8 py-10 border"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              AI Ticket Management
            </h1>
            <div className="w-8 h-0.5 mt-3 mb-3" style={{ background: '#38bdf8' }} />
            <p className="text-sm text-glass-secondary">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-glass-secondary mb-1.5 tracking-widest uppercase"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register('email')}
                className={`w-full px-3 py-2.5 rounded-lg text-sm text-glass-text placeholder:text-glass-muted focus:outline-none transition-all ${
                  errors.email
                    ? 'border border-glass-red/60 focus:border-glass-red focus:ring-1 focus:ring-glass-red/20'
                    : 'border border-white/10 focus:border-glass-accent focus:ring-1 focus:ring-glass-accent/20'
                }`}
                style={{ background: 'rgba(255,255,255,0.07)' }}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-glass-red">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-glass-secondary mb-1.5 tracking-widest uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full px-3 py-2.5 rounded-lg text-sm text-glass-text placeholder:text-glass-muted focus:outline-none transition-all ${
                  errors.password
                    ? 'border border-glass-red/60 focus:border-glass-red focus:ring-1 focus:ring-glass-red/20'
                    : 'border border-white/10 focus:border-glass-accent focus:ring-1 focus:ring-glass-accent/20'
                }`}
                style={{ background: 'rgba(255,255,255,0.07)' }}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-glass-red">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p
                className="text-sm text-glass-red rounded-lg px-3 py-2.5 border border-glass-red/20"
                style={{ background: 'rgba(239,68,68,0.1)' }}
              >
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-glass-accent hover:bg-glass-accentDark disabled:opacity-50 text-glass-bg font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
