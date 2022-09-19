"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const tokenValidate_1 = __importDefault(require("../middlewares/tokenValidate"));
const schemaValidator_1 = __importDefault(require("../middlewares/schemaValidator"));
const testSchemas_1 = __importDefault(require("../schemas/testSchemas"));
const uploadPdf_1 = __importDefault(require("../middlewares/uploadPdf"));
const testsController_1 = __importDefault(require("../controllers/testsController"));
const route = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
route.use(tokenValidate_1.default);
route.post('/tests', upload.single('file'), (0, schemaValidator_1.default)(testSchemas_1.default.create), uploadPdf_1.default, testsController_1.default.create);
route.get('/tests/teachers', testsController_1.default.getByTeachers);
route.get('/tests/disciplines', testsController_1.default.getByDisciplines);
exports.default = route;
