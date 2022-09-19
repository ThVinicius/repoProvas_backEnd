"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemaValidator_1 = __importDefault(require("../middlewares/schemaValidator"));
const userSchemas_1 = __importDefault(require("../schemas/userSchemas"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const route = (0, express_1.Router)();
route.post('/signup', (0, schemaValidator_1.default)(userSchemas_1.default.signUp), usersController_1.default.signUp);
route.post('/signin', (0, schemaValidator_1.default)(userSchemas_1.default.signIn), usersController_1.default.signIn);
exports.default = route;
