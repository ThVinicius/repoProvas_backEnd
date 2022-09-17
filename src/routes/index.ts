import { Router } from 'express'
import usersRoute from './usersRoute'
import testsRoute from './testsRoute'
import teachersRoute from './teachersRoute'
import termsRoute from './termsRoute'
import teachersDisciplinesRoute from './teachersDisciplinesRoute'

const route = Router()

route.use(usersRoute)
route.use(testsRoute)
route.use(teachersRoute)
route.use(termsRoute)
route.use(teachersDisciplinesRoute)

export default route
