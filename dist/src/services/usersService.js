"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
const throwError_1 = require("../utils/throwError");
async function create(data) {
    const password = bcryptPassword(data.password);
    data.password = password;
    await usersRepository_1.default.insert(data);
}
function bcryptPassword(password) {
    const saltRounds = 10;
    return bcrypt_1.default.hashSync(password, saltRounds);
}
async function hanleSignIn(user) {
    const dbUser = await usersRepository_1.default.getByEmail(user.email);
    if (dbUser === null)
        (0, throwError_1.unauthorized)('Email ou password incorreto');
    validateBcrypt(user.password, dbUser.password);
    return dbUser;
}
function validateBcrypt(decrypted, encrypted) {
    const compare = bcrypt_1.default.compareSync(decrypted, encrypted);
    if (!compare)
        return (0, throwError_1.unauthorized)('Email ou password incorreto');
}
exports.default = { create, hanleSignIn };
