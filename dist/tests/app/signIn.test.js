"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../../src/database/db"));
beforeEach(async () => {
    await db_1.default.$executeRaw `TRUNCATE TABLE users CASCADE;`;
});
afterAll(async () => {
    await db_1.default.$disconnect();
});
describe('POST /signin', () => {
    it('passando um email válido e uma senha incorreta', async () => {
        const body = {
            email: 'vinicius@gmail.com',
            password: '13485487'
        };
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        expect(result.status).toEqual(401);
    });
    it('passando um email e senha válidos', async () => {
        const body = {
            email: 'vinicius@gmail.com',
            password: '123',
            confirmPassword: '123'
        };
        await (0, supertest_1.default)(app_1.default).post('/signup').send(body);
        delete body.confirmPassword;
        const result = await (0, supertest_1.default)(app_1.default).post('/signin').send(body);
        expect(result.status).toEqual(200);
    });
});
