import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash,
      role: 'ADMIN',
    },
  })

  for (const category of ['GENERAL', 'TECHNICAL', 'REFUND'] as const) {
    await prisma.categorySetting.upsert({
      where: { category },
      update: {},
      create: { category, autoSend: false },
    })
  }

  console.log('Seeded admin:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
