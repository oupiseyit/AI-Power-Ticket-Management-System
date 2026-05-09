import { prisma } from '../src/lib/prisma.ts'

const [users, categories] = await Promise.all([
  prisma.user.count(),
  prisma.categorySetting.count(),
])

console.log(`DB ok — users: ${users} | categories: ${categories}`)
await prisma.$disconnect()
