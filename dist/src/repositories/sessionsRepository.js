"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
async function upsert(data) {
    const { token, userId } = data;
    await db_1.default.session.upsert({
        where: { userId },
        update: { token },
        create: data
    });
}
async function getByToken(token) {
    return await db_1.default.session.findFirst({ where: { token } });
}
exports.default = { upsert, getByToken };
