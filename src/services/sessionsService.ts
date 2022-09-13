import jwt from 'jsonwebtoken'
import sessionsRepository from '../repositories/sessionsRepository'
import { upgradeRequired } from '../utils/throwError'
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

async function validateSession(token: string) {
  const session = await getSession(token)

  const message = `Esse token é antigo!
  Gere um token novo e utilize-o para acessar essa rota.

  Porque esse erro ocorreu?
  A session foi planejada para armazenar o token mais recente, sempre que um login é efetuado é feito um upsert na tabela de sessions`

  if (session === null) upgradeRequired(message)
}

export default { upsert, createSession, getSession, validateSession }
