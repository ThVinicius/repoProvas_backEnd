import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import categoriesController from '../controllers/categoriesController'

const route = Router()

route.use(tokenValidate)

route.get('/categories', categoriesController.get)

export default route
