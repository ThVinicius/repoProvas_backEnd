import { Request, Response } from 'express'
import teachersDisciplinesService from '../services/teachersDisciplinesService'

async function getRelation(req: Request, res: Response) {
  const relation = await teachersDisciplinesService.getRelation()

  return res.status(200).send(relation)
}

export default { getRelation }
