import type { Request, Response, NextFunction } from 'express'

declare module 'express-session' {
  interface SessionData {
    userId: string
    userRole: 'ADMIN' | 'AGENT'
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.userRole !== 'ADMIN') {
    res.status(403).json({ error: 'Forbidden' })
    return
  }
  next()
}
