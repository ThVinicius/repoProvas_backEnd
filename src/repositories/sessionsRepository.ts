import prisma from '../database/db'
import { ISession } from '../types/sessionTypes'

async function upsert(data: ISession) {
  const { token, userId } = data

  await prisma.session.upsert({
    where: { userId },
    update: { token },
    create: data
  })
}

async function getByToken(token: string) {
  return await prisma.session.findFirst({ where: { token } })
}

export default { upsert, getByToken }
