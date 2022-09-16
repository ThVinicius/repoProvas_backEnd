import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import schemaValidator from '../middlewares/schemaValidator'
import testSchemas from '../schemas/testSchemas'
import testsController from '../controllers/testsController'

const route = Router()

route.use(tokenValidate)

route.post(
  '/tests',
  schemaValidator(testSchemas.create),
  testsController.create
)

export default route