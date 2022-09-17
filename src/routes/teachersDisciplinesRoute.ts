import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate'
import teacherDisciplinesController from '../controllers/teachersDisciplinesController'

const route = Router()

route.use(tokenValidate)

route.get('/teachersdisciplines', teacherDisciplinesController.getRelation)

export default route
