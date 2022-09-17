import prisma from '../database/db'

function getRelation() {
  return prisma.$queryRaw`
  SELECT d.id AS "disciplineId", d.name AS discipline, 
	  JSON_AGG(JSON_BUILD_OBJECT('teacherDisciplineId', td.id, 
		  'teacherId', t.id, 'teacher', t.name)) AS teachers
  FROM "teachersDisciplines" td
  JOIN disciplines d ON d.id = td."disciplineId"
  JOIN teachers t ON t.id = td."teacherId"
  GROUP BY d.id;`
}

export default { getRelation }
