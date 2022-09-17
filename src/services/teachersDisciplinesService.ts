import teachersDisciplinesRepository from '../repositories/teachersDisciplinesRepository'

function getRelation() {
  return teachersDisciplinesRepository.getRelation()
}

export default { getRelation }
