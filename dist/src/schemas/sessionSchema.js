"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const regex = /^Bearer\s{1}/;
const tokenSchema = joi_1.default
    .object({
    authorization: joi_1.default.string().pattern(regex).required()
})
    .unknown();
exports.default = tokenSchema;
