import { Request, Response } from 'express'
import usersService from '../services/usersService'
import sessionsService from '../services/sessionsService'

async function signUp(req: Request, res: Response) {
  await usersService.create(req.body)

  return res.sendStatus(201)
}

async function signIn(req: Request, res: Response) {
  const user = await usersService.hanleSignIn(req.body)

  const session = sessionsService.createSession(user)

  await sessionsService.upsert(session)

  return res.status(201).send({ token: session.token })
}

export default { signUp, signIn }
