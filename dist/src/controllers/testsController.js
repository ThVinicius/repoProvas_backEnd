"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testsService_1 = __importDefault(require("../services/testsService"));
async function create(req, res) {
    let { name, categoryId, teacherDisciplineId } = req.body;
    categoryId = Number(categoryId);
    teacherDisciplineId = Number(teacherDisciplineId);
    const pdfUrl = await testsService_1.default.pdfUrl(req.file);
    const data = { name, categoryId, teacherDisciplineId, pdfUrl };
    const test = await testsService_1.default.insert(data);
    return res.status(201).send(test);
}
async function getByTeachers(req, res) {
    const tests = await testsService_1.default.getByTeachers();
    return res.status(200).send(tests);
}
async function getByDisciplines(req, res) {
    const tests = await testsService_1.default.getByDisciplines();
    return res.status(200).send(tests);
}
exports.default = { create, getByTeachers, getByDisciplines };
