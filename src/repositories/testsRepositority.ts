import prisma from '../database/db'
import { ITest } from '../types/testTypes'

function insert(data: ITest) {
  return prisma.test.create({ data })
}

function getByTeachers() {
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

function getByDisciplines() {
  return prisma.$queryRaw`SELECT tbd."termId", tbd.number, 
	COALESCE(JSON_AGG(
		JSON_BUILD_OBJECT('disciplineId', tbd."disciplineId", 
			'discipline', tbd."discipline", 
			'categories', tbd."tests")) 
			FILTER (WHERE tbd."disciplineId" IS NOT NULL),'[]') AS disciplines
FROM (SELECT tbt."termId", tbt.number, tbt."disciplineId", tbt.discipline,
				COALESCE(JSON_AGG(JSON_BUILD_OBJECT
					('categoryId', tbt."categoryId", 
						 'category', tbt.category, 
						 'tests', tbt.tests)
					) FILTER (WHERE tbt."categoryId" IS NOT NULL), '[]') AS tests
			FROM (SELECT pe.id AS "termId", pe.number, d.id AS "disciplineId", d.name AS discipline,
							c.id AS "categoryId", c.name AS category, 
							JSON_AGG(JSON_BUILD_OBJECT(
								'testId', p.id, 'test', p.name, 'pdfUrl', "pdfUrl", 
								'teacherId', t.id, 'teacher', t.name)) AS tests
						FROM terms pe
						LEFT JOIN disciplines d ON d."termId" = pe.id
						LEFT JOIN "teachersDisciplines" td ON td."disciplineId" = d.id
						LEFT JOIN teachers t ON t.id = td."teacherId"
						LEFT JOIN tests p ON p."teacherDisciplineId" = td.id
						LEFT JOIN categories c ON c.id = p."categoryId"
						GROUP BY pe.id, d.id, c.id) tbt
				GROUP BY tbt."termId", tbt.number, tbt."disciplineId", tbt.discipline) tbd
GROUP BY tbd."termId", tbd.number
ORDER BY "termId";`
}

export default { insert, getByTeachers, getByDisciplines }
