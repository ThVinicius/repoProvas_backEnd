"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../src/database/db"));
async function main() {
    await db_1.default.term.createMany({
        data: [
            { number: 1 },
            { number: 2 },
            { number: 3 },
            { number: 4 },
            { number: 5 },
            { number: 6 }
        ],
        skipDuplicates: true
    });
    await db_1.default.caterory.createMany({
        data: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }],
        skipDuplicates: true
    });
    await db_1.default.teacher.createMany({
        data: [{ name: 'Diego Pinho' }, { name: 'Bruna Hamori' }],
        skipDuplicates: true
    });
    await db_1.default.discipline.createMany({
        data: [
            { name: 'HTML e CSS', termId: 1 },
            { name: 'JavaScript', termId: 2 },
            { name: 'React', termId: 3 },
            { name: 'Humildade', termId: 1 },
            { name: 'Planejamento', termId: 2 },
            { name: 'Autoconfiança', termId: 3 }
        ],
        skipDuplicates: true
    });
    await db_1.default.teacherDiscipline.createMany({
        data: [
            { teacherId: 1, disciplineId: 1 },
            { teacherId: 1, disciplineId: 2 },
            { teacherId: 1, disciplineId: 3 },
            { teacherId: 2, disciplineId: 4 },
            { teacherId: 2, disciplineId: 5 },
            { teacherId: 2, disciplineId: 6 }
        ],
        skipDuplicates: true
    });
}
main()
    .catch(e => {
    console.log(e);
    process.exit(1);
})
    .finally(() => {
    db_1.default.$disconnect();
});
