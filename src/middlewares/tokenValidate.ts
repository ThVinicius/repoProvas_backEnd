import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import tokenSchema from '../schemas/tokenSchema'
import sessionsService from '../services/sessionsService'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

export default async function tokenValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = tokenSchema.validate(req.headers)

  if (error)
    return res.status(400).send(error.details.map(detail => detail.message))

  const { authorization } = req.headers

  const token = authorization!.replace('Bearer ', '')

  const secretKey: string = process.env.JWT_SECRET!

  const data = jwt.verify(token, secretKey)

  await validateSession(token)

  res.locals.session = data

  next()
}

async function validateSession(token: string) {
  const session = await sessionsService.getSession(token)

  const message = `Esse token é antigo!
  Gere um token novo e utilize-o para acessar essa rota.

  Porque esse erro ocorreu?
  A session foi planejada para armazenar o token mais recente, sempre que um login é efetuado é feito um upsert na tabela de sessions`

  if (session === null) throw { name: 'Upgrade Required', message }
}
