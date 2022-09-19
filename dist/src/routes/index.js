"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoute_1 = __importDefault(require("./usersRoute"));
const testsRoute_1 = __importDefault(require("./testsRoute"));
const teachersDisciplinesRoute_1 = __importDefault(require("./teachersDisciplinesRoute"));
const categoriesRoute_1 = __importDefault(require("./categoriesRoute"));
const route = (0, express_1.Router)();
route.use(usersRoute_1.default);
route.use(testsRoute_1.default);
route.use(teachersDisciplinesRoute_1.default);
route.use(categoriesRoute_1.default);
exports.default = route;
