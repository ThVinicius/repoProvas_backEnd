import { Router } from 'express'
import usersRoute from './usersRoute'

const route = Router()

route.use(usersRoute)

export default route
