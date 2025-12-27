import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error('You are not authorized!');
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'secret'
            ) as JwtPayload;

            const { role } = decoded;

            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new Error('You are not authorized!');
            }

            req.user = decoded as JwtPayload;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default auth;
