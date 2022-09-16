import prisma from '../database/db'

function getTests() {
  return prisma.$queryRaw`SELECT tbp."teacherId" AS "teacherId", 
	tbp.name AS teacher, COALESCE(JSON_AGG(
			JSON_BUILD_OBJECT(
				'categoryId', tbp.id, 'category', tbp.category, 'tests', tbp.tests
			)) FILTER (WHERE tbp.id IS NOT NULL), '[]') AS categories 
	FROM (SELECT t.id AS "teacherId", t.name, c.id, c.name AS category,
					JSON_AGG(
						JSON_BUILD_OBJECT(
							'testId', p.id, 'test', p.name, 'pdfUrl', "pdfUrl", 
							'discipline', d.name
						)
					) AS tests FROM teachers t
				JOIN "teachersDisciplines" td ON td."teacherId" = t.id
				LEFT JOIN tests p ON p."teacherDisciplineId" = td.id
				LEFT JOIN categories c ON c.id = p."categoryId"
				JOIN disciplines d ON d.id = td."disciplineId"
				GROUP BY t.id, c.id) tbp
	GROUP BY tbp."teacherId", tbp.name;`
}

export default { getTests }
