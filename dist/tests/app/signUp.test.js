"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../../src/database/db"));
const userFactory_1 = require("../factory/userFactory");
beforeEach(async () => {
    await db_1.default.$executeRaw `TRUNCATE TABLE users CASCADE;`;
});
afterAll(async () => {
    await db_1.default.$disconnect();
});
describe('POST /signup', () => {
    it('criando um user com o formato correto', async () => {
        const body = (0, userFactory_1.createUserFactory)();
        const result = await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
        expect(result.status).toEqual(201);
    });
    it('password e confirmPassword diferentes', async () => {
        const body = (0, userFactory_1.createUserFactory)();
        body.confirmPassword = '1234';
        const result = await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
        expect(result.status).toEqual(400);
    });
    it('passando um email já cadastrado', async () => {
        const body = (0, userFactory_1.createUserFactory)();
        await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
        const result = await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
        expect(result.status).toEqual(409);
    });
});
