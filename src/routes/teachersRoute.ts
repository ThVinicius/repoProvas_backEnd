import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import teachersController from '../controllers/teachersController'

const route = Router()

route.use(tokenValidate)

route.get('/teachers/tests', teachersController.getTests)

export default route
