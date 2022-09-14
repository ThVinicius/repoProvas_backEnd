import { Router } from 'express'
import usersRoute from './usersRoute'
import testsRoute from './testsRoute'
import teachersRoute from './teachersRoute'

const route = Router()

route.use(usersRoute)
route.use(testsRoute)
route.use(teachersRoute)

export default route
