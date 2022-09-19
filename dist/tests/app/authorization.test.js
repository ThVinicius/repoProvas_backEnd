"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../../src/database/db"));
const userFactory_1 = require("../factory/userFactory");
const testFactory_1 = __importDefault(require("../factory/testFactory"));
beforeAll(async () => {
    await db_1.default.$executeRaw `TRUNCATE TABLE users CASCADE;`;
    const body = (0, userFactory_1.createUserFactory)();
    await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
});
afterAll(async () => {
    await db_1.default.$executeRaw `TRUNCATE TABLE tests CASCADE;`;
    await db_1.default.$disconnect();
});
describe('Testa um token válido em todas as rotas', () => {
    it('GET /categories', async () => {
        const body = (0, userFactory_1.userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        const token = result.body.token;
        const category = await (0, supertest_1.default)(app_1.default)
            .get('/categories')
            .set('Authorization', `Bearer ${token}`);
        expect(category.status).toEqual(200);
    });
    it('GET /teachersdisciplines', async () => {
        const body = (0, userFactory_1.userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        const token = result.body.token;
        const teachersdisciplines = await (0, supertest_1.default)(app_1.default)
            .get('/teachersdisciplines')
            .set('Authorization', `Bearer ${token}`);
        expect(teachersdisciplines.status).toEqual(200);
    });
    it('POST /tests', async () => {
        const body = (0, userFactory_1.userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        const token = result.body.token;
        const { name, categoryId, teacherDisciplineId } = (0, testFactory_1.default)();
        const createTest = await (0, supertest_1.default)(app_1.default)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field('name', name)
            .field('categoryId', categoryId)
            .field('teacherDisciplineId', teacherDisciplineId)
            .attach('file', `${__dirname}/../factory/test.pdf`);
        expect(createTest.status).toEqual(201);
    });
    it('GET /tests/teachers', async () => {
        const body = (0, userFactory_1.userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        const token = result.body.token;
        const relationTestsTeachers = await (0, supertest_1.default)(app_1.default)
            .get('/tests/teachers')
            .set('Authorization', `Bearer ${token}`);
        expect(relationTestsTeachers.status).toEqual(200);
    });
    it('GET /tests/disciplines', async () => {
        const body = (0, userFactory_1.userFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        const token = result.body.token;
        const relationTestsDisciplines = await (0, supertest_1.default)(app_1.default)
            .get('/tests/disciplines')
            .set('Authorization', `Bearer ${token}`);
        expect(relationTestsDisciplines.status).toEqual(200);
    });
});
describe('Testa um token inválido em todas as rotas', () => {
    it('GET /categories', async () => {
        const token = 'tokenInvalido';
        const category = await (0, supertest_1.default)(app_1.default)
            .get('/categories')
            .set('Authorization', `Bearer ${token}`);
        expect(category.status).toEqual(401);
    });
    it('GET /teachersdisciplines', async () => {
        const token = 'tokenInvalido';
        const teachersdisciplines = await (0, supertest_1.default)(app_1.default)
            .get('/teachersdisciplines')
            .set('Authorization', `Bearer ${token}`);
        expect(teachersdisciplines.status).toEqual(401);
    });
    it('POST /tests', async () => {
        const token = 'tokenInvalido';
        const createTest = await (0, supertest_1.default)(app_1.default)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send((0, testFactory_1.default)());
        expect(createTest.status).toEqual(401);
    });
    it('GET /tests/teachers', async () => {
        const token = 'tokenInvalido';
        const relationTestsTeachers = await (0, supertest_1.default)(app_1.default)
            .get('/tests/teachers')
            .set('Authorization', `Bearer ${token}`);
        expect(relationTestsTeachers.status).toEqual(401);
    });
    it('GET /tests/disciplines', async () => {
        const token = 'tokenInvalido';
        const relationTestsDisciplines = await (0, supertest_1.default)(app_1.default)
            .get('/tests/disciplines')
            .set('Authorization', `Bearer ${token}`);
        expect(relationTestsDisciplines.status).toEqual(401);
    });
});
describe('Testa um token antigo em todas as rotas', () => {
    it('GET /categories', () => {
        const data = (0, userFactory_1.userFactory)();
        (0, supertest_1.default)(app_1.default)
            .post('/signin')
            .send(data)
            .then(({ body }) => {
            const token = body.token;
            (0, supertest_1.default)(app_1.default)
                .post('/signin')
                .send(data)
                .then(() => {
                (0, supertest_1.default)(app_1.default)
                    .get('/categories')
                    .set('Authorization', `Bearer ${token}`)
                    .then(({ status }) => {
                    expect(status).toEqual(426);
                });
            });
        });
    });
    it('GET /teachersdisciplines', () => {
        const data = (0, userFactory_1.userFactory)();
        (0, supertest_1.default)(app_1.default)
            .post('/signin')
            .send(data)
            .then(({ body }) => {
            const token = body.token;
            (0, supertest_1.default)(app_1.default)
                .post('/signin')
                .send(data)
                .then(() => {
                (0, supertest_1.default)(app_1.default)
                    .get('/teachersdisciplines')
                    .set('Authorization', `Bearer ${token}`)
                    .then(({ status }) => {
                    expect(status).toEqual(426);
                });
            });
        });
    });
    it('POST /tests', () => {
        const data = (0, userFactory_1.userFactory)();
        (0, supertest_1.default)(app_1.default)
            .post('/signin')
            .send(data)
            .then(({ body }) => {
            const token = body.token;
            (0, supertest_1.default)(app_1.default)
                .post('/signin')
                .send(data)
                .then(() => {
                (0, supertest_1.default)(app_1.default)
                    .post('/tests')
                    .set('Authorization', `Bearer ${token}`)
                    .send((0, testFactory_1.default)())
                    .then(({ status }) => {
                    expect(status).toEqual(426);
                });
            });
        });
    });
    it('GET /tests/teachers', () => {
        const data = (0, userFactory_1.userFactory)();
        (0, supertest_1.default)(app_1.default)
            .post('/signin')
            .send(data)
            .then(({ body }) => {
            const token = body.token;
            (0, supertest_1.default)(app_1.default)
                .post('/signin')
                .send(data)
                .then(() => {
                (0, supertest_1.default)(app_1.default)
                    .get('/tests/teachers')
                    .set('Authorization', `Bearer ${token}`)
                    .then(({ status }) => {
                    expect(status).toEqual(426);
                });
            });
        });
    });
    it('GET /tests/disciplines', () => {
        const data = (0, userFactory_1.userFactory)();
        (0, supertest_1.default)(app_1.default)
            .post('/signin')
            .send(data)
            .then(({ body }) => {
            const token = body.token;
            (0, supertest_1.default)(app_1.default)
                .post('/signin')
                .send(data)
                .then(async () => {
                (0, supertest_1.default)(app_1.default)
                    .get('/tests/disciplines')
                    .set('Authorization', `Bearer ${token}`)
                    .then(({ status }) => {
                    expect(status).toEqual(426);
                });
            });
        });
    });
});
