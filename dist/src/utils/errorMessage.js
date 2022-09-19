"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMessage(message, error) {
    function virgula(index) {
        if (index !== 0)
            return ',';
        else
            return '';
    }
    const toSend = error.reduce((acc, curr, index) => acc + `${virgula(index)} ${curr}`, message);
    return toSend;
}
exports.default = errorMessage;
