"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../../src/database/db"));
const app_1 = __importDefault(require("../../src/app"));
const testFactory_1 = __importDefault(require("../factory/testFactory"));
const userFactory_1 = require("../factory/userFactory");
beforeAll(async () => {
    await db_1.default.$executeRaw `TRUNCATE TABLE users CASCADE;`;
    const body = (0, userFactory_1.createUserFactory)();
    await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
});
beforeEach(async () => await db_1.default.$executeRaw `TRUNCATE TABLE tests CASCADE;`);
afterAll(async () => {
    await db_1.default.$executeRaw `TRUNCATE TABLE tests CASCADE;`;
    await db_1.default.$disconnect();
});
describe('POST /tests', () => {
    it('Criando test com dados válidos', async () => {
        const { name, categoryId, teacherDisciplineId } = (0, testFactory_1.default)();
        const user = (0, userFactory_1.userFactory)();
        const login = await (0, supertest_1.default)(app_1.default).post('/signin').send(user);
        const token = login.body.token;
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field('name', name)
            .field('categoryId', categoryId)
            .field('teacherDisciplineId', teacherDisciplineId)
            .attach('file', `${__dirname}/../factory/test.pdf`);
        expect(result.status).toEqual(201);
        expect(result.body).toHaveProperty('id');
    });
    it('Passando categoryId inexistente', async () => {
        let { name, categoryId, teacherDisciplineId } = (0, testFactory_1.default)();
        categoryId = '999999999999999';
        const user = (0, userFactory_1.userFactory)();
        const login = await (0, supertest_1.default)(app_1.default).post('/signin').send(user);
        const token = login.body.token;
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field('name', name)
            .field('categoryId', categoryId)
            .field('teacherDisciplineId', teacherDisciplineId)
            .attach('file', `${__dirname}/../factory/test.pdf`);
        expect(result.status).toEqual(404);
    });
    it('Passando teacherDisciplineId inexistente', async () => {
        let { name, categoryId, teacherDisciplineId } = (0, testFactory_1.default)();
        teacherDisciplineId = '999999999999999';
        const user = (0, userFactory_1.userFactory)();
        const login = await (0, supertest_1.default)(app_1.default).post('/signin').send(user);
        const token = login.body.token;
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field('name', name)
            .field('categoryId', categoryId)
            .field('teacherDisciplineId', teacherDisciplineId)
            .attach('file', `${__dirname}/../factory/test.pdf`);
        expect(result.status).toEqual(404);
    });
});
