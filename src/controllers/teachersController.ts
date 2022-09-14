import { Request, Response } from 'express'
import teachersService from '../services/teachersService'

async function getTests(req: Request, res: Response) {
  const tests = await teachersService.getTests()

  return res.status(200).send(tests)
}

export default { getTests }
