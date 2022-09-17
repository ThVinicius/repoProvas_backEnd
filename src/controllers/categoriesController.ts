import { Request, Response } from 'express'
import categoriesService from '../services/categoriesService'

async function get(req: Request, res: Response) {
  const categories = await categoriesService.get()

  return res.status(200).send(categories)
}

export default { get }
