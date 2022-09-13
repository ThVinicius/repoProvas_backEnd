import testsRepository from '../repositories/testsRepositority'
import { ITest } from '../types/testTypes'

function insert(test: ITest) {
  return testsRepository.insert(test)
}

export default { insert }
