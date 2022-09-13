import { Test } from '@prisma/client'

export type ITest = Omit<Test, 'id' | 'createdAt'>
