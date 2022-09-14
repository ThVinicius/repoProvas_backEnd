import { Router } from 'express'
import usersRoute from './usersRoute'
import testsRoute from './testsRoute'
import teachersRoute from './teachersRoute'
import termsRoute from './termsRoute'

const route = Router()

route.use(usersRoute)
route.use(testsRoute)
route.use(teachersRoute)
route.use(termsRoute)

export default route
