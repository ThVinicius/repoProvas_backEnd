import { Request, Response } from 'express'
import testsService from '../services/testsService'
import { ITest } from '../types/testTypes'

async function create(req: Request, res: Response) {
  let { name, categoryId, teacherDisciplineId } = req.body

  categoryId = Number(categoryId)

  teacherDisciplineId = Number(teacherDisciplineId)

  const pdfUrl = await testsService.pdfUrl(req.file)

  const data = { name, categoryId, teacherDisciplineId, pdfUrl } as ITest

  const test = await testsService.insert(data)

  return res.status(201).send(test)
}

async function getByTeachers(req: Request, res: Response) {
  const tests = await testsService.getByTeachers()

  return res.status(200).send(tests)
}

async function getByDisciplines(req: Request, res: Response) {
  const tests = await testsService.getByDisciplines()

  return res.status(200).send(tests)
}

export default { create, getByTeachers, getByDisciplines }
