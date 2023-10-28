import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    }
  }

  try {
    const data = JSON.parse(event.body)
    const { email } = data

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is already registered' }),
      }
    }

    const user = await prisma.user.create({
      data: {
        email,
      },
    })

    return {
      statusCode: 201, // 201 Created
      body: JSON.stringify(user),
    }
  } catch (error) {
    console.error('Error:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}
