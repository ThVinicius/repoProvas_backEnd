"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teachersDisciplinesRepository_1 = __importDefault(require("../repositories/teachersDisciplinesRepository"));
function getRelation() {
    return teachersDisciplinesRepository_1.default.getRelation();
}
exports.default = { getRelation };
