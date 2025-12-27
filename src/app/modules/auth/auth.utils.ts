import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

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
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'role' in decoded) {
        return decoded as JwtPayload & { id: string; role: string };
    }
    throw new Error('Invalid token payload');
};
