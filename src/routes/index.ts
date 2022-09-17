import { Router } from 'express'
import usersRoute from './usersRoute'
import testsRoute from './testsRoute'
import termsRoute from './termsRoute'
import teachersDisciplinesRoute from './teachersDisciplinesRoute'

const route = Router()

route.use(usersRoute)
route.use(testsRoute)
route.use(termsRoute)
route.use(teachersDisciplinesRoute)

export default route
