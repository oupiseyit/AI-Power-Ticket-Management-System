import { PrismaClient } from '@prisma/client'
import { auth } from '../src/lib/auth.ts'

const prisma = new PrismaClient()

async function main() {
  await auth.api.signUpEmail({
    body: { name: 'Admin', email: 'admin@example.com', password: 'admin123' },
  }).catch(() => {
    // user already exists — ignore
  })

  await prisma.user.update({
    where: { email: 'admin@example.com' },
    data: { role: 'ADMIN' },
  })

  for (const category of ['GENERAL', 'TECHNICAL', 'REFUND'] as const) {
    await prisma.categorySetting.upsert({
      where: { category },
      update: {},
      create: { category, autoSend: false },
    })
  }

  console.log('Seeded admin: admin@example.com / admin123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
