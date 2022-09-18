import { faker } from '@faker-js/faker'

export default function testFactory() {
  return {
    name: faker.lorem.words(5),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherDisciplineId: 1
  }
}
