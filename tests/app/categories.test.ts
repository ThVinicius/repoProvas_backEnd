import supertest from 'supertest'
import prisma from '../../src/database/db'
import app from '../../src/app'
import { createUserFactory, userFactory } from '../factory/userFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
})

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`

  await prisma.$disconnect()
})

describe('GET /categories', () => {
  it('Verifica, caso mande um token válido, o retorno (200 e um array)', async () => {
    const createUser = createUserFactory()

    await supertest(app).post('/signup').send(createUser)

    const user = userFactory()

    const { body } = await supertest(app).post('/signin').send(user)

    const token = body.token

    const { status, body: data } = await supertest(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)

    expect(status).toEqual(200)

    expect(data).toBeInstanceOf(Array)
  })
})
