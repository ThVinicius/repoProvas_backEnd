import categoriesRepository from '../repositories/categoriesRepository'

function get() {
  return categoriesRepository.get()
}

export default { get }
