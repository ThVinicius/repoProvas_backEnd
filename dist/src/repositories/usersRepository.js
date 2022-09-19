"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
async function insert(data) {
    await db_1.default.user.create({ data });
}
async function getByEmail(email) {
    return await db_1.default.user.findUnique({ where: { email } });
}
exports.default = { insert, getByEmail };
