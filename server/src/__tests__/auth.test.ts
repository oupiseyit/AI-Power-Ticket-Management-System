import { describe, it, expect, afterAll } from 'bun:test'
import request from 'supertest'
import app from '../app.ts'
import { prisma } from '../lib/prisma.ts'

const EMAIL = `auth-test-${Date.now()}@test.com`
const PASSWORD = 'testPassword123'
const NAME = 'Test User'

describe('Auth', () => {
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: EMAIL } })
  })

  // ─── Sign-up ──────────────────────────────────────────────────────────────

  describe('POST /api/auth/sign-up/email', () => {
    it('registers a new user', async () => {
      const res = await request(app)
        .post('/api/auth/sign-up/email')
        .send({ email: EMAIL, password: PASSWORD, name: NAME })

      expect(res.status).toBe(200)
      expect(res.body.user?.email).toBe(EMAIL)
    })

    it('rejects a duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/sign-up/email')
        .send({ email: EMAIL, password: PASSWORD, name: NAME })

      expect(res.status).toBeGreaterThanOrEqual(400)
    })
  })

  // ─── Sign-in ──────────────────────────────────────────────────────────────

  describe('POST /api/auth/sign-in/email', () => {
    it('rejects wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/sign-in/email')
        .send({ email: EMAIL, password: 'wrongpassword' })

      expect(res.status).toBe(401)
    })

    it('rejects unknown email', async () => {
      const res = await request(app)
        .post('/api/auth/sign-in/email')
        .send({ email: 'nobody@test.com', password: PASSWORD })

      expect(res.status).toBe(401)
    })
  })

  // ─── Session flow (sign-in → get-session → sign-out) ─────────────────────

  describe('session flow', () => {
    // agent persists cookies across requests
    const agent = request.agent(app)

    it('POST /api/auth/sign-in/email — signs in and returns user', async () => {
      const res = await agent
        .post('/api/auth/sign-in/email')
        .send({ email: EMAIL, password: PASSWORD })

      expect(res.status).toBe(200)
      expect(res.body.user?.email).toBe(EMAIL)
    })

    it('GET /api/auth/get-session — returns active session', async () => {
      const res = await agent.get('/api/auth/get-session')

      expect(res.status).toBe(200)
      expect(res.body.user?.email).toBe(EMAIL)
    })

    it('POST /api/auth/sign-out — clears session', async () => {
      const res = await agent.post('/api/auth/sign-out')

      expect(res.status).toBe(200)
    })

    it('GET /api/auth/get-session — returns null user after sign-out', async () => {
      const res = await agent.get('/api/auth/get-session')

      expect(res.status).toBe(200)
      expect(res.body?.user ?? null).toBeNull()
    })
  })

  // ─── Unauthenticated get-session ──────────────────────────────────────────

  describe('GET /api/auth/get-session (unauthenticated)', () => {
    it('returns null user when no session cookie is present', async () => {
      const res = await request(app).get('/api/auth/get-session')

      expect(res.status).toBe(200)
      expect(res.body?.user ?? null).toBeNull()
    })
  })
})
