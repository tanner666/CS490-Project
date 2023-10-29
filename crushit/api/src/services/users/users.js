import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async ({ email }) => {
  return prisma.user.create({
    data: {
      email,
    },
  })
}
