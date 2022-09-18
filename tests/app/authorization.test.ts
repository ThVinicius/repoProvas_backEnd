import app from '../../src/app'
import supertest from 'supertest'
import prisma from '../../src/database/db'
import { createUserFactory, userFactory } from '../factory/userFactory'
import testFactory from '../factory/testFactory'

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`

  const body = createUserFactory()

  await supertest(app).post('/signup').send(body)
})

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`

  await prisma.$disconnect()
})

describe('Testa um token válido em todas as rotas', () => {
  it('GET /categories', async () => {
    const body = userFactory()

    const result = await supertest(app).post('/signin').send(body)

    const token = result.body.token

    const category = await supertest(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)

    expect(category.status).toEqual(200)
  })

  it('GET /teachersdisciplines', async () => {
    const body = userFactory()

    const result = await supertest(app).post('/signin').send(body)

    const token = result.body.token

    const teachersdisciplines = await supertest(app)
      .get('/teachersdisciplines')
      .set('Authorization', `Bearer ${token}`)

    expect(teachersdisciplines.status).toEqual(200)
  })

  it('POST /tests', async () => {
    const body = userFactory()

    const result = await supertest(app).post('/signin').send(body)

    const token = result.body.token

    const createTest = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(testFactory())

    expect(createTest.status).toEqual(201)
  })

  it('GET /tests/teachers', async () => {
    const body = userFactory()

    const result = await supertest(app).post('/signin').send(body)

    const token = result.body.token

    const relationTestsTeachers = await supertest(app)
      .get('/tests/teachers')
      .set('Authorization', `Bearer ${token}`)

    expect(relationTestsTeachers.status).toEqual(200)
  })

  it('GET /tests/disciplines', async () => {
    const body = userFactory()

    const result = await supertest(app).post('/signin').send(body)

    const token = result.body.token

    const relationTestsDisciplines = await supertest(app)
      .get('/tests/disciplines')
      .set('Authorization', `Bearer ${token}`)

    expect(relationTestsDisciplines.status).toEqual(200)
  })
})

describe('Testa um token inválido em todas as rotas', () => {
  it('GET /categories', async () => {
    const token = 'tokenInvalido'

    const category = await supertest(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`)

    expect(category.status).toEqual(401)
  })

  it('GET /teachersdisciplines', async () => {
    const token = 'tokenInvalido'

    const teachersdisciplines = await supertest(app)
      .get('/teachersdisciplines')
      .set('Authorization', `Bearer ${token}`)

    expect(teachersdisciplines.status).toEqual(401)
  })

  it('POST /tests', async () => {
    const token = 'tokenInvalido'

    const createTest = await supertest(app)
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(testFactory())

    expect(createTest.status).toEqual(401)
  })

  it('GET /tests/teachers', async () => {
    const token = 'tokenInvalido'

    const relationTestsTeachers = await supertest(app)
      .get('/tests/teachers')
      .set('Authorization', `Bearer ${token}`)

    expect(relationTestsTeachers.status).toEqual(401)
  })

  it('GET /tests/disciplines', async () => {
    const token = 'tokenInvalido'

    const relationTestsDisciplines = await supertest(app)
      .get('/tests/disciplines')
      .set('Authorization', `Bearer ${token}`)

    expect(relationTestsDisciplines.status).toEqual(401)
  })
})

describe('Testa um token antigo em todas as rotas', () => {
  it('GET /categories', () => {
    const data = userFactory()

    supertest(app)
      .post('/signin')
      .send(data)
      .then(({ body }) => {
        const token = body.token

        supertest(app)
          .post('/signin')
          .send(data)
          .then(() => {
            supertest(app)
              .get('/categories')
              .set('Authorization', `Bearer ${token}`)
              .then(({ status }) => {
                expect(status).toEqual(426)
              })
          })
      })
  })

  it('GET /teachersdisciplines', () => {
    const data = userFactory()

    supertest(app)
      .post('/signin')
      .send(data)
      .then(({ body }) => {
        const token = body.token

        supertest(app)
          .post('/signin')
          .send(data)
          .then(() => {
            supertest(app)
              .get('/teachersdisciplines')
              .set('Authorization', `Bearer ${token}`)
              .then(({ status }) => {
                expect(status).toEqual(426)
              })
          })
      })
  })

  it('POST /tests', () => {
    const data = userFactory()

    supertest(app)
      .post('/signin')
      .send(data)
      .then(({ body }) => {
        const token = body.token

        supertest(app)
          .post('/signin')
          .send(data)
          .then(() => {
            supertest(app)
              .post('/tests')
              .set('Authorization', `Bearer ${token}`)
              .send(testFactory())
              .then(({ status }) => {
                expect(status).toEqual(426)
              })
          })
      })
  })

  it('GET /tests/teachers', () => {
    const data = userFactory()

    supertest(app)
      .post('/signin')
      .send(data)
      .then(({ body }) => {
        const token = body.token

        supertest(app)
          .post('/signin')
          .send(data)
          .then(() => {
            supertest(app)
              .get('/tests/teachers')
              .set('Authorization', `Bearer ${token}`)
              .then(({ status }) => {
                expect(status).toEqual(426)
              })
          })
      })
  })

  it('GET /tests/disciplines', () => {
    const data = userFactory()

    supertest(app)
      .post('/signin')
      .send(data)
      .then(({ body }) => {
        const token = body.token

        supertest(app)
          .post('/signin')
          .send(data)
          .then(async () => {
            supertest(app)
              .get('/tests/disciplines')
              .set('Authorization', `Bearer ${token}`)
              .then(({ status }) => {
                expect(status).toEqual(426)
              })
          })
      })
  })
})
