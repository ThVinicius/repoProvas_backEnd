import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import tokenSchema from '../schemas/sessionSchema'
import sessionsService from '../services/sessionsService'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

async function tokenValidate(req: Request, res: Response, next: NextFunction) {
  const { error } = tokenSchema.validate(req.headers)

  if (error)
    return res.status(400).send(error.details.map(detail => detail.message))

  const { authorization } = req.headers

  const token = authorization!.replace('Bearer ', '')

  const secretKey: string = process.env.JWT_SECRET!

  const data = jwt.verify(token, secretKey)

  await sessionsService.validateSession(token)

  res.locals.session = data

  next()
}

export default tokenValidate
