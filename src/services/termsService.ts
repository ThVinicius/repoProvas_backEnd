import termsRepository from '../repositories/termsRepository'

function getTests() {
  return termsRepository.getTests()
}

export default { getTests }
