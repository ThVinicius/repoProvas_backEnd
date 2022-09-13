import prisma from '../database/db'
import { ITest } from '../types/testTypes'

function insert(data: ITest) {
  return prisma.test.create({ data })
}

export default { insert }
