import { Router } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.ts'
import { requireAuth } from '../middleware/auth.ts'

export const authRouter = Router()

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    req.session.userId = user.id
    req.session.userRole = user.role
    res.json({ id: user.id, email: user.email, role: user.role })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err)
    res.clearCookie('connect.sid')
    res.json({ ok: true })
  })
})

authRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { id: true, email: true, role: true },
    })
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
})
