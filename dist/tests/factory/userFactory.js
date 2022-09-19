"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFactory = exports.createUserFactory = void 0;
function createUserFactory() {
    return { email: 'teste@gmail.com', password: '123', confirmPassword: '123' };
}
exports.createUserFactory = createUserFactory;
function userFactory() {
    return { email: 'teste@gmail.com', password: '123' };
}
exports.userFactory = userFactory;
