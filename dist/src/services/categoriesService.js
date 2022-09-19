"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesRepository_1 = __importDefault(require("../repositories/categoriesRepository"));
function get() {
    return categoriesRepository_1.default.get();
}
exports.default = { get };
