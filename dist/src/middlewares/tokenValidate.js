"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const sessionSchema_1 = __importDefault(require("../schemas/sessionSchema"));
const sessionsService_1 = __importDefault(require("../services/sessionsService"));
dotenv_1.default.config();
async function tokenValidate(req, res, next) {
    const { error } = sessionSchema_1.default.validate(req.headers);
    if (error)
        return res.status(400).send(error.details.map(detail => detail.message));
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const secretKey = process.env.JWT_SECRET;
    const data = jsonwebtoken_1.default.verify(token, secretKey);
    await sessionsService_1.default.validateSession(token);
    res.locals.session = data;
    next();
}
exports.default = tokenValidate;
