import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.product.count()
  console.log('Products count:', count)

  if (count > 0) {
    const products = await prisma.product.findMany({ select: { slug: true, title: true } })
    console.log('Existing products:')
    products.forEach(p => console.log(`  - ${p.slug}: ${p.title}`))
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
