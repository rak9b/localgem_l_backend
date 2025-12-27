import jwt, { Secret } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: Record<string, any>,
    secret: Secret,
    expiresIn: string
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn: expiresIn as any,
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as Record<string, any>;
};
