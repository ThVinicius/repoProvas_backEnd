"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function testFactory() {
    return {
        name: faker_1.faker.lorem.words(5),
        categoryId: '1',
        teacherDisciplineId: '1'
    };
}
exports.default = testFactory;
