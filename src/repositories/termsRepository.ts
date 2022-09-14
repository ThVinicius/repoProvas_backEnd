import prisma from '../database/db'

function getTests() {
  return prisma.$queryRaw`SELECT tbd."termId", tbd.number, 
	  JSON_AGG(
		  JSON_BUILD_OBJECT('disciplineId', tbd."disciplineId", 
			  'discipline', tbd."discipline", 
        'categories', tbd."tests")) AS disciplines
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
				      JOIN disciplines d ON d."termId" = pe.id
				      JOIN "teachersDisciplines" td ON td."disciplineId" = d.id
				      JOIN teachers t ON t.id = td."teacherId"
				      LEFT JOIN tests p ON p."teacherDisciplineId" = td.id
				      LEFT JOIN categories c ON c.id = p."categoryId"
				      GROUP BY pe.id, d.id, c.id) tbt
		      GROUP BY tbt."termId", tbt.number, tbt."disciplineId", tbt.discipline) tbd
  GROUP BY tbd."termId", tbd.number
  ORDER BY "termId"`
}

export default { getTests }
