"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const errorMessage_1 = __importDefault(require("../utils/errorMessage"));
const errorHandling = (error, req, res, next) => {
    if (error.name !== undefined && error.name.length >= 16) {
        switch (error.name) {
            case 'JsonWebTokenError':
                return res.status(401).send('token inválido');
            case 'TokenExpiredError':
                return res.status(498).send('token expirado');
            case 'Upgrade Required':
                return res.status(426).send(error.message);
            default:
                console.log(error);
                return res.status(500).send(error);
        }
    }
    switch (error.code) {
        case 'Bad request':
            return res.status(400).send(error.message);
        case 'Unauthorized':
            return res.status(401).send(error.message);
        case 'Not Found':
            return res.status(404).send(error.message);
        case 'P2003':
            const field = error.meta.field_name.includes('categoryId');
            let msg;
            if (field)
                msg = 'O categoryId passada não existe';
            else
                msg = 'O teacherDisciplineId passada não existe';
            return res.status(404).send(msg);
        case 'P2002':
        case 'Conflit':
            const message = 'Unique constraint failed on the fields:';
            return res.status(409).send((0, errorMessage_1.default)(message, error.meta.target));
        default:
            console.log(error);
            return res.status(500).send(error);
    }
};
exports.errorHandling = errorHandling;
