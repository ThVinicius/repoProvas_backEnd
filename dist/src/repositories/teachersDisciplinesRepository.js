"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
function getRelation() {
    return db_1.default.$queryRaw `
  SELECT d.id AS "disciplineId", d.name AS discipline, 
	  JSON_AGG(JSON_BUILD_OBJECT('teacherDisciplineId', td.id, 
		  'teacherId', t.id, 'teacher', t.name)) AS teachers
  FROM "teachersDisciplines" td
  JOIN disciplines d ON d.id = td."disciplineId"
  JOIN teachers t ON t.id = td."teacherId"
  GROUP BY d.id;`;
}
exports.default = { getRelation };
