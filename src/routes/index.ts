import { Router } from 'express'
import usersRoute from './usersRoute'
import testsRoute from './testsRoute'

const route = Router()

route.use(usersRoute)
route.use(testsRoute)

export default route
