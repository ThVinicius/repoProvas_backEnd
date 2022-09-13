import { Session } from '@prisma/client'

export type ISession = Omit<Session, 'id' | 'createdAt'>
