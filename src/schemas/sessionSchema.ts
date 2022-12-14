import joi from 'joi'

const regex = /^Bearer\s{1}/

const tokenSchema = joi
  .object({
    authorization: joi.string().pattern(regex).required()
  })
  .unknown()

export default tokenSchema
