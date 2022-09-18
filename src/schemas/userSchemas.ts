import joi from 'joi'

const signUp = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.valid(joi.ref('password')).required()
})

const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required()
})

export default { signUp, signIn }
