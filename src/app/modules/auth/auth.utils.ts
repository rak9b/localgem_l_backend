import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: any,
    secret: Secret,
    expiresIn: string
) => {
    return jwt.sign(jwtPayload as any, secret as any, {
        expiresIn: expiresIn as any,
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};
