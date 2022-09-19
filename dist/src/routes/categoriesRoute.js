"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidate_1 = __importDefault(require("../middlewares/tokenValidate"));
const categoriesController_1 = __importDefault(require("../controllers/categoriesController"));
const route = (0, express_1.Router)();
route.use(tokenValidate_1.default);
route.get('/categories', categoriesController_1.default.get);
exports.default = route;
