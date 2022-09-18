import { Router } from 'express'
import multer from 'multer'
import tokenValidate from '../middlewares/tokenValidate'
import schemaValidator from '../middlewares/schemaValidator'
import testSchemas from '../schemas/testSchemas'
import uploadPdf from '../middlewares/uploadPdf'
import testsController from '../controllers/testsController'

const route = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

route.use(tokenValidate)

route.post(
  '/tests',
  upload.single('file'),
  schemaValidator(testSchemas.create),
  uploadPdf,
  testsController.create
)

route.get('/tests/teachers', testsController.getByTeachers)

route.get('/tests/disciplines', testsController.getByDisciplines)

export default route
