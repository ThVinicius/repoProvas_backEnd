"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidate_1 = __importDefault(require("../middlewares/tokenValidate"));
const teachersDisciplinesController_1 = __importDefault(require("../controllers/teachersDisciplinesController"));
const route = (0, express_1.Router)();
route.use(tokenValidate_1.default);
route.get('/teachersdisciplines', teachersDisciplinesController_1.default.getRelation);
exports.default = route;
