"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesService_1 = __importDefault(require("../services/categoriesService"));
async function get(req, res) {
    const categories = await categoriesService_1.default.get();
    return res.status(200).send(categories);
}
exports.default = { get };
