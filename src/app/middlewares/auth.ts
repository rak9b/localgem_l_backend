import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    id: string;
    role: string;
}

const auth = (...requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error('You are not authorized!');
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            );

            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'role' in decoded) {
                const { role } = decoded as CustomJwtPayload;

                if (requiredRoles.length && !requiredRoles.includes(role)) {
                    throw new Error('You are not authorized!');
                }

                req.user = decoded as CustomJwtPayload;
            } else {
                throw new Error('Invalid token payload');
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default auth;
