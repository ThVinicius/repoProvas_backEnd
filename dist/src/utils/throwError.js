"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeRequired = exports.conflit = exports.notFound = exports.unauthorized = exports.badRequest = void 0;
function badRequest(message) {
    throw { code: 'Bad request', message };
}
exports.badRequest = badRequest;
function unauthorized(message) {
    throw { code: 'Unauthorized', message };
}
exports.unauthorized = unauthorized;
function notFound(message) {
    throw { code: 'Not Found', message };
}
exports.notFound = notFound;
function conflit(message) {
    throw { code: 'Conflit', message };
}
exports.conflit = conflit;
function upgradeRequired(message) {
    throw { name: 'Upgrade Required', message };
}
exports.upgradeRequired = upgradeRequired;
