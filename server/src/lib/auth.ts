import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma.ts'

export const auth = betterAuth({
  secret: process.env['BETTER_AUTH_SECRET'],
  trustedOrigins: [process.env['FRONTEND_URL'] ?? 'http://localhost:5173'],
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true, disableSignUp: true },
  user: {
    additionalFields: {
      role: { type: 'string', required: false, defaultValue: 'AGENT' },
      isActive: { type: 'boolean', required: false, defaultValue: true },
    },
  },
})

export type Auth = typeof auth
