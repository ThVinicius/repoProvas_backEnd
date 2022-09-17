import { Router } from 'express'
import usersRoute from './usersRoute'
import testsRoute from './testsRoute'
import teachersDisciplinesRoute from './teachersDisciplinesRoute'
import categoriesRoute from './categoriesRoute'

const route = Router()

route.use(usersRoute)
route.use(testsRoute)
route.use(teachersDisciplinesRoute)
route.use(categoriesRoute)

export default route
