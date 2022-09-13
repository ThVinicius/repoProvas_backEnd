import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import userSchemas from '../schemas/userSchemas'
import usersController from '../controllers/usersController'

const route = Router()

route.post('/signup', schemaValidator(userSchemas.user), usersController.signUp)

route.post('/signin', schemaValidator(userSchemas.user), usersController.signIn)

export default route
