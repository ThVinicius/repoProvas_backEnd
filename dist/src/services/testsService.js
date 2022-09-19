"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testsRepositority_1 = __importDefault(require("../repositories/testsRepositority"));
const supabaseConfig_1 = __importDefault(require("../utils/supabaseConfig"));
const supabase = (0, supabaseConfig_1.default)();
function insert(test) {
    return testsRepositority_1.default.insert(test);
}
function getByTeachers() {
    return testsRepositority_1.default.getByTeachers();
}
function getByDisciplines() {
    return testsRepositority_1.default.getByDisciplines();
}
async function pdfUrl(file) {
    await supabase.storage
        .from('pdf-tests')
        .upload(Date.now() + file.originalname, file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype
    });
    const { publicURL } = supabase.storage
        .from('pdf-tests')
        .getPublicUrl(file.originalname);
    return publicURL;
}
exports.default = { insert, getByTeachers, getByDisciplines, pdfUrl };
