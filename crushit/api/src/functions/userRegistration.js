import { db } from 'src/db'

export const register = async ({ email, password }) => {
  const user = await db.user.create({
    data: {
      email,
    },
  })
  return user
}
