import supertest from 'supertest'
import prisma from '../../src/database/db'
import app from '../../src/app'
import testFactory from '../factory/testFactory'
import { createUserFactory, userFactory } from '../factory/userFactory'

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`

  const body = createUserFactory()

  await supertest(app).post('/signup').send(body)
})

beforeEach(async () => await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`)

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`

  await prisma.$disconnect()
})

describe('POST /tests', () => {
  it('Criando test com dados válidos', async () => {
    const { name, categoryId, teacherDisciplineId } = testFactory()

    const user = userFactory()

    const login = await supertest(app).post('/signin').send(user)

    const token = login.body.token

    const result = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', name)
      .field('categoryId', categoryId)
      .field('teacherDisciplineId', teacherDisciplineId)
      .attach('file', `${__dirname}/../factory/test.pdf`)

    expect(result.status).toEqual(201)
    expect(result.body).toHaveProperty('id')
  })

  it('Passando categoryId inexistente', async () => {
    let { name, categoryId, teacherDisciplineId } = testFactory()

    categoryId = '999999999999999'

    const user = userFactory()

    const login = await supertest(app).post('/signin').send(user)

    const token = login.body.token

    const result = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', name)
      .field('categoryId', categoryId)
      .field('teacherDisciplineId', teacherDisciplineId)
      .attach('file', `${__dirname}/../factory/test.pdf`)

    expect(result.status).toEqual(404)
  })

  it('Passando teacherDisciplineId inexistente', async () => {
    let { name, categoryId, teacherDisciplineId } = testFactory()

    teacherDisciplineId = '999999999999999'

    const user = userFactory()

    const login = await supertest(app).post('/signin').send(user)

    const token = login.body.token

    const result = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', name)
      .field('categoryId', categoryId)
      .field('teacherDisciplineId', teacherDisciplineId)
      .attach('file', `${__dirname}/../factory/test.pdf`)

    expect(result.status).toEqual(404)
  })
})
