import teachersRepository from '../repositories/teachersRepository'

function getTests() {
  return teachersRepository.getTests()
}

export default { getTests }
