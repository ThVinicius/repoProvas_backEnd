import testsRepository from '../repositories/testsRepositority'
import { ITest } from '../types/testTypes'

function insert(test: ITest) {
  return testsRepository.insert(test)
}

function getByTeachers() {
  return testsRepository.getByTeachers()
}

export default { insert, getByTeachers }
