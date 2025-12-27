import httpStatus from 'http-status';
import prisma from '../../shared/prisma';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import { ILoginUser, IUser } from './auth.interface';

const registerUser = async (payload: IUser) => {
    const { name, email, password, avatar } = payload;
    const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS) || 12
    );

    // @ts-ignore
    const result = await (prisma as any).user.create({
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

const loginUser = async (payload: ILoginUser) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!user) {
        throw new Error('User not found!');
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error('Password not matched!');
    }

    const accessToken = createToken(
        { email: user.email, role: user.role as string },
        process.env.JWT_SECRET || 'secret',
        process.env.JWT_EXPIRES_IN || '1d'
    );

    return {
        accessToken,
    };
};

export const AuthService = {
    registerUser,
    loginUser,
};
