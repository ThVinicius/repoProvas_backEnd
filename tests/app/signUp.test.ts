import app from '../../src/app'
import supertest from 'supertest'
import prisma from '../../src/database/db'
import { createUserFactory } from '../factory/userFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('POST /signup', () => {
  it('criando um user com o formato correto', async () => {
    const body = createUserFactory()

    const result = await supertest(app).post('/signup').send(body)
    expect(result.status).toEqual(201)
  })

  it('password e confirmPassword diferentes', async () => {
    const body = createUserFactory()

    body.confirmPassword = '1234'

    const result = await supertest(app).post('/signup').send(body)

    expect(result.status).toEqual(400)
  })

  it('passando um email já cadastrado', async () => {
    const body = createUserFactory()

    await supertest(app).post('/signup').send(body)

    const result = await supertest(app).post('/signup').send(body)

    expect(result.status).toEqual(409)
  })
})
