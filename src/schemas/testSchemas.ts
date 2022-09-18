import joi from 'joi'

const create = joi.object({
  name: joi.string().trim().required(),
  categoryId: joi.number().integer().greater(0).required(),
  teacherDisciplineId: joi.number().integer().greater(0).required()
})

export default { create }
