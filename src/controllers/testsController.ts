import { Request, Response } from 'express'
import testsService from '../services/testsService'
import { ITest } from '../types/testTypes'

async function create(req: Request, res: Response) {
  const payload = req.body as ITest

  const test = await testsService.insert(payload)

  return res.status(201).send(test)
}

export default { create }
