import sessionsRepository from '../repositories/sessionsRepository'
import jwt from 'jsonwebtoken'
import { ISession } from '../types/sessionTypes'
import { User } from '@prisma/client'

function createSession(user: User) {
  const { id } = user

  const secretKey: string = process.env.JWT_SECRET!

  const config = { expiresIn: 60 * 60 * 24 * 30 }

  const token = jwt.sign({ id }, secretKey, config)

  return { userId: user.id, token }
}

async function upsert(data: ISession) {
  await sessionsRepository.upsert(data)
}

async function getSession(token: string) {
  return await sessionsRepository.getByToken(token)
}

export default { upsert, createSession, getSession }
