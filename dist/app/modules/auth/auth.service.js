"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const registerUser = async (payload) => {
    const { name, email, password, avatar } = payload;
    const hashedPassword = await bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 12);
    const result = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            avatar,
        },
    });
    const { password: _, ...userWithoutPassword } = result;
    return userWithoutPassword;
};
const loginUser = async (payload) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new Error('User not found!');
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error('Password not matched!');
    }
    const accessToken = (0, auth_utils_1.createToken)({ email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', process.env.JWT_EXPIRES_IN || '1d');
    return {
        accessToken,
    };
};
exports.AuthService = {
    registerUser,
    loginUser,
};
