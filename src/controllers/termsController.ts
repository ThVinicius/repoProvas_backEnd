import { Request, Response } from 'express'
import termsService from '../services/termsService'

async function getTests(req: Request, res: Response) {
  const tests = await termsService.getTests()

  return res.status(200).send(tests)
}

export default { getTests }
