import app from '../../src/app'
import supertest from 'supertest'
import prisma from '../../src/database/db'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`
})

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`

  await prisma.$disconnect()
})

describe('POST /signin', () => {
  it('passando um email válido e uma senha incorreta', async () => {
    const body = {
      email: 'vinicius@gmail.com',
      password: '13485487'
    }

    const result = await supertest(app).post('/signin').send(body)
    expect(result.status).toEqual(401)
  })

  it('passando um email e senha válidos', async () => {
    const body = {
      email: 'vinicius@gmail.com',
      password: '123',
      confirmPassword: '123'
    } as { email: string; password: string; confirmPassword?: string }

    await supertest(app).post('/signup').send(body)

    delete body.confirmPassword

    const result = await supertest(app).post('/signin').send(body)
    expect(result.status).toEqual(200)
  })
})
