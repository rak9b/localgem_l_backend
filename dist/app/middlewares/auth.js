"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...requiredRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error('You are not authorized!');
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            const { role } = decoded;
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new Error('You are not authorized!');
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = auth;
