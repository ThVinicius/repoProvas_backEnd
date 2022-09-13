import prisma from '../database/db'
import { IUser } from '../types/userTypes'

async function insert(data: IUser) {
  await prisma.user.create({ data })
}

async function getByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } })
}

export default { insert, getByEmail }
