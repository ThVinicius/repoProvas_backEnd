import prisma from '../database/db'

function get() {
  return prisma.caterory.findMany()
}

export default { get }
