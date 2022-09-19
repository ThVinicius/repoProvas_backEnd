"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sessionsRepository_1 = __importDefault(require("../repositories/sessionsRepository"));
const throwError_1 = require("../utils/throwError");
function createSession(user) {
    const { id } = user;
    const secretKey = process.env.JWT_SECRET;
    const config = { expiresIn: 60 * 60 * 24 * 30 };
    const token = jsonwebtoken_1.default.sign({ id }, secretKey, config);
    return { userId: user.id, token };
}
async function upsert(data) {
    await sessionsRepository_1.default.upsert(data);
}
async function getSession(token) {
    return await sessionsRepository_1.default.getByToken(token);
}
async function validateSession(token) {
    const session = await getSession(token);
    const message = `Esse token é antigo!
  Gere um token novo e utilize-o para acessar essa rota.

  Porque esse erro ocorreu?
  A session foi planejada para armazenar o token mais recente, sempre que um login é efetuado é feito um upsert na tabela de sessions`;
    if (session === null)
        (0, throwError_1.upgradeRequired)(message);
}
exports.default = { upsert, createSession, getSession, validateSession };
