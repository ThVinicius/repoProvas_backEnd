import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import termsController from '../controllers/termsController'

const route = Router()

route.use(tokenValidate)

route.get('/terms/tests', termsController.getTests)

export default route
