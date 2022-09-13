import joi from 'joi'

const create = joi.object({
  name: joi.string().trim().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().strict().integer().greater(0).required(),
  teacherDisciplineId: joi.number().strict().integer().greater(0).required()
})

export default { create }
