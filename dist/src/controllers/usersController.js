"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersService_1 = __importDefault(require("../services/usersService"));
const sessionsService_1 = __importDefault(require("../services/sessionsService"));
async function signUp(req, res) {
    const { email, password } = req.body;
    await usersService_1.default.create({ email, password });
    return res.sendStatus(201);
}
async function signIn(req, res) {
    const user = await usersService_1.default.hanleSignIn(req.body);
    const session = sessionsService_1.default.createSession(user);
    await sessionsService_1.default.upsert(session);
    return res.status(200).send({ token: session.token });
}
exports.default = { signUp, signIn };
